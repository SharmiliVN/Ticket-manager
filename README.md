# 🎫 Simple Ticket Manager — Full-Stack Mini Project (Flask)

This project is a **Full-stack Ticket Management System** ,
It uses **Flask** for backend + routing, **SQLite** for storage, and a lightweight **HTML/CSS/JavaScript** frontend served through Flask templates.  
It also includes an **AI-powered priority suggestion** with a **rule-based fallback**, ensuring reliability with or without an API key.

---

## 🚀 Features

### 📝 Ticket Management
- Create support tickets  
- View all tickets  
- View ticket details  
- Update ticket status (New → In Progress → Closed)  
- Delete tickets  

### 🤖 Smart Priority (AI + Rules)
- **AI Mode:** If an OpenAI API key is present, priority is suggested using an LLM  
- **Fallback Mode:** If AI is unavailable, priority is assigned with a rule-based classifier  
  - “urgent”, “fail”, “critical”, “payment” → HIGH  
  - “issue”, “problem”, “slow” → MEDIUM  
  - everything else → LOW

### 🎨 Frontend (HTML/CSS/JS)
- Professional Corporate Blue UI  
- Built using Jinja2 templates  
- JavaScript `fetch()` for API calls  
- Fully integrated inside Flask (no React/Angular required)

### 🧠 Backend (Flask)
- REST API endpoints  
- SQLite database  
- SQLAlchemy ORM  
- Clean JSON responses  
- CORS enabled  

---

## 🧰 Tech Stack

### Frontend
- HTML  
- CSS  
- JavaScript (fetch API)  
- Flask Jinja2 templates  

### Backend
- Python 3  
- Flask  
- Flask-CORS  
- SQLAlchemy  
- SQLite  
- Optional OpenAI LLM integration  

### Deployment (optional)
- Render (Backend + Frontend served together)

---

## 📁 Project Structure
ticket-manager/
│
├── app.py
├── requirements.txt
├── database.db
│
├── templates/
│ ├── index.html
│ ├── create_ticket.html
│ ├── view_ticket.html
│ └── layout.html
│
├── static/
│ ├── styles.css
│ └── script.js
│
└── samples/



## 🛠️ Local Setup

### 🔹 Backend

cd backend
python -m venv venv
# PowerShell:
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py

App runs at:
http://localhost:5000

📚 API Endpoints
🔹 GET /api/health

Health check.

🔹 POST /api/tickets

Create ticket.

🔹 GET /api/tickets

List all tickets.

🔹 GET /api/tickets/<id>

Get single ticket.

🔹 PUT /api/tickets/<id>/status

Update status: NEW, IN_PROGRESS, or CLOSED.

🔹 DELETE /api/tickets/<id>

Delete ticket.


> **Note:** All screenshots shown below are available in the `samples/` folder inside this repository.

