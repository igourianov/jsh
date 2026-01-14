---
name: screen-job
description: Complete job screening workflow - parse, research, match. Use when user says "screen job" or provides job posting URL for analysis.
---

Screen job: $ARGUMENTS

## Workflow

### Step 1: Parse Job

Invoke `parse-job` skill with the URL or file path.

Capture from output: company name, job title, job file path.

### Step 2: Research Company

Invoke `research-company` skill with company name.

### Step 3: Match Resume

Invoke `match-resume` skill with job file path.

Capture match percentage from output.

## Response

```
Screening complete:
- Job: jobs/{Company}/{Title}.md
- Company: jobs/{Company}/company.md
Match: {X}% | {One-line take}
```

Note if company research was new or skipped (and why).
