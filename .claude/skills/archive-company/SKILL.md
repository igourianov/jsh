---
name: archive-company
description: Archive a company folder from jobs/ to jobs-archive/. Use when user says "archive company", "archive job", or wants to move a company to the archive.
user_invocable: true
---

# Archive Company Skill

Move a company folder from `jobs/` to `jobs-archive/`.

## Instructions

### Arguments

The skill accepts a company name as an argument. If not provided, list available companies from `jobs/` and ask the user which one to archive.

### Process

1. Run the bash script with the company name:
```bash
bash .claude/skills/archive-company/archive-company.sh "<company-name>"
```

### Response to User

Report:
- Which company was archived
- Confirm the move completed
