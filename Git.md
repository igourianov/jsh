# Git Workflows

This document defines the git workflows for the JobSearch repository.

## Repository Structure

This repository contains two separate git repositories:

1. **Main Repository** (`D:\Projects\JobSearch`)
   - Local git repository (not connected to remote)
   - Tracks all job search materials, resumes, cover letters, etc.

2. **Gist Repository** (`D:\Projects\JobSearch\resume\gist`)
   - Separate git repository nested within the main repo
   - Connected to GitHub Gist: `git@gist.github.com:17c7ea00a40cdc436bc5fb7913382d10.git`
   - Public URL: https://gist.github.com/17c7ea00a40cdc436bc5fb7913382d10
   - Excluded from main repo via `.gitignore` (`resume/gist/`)
   - Contains publicly published resume with full contact information

## Main Repository Workflow

### Making Commits

**CRITICAL: Only commit when explicitly requested by the user.**

* Make commits only when asked to.
* DO NOT proactively commit changes after making edits or completing tasks.
* User must explicitly say "commit this" or "create a commit" for commits to be made.
* Commit only staged changes if there is anything staged.
* Commit everything modified if nothing is staged.

**Pre-commit checks:**
- **Skip `git log` checks** - Don't run `git log -3 --oneline` to check recent commits; the commit style is already established
- **Use minimal commands**: Only run `git status` and `git diff` to understand what's being committed

**Commit message format:**
```
[Concise summary line]

[Detailed description with bullet points if needed]

Co-Authored-By: Claude <noreply@anthropic.com>
```
