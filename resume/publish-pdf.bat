@echo off
setlocal enabledelayedexpansion

REM Initialize step counters
set STEP=1
set TOTAL=2

echo ========================================
echo Resume PDF Generation
echo ========================================
echo.

REM Step 1: Generate PDF with SEO keywords
echo [!STEP!/%TOTAL%] Generating PDF with SEO keywords...
cd /d "%~dp0mdtopdf"

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ✗ Failed to install dependencies
        exit /b 1
    )
)

node convert-to-pdf.js "..\resume.md"
if %ERRORLEVEL% NEQ 0 (
    echo ✗ Failed to generate PDF
    exit /b 1
)
cd ..
echo ✓ PDF generated
echo.

REM Step 2: Open PDF
set /a STEP+=1
echo [!STEP!/%TOTAL%] Opening PDF...
start "" "Ilia Gourianov - engineering manager.pdf"
echo.

echo ========================================
echo PDF Generated Successfully!
echo ========================================
echo.
