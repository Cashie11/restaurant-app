# Urban Grille Restaurant Ordering System

A modern restaurant ordering system with real-time order tracking, menu management, and admin dashboard.

## Tech Stack
- **Frontend**: React + TypeScript + Bootstrap + Tailwind CSS
- **Backend**: FastAPI + Python
- **Database**: SQLite
- **State Management**: React Context
- **Payment**: Paystack Integration

## Features
- 🍽️ Interactive menu with categories
- 🛒 Shopping cart functionality
- 📦 Real-time order tracking
- 👤 Customer accounts
- 🍳 Admin dashboard for menu management
- 📱 Responsive design
- 💳 Payment gateway integration

## Quick Start with Docker 🐳

### Prerequisites
- Docker
- Docker Compose

### Run the Application
```bash
# Clone the repository
cd urban-grille

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Development Setup

### Environment Variables
Copy `.env.example` to `.env` and update with your values:
```bash
cp .env.example .env
```

### Frontend Setup
```bash
cd frontend
npm install --legacy-peer-deps
npm start
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## API Endpoints
- `/api/auth` - User authentication
- `/api/products` - Menu/product management
- `/api/cart` - Shopping cart operations
- `/api/orders` - Order management
- `/api/checkout` - Checkout and payment
- `/api/banks` - Bank information for payments
- `/docs` - Interactive API documentation

## Docker Commands

### Build images
```bash
docker-compose build
```

### Start services in background
```bash
docker-compose up -d
```

### View service status
```bash
docker-compose ps
```

### View logs
```bash
docker-compose logs backend
docker-compose logs frontend
```

### Restart services
```bash
docker-compose restart
```

### Stop and remove containers
```bash
docker-compose down
```

### Remove volumes (clean database)
```bash
docker-compose down -v
```

## Troubleshooting

### Frontend build issues
If you encounter module resolution errors:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm install ajv@^8.12.0 --legacy-peer-deps
```

### Database reset
```bash
# Stop containers
docker-compose down -v

# Start fresh
docker-compose up -d
```

## Development Team
Built with React + FastAPI + SQLite + Docker

