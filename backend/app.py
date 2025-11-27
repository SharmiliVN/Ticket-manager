# backend/app.py
import os
import time
from datetime import datetime
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv

# Try to import openai if available
try:
    import openai
except Exception:
    openai = None

# Load .env (local only)
load_dotenv()

# ---------- App & DB setup ----------
app = Flask(__name__)
CORS(app)

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///tickets.db")
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# ---------- Models ----------
class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    priority = db.Column(db.String(50), nullable=False, default="MEDIUM")  # LOW/MEDIUM/HIGH
    status = db.Column(db.String(50), nullable=False, default="NEW")  # NEW/IN_PROGRESS/CLOSED
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "priority": self.priority,
            "status": self.status,
            "created_at": self.created_at.isoformat()
        }

# ---------- AI Helpers ----------
def suggest_priority_from_text(title, description):
    """
    Local rule-based fallback suggestion:
    - high keywords => HIGH
    - medium keywords => MEDIUM
    - else LOW
    """
    text = (title or "") + " " + (description or "")
    text = text.lower()
    high_keywords = ["urgent", "immediately", "asap", "critical", "failure", "down", "payment failed", "data loss"]
    medium_keywords = ["issue", "problem", "error", "slow", "delay", "warning", "unexpected"]

    for kw in high_keywords:
        if kw in text:
            return "HIGH"
    for kw in medium_keywords:
        if kw in text:
            return "MEDIUM"
    return "LOW"

def suggest_priority_with_llm(title, description, model="gpt-3.5-turbo"):
    """
    Call OpenAI to classify priority. Returns 'LOW'|'MEDIUM'|'HIGH'.
    Falls back to rule-based when OpenAI is unavailable or returns unexpected output.
    """
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key or openai is None:
        # No key or library: fallback
        return suggest_priority_from_text(title, description)

    openai.api_key = api_key

    prompt = (
        "You are a helpful assistant that MUST respond with exactly one of these words: "
        "LOW, MEDIUM, or HIGH. "
        "Classify the priority of the following support ticket (no explanation, only the word):\n\n"
        f"Title: {title}\n\nDescription: {description}\n\nRespond with exactly one word:"
    )

    try:
        # Use ChatCompletion for compatibility. Model name can be changed to any available one.
        resp = openai.ChatCompletion.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=3,
            temperature=0.0,
        )
        text = resp.choices[0].message.content.strip().upper()
        # Accept only valid outputs
        if text in ("LOW", "MEDIUM", "HIGH"):
            return text
        # If model returns extra text, try to extract first token
        candidate = text.split()[0]
        if candidate in ("LOW", "MEDIUM", "HIGH"):
            return candidate
        # else fallback
        return suggest_priority_from_text(title, description)
    except Exception as e:
        # On any exception (rate limit, network, etc.) fallback to rule-based
        print("LLM priority suggestion failed:", str(e))
        return suggest_priority_from_text(title, description)

# ---------- API Endpoints ----------
@app.route("/api/tickets", methods=["POST"])
def create_ticket():
    """
    Create a ticket.
    JSON body: { title (required), description (optional), priority (optional), use_ai (optional bool) }
    If priority not provided, we will suggest using LLM if use_ai=True else rule-based.
    """
    data = request.get_json() or {}
    title = (data.get("title") or "").strip()
    description = (data.get("description") or "").strip()
    priority = data.get("priority")
    use_ai = data.get("use_ai", False)

    if not title:
        return jsonify({"error": "title is required"}), 400

    if not priority:
        if use_ai:
            priority = suggest_priority_with_llm(title, description)
        else:
            priority = suggest_priority_from_text(title, description)

    ticket = Ticket(title=title, description=description, priority=priority, status="NEW")
    db.session.add(ticket)
    db.session.commit()
    return jsonify(ticket.to_dict()), 201

@app.route("/api/tickets", methods=["GET"])
def list_tickets():
    tickets = Ticket.query.order_by(Ticket.created_at.desc()).all()
    return jsonify([t.to_dict() for t in tickets]), 200

@app.route("/api/tickets/<int:ticket_id>", methods=["GET"])
def get_ticket(ticket_id):
    t = Ticket.query.get_or_404(ticket_id)
    return jsonify(t.to_dict()), 200

@app.route("/api/tickets/<int:ticket_id>/status", methods=["PUT"])
def update_status(ticket_id):
    t = Ticket.query.get_or_404(ticket_id)
    data = request.get_json() or {}
    new_status = data.get("status")
    if new_status not in ("NEW", "IN_PROGRESS", "CLOSED"):
        return jsonify({"error": "invalid status"}), 400
    t.status = new_status
    db.session.commit()
    return jsonify(t.to_dict()), 200

@app.route("/api/tickets/<int:ticket_id>", methods=["DELETE"])
def delete_ticket(ticket_id):
    t = Ticket.query.get_or_404(ticket_id)
    db.session.delete(t)
    db.session.commit()
    return jsonify({"result": "deleted"}), 204

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200

# ---------- Run ----------
if __name__ == "__main__":
    # Create DB tables if not exists
    with app.app_context():
        db.create_all()
    port = int(os.getenv("PORT", 5000))
    # debug mode uses FLASK_ENV; running directly uses app.run
    app.run(host="0.0.0.0", port=port)
