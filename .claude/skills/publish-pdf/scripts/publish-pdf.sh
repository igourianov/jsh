#!/bin/bash

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Calculate project root (4 levels up from .claude/skills/publish-pdf/scripts)
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"

# pdf/ is always the working directory for compilation (assets live there)
WORK_DIR="$PROJECT_ROOT/pdf"

# Get source file path, name, and title from arguments
SOURCE_FILE="$1"
NAME="$2"
TITLE="$3"

# Resolve relative paths against project root
if [[ "$SOURCE_FILE" != /* ]]; then
    SOURCE_FILE="$PROJECT_ROOT/$SOURCE_FILE"
fi

# Verify source file exists
if [ ! -f "$SOURCE_FILE" ]; then
    echo "✗ Source file not found: $SOURCE_FILE"
    exit 1
fi

# Determine final output directory: company folder for tailored resumes, pdf/ otherwise
SOURCE_DIR="$(cd "$(dirname "$SOURCE_FILE")" && pwd)"
if [[ "$SOURCE_DIR" == "$PROJECT_ROOT/jobs/"* ]]; then
    OUTPUT_DIR="$SOURCE_DIR"
else
    OUTPUT_DIR="$WORK_DIR"
fi

# Final destination
TARGET_FILE="$OUTPUT_DIR/$NAME - $TITLE.pdf"

# Temp filenames inside pdf/ for compilation (assets resolve relative to pdf/)
# --dry-run: just reserve a name, don't create an empty file (cp / node will write the real content)
TEMP_MD="$(mktemp --dry-run --suffix=.md --tmpdir="$WORK_DIR")"
TEMP_PDF="$(mktemp --dry-run --suffix=.pdf --tmpdir="$WORK_DIR")"

# Copy source markdown into pdf/ folder for in-place conversion
cp "$SOURCE_FILE" "$TEMP_MD"

# Check for node dependencies
CLAUDE_DIR="$(cd "$SCRIPT_DIR/../../.." && pwd)"

if [ ! -d "$CLAUDE_DIR/node_modules" ]; then
    echo "Installing dependencies..."
    (cd "$CLAUDE_DIR" && npm install)
    if [ $? -ne 0 ]; then
        echo "✗ Failed to install dependencies"
        rm -f "$TEMP_MD"
        exit 1
    fi
fi

# Run the conversion node script: compile into pdf/ with a temp name
node "$SCRIPT_DIR/convert-to-pdf.js" "$TEMP_MD" "$TEMP_PDF" "$NAME" "$TITLE"
RESULT=$?

# Clean up temporary markdown file
rm -f "$TEMP_MD"

if [ $RESULT -ne 0 ]; then
    rm -f "$TEMP_PDF"
    exit 1
fi

# Move generated PDF to final destination (overwrite if exists)
if [ -f "$TEMP_PDF" ]; then
    mkdir -p "$OUTPUT_DIR"
    mv -f "$TEMP_PDF" "$TARGET_FILE"
fi

if [ ! -f "$TARGET_FILE" ]; then
    echo "✗ Expected output not found: $TARGET_FILE" >&2
    exit 1
fi

# Open PDF based on OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    open "$TARGET_FILE"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open "$TARGET_FILE" 2>/dev/null
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    start "" "$TARGET_FILE" &
fi

# Final line of stdout = path of generated PDF, relative to project root (caller consumes this)
echo "${TARGET_FILE#$PROJECT_ROOT/}"
