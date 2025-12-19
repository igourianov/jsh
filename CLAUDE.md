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
  - `jobs/job-download-process.md` - **Job download and formatting guide** (detailed process for parsing and saving job postings)
  - `jobs/evaluation-guide.md` - Methodology for evaluating job fit against resume
- `LinkedIn/` - LinkedIn search resources and content
  - `LinkedIn/LinkedIn AI search.md` - AI-optimized search query for finding remote Engineering Manager roles
  - `LinkedIn/LinkedIn search.md` - Additional LinkedIn search resources
  - `LinkedIn/LInkedIn search syntax.md` - Guide on LinkedIn's advanced search syntax
  - `LinkedIn/posts/` - Source files for LinkedIn posts (drafts and editorial versions)

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

### Job Screening

**Job screening** is the combined process of downloading a job posting and evaluating it against the resume. This is the primary workflow for processing new job opportunities.

For complete instructions, see **[job-screen.md](job-screen.md)**.

**Process:**
1. **Download** - Fetch and parse job posting with structured metadata extraction
2. **Evaluate** - Compare against resume and append match results to same file

**Output:** Single file at `jobs/{Company}/{Job Title}.md` containing both job details and evaluation

**Quick reference:**
- **Path**: `jobs/{Company}/{Title}.md` (create company subfolder if needed)
- **Extract metadata**: title, location, salary (estimate if not present), coding %, qualifications, summary, company info
- **Evaluate**: Match %, Gaps, and Strengths appended to bottom of file
- **Example**: `jobs/Instacart/Software Engineering Manager - Catalog Interfaces.md`

### Tailored Resume Creation

For detailed instructions on creating tailored resumes for specific companies, see **[resume/publish.md](resume/publish.md)**.

### File Format Conversions

**Converting Markdown to Plain Text:**

When asked to convert .md files (especially resumes) to text format, follow this process:
- Create a new file in the same folder with the same name and `.txt` extension
- Replace markdown formatting with plain text equivalents
- Use unicode bullet characters (•, ─, ═) in place of markdown bullets and for visual separation
- Strip markdown links but preserve URLs where relevant
- Remove bold/italic markers while keeping the text
- Add visual separators for readability

**Example:** `resume/resume.md` → `resume/resume.txt`

**LinkedIn Post Editorial Process:**

When asked to edit LinkedIn posts for publication, follow this process:
- **Do not overwrite original text** - Add editorial version below the original, separated by a line
- **Maximize engagement** - Structure content to drive comments, shares, and discussion
- **Be brief and concise** - LinkedIn readers scan quickly; get to the point
- **Use unicode emojis sparingly** - 2-4 emojis max for visual emphasis, not decoration
- **Use plain text only** - No markdown formatting (no **, *, #, etc.), no em dashes
- Focus on: hook → value → call-to-action

**Source file location:** `LinkedIn/posts/` - All LinkedIn post drafts and editorial versions are stored here

### Tone and Style
When generating content for this candidate:
- Professional but approachable
- Focus on results and measurable impact
- Balance technical depth with leadership experience
- Emphasize full-stack management capabilities (people + product + technical)