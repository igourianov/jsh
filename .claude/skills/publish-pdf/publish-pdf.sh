#!/bin/bash

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

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

# Check for node dependencies
cd "$SCRIPT_DIR/mdtopdf" || exit 1

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "✗ Failed to install dependencies"
        exit 1
    fi
fi

# Run the conversion node script with source, name, and title
node convert-to-pdf.js "$SOURCE_FILE" "$NAME" "$TITLE"

if [ $? -ne 0 ]; then
    exit 1
fi

# Generate target filename and open the resulting PDF file
SOURCE_DIR="$(dirname "$SOURCE_FILE")"
TARGET_FILE="$SOURCE_DIR/$NAME - $TITLE.pdf"

if [ -f "$TARGET_FILE" ]; then
    # Open PDF based on OS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open "$TARGET_FILE"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open "$TARGET_FILE" 2>/dev/null
    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
        start "" "$TARGET_FILE"
    fi
fi
