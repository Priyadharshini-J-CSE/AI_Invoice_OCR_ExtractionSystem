@echo off
echo ========================================
echo Backend Diagnostic Check
echo ========================================
echo.

echo Checking if backend is running...
curl -s http://localhost:5000/ >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] Backend is NOT running!
    echo     Start it with: npm run dev
    pause
    exit /b 1
)
echo [OK] Backend is running
echo.

echo Checking health endpoint...
curl -s http://localhost:5000/health
echo.
echo.

echo Checking environment variables...
echo.

cd c:\Users\91950\Downloads\ai-invoice-ocr-system

echo Checking .env file...
if exist .env (
    echo [OK] .env file exists
    echo.
    echo Contents:
    type .env
) else (
    echo [X] .env file NOT found!
)
echo.

echo Checking Google credentials...
if exist google-credentials.json (
    echo [OK] google-credentials.json exists
) else (
    echo [!] google-credentials.json NOT found (will use Mock OCR)
)
echo.

echo Checking uploads folder...
if exist uploads\invoices (
    echo [OK] uploads\invoices folder exists
) else (
    echo [X] uploads\invoices folder NOT found!
)
echo.

echo ========================================
echo Diagnostic Complete
echo ========================================
echo.
echo Now check your backend terminal for error messages
echo when you upload an invoice.
echo.
pause
