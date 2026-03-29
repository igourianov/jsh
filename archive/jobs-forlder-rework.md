# Job Tracking Overhaul

## Context

Current setup moves company folders between `jobs/` and `jobs-archive/` to track status. This breaks git history, loses context when re-screening previously archived companies, and has no centralized status view.

**New approach:** All company folders live in `jobs/` (git-tracked). Status, last step, date applied and notes are stored directly in each screening file's metadata. `jobs-active/` contains directory junctions to active companies (gitignored). `black-list.md` stays as a separate file.

## Screening File Changes

Add new fields to the metadata block in each screening file, after existing fields:

```markdown
# Engineering Manager | Platform | B2B SaaS | 85%

- **Saved:** 2026-03-17
- **URL:** https://...
- **Company:** Vanta
- **Location:** Remote (US/Canada)
- **Compensation:** $190,000-$230,000
- **Benefits:** ...
- **Team size:** 8
- **Status:** Active
- **Progress:** Recruiter screen (2026-03-25)
```

**New fields:**
- **Status** - `Screened` (default), `Active`, `Rejected`, `Ghosted`, `Withdrew`
- **Progress** - last process step with date: `Applied`, `Recruiter screen (2026-03-25)`, `Tech interview (2026-04-01)`, `Offer (2026-04-10)`, etc. Applied date is optional since it's usually the same as Saved.

**Output template update:** Add Status=Screened and Progress empty.

## Migration

### Step 1: Consolidate folders
- `git mv` all 162 folders from `jobs-archive/` into `jobs/`
- Handle collisions (Clario, Flinks, Leap Tools, OpenLoop, Sprout Social, Vanta exist in both): copy archive files into the active folder, but if a file exists in both, keep the `jobs/` version
- Delete empty `jobs-archive/` directory
- Single commit: "consolidate all company folders under jobs/"

### Step 2: Add status fields to existing screening files
- Scan all screening files in `jobs/`
- Add Status and Progress fields to each file's header (skip files that don't have properly formed metadata fields)
- 12 currently active companies (from `jobs/`): Status=Active, Progress=Applied
- Archived companies with a withdrawal file in the company folder: Status=Withdrew
- All other archived companies: Status=Rejected

### Step 3: Create `jobs-active/` structure
- Create `jobs-active/` directory
- Add to `.gitignore`: `jobs-active/*/`
- Create junctions for the 12 active companies: `cmd //c "mklink /J \"jobs-active\\{Company}\" \"jobs\\{Company}\""`

### Step 4: Keep `jobs/black-list.md`
- Black-list stays as-is. No changes.

## Junction Management

Creating a junction (activate):
```bash
cmd //c "mklink /J \"jobs-active\\{Company}\" \"jobs\\{Company}\""
```

Removing a junction (archive):
```bash
rmdir "jobs-active/{Company}"  # removes junction, not the target
```

## .gitignore Update

Add:
```
# Active job junctions (directory junctions to jobs/ subfolders)
jobs-active/*/
```

## Skill Updates

### `archive-company` skill
- Delete entirely (SKILL.md, archive-company.sh, skill registration)
- Status updates and junction management are handled inline via rules in CLAUDE.md

### `screen-job` skill (SKILL.md)
- **Add Step 1.5: Check History** - after extracting company name:
  - Check if `jobs/{Company}/` folder already exists with a screening file
  - If exists: read screening file, report previous Status/Match/Date. Ask user if they want to overwrite. If overwriting, preserve existing Status and Progress values.
- **Add to Step 6: Output** - new screening files get Status=Screened, Progress empty
- **Add Step 7: Create Junction** - create junction in `jobs-active/` for the new company


## CLAUDE.md Updates

**Key Files section:**
- Add: `jobs-active/{Company}/` - Directory junctions to active company folders in `jobs/`. Gitignored.
- Update `jobs/` - "All company folders. Permanent location, files never move."
- Remove `jobs-archive/` reference
- Keep `jobs/black-list.md` reference

**Add "Status Tracking" section** with full rules:
- Status and Progress fields live in each screening file's metadata
- Valid statuses: Screened (default for new screens), Active, Rejected, Ghosted, Withdrew, Blacklisted
- Progress format: step name with optional date, e.g. `Recruiter screen (2026-03-25)`
- When user says "archive company": update Status in screening file (Rejected/Ghosted/Withdrew), remove junction from `jobs-active/`
- When user says "activate company" or applies: set Status=Active, create junction in `jobs-active/`
- Never move company folders. Update the screening file fields instead.
- Junction commands: create with `cmd //c "mklink /J ..."`, remove with `rmdir`

## Files Modified

- `.gitignore` - add `jobs-active/*/`
- `.claude/CLAUDE.md` - update key files, add status tracking rules
- `.claude/skills/screen-job/output-template.md` - add Status, Progress fields
- `.claude/skills/screen-job/SKILL.md` - add company history check and junction creation steps
- `.claude/skills/archive-company/` - delete entire skill directory
- All screening files in `jobs/` - add new metadata fields (bulk migration)
- `jobs/` - receives all folders from `jobs-archive/`
- `jobs-archive/` - deleted after migration

## Verification

1. Confirm `jobs-archive/` no longer exists
2. Confirm all 174+ company folders are under `jobs/`
3. Spot-check 5 screening files have correct Status/Progress fields
4. Confirm junctions work: `ls jobs-active/Vanta` shows same content as `ls jobs/Vanta`
5. Confirm `.gitignore` works: `git status` shows no junction contents
6. Test screen-job on existing company: verify it warns about previous screening
7. Test archive flow: remove junction, update screening file status
