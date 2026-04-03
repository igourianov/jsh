#!/bin/bash
# Creates a Windows directory junction from jobs-active/{company} to jobs/{company}
# Usage: create-junction.sh <sanitized-company-name>

set -e

company="$1"
if [ -z "$company" ]; then
  echo "Usage: create-junction.sh <sanitized-company-name>" >&2
  exit 1
fi

if [ -d "jobs-active/$company" ]; then
  echo "Junction already exists"
  exit 0
fi

cat > tmp_mklink.bat << EOF
mklink /J "jobs-active\\$company" "jobs\\$company"
EOF
if cmd //c "$(pwd)/tmp_mklink.bat" > /dev/null 2>&1; then
  rm tmp_mklink.bat
  echo "Junction created"
else
  rm -f tmp_mklink.bat
  echo "Failed to create junction" >&2
  exit 1
fi
