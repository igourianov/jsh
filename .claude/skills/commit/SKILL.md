---
name: commit
description: Create git commits and push to remote. Use when user explicitly requests to commit changes, create a commit, or push code.
context: fork
---

# Commit Skill

Gather changes from the repository, create a descriptive commit, and push to remote.

## Instructions

**CRITICAL: Only use this skill when explicitly requested by the user.**

### 1. Gather Changes

Run these commands in parallel to understand what will be committed:
- !`git status` - See staged and unstaged changes. See if current branch is tracking a remote branch
- !`git diff` - See unstaged changes
- !`git diff --staged` - See staged changes

**Skip `git log` checks** - Commit style is already established, no need to check recent commits.

### 2. Determine What to Commit

- **If there are staged changes**: commit ONLY what is staged (do NOT add additional files)
- **If nothing is staged**: stage and commit all modified and new files (excluding likely secrets)

### 3. Analyze and Draft Commit Message

Based on the changes found:
- Identify each individual change (e.g., new file added, existing file modified, section updated)
- Write a one-sentence summary for each change
- Do NOT commit files that likely contain secrets (.env, credentials.json, etc.)

### 4. Create Commit

**Commit message format:**

If there is only one change:
```
Summary of the change

Co-Authored-By: Claude <noreply@anthropic.com>
```

If there are multiple changes, use bullet points:
```
* First change summary
* Second change summary
* Third change summary

Co-Authored-By: Claude <noreply@anthropic.com>
```

Write the commit message to a temp file, then use `-F`:
```bash
git commit -F commit.tmp && rm commit.tmp
```

### 5. Push to Remote

After successful commit:
- Check if current branch tracks a remote branch
- If yes: `git push`
- If no: Ask user if they want to set up remote tracking

### 6. Verify

Run `git status` after push to verify everything succeeded.

## Notes

- This is the **main repository** at `D:\Projects\JobSearch`
- This is a local git repository (may or may not be connected to remote)
- Do NOT create commits unless user explicitly requests them
- If pre-commit hooks fail, fix the issue and create a NEW commit (do not amend)
