@echo off
echo Starting eQuran Journey local server...
echo Open this address in your browser:
echo.
echo     http://localhost:8080
echo.
echo (Press Ctrl+C to stop)
start "" http://localhost:8080
python -m http.server 8080
