#!/bin/bash

# Instagram Downloader Stop Script
# Stops both frontend and backend services

echo "🛑 Stopping Instagram Downloader..."
echo "================================="

# Kill processes on port 3001 (frontend)
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null ; then
    echo "🔴 Stopping frontend (port 3001)..."
    lsof -ti:3001 | xargs kill -9
    echo "✅ Frontend stopped"
else
    echo "ℹ️  Frontend not running"
fi

# Kill processes on port 5001 (backend)
if lsof -Pi :5001 -sTCP:LISTEN -t >/dev/null ; then
    echo "🔴 Stopping backend (port 5001)..."
    lsof -ti:5001 | xargs kill -9
    echo "✅ Backend stopped"
else
    echo "ℹ️  Backend not running"
fi

# Also kill any node processes related to our app
pkill -f "node.*backend" 2>/dev/null
pkill -f "next dev -p 3001" 2>/dev/null
pkill -f "ts-node.*server.ts" 2>/dev/null

echo "================================="
echo "✨ All services stopped successfully!"
echo ""