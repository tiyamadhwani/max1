#!/bin/bash

echo "🍔 Starting Max Burger & More Web App..."
echo ""

# Install Python deps
echo "📦 Installing Python dependencies..."
cd backend
pip install flask flask-cors anthropic --break-system-packages -q
cd ..

# Install Node deps
echo "📦 Installing Node dependencies..."
cd frontend
npm install --silent
echo ""

echo "✅ Setup complete!"
echo ""
echo "=== TO RUN THE APP ==="
echo ""
echo "Terminal 1 — Start Flask backend:"
echo "  cd backend && python app.py"
echo ""
echo "Terminal 2 — Start React frontend (dev):"
echo "  cd frontend && npm run dev"
echo ""
echo "OR build for production:"
echo "  cd frontend && npm run build"
echo "  cd backend && python app.py   (serves built React from /build)"
echo ""
echo "App runs at: http://localhost:5173 (dev) or http://localhost:5000 (prod)"
