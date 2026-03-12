@echo off
echo ========================================
echo Backend Configuration Test
echo ========================================
echo.

echo Testing backend health endpoint...
echo.

curl -s http://localhost:5000/health

echo.
echo.
echo ========================================
echo.
echo If you see JSON with "status": "ok", the backend is running!
echo.
echo Check the "env" section:
echo - All values should be "true"
echo - If any is "false", that API is not configured
echo.
echo ========================================
pause
