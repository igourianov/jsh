#!/bin/bash

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Calculate project root (3 levels up from .claude/skills/publish-pdf)
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

# Set output directory to pdf folder under project root
OUTPUT_DIR="$PROJECT_ROOT/pdf"

# Get source file path, name, and title from arguments
SOURCE_FILE="$1"
NAME="$2"
TITLE="$3"

# Verify source file exists
if [ ! -f "$SOURCE_FILE" ]; then
    echo "✗ Source file not found: $SOURCE_FILE"
    exit 1
fi

# Convert source to absolute path
SOURCE_FILE="$(cd "$(dirname "$SOURCE_FILE")" && pwd)/$(basename "$SOURCE_FILE")"

# Purge existing PDFs from output directory
rm -f "$OUTPUT_DIR"/*.pdf

# Copy source markdown into pdf/ folder for in-place conversion
TEMP_MD="$OUTPUT_DIR/$(basename "$SOURCE_FILE")"
cp "$SOURCE_FILE" "$TEMP_MD"

# Generate target filename
TARGET_FILE="$OUTPUT_DIR/$NAME - $TITLE.pdf"

# Check for node dependencies
cd "$SCRIPT_DIR/mdtopdf" || exit 1

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "✗ Failed to install dependencies"
        rm -f "$TEMP_MD"
        exit 1
    fi
fi

# Run the conversion node script with copied md, target file path, name, and title
node convert-to-pdf.js "$TEMP_MD" "$TARGET_FILE" "$NAME" "$TITLE"
RESULT=$?

# Clean up temporary markdown file
rm -f "$TEMP_MD"

if [ $RESULT -ne 0 ]; then
    exit 1
fi

if [ -f "$TARGET_FILE" ]; then
    # Open PDF based on OS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open "$TARGET_FILE"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open "$TARGET_FILE" 2>/dev/null
    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
        start "" "$TARGET_FILE" &
    fi
fi
