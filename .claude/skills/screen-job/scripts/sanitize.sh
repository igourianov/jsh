#!/bin/bash
# Sanitize strings for Windows filesystem use.
# Replaces characters illegal in Windows filenames (\ / : * ? " < > |) with -,
# collapses repeated dashes/spaces and strips leading/trailing dots, spaces and dashes.
# Usage: bash sanitize.sh "string1" "string2" ...
# Output: one sanitized string per line.

if [ $# -eq 0 ]; then
  echo 'Usage: bash sanitize.sh "string1" "string2" ...' >&2
  exit 1
fi

sanitize() {
  local s="$1"
  # Replace Windows-illegal filename characters with -
  s="$(printf '%s' "$s" | sed -E 's/[\\/:*?"<>|]/-/g')"
  # Collapse repeated dashes and multiple spaces
  s="$(printf '%s' "$s" | sed -E 's/-+/-/g; s/  +/ /g')"
  # Strip leading dots
  s="${s#"${s%%[^.]*}"}"
  # Strip trailing dots
  s="${s%"${s##*[^.]}"}"
  # Strip leading/trailing spaces and dashes
  s="$(printf '%s' "$s" | sed -E 's/^[ -]+//; s/[ -]+$//')"
  echo "$s"
}

for arg in "$@"; do
  sanitize "$arg"
done
