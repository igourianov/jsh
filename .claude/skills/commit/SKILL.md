---
name: commit
description: Commit repository changes, split per job folder and per functional change. Use when user asks to commit in this repo.
context: fork
---

## 1. Inspect Git State

- Working tree: !`git status --porcelain`
- Staged: !`git diff --staged --stat`

- Anything staged: go to **2. Staged Path**
- Nothing staged, nothing changed: report "Nothing to commit" and stop
- Nothing staged, changes present: go to **3. Split Path**

## 2. Staged Path

One commit, staged files only. Run `git diff --staged` to see the changes, write the message per **4. Messages**, commit per **5. Committing**.

Never stage anything extra. Never mention unstaged or untracked files in the response.

## 3. Split Path

Group every change into commits:

- **Job groups**: one per `jobs/{Company}/` folder with changes. All changed files in that folder, tracked or not, go in that one commit.
- **Non-job groups**: everything outside `jobs/`, one commit per functional change.

`jobs-active/` is gitignored and never appears.

For each job group, validate before staging:

```bash
node scripts/job.mjs check "jobs/{Company}"
```

Non-zero exit: skip that commit, print the violations, continue with the remaining groups. Fix them with `job.mjs log`, never by hand editing.

Then per group, in order:

```bash
git add -- <paths>
```

commit per **5. Committing**, and move to the next group. Print each group's files and message as you go. No confirmation needed.

After all commits, flag any screening file in the committed groups whose **Status** is `Saved`: it was screened but never applied to or passed on, which usually means the action was forgotten. Report it, do not block.

## 4. Messages

Verb first, whole action upfront, then the target. One short statement of what was done.

Never restate reasons, comp numbers, red flags, interviewer names or anything else from the `## Log`. The commit message is not a summary of the notes.

### Job commits

The furthest Progress stage added in that folder names the message. Earlier stages are implied and dropped, and company research, notes or a tailored resume in the same commit stay silent.

| Change in the folder | Message |
|---|---|
| New file, `Saved` only | `Screen {Company}` |
| New file ending at `Applied` | `Apply to {Company}` |
| `Applied` added to existing | `Apply to {Company}` |
| Screened then declined | `Pass on {Company}` |
| Withdrew | `Withdraw from {Company}` |
| They rejected | `Rejected by {Company}` |
| Ghost sweep | `Ghosted by {Company}` |
| No stage change: log narrative, notes, research, tailored resume | `Update notes on {Company}` |

Never put the job title in the message. The company name is the target.

### Non-job commits

Same shape: `Fix tailoring skill to not exclude generic EM traits`, `Add AI PDLC to skill list`, `Publish resume PDF`.

Bullets belong to non-job commits only. When a single non-job commit carries more than one conceptual change, use a `* ` bullet per change, each verb first:

```
* Add AI PDLC to skill list
* Downgrade PDLC to SDLC in the base resume
```

A job commit is always a single line, whatever the folder contains. Several roles at one company still get one line covering them, e.g. `Screen two Vanta roles` or `Screen and apply to Vanta roles` when the stages differ between them.

## 5. Committing

Pipe the message to git through a quoted heredoc. No temp file, and the quoted delimiter disables every shell expansion, so apostrophes, quotes, `$` and backticks in a company name or title pass through literally:

```bash
git commit -F - <<'CLAUDE_COMMIT_MSG_9F3A'
<single-line summary OR * bulleted list>

Co-Authored-By: Claude <noreply@anthropic.com>
CLAUDE_COMMIT_MSG_9F3A
```

The delimiter must stay single-quoted. Never name a specific model in the trailer.
