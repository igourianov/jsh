@echo off
setlocal enabledelayedexpansion

REM Initialize step counters
set STEP=1
set TOTAL=6

echo ========================================
echo Resume Publishing Process
echo ========================================
echo.

REM Step 1: Copy markdown to gist folder
echo [!STEP!/%TOTAL%] Copying resume to gist folder...
copy /Y "resume.md" "gist\Ilia Gourianov - engineering manager.md" >nul

if %ERRORLEVEL% NEQ 0 (
    echo ✗ Failed to copy resume
    exit /b 1
)
echo ✓ Resume copied
echo.

REM Step 2: Generate PDF with SEO keywords
set /a STEP+=1
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

node convert-to-pdf.js "..\gist\Ilia Gourianov - engineering manager.md"
if %ERRORLEVEL% NEQ 0 (
    echo ✗ Failed to generate PDF
    exit /b 1
)
cd ..
echo ✓ PDF generated
echo.

REM Step 3: Check for changes and generate commit message
set /a STEP+=1
echo [!STEP!/%TOTAL%] Analyzing changes...
cd gist

git diff --exit-code "Ilia Gourianov - engineering manager.md" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo No changes detected in resume
    echo.
    echo ========================================
    echo Resume is already up to date!
    echo ========================================
    exit /b 0
)

echo ✓ Changes detected
echo.

REM Step 4: Stage and commit files
set /a STEP+=1
echo [!STEP!/%TOTAL%] Committing changes...
git add "Ilia Gourianov - engineering manager.md"

REM Use heredoc for proper formatting
git commit -m "Updated resume with latest changes"
if %ERRORLEVEL% NEQ 0 (
    echo ✗ Failed to commit changes
    cd ..
    exit /b 1
)
echo ✓ Changes committed
echo.

REM Step 5: Push to GitHub Gist
set /a STEP+=1
echo [!STEP!/%TOTAL%] Pushing to GitHub Gist...
git push origin main
if %ERRORLEVEL% NEQ 0 (
    echo ✗ Failed to push to GitHub Gist
    cd ..
    exit /b 1
)
echo ✓ Pushed to GitHub Gist
cd ..
echo.

REM Step 6: Open PDF
set /a STEP+=1
echo [!STEP!/%TOTAL%] Opening PDF...
start "" "gist\Ilia Gourianov - engineering manager.pdf"
echo.

echo ========================================
echo Resume Published Successfully!
echo ========================================
echo.
echo Public resume: https://gist.github.com/17c7ea00a40cdc436bc5fb7913382d10
echo.
