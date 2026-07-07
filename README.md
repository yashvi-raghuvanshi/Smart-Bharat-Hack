# Smart Bharat – AI-Powered Civic Companion

## Overview
Smart Bharat is a GenAI-powered platform that helps Indian citizens access
government services, report public issues, and get personalized civic
assistance through an AI companion — in English or Hindi.

## Live Demo
- **Web App:** https://smart-bharat-hack.vercel.app
- **Backend API:** https://smart-bharat-hack.onrender.com

## Features
1. **AI Civic Assistant (Bharat Mitra)** — conversational chatbot that
   explains government schemes, answers civic queries, and responds in the
   user's chosen language, powered by Google Gemini.
2. **Document Requirement Helper** — given a stated need (e.g. "I want to
   open a small shop"), the AI recommends relevant services and lists
   required documents.
3. **Complaint Tracker** — citizens report public issues (garbage, roads,
   water, etc.); Gemini auto-categorizes and prioritizes each complaint.
4. **Multilingual Support** — all AI responses can be toggled between
   English and Hindi.

## Tech Stack
- Frontend: React (Vite) + Tailwind CSS
- Backend: Node.js + Express
- AI: Google Gemini API (gemini-2.5-flash)
- Deployment: Vercel (frontend) + Render (backend)

## Running Locally
### Backend
```bash
cd backend
npm install 
```
# create a .env file with GEMINI_API_KEY=your_key
``` bash
npm run dev
```

### Frontend
``` bash
cd frontend
npm install
npm run dev
```

## Project Structure
``` bash
smart-bharat/
├── frontend/   # React app
├── backend/    # Express API + Gemini integration
└── docs/       # Prompt workflow documentation
```
