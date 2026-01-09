---
name: screen-job
description: Complete job screening workflow - parse, research, match. Use when user says "screen job" or provides job posting URL for analysis.
context: fork
---

Execute complete job screening for: $ARGUMENTS

This orchestrator coordinates three modular skills in sequence, all running within a single forked context.

## Workflow

### Step 1: Parse Job Posting

Invoke the `parse-job` skill with the URL or file path from $ARGUMENTS.

The skill will:
- Fetch content (URL via WebFetch, or file via Read)
- Extract structured metadata
- Save to `jobs/{Company}/{Title}.md`
- Return company name

**Wait for completion** and capture:
- Company name
- Job title
- Job file path

### Step 2: Research Company (Conditional)

**Check skip conditions:**
1. File `jobs/{Company}/company.md` already exists → skip research
2. Company is "_" (unknown/agency posting) → skip research

If research needed, invoke the `research-company` skill with company name.

The skill will:
- Web search for company information
- Extract culture, tech stack, team health
- Save to `jobs/{Company}/company.md`

**Wait for completion**.

### Step 3: Match Resume

Invoke the `match-resume` skill with company name.

The skill will:
- Read job file, company file (if exists), and resume
- Calculate match percentage
- Identify gaps
- Append evaluation to job file

**Wait for completion** and capture match percentage.

## Response to User

Provide concise summary:

**If new company researched:**
```
Job screening complete.
- Job: jobs/{Company}/{Job Title}.md
- Company: jobs/{Company}/company.md (new)

Match: {X}% | {One-line company take from research}
```

**If company research skipped (exists):**
```
Job screening complete.
- Job: jobs/{Company}/{Job Title}.md
- Company: jobs/{Company}/company.md (existing, skipped research)

Match: {X}% | See existing company research.
```

**If company unknown (agency posting):**
```
Job screening complete.
- Job: jobs/_/{Job Title}.md
- Company: Unknown (posted by {Agency}, skipped research)

Match: {X}% | Company research skipped - actual employer not disclosed.
```

## Error Handling

- If parse-job fails → report error, do not proceed
- If research-company fails → note failure but proceed to matching
- If match-resume fails → report error with job file location

## Notes

- screen-job runs in forked context via `context: fork` for token efficiency
- Sub-skills (parse-job, research-company, match-resume) run within screen-job's forked context
- Skills can be invoked independently: `/parse-job`, `/research-company`, `/match-resume` (run in main context)
