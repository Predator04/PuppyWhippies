@echo off
setlocal

cd /d "%~dp0"

echo Starting Puppy Whippies local site...
echo.
echo If the browser does not open automatically, visit:
echo http://localhost:5173
echo.

npm run dev -- --host 127.0.0.1 --port 5173 --open

pause
