#!/bin/bash
set -e

GIST_ID="17c7ea00a40cdc436bc5fb7913382d10"
# Renaming the file changes the gist's raw URL and the anchor on the public link, so the published name is fixed
GIST_FILE="Ilia Gourianov - Engineering Manager.md"

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
SOURCE="$PROJECT_ROOT/resume/resume.md"

CLONE="$(mktemp -d)"
trap 'rm -rf "$CLONE"' EXIT

git clone --quiet --depth 1 "git@gist.github.com:$GIST_ID.git" "$CLONE"
cp "$SOURCE" "$CLONE/$GIST_FILE"

cd "$CLONE"

if git diff --quiet; then
	echo "Gist is already up to date"
	exit 0
fi

git commit --quiet -am "Updated resume with latest changes"
git push --quiet origin main

echo "Published: https://gist.github.com/$GIST_ID"
