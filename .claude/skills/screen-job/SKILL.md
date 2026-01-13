---
name: screen-job
description: Complete job screening workflow - parse, research, match. Use when user says "screen job" or provides job posting URL for analysis.
---

Execute complete job screening for: $ARGUMENTS

**DO NOT SEND ANY MESSAGE TO THE USER UNTIL ALL 3 STEPS ARE COMPLETE.**

**CRITICAL: YOU ARE THE ORCHESTRATOR.** You must complete ALL THREE steps (parse, research, match) in sequence. Do NOT stop or return to user after step 1 or step 2. Only provide final response after completing step 3.

This orchestrator coordinates three modular skills in sequence, all running within a single forked context.

## Workflow

**FIRST: Use TodoWrite to create these 3 tasks:**
1. Parse job posting (pending)
2. Research company (pending)
3. Match resume (pending)

Mark each task as in_progress when starting, and completed only when finished. This ensures you track all steps.

### Step 1: Parse Job Posting

Invoke the `parse-job` skill with the URL or file path from $ARGUMENTS.

The skill will:
- Fetch content (URL via WebFetch, or file via Read)
- Extract structured metadata
- Save to `jobs/{Company}/{Title}.md`
- Return company name

**After parse-job completes,** capture the following from its output:
- Company name
- Job title
- Job file path

**THEN immediately proceed to Step 2.** Do not stop here.

### Step 2: Research Company (Conditional)

**Check skip conditions:**
1. File `jobs/{Company}/company.md` already exists → skip research
2. Company is "_" (unknown/agency posting) → skip research

If research needed, invoke the `research-company` skill with company name.

The skill will:
- Web search for company information
- Extract culture, tech stack, team health
- Save to `jobs/{Company}/company.md`

**After research-company completes (or is skipped), THEN immediately proceed to Step 3.** Do not stop here.

### Step 3: Match Resume

Invoke the `match-resume` skill with company name.

The skill will:
- Read job file, company file (if exists), and resume
- Calculate match percentage
- Identify gaps
- Append evaluation to job file

**After match-resume completes,** capture the match percentage from its output.

**THEN provide final response to user** as specified below. This is the ONLY point where you respond.

## ⚠️ STOP: BEFORE RESPONDING TO USER

Have you completed ALL of these?
- ✓ Step 1: Parse job (task marked completed)
- ✓ Step 2: Research company OR explicitly skipped (task marked completed)
- ✓ Step 3: Match resume (task marked completed)

If ANY step is incomplete, DO NOT respond to user. Continue the workflow immediately.

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

## Validation Checklist

Before responding to user, confirm you have:
- ✓ Completed Step 1 (parse-job)
- ✓ Completed Step 2 (research-company, or explicitly skipped with reason)
- ✓ Completed Step 3 (match-resume)
- ✓ Captured match percentage from match-resume output

If ANY step is incomplete, DO NOT respond to user yet. Continue the workflow.

## Notes

- Skills can be invoked independently: `/parse-job`, `/research-company`, `/match-resume` (run in main context)
