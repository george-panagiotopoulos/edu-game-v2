#!/bin/bash

echo "🎮 Starting Educational RPG Game..."
echo "================================="

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🚀 Starting the game on port 4455..."
echo "🌐 Open your browser to: http://localhost:4455"
echo "🎯 Use arrow keys to move your hero!"
echo "================================="

npm start 