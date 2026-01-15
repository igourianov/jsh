---
name: screen-job
description: Complete job screening workflow - parse, match. Use when user says "screen job" or provides job posting URL for analysis.
---

Screen job: $ARGUMENTS

## Workflow

### Step 1: Parse Job

Invoke `parse-job` skill with the URL or file path.

Capture from output: company name, job title, job file path.

### Step 2: Match Resume

Invoke `match-resume` skill with job file path.

Capture match percentage from output.

## Response

```
Screening complete:
- Job: jobs/{Company}/{Title}.md
Match: {X}% | {One-line take}
```
