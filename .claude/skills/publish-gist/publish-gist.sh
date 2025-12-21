#!/bin/bash

# Parse command line arguments
SOURCE_MD="$1"

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Find the resume directory (3 levels up from .claude/skills/publish-gist, then into resume)
RESUME_DIR="$(cd "$SCRIPT_DIR/../../../resume" && pwd)"

# Gist directory is now in the same folder as this script
GIST_DIR="$SCRIPT_DIR/gist"

# If no source specified, use default resume.md
if [ -z "$SOURCE_MD" ]; then
    SOURCE_MD="$RESUME_DIR/resume.md"
else
    # Resolve to absolute path
    if [ ! -f "$SOURCE_MD" ]; then
        echo "✗ Source file not found: $SOURCE_MD"
        exit 1
    fi
    SOURCE_MD="$(cd "$(dirname "$SOURCE_MD")" && pwd)/$(basename "$SOURCE_MD")"
fi

# Extract name and title from markdown file to generate target filename
# Line 1: # Name
# Line 3: ### Title
NAME=""
TITLE=""
line_count=0

while IFS= read -r line; do
    # Remove leading/trailing whitespace
    line=$(echo "$line" | xargs)

    # Skip empty lines
    [ -z "$line" ] && continue

    # Check if this is a heading line
    if [[ "$line" =~ ^#+ ]]; then
        ((line_count++))

        # First heading is the name
        if [ $line_count -eq 1 ]; then
            NAME=$(echo "$line" | sed 's/^#\+[[:space:]]*//')
        fi

        # Second heading is the title
        if [ $line_count -eq 2 ]; then
            TITLE=$(echo "$line" | sed 's/^#\+[[:space:]]*//')
            break
        fi
    fi
done < "$SOURCE_MD"

# Fallback to default if extraction failed
if [ -z "$NAME" ]; then
    NAME="Ilia Gourianov"
fi
if [ -z "$TITLE" ]; then
    TITLE="engineering manager"
fi

TARGET_FILENAME="${NAME} - ${TITLE}.md"

# Initialize step counters
STEP=1
TOTAL=4

echo "========================================"
echo "Resume GitHub Gist Publishing"
echo "========================================"
echo "Source: $SOURCE_MD"
echo "Target: $TARGET_FILENAME"
echo

# Step 1: Copy markdown to gist folder
echo "[$STEP/$TOTAL] Copying resume to gist folder..."
cp "$SOURCE_MD" "$GIST_DIR/$TARGET_FILENAME"

if [ $? -ne 0 ]; then
    echo "✗ Failed to copy resume"
    exit 1
fi
echo "✓ Resume copied"
echo

# Step 2: Check for changes
STEP=$((STEP + 1))
echo "[$STEP/$TOTAL] Analyzing changes..."
cd "$GIST_DIR" || exit 1

git diff --exit-code "$TARGET_FILENAME" >/dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "No changes detected in resume"
    echo
    echo "========================================"
    echo "Resume is already up to date!"
    echo "========================================"
    exit 0
fi

echo "✓ Changes detected"
echo

# Step 3: Stage and commit files
STEP=$((STEP + 1))
echo "[$STEP/$TOTAL] Committing changes..."
git add "$TARGET_FILENAME"

git commit -m "Updated resume with latest changes"
if [ $? -ne 0 ]; then
    echo "✗ Failed to commit changes"
    cd ..
    exit 1
fi
echo "✓ Changes committed"
echo

# Step 4: Push to GitHub Gist
STEP=$((STEP + 1))
echo "[$STEP/$TOTAL] Pushing to GitHub Gist..."
git push origin main
if [ $? -ne 0 ]; then
    echo "✗ Failed to push to GitHub Gist"
    cd ..
    exit 1
fi
echo "✓ Pushed to GitHub Gist"
cd ..
echo

echo "========================================"
echo "Resume Published to Gist Successfully!"
echo "========================================"
echo
echo "Public resume: https://gist.github.com/17c7ea00a40cdc436bc5fb7913382d10"
echo
