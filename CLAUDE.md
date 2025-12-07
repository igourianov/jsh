# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a personal job search repository for Ilia Gourianov, a Software Engineering Manager with over 20 years of IT experience (14 years as a developer, 8 years as a manager). The repository contains resume materials, cover letters, interview preparation documents, and job search resources.

**Git Repository**: Local repo

## Key Files and Structure

### Resume Materials
- `resume/resume.md` - Main resume in markdown format (source of truth)
- `resume/publish.md` - **Resume publishing guide** (see this file for detailed publishing instructions)
- `resume/gist/` - Separate git repository for published resume (connected to GitHub Gist)
- `resume/publish-pdf.sh` - Bash script to generate PDF locally
- `resume/publish-gist.sh` - Bash script to publish to GitHub Gist
- `resume/seo.txt` - SEO keywords embedded in PDF metadata
- `resume/mdtopdf/` - Resume conversion tooling
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

## Resume Publishing

For detailed instructions on generating PDFs and publishing the resume to GitHub Gist, see **[resume/publish.md](resume/publish.md)**.

## Candidate Profile Context

Use `resume/resume.md` as the source of truth regarding candidate's experience

**Job Search Focus**: Remote Software Engineering Manager role, preferably in SaaS companies

## Working with This Repository

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

For detailed instructions on creating tailored resumes for specific companies, see **[resume/publish.md](resume/publish.md)**.

### Tone and Style
When generating content for this candidate:
- Professional but approachable
- Focus on results and measurable impact
- Balance technical depth with leadership experience
- Emphasize full-stack management capabilities (people + product + technical)