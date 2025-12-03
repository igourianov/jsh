@echo off
setlocal enabledelayedexpansion

echo ========================================
echo Resume Publishing Process
echo ========================================
echo.

REM Step 1: Copy markdown to publish folder
echo [1/6] Copying resume to publish folder...
copy /Y "Ilia Gourianov - engineering manager.md" "publish\Ilia Gourianov - engineering manager.md" >nul

if %ERRORLEVEL% NEQ 0 (
    echo ✗ Failed to copy resume
    exit /b 1
)
echo ✓ Resume copied
echo.

REM Step 2: Generate PDF with SEO keywords
echo [2/6] Generating PDF with SEO keywords...
cd /d "%~dp0mdtopdf"

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ✗ Failed to install dependencies
        exit /b 1
    )
)

node convert-to-pdf.js "..\publish\Ilia Gourianov - engineering manager.md"
if %ERRORLEVEL% NEQ 0 (
    echo ✗ Failed to generate PDF
    exit /b 1
)
cd ..
echo.

REM Step 3: Check for changes and generate commit message
echo [3/6] Analyzing changes...
cd publish

git diff --exit-code "Ilia Gourianov - engineering manager.md" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo No changes detected in resume
    echo.
    echo ========================================
    echo Resume is already up to date!
    echo ========================================
    exit /b 0
)

REM Generate commit message from git diff
echo Generating commit message from changes...
git diff "Ilia Gourianov - engineering manager.md" > diff.tmp

REM Create a simple commit message (can be enhanced later)
set COMMIT_MSG=Update resume
echo ✓ Changes detected
echo.

REM Step 4: Stage and commit files
echo [4/6] Committing changes...
git add "Ilia Gourianov - engineering manager.md" "Ilia Gourianov - engineering manager.pdf"

REM Use heredoc for proper formatting
git commit -m "!COMMIT_MSG!" -m "Updated resume with latest changes"
if %ERRORLEVEL% NEQ 0 (
    echo ✗ Failed to commit changes
    del diff.tmp 2>nul
    cd ..
    exit /b 1
)
echo ✓ Changes committed
del diff.tmp 2>nul
echo.

REM Step 5: Push to GitHub Gist
echo [5/6] Pushing to GitHub Gist...
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
echo [6/6] Opening PDF...
start "" "publish\Ilia Gourianov - engineering manager.pdf"
echo.

echo ========================================
echo Resume Published Successfully!
echo ========================================
echo.
echo Public resume: https://gist.github.com/17c7ea00a40cdc436bc5fb7913382d10
echo.
