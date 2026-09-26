@echo off
title Portfolio Localhost Server
cd /d "%~dp0"

echo ===================================================================
echo   PORTFOLIO LOCALHOST SERVER
echo   Target Port: http://localhost:3000
echo   Theme: Light/Neon Green (#00F801) and Dark Green (#0F460F)
echo ===================================================================
echo.
echo Launching browser at http://localhost:3000...
start "" "http://localhost:3000"

echo.
echo Trying Python 3 http.server on port 3000...
python -m http.server 3000
if %errorlevel% neq 0 (
    echo Python not found, trying npx serve...
    npx serve -l 3000 .
)
if %errorlevel% neq 0 (
    echo Opening index.html directly in your default browser...
    start "" "index.html"
)

pause
