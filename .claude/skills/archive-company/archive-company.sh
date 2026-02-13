#!/bin/bash
# Archive a company folder from jobs/ to jobs-archive/
# Usage: archive-company.sh <company-name>

set -e

COMPANY="$1"
REPO_ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
SRC="$REPO_ROOT/jobs/$COMPANY"
DEST="$REPO_ROOT/jobs-archive/$COMPANY"

if [ -z "$COMPANY" ]; then
  echo "Error: Company name is required"
  echo "Usage: archive-company.sh <company-name>"
  exit 1
fi

if [ ! -d "$SRC" ]; then
  echo "Error: Company folder not found: jobs/$COMPANY"
  echo "Available companies:"
  ls "$REPO_ROOT/jobs/"
  exit 1
fi

if [ -d "$DEST" ]; then
  echo "Merging into existing archive: jobs-archive/$COMPANY"
  cp -rf "$SRC"/* "$DEST"/
  rm -rf "$SRC"
else
  mv "$SRC" "$DEST"
fi

# Stage the changes if nothing is currently staged
if [ -z "$(git -C "$REPO_ROOT" diff --cached --name-only)" ]; then
  # Stage deletion of source (only works if it was previously tracked)
  git -C "$REPO_ROOT" add "jobs/$COMPANY" 2>/dev/null || true
  git -C "$REPO_ROOT" add "jobs-archive/$COMPANY"
  echo "Staged changes for git"
fi

echo "Archived: jobs/$COMPANY -> jobs-archive/$COMPANY"
