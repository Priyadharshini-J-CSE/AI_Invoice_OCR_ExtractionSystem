@echo off
echo ========================================
echo AI Invoice OCR System - Installation
echo ========================================
echo.

echo [1/4] Installing backend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed
    pause
    exit /b 1
)
echo Backend dependencies installed successfully!
echo.

echo [2/4] Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed
    pause
    exit /b 1
)
cd ..
echo Frontend dependencies installed successfully!
echo.

echo [3/4] Creating necessary directories...
if not exist "uploads\invoices" mkdir uploads\invoices
echo Directories created successfully!
echo.

echo [4/4] Setup complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo 1. Configure .env file with your API keys
echo 2. Start MongoDB service
echo 3. Run backend: npm run dev
echo 4. Run frontend: cd frontend ^&^& npm run dev
echo.
echo For detailed setup instructions, see docs/QUICKSTART.md
echo ========================================
pause
