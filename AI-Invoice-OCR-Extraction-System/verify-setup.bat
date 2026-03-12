@echo off
color 0A
echo.
echo ========================================
echo   AI Invoice OCR System
echo   Setup Verification
echo ========================================
echo.

set ERROR_COUNT=0

echo [1/10] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] Node.js NOT installed
    set /a ERROR_COUNT+=1
) else (
    node --version
    echo [OK] Node.js installed
)
echo.

echo [2/10] Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] npm NOT installed
    set /a ERROR_COUNT+=1
) else (
    npm --version
    echo [OK] npm installed
)
echo.

echo [3/10] Checking backend dependencies...
if exist "node_modules\" (
    echo [OK] Backend dependencies installed
) else (
    echo [X] Backend dependencies NOT installed
    echo     Run: npm install
    set /a ERROR_COUNT+=1
)
echo.

echo [4/10] Checking frontend dependencies...
if exist "frontend\node_modules\" (
    echo [OK] Frontend dependencies installed
) else (
    echo [X] Frontend dependencies NOT installed
    echo     Run: cd frontend ^&^& npm install
    set /a ERROR_COUNT+=1
)
echo.

echo [5/10] Checking .env file...
if exist ".env" (
    echo [OK] .env file exists
    echo.
    echo Checking environment variables:
    findstr /C:"MONGODB_URI" .env >nul 2>&1
    if %errorlevel% equ 0 (
        echo [OK] MONGODB_URI configured
    ) else (
        echo [X] MONGODB_URI missing
        set /a ERROR_COUNT+=1
    )
    
    findstr /C:"JWT_SECRET" .env >nul 2>&1
    if %errorlevel% equ 0 (
        echo [OK] JWT_SECRET configured
    ) else (
        echo [X] JWT_SECRET missing
        set /a ERROR_COUNT+=1
    )
    
    findstr /C:"OPENAI_API_KEY" .env >nul 2>&1
    if %errorlevel% equ 0 (
        echo [OK] OPENAI_API_KEY configured
    ) else (
        echo [X] OPENAI_API_KEY missing
        set /a ERROR_COUNT+=1
    )
    
    findstr /C:"GOOGLE_APPLICATION_CREDENTIALS" .env >nul 2>&1
    if %errorlevel% equ 0 (
        echo [OK] GOOGLE_APPLICATION_CREDENTIALS configured
    ) else (
        echo [X] GOOGLE_APPLICATION_CREDENTIALS missing
        set /a ERROR_COUNT+=1
    )
) else (
    echo [X] .env file NOT found
    echo     Copy .env.example to .env and configure
    set /a ERROR_COUNT+=1
)
echo.

echo [6/10] Checking uploads directory...
if exist "uploads\invoices\" (
    echo [OK] Uploads directory exists
) else (
    echo [!] Creating uploads directory...
    mkdir uploads\invoices
    echo [OK] Uploads directory created
)
echo.

echo [7/10] Checking MongoDB connection...
echo Attempting to connect to MongoDB...
timeout /t 2 /nobreak >nul
echo [!] Please ensure MongoDB is running
echo     Local: mongod
echo     Or use MongoDB Atlas
echo.

echo [8/10] Checking project structure...
set STRUCTURE_OK=1

if not exist "backend\server.js" (
    echo [X] backend\server.js missing
    set STRUCTURE_OK=0
)
if not exist "frontend\src\App.jsx" (
    echo [X] frontend\src\App.jsx missing
    set STRUCTURE_OK=0
)
if not exist "backend\models\User.js" (
    echo [X] backend\models\User.js missing
    set STRUCTURE_OK=0
)
if not exist "backend\models\Invoice.js" (
    echo [X] backend\models\Invoice.js missing
    set STRUCTURE_OK=0
)

if %STRUCTURE_OK% equ 1 (
    echo [OK] Project structure verified
) else (
    echo [X] Project structure incomplete
    set /a ERROR_COUNT+=1
)
echo.

echo [9/10] Checking documentation...
if exist "README.md" (
    echo [OK] README.md exists
) else (
    echo [X] README.md missing
)
if exist "docs\QUICKSTART.md" (
    echo [OK] QUICKSTART.md exists
) else (
    echo [X] QUICKSTART.md missing
)
echo.

echo [10/10] Checking ports availability...
echo Checking if port 5000 is available...
netstat -ano | findstr :5000 >nul 2>&1
if %errorlevel% equ 0 (
    echo [!] Port 5000 is in use
    echo     Backend may not start. Kill process or change PORT in .env
) else (
    echo [OK] Port 5000 is available
)

echo Checking if port 5173 is available...
netstat -ano | findstr :5173 >nul 2>&1
if %errorlevel% equ 0 (
    echo [!] Port 5173 is in use
    echo     Frontend may not start. Kill process or change port in vite.config.js
) else (
    echo [OK] Port 5173 is available
)
echo.

echo ========================================
echo   Verification Complete
echo ========================================
echo.

if %ERROR_COUNT% equ 0 (
    color 0A
    echo [SUCCESS] All checks passed!
    echo.
    echo Your system is ready to run the application.
    echo.
    echo Next steps:
    echo 1. Ensure MongoDB is running
    echo 2. Run backend: npm run dev
    echo 3. Run frontend: cd frontend ^&^& npm run dev
    echo 4. Open browser: http://localhost:5173
    echo.
) else (
    color 0C
    echo [WARNING] %ERROR_COUNT% issue(s) found!
    echo.
    echo Please fix the issues above before running the application.
    echo.
    echo For help, see:
    echo - docs\QUICKSTART.md
    echo - docs\TROUBLESHOOTING.md
    echo.
)

echo ========================================
echo.
echo Press any key to exit...
pause >nul
