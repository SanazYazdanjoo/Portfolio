@echo off
echo Starting Sanaz's UX Portfolio Server...

:: Start the React/Vite frontend
start cmd /k "npm run dev"

:: Start the backend inside the server folder directly using Node
start cmd /k "cd server && node server.js"

echo Servers are running!
exit