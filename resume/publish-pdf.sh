#!/bin/bash

# Parse command line arguments - both are required
SOURCE_MD="$1"
OUTPUT_PDF="$2"

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Validate required parameters
if [ -z "$SOURCE_MD" ]; then
    echo "Usage: publish-pdf.sh <source-file> <output-file>"
    echo "  source-file: Path to source markdown file"
    echo "  output-file: Path for output PDF file (should be {Name} - {Title}.pdf)"
    exit 1
fi

if [ -z "$OUTPUT_PDF" ]; then
    echo "Usage: publish-pdf.sh <source-file> <output-file>"
    echo "  source-file: Path to source markdown file"
    echo "  output-file: Path for output PDF file (should be {Name} - {Title}.pdf)"
    exit 1
fi

# Resolve source to absolute path
if [ ! -f "$SOURCE_MD" ]; then
    echo "✗ Source file not found: $SOURCE_MD"
    exit 1
fi
SOURCE_MD="$(cd "$(dirname "$SOURCE_MD")" && pwd)/$(basename "$SOURCE_MD")"

# Resolve output to absolute path
# If output path is relative, make it relative to the source directory
if [[ "$OUTPUT_PDF" != /* ]]; then
    # Relative path - resolve relative to source directory
    OUTPUT_DIR="$(dirname "$SOURCE_MD")"
    OUTPUT_PDF="$OUTPUT_DIR/$OUTPUT_PDF"
fi

# Initialize step counters
STEP=1
TOTAL=2

echo "========================================"
echo "Resume PDF Generation"
echo "========================================"
echo "Source: $SOURCE_MD"
echo "Output: $OUTPUT_PDF"
echo

# Step 1: Generate PDF with SEO keywords
echo "[$STEP/$TOTAL] Generating PDF with SEO keywords..."
cd "$SCRIPT_DIR/mdtopdf" || exit 1

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "✗ Failed to install dependencies"
        exit 1
    fi
fi

# Call Node script with input and output
node convert-to-pdf.js "$SOURCE_MD" "$OUTPUT_PDF"

if [ $? -ne 0 ]; then
    echo "✗ Failed to generate PDF"
    cd ..
    exit 1
fi
cd ..
echo "✓ PDF generated"
echo

# Step 2: Open PDF
STEP=$((STEP + 1))
echo "[$STEP/$TOTAL] Opening PDF..."

# Open PDF based on OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open "$OUTPUT_PDF"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open "$OUTPUT_PDF" 2>/dev/null || echo "Note: Could not auto-open PDF. File located at: $OUTPUT_PDF"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    # Git Bash on Windows
    start "" "$OUTPUT_PDF"
else
    echo "Note: Could not auto-open PDF. File located at: $OUTPUT_PDF"
fi
echo

echo "========================================"
echo "PDF Generated Successfully!"
echo "========================================"
echo
