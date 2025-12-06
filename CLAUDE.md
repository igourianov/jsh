# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a personal job search repository for Ilia Gourianov, a Software Engineering Manager with over 20 years of IT experience (14 years as a developer, 8 years as a manager). The repository contains resume materials, cover letters, interview preparation documents, and job search resources.

**Git Repository**: Local repo

## Key Files and Structure

### Resume Materials
- `resume/resume.md` - Main resume in markdown format (source of truth)
- `resume/publish/` - **Separate git repository** for published resume (connected to `git@gist.github.com:17c7ea00a40cdc436bc5fb7913382d10.git`)
  - Published as `Ilia Gourianov - engineering manager.md` with full contact info
- `resume/publish.bat` - Main publishing script (copies resume.md to publish folder as "Ilia Gourianov - engineering manager.md", generates PDF, commits, and pushes to Gist)
- `resume/seo.txt` - SEO keywords list (alphabetically sorted, newline-separated) embedded in PDF metadata
- `resume/mdtopdf/` - Resume conversion tooling (Node.js scripts, package.json, node_modules)
- `resume/mdtopdf/convert-to-pdf.js` - Generic PDF converter with keyword injection (used by publish.bat)
- `About me.txt` - Condensed summary of professional experience and skills
- `resume/prompt.txt` - Contains an LLM prompt injection for automated screening systems

### Cover Letters
- `coverletter.txt` - Base cover letter template highlighting product delivery achievements
- `coverletter variants.txt` - Multiple versions of cover letters for different situations

### Job Search Resources
- `jobs/` - Directory containing specific job postings being tracked (organized by company)
  - **Format**: `jobs/{Company}/{Title}.md` - Save job descriptions in company-specific subfolders
- `LinkedIn/` - LinkedIn search resources
  - `LinkedIn/LinkedIn AI search.md` - AI-optimized search query for finding remote Engineering Manager roles
  - `LinkedIn/LinkedIn search.md` - Additional LinkedIn search resources
  - `LinkedIn/LInkedIn search syntax.md` - Guide on LinkedIn's advanced search syntax

### Interview Preparation
- `Questions.txt` - Questions to ask during interviews about company structure, team dynamics, tech stack
- `prompt.md` - Instructions for using an LLM as a recruiter to evaluate job fit

### Development Configuration
- `.gitignore` - Git ignore rules (excludes node_modules, generated PDF, IDE files, temp files)
- `.claude/settings.local.json` - Claude Code permissions configuration (allows git operations, npm, test commands)

### Other
- `profile pic/` - Profile images for LinkedIn/applications (various PNG formats)
- `GEMINI.md` - Previous AI assistant guidance file (similar to this CLAUDE.md)

## Common Commands

### Publish Resume (Make Public)

**Definition**: "Publishing the resume" means making it publicly available via the GitHub Gist at `git@gist.github.com:17c7ea00a40cdc436bc5fb7913382d10.git`

**One-Command Publishing:**
```bash
cd resume
publish.bat
```

**What publish.bat does (fully automated):**
1. **Copy**: Copies markdown to `publish/` folder
2. **Generate PDF**: Creates PDF with SEO keywords embedded (650 keywords)
3. **Analyze changes**: Checks git diff to detect what changed in the markdown
4. **Commit**: Automatically stages and commits both MD and PDF files
5. **Push**: Pushes to GitHub Gist
6. **Open PDF**: Opens the generated PDF for review

**Important Notes:**
- `resume/publish/` is a separate git repository (not tracked by main JobSearch repo)
- Public Gist URL: https://gist.github.com/17c7ea00a40cdc436bc5fb7913382d10
- Git remote: `git@gist.github.com:17c7ea00a40cdc436bc5fb7913382d10.git`
- If no changes detected, script exits early and just opens the PDF
- Resume is published with full contact information including email and phone

## Candidate Profile Context

Use `resume/resume.md` as the source of truth regarding candidate's experience

**Job Search Focus**: Remote Software Engineering Manager role, preferably in SaaS companies

## Working with This Repository

### Resume Updates
- The markdown file (`resume/resume.md`) is the source of truth
- After updating the markdown, use `publish.bat` to generate PDF and publish
- When published, it's copied to the publish folder as `Ilia Gourianov - engineering manager.md`
- Maintain consistent formatting and structure

### Cover Letter Customization
- Base template is in `coverletter.txt`
- Variants are tracked in `coverletter variants.txt`
- Focus on relevant achievements: team building, product delivery, architectural contributions

### Saving Job Descriptions

When scraping or saving job descriptions from the web, ALWAYS use this format:
- **Path**: `jobs/{Company}/{Title}.md`
- **Example**: `jobs/Zapier/Engineering Manager.md`
- Create company subfolder if it doesn't exist
- Use clean, readable title (remove special characters if needed)

### Job Application Evaluation

When comparing Ilia's resume against job postings, refer to `jobs/evaluation-guide.md` for detailed methodology including:
- Output format (Match %, Coding %, Salary, Gaps)
- Critical distinction between hands-on technical work vs coding
- Key signals for identifying 0% coding roles vs IC+Manager hybrids
- Evaluation approach and tech stack mismatch considerations
- Save results into the company folder as `match.md`. e.g. `jobs/Zapier/match.md`

### Tone and Style
When generating content for this candidate:
- Professional but approachable
- Focus on results and measurable impact
- Balance technical depth with leadership experience
- Emphasize full-stack management capabilities (people + product + technical)
