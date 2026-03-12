@echo off
echo ========================================
echo AI Invoice OCR System - Starting...
echo ========================================
echo.

echo Starting Backend Server...
start cmd /k "cd /d %~dp0 && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ========================================
echo Servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo ========================================
echo.
echo Press any key to exit this window...
pause > nul
