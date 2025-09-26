#!/bin/bash

# Instagram Downloader Start Script
# Runs both frontend (port 3001) and backend (port 5000)

echo "🚀 Starting Instagram Downloader..."
echo "================================="

# Check if node_modules exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

# Kill any existing processes on our ports
echo "🔄 Cleaning up any existing processes..."
lsof -ti:3001 | xargs kill -9 2>/dev/null
lsof -ti:5001 | xargs kill -9 2>/dev/null

# Start both services
echo "✨ Starting services..."
echo "  Frontend: http://localhost:3001"
echo "  Backend:  http://localhost:5001"
echo "================================="

# Run with npm
npm run dev