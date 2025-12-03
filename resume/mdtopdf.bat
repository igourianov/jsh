@echo off
cd /d "%~dp0mdtopdf"

echo Checking dependencies...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

echo Converting resume with SEO keywords...
node convert-resume.js

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Opening PDF...
    start "" "..\Ilia Gourianov - engineering manager.pdf"
    echo.
    echo Done!
) else (
    echo.
    echo Conversion failed!
)

