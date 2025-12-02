# Fresh Fork Restaurant Ordering System

A modern restaurant ordering system with real-time order tracking, menu management, and admin dashboard.

## Tech Stack
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: FastAPI + Python
- **Database**: PostgreSQL
- **Real-time**: WebSockets
- **State Management**: React Context/Redux Toolkit

## Features
- 🍽️ Interactive menu with categories
- 🛒 Shopping cart functionality
- 📦 Real-time order tracking
- 👤 Customer accounts
- 🍳 Admin dashboard for menu management
- 📱 Responsive design
- ⚡ Real-time updates via WebSockets

## Project Structure
```
fresh-fork-restaurant/
├── frontend/          # React application
├── backend/           # FastAPI server
├── database/          # Database schemas and migrations
└── README.md
```

## Getting Started

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Database Setup
```bash
cd database
# Run migration scripts
psql -U postgres -d fresh_fork < schema.sql
```

## API Endpoints
- `/api/menu` - Get menu items
- `/api/orders` - Create and manage orders
- `/api/auth` - User authentication
- `/ws/orders` - WebSocket for real-time updates

## Development Team
- Built with React + FastAPI + PostgreSQL + WebSockets
