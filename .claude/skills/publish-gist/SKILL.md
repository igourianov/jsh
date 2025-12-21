---
name: publish-gist
description: Publish resume to GitHub Gist. Use when user asks to publish to gist, update gist, or share resume publicly.
---

# Publish Gist Skill

Copy the resume to the gist folder and push to GitHub Gist.

## Instructions

This skill publishes the resume to the public GitHub Gist repository.

### 1. Repository Context

- **Main repo**: `D:\Projects\JobSearch`
- **Gist repo**: `.claude\skills\publish-gist\gist`
- **Gist remote**: `git@gist.github.com:17c7ea00a40cdc436bc5fb7913382d10.git`
- **Public URL**: https://gist.github.com/17c7ea00a40cdc436bc5fb7913382d10
- The gist folder is excluded from main repo via `.gitignore`

### 2. Run Publish Script

The publish-gist script handles everything automatically:

**Default (publishes resume/resume.md):**
```bash
.claude/skills/publish-gist/publish-gist.sh
```

**Publish specific resume:**
```bash
.claude/skills/publish-gist/publish-gist.sh jobs/Zapier/resume.md
```

### 3. What the Script Does

The script automatically:
1. **Extract filename**: Reads Name (line 1) and Title (line 3) from source markdown to generate `{Name} - {Title}.md`
2. **Copy**: Copies source file to `resume/gist/{Name} - {Title}.md`
3. **Check changes**: Verifies if there are actual changes to publish
4. **Commit**: Stages and commits the markdown file with auto-generated commit message
5. **Push**: Pushes to GitHub Gist

### 4. Verify

- Script will report success and show the public URL
- Public URL: https://gist.github.com/17c7ea00a40cdc436bc5fb7913382d10

## Notes

- The gist repository is a **separate git repository** nested within the main repo
- It contains the public resume with full contact information
- Always work from the main repository directory after finishing
- See `resume/publish.md` for more detailed publishing instructions
