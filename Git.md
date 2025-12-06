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

**Pre-commit checks:**
- **Skip `git log` checks** - Don't run `git log -3 --oneline` to check recent commits; the commit style is already established
- **Use minimal commands**: Only run `git status` and `git diff` to understand what's being committed

**Commit message format:**
```
[Concise summary line]

[Detailed description with bullet points if needed]

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Example workflow:**
```bash
# Check what's changed
git status
git diff

# Stage changes
git add <files>

# Commit with proper format
git commit -m "$(cat <<'EOF'
Add new job posting for Company X

- Saved job description to jobs/CompanyX/
- Created match evaluation
- Generated tailored resume

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

### Common Scenarios

#### Adding Job Materials
```bash
# After scraping job posting and creating materials
git add jobs/CompanyName/
git commit -m "Add Company Name job application materials"
```

#### Updating Resume
```bash
# After editing resume/resume.md
git add resume/resume.md
git commit -m "Update resume with latest project experience"
```

#### Updating Documentation
```bash
git add CLAUDE.md
git commit -m "Update documentation with new workflow"
```

## Gist Repository Workflow

The gist repository is managed automatically by the `publish-gist.bat` script.

### Publishing to Gist

**Command:**
```bash
cd resume
publish-gist.bat
```

**What happens automatically:**
1. **Copy**: Copies `resume.md` to `gist/Ilia Gourianov - engineering manager.md`
2. **Generate PDF**: Creates PDF with SEO keywords embedded
3. **Check for changes**: Runs `git diff` to detect changes
4. **Commit**: Stages and commits both MD and PDF files with message "Updated resume with latest changes"
5. **Push**: Pushes to GitHub Gist (`origin main`)
6. **Open PDF**: Opens the generated PDF for review

**Important notes:**
- The script handles all git operations automatically
- If no changes detected, script exits early
- Always commits to the `main` branch
- Automatically pushes to remote (makes changes public immediately)

### Manual Gist Operations

If you need to manually work with the gist repository:

```bash
# Navigate to gist folder
cd resume/gist

# Check status
git status

# View changes
git diff

# Manual commit (if needed)
git add "Ilia Gourianov - engineering manager.md"
git commit -m "Updated resume with latest changes"

# Push to GitHub Gist
git push origin main

# Return to main repo
cd ../..
```

### Viewing Published Resume

- **Markdown**: https://gist.github.com/17c7ea00a40cdc436bc5fb7913382d10
- **Raw Markdown**: https://gist.githubusercontent.com/IliaGootech/17c7ea00a40cdc436bc5fb7913382d10/raw/Ilia%20Gourianov%20-%20engineering%20manager.md
- **PDF**: Accessible through the Gist interface or locally at `resume/gist/Ilia Gourianov - engineering manager.pdf`

## Best Practices

### Separation of Concerns

- **Main repo**: Use for version control of all working materials (drafts, notes, job postings)
- **Gist repo**: Use only for publishing the final, public-facing resume

### Privacy Considerations

- Main repository is local only (not pushed to any remote)
- Gist repository is **public** - contains full contact information
- Never commit sensitive information (passwords, private notes) to main repo
- Job search notes and company-specific materials stay in main repo only

### Workflow Tips

1. **Work locally first**: Edit `resume/resume.md` and test with `publish-pdf.bat`
2. **Review before publishing**: Check the generated PDF thoroughly
3. **Publish when ready**: Use `publish-gist.bat` only when you want to make changes public
4. **Commit main repo changes**: Separately commit changes to the main JobSearch repo

### Avoiding Common Mistakes

**Don't:**
- Don't manually copy files between repos
- Don't commit `resume/gist/` folder to main repo (it's already in `.gitignore`)
- Don't push main repo to a public remote (it contains job search notes)
- Don't edit files directly in `resume/gist/` folder

**Do:**
- Always edit `resume/resume.md` as the source of truth
- Use `publish-pdf.bat` for local testing
- Use `publish-gist.bat` for publishing
- Commit changes to main repo after making updates

## Troubleshooting

### Gist repository not tracking changes

```bash
cd resume/gist
git status
# If detached head or other issues:
git checkout main
git pull origin main
```

### Main repo accidentally tracking gist folder

```bash
# Check if gist folder is being tracked
git status

# If it shows resume/gist/, verify .gitignore
cat .gitignore | grep gist

# Should show: resume/gist/
# If not, add it:
echo "resume/gist/" >> .gitignore
git add .gitignore
git commit -m "Fix .gitignore to exclude gist folder"
```

### Need to update gist remote URL

```bash
cd resume/gist
git remote -v
# Should show: git@gist.github.com:17c7ea00a40cdc436bc5fb7913382d10.git

# If incorrect:
git remote set-url origin git@gist.github.com:17c7ea00a40cdc436bc5fb7913382d10.git
```
