# 🎫 Simple Ticket Manager  
A full-stack Ticket Management system built as part of the **3Cortex Full-Stack Developer Evaluation**.  
This project demonstrates practical hands-on experience with **REST API development, React frontend, database integration, workflow logic, optional AI usage, deployment, and clean documentation.**

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

This project demonstrates the ability to independently design, build, integrate, deploy, and document a complete product.

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

### **Deployment**
- Backend: **Render**  
- Frontend: **Vercel**  

---

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

