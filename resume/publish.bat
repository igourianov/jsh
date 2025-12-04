@echo off
setlocal enabledelayedexpansion

echo ========================================
echo Resume Publishing Process
echo ========================================
echo.

REM Step 1: Commit local changes to main repo
echo [1/7] Checking for local changes in main repo...
git diff --exit-code "Ilia Gourianov - engineering manager.md" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo No local changes to commit
) else (
    echo Committing local changes...
    git add "Ilia Gourianov - engineering manager.md"
    git commit -m "Update resume" -m "" -m "Generated with [Claude Code](https://claude.com/claude-code)" -m "" -m "Co-Authored-By: Claude <noreply@anthropic.com>"
    if %ERRORLEVEL% NEQ 0 (
        echo ✗ Failed to commit local changes
        exit /b 1
    )
    echo ✓ Local changes committed
)
echo.

REM Step 2: Copy markdown to publish folder
echo [2/7] Copying resume to publish folder...
copy /Y "Ilia Gourianov - engineering manager.md" "publish\Ilia Gourianov - engineering manager.md" >nul

if %ERRORLEVEL% NEQ 0 (
    echo ✗ Failed to copy resume
    exit /b 1
)
echo ✓ Resume copied
echo.

REM Step 3: Generate PDF with SEO keywords
echo [3/7] Generating PDF with SEO keywords...
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

REM Step 4: Check for changes and generate commit message
echo [4/7] Analyzing changes...
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

echo ✓ Changes detected
echo.

REM Step 5: Stage and commit files
echo [5/7] Committing changes...
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

REM Step 6: Push to GitHub Gist
echo [6/7] Pushing to GitHub Gist...
git push origin main
if %ERRORLEVEL% NEQ 0 (
    echo ✗ Failed to push to GitHub Gist
    cd ..
    exit /b 1
)
echo ✓ Pushed to GitHub Gist
cd ..
echo.

REM Step 7: Open PDF
echo [7/7] Opening PDF...
start "" "publish\Ilia Gourianov - engineering manager.pdf"
echo.

echo ========================================
echo Resume Published Successfully!
echo ========================================
echo.
echo Public resume: https://gist.github.com/17c7ea00a40cdc436bc5fb7913382d10
echo.
