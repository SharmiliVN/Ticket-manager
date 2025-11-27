# 🎫 Simple Ticket Manager  
  
This project demonstrates practical hands-on experience with **REST API development, React frontend, database integration, workflow logic, optional AI usage and clean documentation.**

---

## 🚀 Project Overview

This application allows users to:

- Create new support tickets  
- Enable **AI-based priority suggestion** (LLM or rule-based fallback)  
- List all tickets  
- View detailed ticket information  
- Update ticket status (Start, Close)  
- Delete tickets  
- Enjoy a polished **Corporate Blue UI** for professional presentation  
- Access a fully deployed cloud version of the app  

This project demonstrates the ability to independently design, build, integrate and document a complete product.

---

## 🧠 AI Priority Suggestion

The application supports two priority classification modes:

### ✔ 1. LLM-based classification (OpenAI)
If an **OPENAI_API_KEY** is provided in environment variables, the backend uses an LLM to classify priority into:
HIGH / MEDIUM / LOW

### ✔ 2. Rule-based fallback (no API key needed)
If AI is disabled or unavailable, the backend uses keyword checks:

- "urgent", "fail", "payment", "critical" → **HIGH**
- "issue", "problem", "slow" → **MEDIUM**
- Otherwise → **LOW**

This ensures the app always works — with or without AI.

---

## 🎨 UI Theme: Corporate Blue

The frontend styling includes:

- Blue enterprise theme  
- Rounded cards and panels  
- Modern table layout  
- Header links  
- Clean form inputs  
- Responsive spacing  
- Professional, dashboard-like appearance  

---

## 🧰 Tech Stack

### **Backend**
- Python 3  
- Flask  
- Flask-CORS  
- SQLAlchemy  
- SQLite / PostgreSQL  
- Gunicorn (for deployment)  
- Optional OpenAI integration  

### **Frontend**
- React (Create React App)  
- Axios  
- React Router  
- Custom CSS Corporate Blue theme  

## 📁 Project Structure

ticket-manager-3cortex/
│
├── backend/
│ ├── app.py
│ ├── requirements.txt
│ └── .env (local only, excluded from Git)
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── CreateTicket.js
│ │ │ ├── TicketsList.js
│ │ │ ├── TicketView.js
│ │ ├── App.js
│ │ ├── api.js
│ │ ├── index.js
│ │ └── index.css
│ ├── package.json
│ └── .env (local only)
│
├── samples/
│ ├── create-ticket.png
│ ├── tickets-list.png
│ └── ticket-view.png
│
└── README.md

## 🛠️ Local Setup

### 🔹 Backend

```bash
cd backend
python -m venv venv
# PowerShell:
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py

🔹 Frontend
cd frontend
npm install
npm start

Runs at:

http://localhost:3000

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

