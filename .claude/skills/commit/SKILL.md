---
name: commit
description: Create git commits and push to remote. Use when user explicitly requests to commit changes, create a commit, or push code.
---

# Commit Skill

Gather changes from the repository, create a descriptive commit, and push to remote.

## Instructions

**CRITICAL: Only use this skill when explicitly requested by the user.**

### 1. Gather Changes

Run these commands in parallel to understand what will be committed:
- `git status` - See staged and unstaged changes
- `git diff` - See unstaged changes
- `git diff --staged` - See staged changes

**Skip `git log` checks** - Commit style is already established, no need to check recent commits.

### 2. Determine What to Commit

- If there are staged changes: commit only staged changes
- If nothing is staged: commit all modified and new files

### 3. Analyze and Draft Commit Message

Based on the changes found:
- Summarize the nature of changes (new feature, enhancement, bug fix, refactoring, docs, etc.)
- Ensure accuracy - "add" means wholly new feature, "update" means enhancement, "fix" means bug fix
- Draft a concise (1-2 sentences) commit message focusing on the "why" rather than "what"
- Do NOT commit files that likely contain secrets (.env, credentials.json, etc.)

### 4. Create Commit

**Commit message format:**
```
[Concise summary line]

[Detailed description with bullet points if needed]

Co-Authored-By: Claude <noreply@anthropic.com>
```

Use HEREDOC format for proper formatting:
```bash
git commit -m "$(cat <<'EOF'
[Concise summary line]

[Detailed description with bullet points if needed]

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
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
