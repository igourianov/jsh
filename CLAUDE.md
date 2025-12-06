# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a personal job search repository for Ilia Gourianov, a Software Engineering Manager with over 20 years of IT experience (14 years as a developer, 8 years as a manager). The repository contains resume materials, cover letters, interview preparation documents, and job search resources.

**Git Repository**: Local repo

## Key Files and Structure

### Resume Materials
- `resume/resume.md` - Main resume in markdown format (source of truth)
- `resume/gist/` - **Separate git repository** for published resume (connected to `git@gist.github.com:17c7ea00a40cdc436bc5fb7913382d10.git`)
  - Published as `Ilia Gourianov - engineering manager.md` with full contact info
- `resume/publish-pdf.bat` - Generates PDF locally from resume.md (outputs to resume/ folder)
- `resume/publish-gist.bat` - Publishes to GitHub Gist (copies to gist folder, generates PDF, commits, and pushes)
- `resume/publish.bat` - Legacy script (use publish-pdf.bat or publish-gist.bat instead)
- `resume/seo.txt` - SEO keywords list (alphabetically sorted, newline-separated) embedded in PDF metadata
- `resume/mdtopdf/` - Resume conversion tooling (Node.js scripts, package.json, node_modules)
- `resume/mdtopdf/convert-to-pdf.js` - Generic PDF converter with keyword injection (used by publish scripts)
- `About me.txt` - Condensed summary of professional experience and skills

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
- `Git.md` - Git workflow documentation (repository structure, commit guidelines, gist publishing)

### Other
- `profile pic/` - Profile images for LinkedIn/applications (various PNG formats)

## Git Workflow

For detailed git workflows, repository structure, and commit guidelines, see **[Git.md](Git.md)**.

**Quick reference:**
- **Skip `git log` checks** - Commit style is already established
- **Use minimal commands**: Only run `git status` and `git diff`
- **Commit format**: Concise summary + detailed description + Claude Code attribution
- **Two repositories**: Main repo (local) + Gist repo (public resume)

## Common Commands

### Generate PDF Locally

**Purpose**: Generate a PDF version of the resume in the local resume/ folder for testing or local use.

**Command:**
```bash
cd resume
publish-pdf.bat
```

**What publish-pdf.bat does:**
1. **Generate PDF**: Creates PDF from resume.md with SEO keywords embedded (650 keywords)
2. **Open PDF**: Opens the generated PDF for review

**Output:** `resume/Ilia Gourianov - engineering manager.pdf`

### Publish Resume to GitHub Gist (Make Public)

**Definition**: "Publishing the resume" means making it publicly available via the GitHub Gist at `git@gist.github.com:17c7ea00a40cdc436bc5fb7913382d10.git`

**Command:**
```bash
cd resume
publish-gist.bat
```

**What publish-gist.bat does (fully automated):**
1. **Copy**: Copies markdown to `gist/` folder
2. **Generate PDF**: Creates PDF with SEO keywords embedded (650 keywords)
3. **Analyze changes**: Checks git diff to detect what changed in the markdown
4. **Commit**: Automatically stages and commits both MD and PDF files
5. **Push**: Pushes to GitHub Gist
6. **Open PDF**: Opens the generated PDF for review

**Important Notes:**
- `resume/gist/` is a separate git repository (not tracked by main JobSearch repo)
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
- Use `publish-pdf.bat` to generate PDF locally for testing
- Use `publish-gist.bat` to publish to GitHub Gist (makes it public)
- When published, it's copied to the gist folder as `Ilia Gourianov - engineering manager.md`
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

### Tailored Resume Creation

When creating a tailored resume for a specific company:

**File naming convention:**
- Markdown source: `jobs/{Company}/resume.md`
- PDF output: `jobs/{Company}/Ilia Gourianov - engineering manager.pdf`

**Process:**
1. Copy base resume from `resume/resume.md`
2. Apply company-specific modifications based on job posting analysis
3. Save markdown as `jobs/{Company}/resume.md`
4. Generate PDF with proper naming using resume conversion tool
5. The markdown keeps simple filename for editing while PDF has professional filename for applications

**Common tailoring strategies:**
- Emphasize relevant technical background (e.g., backend, distributed systems)
- Add specific accomplishments that align with job requirements
- Quantify metrics and KPIs where applicable
- Highlight domain-relevant experience (enterprise-scale, SaaS, etc.)
- Add remote team leadership details if relevant
- Adjust competencies section to match preferred qualifications

### Tone and Style
When generating content for this candidate:
- Professional but approachable
- Focus on results and measurable impact
- Balance technical depth with leadership experience
- Emphasize full-stack management capabilities (people + product + technical)
