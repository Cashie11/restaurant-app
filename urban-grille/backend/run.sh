#!/bin/bash

echo "🚀 Starting Urban Grille API..."
echo ""

# Activate virtual environment
source venv/bin/activate

# Run the server
uvicorn app.main:app --reload --port 8000 --host 0.0.0.0
