# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a personal job search repository for Ilia Gourianov, a Software Engineering Manager with over 20 years of IT experience (14 years as a developer, 8 years as a manager). The repository contains resume materials, cover letters, interview preparation documents, and job search resources.

**Git Repository**: Initialized and synced with GitHub at `git@github.com:igourianov/my-job-search.git`

## Key Files and Structure

### Resume Materials
- `resume/Ilia Gourianov - engineering manager.md` - Main resume in markdown format (source of truth)
- `resume/Ilia Gourianov - engineering manager.pdf` - PDF version of the resume (excluded from git, regenerate as needed)
- `resume/publish/` - **Separate git repository** for published resume (connected to `git@gist.github.com:17c7ea00a40cdc436bc5fb7913382d10.git`)
- `resume/publish.bat` - Main publishing script (sanitizes, generates PDF, commits, and pushes to Gist)
- `resume/seo.txt` - SEO keywords list (alphabetically sorted, newline-separated) embedded in PDF metadata
- `resume/mdtopdf/` - Resume conversion tooling (Node.js scripts, package.json, node_modules)
- `resume/mdtopdf.bat` - Batch file to convert markdown resume to PDF with SEO metadata (for local use)
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

### Generate PDF from Resume
```batch
cd resume
mdtopdf.bat
```
This converts the markdown resume to PDF format and embeds SEO keywords from `seo.txt` as PDF metadata. The script:
- Reads 650+ keywords from `resume/seo.txt` (alphabetically sorted, newline-separated)
- Converts `resume/Ilia Gourianov - engineering manager.md` to PDF
- Embeds keywords in PDF metadata for ATS parser visibility
- Uses `md-to-pdf` (Node.js) via tooling in `resume/mdtopdf/`

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

When helping with resume or cover letter modifications, keep these key points in mind:

**Experience Level**: Over 20 years total (14 as developer, 8 as manager)

**Most Recent Role**: Engineering Manager at Ceridian (Nov 2015 - Nov 2023)
- Led 3 product teams (recruiting, performance, succession planning), 1 platform/architecture team, and a dev DBA team
- Directly managed up to 25 ICs and leads across cross-functional teams (8-12 devs+QA each)
- Delivered 3 new products within DayforceHCM SaaS platform
- Joined during early SaaS expansion, helped scale to Gartner-recognized leader in Cloud HCM
- Built teams from scratch, hired 20+ engineers
- Mentored 2 senior engineers into manager roles

**Technical Background**:
- Backend: C#, .NET Core, SQL Server
- Frontend: JavaScript/TypeScript, ReactJS, Angular
- Architecture: Microservices, SOA, REST APIs
- Cloud/DevOps: Azure, Kubernetes (AKS), Docker, Terraform, CI/CD
- Data: Redis, Kafka, ElasticSearch, Prometheus+Grafana

**Management Expertise**:
- Full-stack management: people, product, technical, processes, cross-functional collaboration
- Team building, hiring, 1:1s, mentorship, performance reviews
- Product roadmap, OKRs, DORA metrics, SDLC ownership
- Agile/Scrum facilitation
- Architecture oversight and hands-on contribution when needed

**Job Search Focus**: Remote Software Engineering Manager role, preferably in SaaS companies

## Working with This Repository

### Resume Updates
- The markdown file (`resume/Ilia Gourianov - engineering manager.md`) is the source of truth
- After updating the markdown, regenerate the PDF using `mdtopdf.bat`
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

When comparing Ilia's resume against job postings, use this methodology:

**Output Format:**
- Match: [Percentage]%
- Coding: [Percentage]% (as required by the role)
- Salary: [Range] (take from values the job posting, or estime if not available - explicitly state if it's an estimate)
- Gaps: [bullet points]

**CRITICAL: Understanding Hands-on vs Coding**

These are two SEPARATE concepts when assessing job requirements:

1. **Hands-on Technical Work** (assumed for all EM roles, do NOT include in output):
   - Code reviews
   - Architectural decisions
   - Technical strategy and evaluation
   - System design
   - Infrastructure/DevOps oversight
   - Technology evaluation
   - Establishing quality standards

2. **Coding Requirement** (estimate and include in output): Estimate what % of the JOB requires writing production code (not the candidate's abilities):
   - Look for explicit mentions of "writing code", "implementing features", "shipping code"
   - "Participating in code reviews" = reviewing, NOT writing (does not count as coding)
   - "Technical fundamentals" or "past coding experience" = requirement for background, not active coding
   - People-focused EM roles typically: 10-20% coding
   - Tech-lead hybrid EM roles typically: 40-60% coding

**Base coding estimate on the job posting's responsibilities, not the candidate's abilities.**

**Evaluation Approach:**
- Compare with bias towards rejection to identify genuine gaps
- Highlight tech stack mismatches (e.g., C#/.NET vs Python, Azure vs AWS)
- Note both strong alignments and critical gaps
- Be realistic about ramp-up time requirements

### Tone and Style
When generating content for this candidate:
- Professional but approachable
- Focus on results and measurable impact
- Balance technical depth with leadership experience
- Emphasize full-stack management capabilities (people + product + technical)
