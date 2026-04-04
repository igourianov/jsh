#!/bin/bash
# Sanitize strings for filesystem use (replace \ and / with |, strip leading/trailing dots).
# Usage: bash sanitize.sh "string1" "string2" ...
# Output: one sanitized string per line.

if [ $# -eq 0 ]; then
  echo 'Usage: bash sanitize.sh "string1" "string2" ...' >&2
  exit 1
fi

sanitize() {
  local s="$1"
  # Replace \ and / with |
  s="${s//\\/|}"
  s="${s//\//|}"
  # Strip leading dots
  s="${s#"${s%%[^.]*}"}"
  # Strip trailing dots
  s="${s%"${s##*[^.]}"}"
  echo "$s"
}

for arg in "$@"; do
  sanitize "$arg"
done
