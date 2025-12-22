# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a personal job search repository for Ilia Gourianov, a Software Engineering Manager with over 20 years of IT experience (14 years as a developer, 8 years as a manager). The repository contains resume materials, cover letters, interview preparation documents, and job search resources.

**Git Repository**: Local repo

## Key Files and Structure

### Resume Materials
- `resume/resume.md` - Main resume in markdown format (source of truth)
- `resume/seo.txt` - SEO keywords embedded in PDF metadata
- `archive/About me.txt` - Condensed summary of professional experience and skills (archived)

### Cover Letters
- `archive/coverletter.txt` - Base cover letter template highlighting product delivery achievements (archived)
- `archive/coverletter variants.txt` - Multiple versions of cover letters for different situations (archived)

### Job Search Resources
- `jobs/` - Directory containing specific job postings being tracked (organized by company)
  - **Format**: `jobs/{Company}/{Title}.md` - Save job descriptions in company-specific subfolders
- `LinkedIn/` - LinkedIn search resources and content
  - `LinkedIn/LinkedIn AI search.md` - AI-optimized search query for finding remote Engineering Manager roles
  - `LinkedIn/LinkedIn search.md` - Additional LinkedIn search resources
  - `LinkedIn/LInkedIn search syntax.md` - Guide on LinkedIn's advanced search syntax
  - `LinkedIn/posts/` - Source files for LinkedIn posts (drafts and editorial versions)

### Interview Preparation
- `archive/Questions.txt` - Questions to ask during interviews about company structure, team dynamics, tech stack (archived)
- `archive/prompt.md` - Instructions for using an LLM as a recruiter to evaluate job fit (archived)

### Development Configuration
- `.gitignore` - Git ignore rules (excludes node_modules, generated PDF, IDE files, temp files)
- `.claude/settings.local.json` - Claude Code permissions configuration (allows git operations, npm, test commands)
- `.claude/skills/` - Claude Code skills for common workflows (commit, job-screen, tailor-resume, publish-pdf, publish-gist)

### Other
- `profile pic/` - Profile images for LinkedIn/applications (various PNG formats)

## Candidate Profile Context

Use `resume/resume.md` as the source of truth regarding candidate's experience

**Job Search Focus**: Remote Software Engineering Manager role, preferably in SaaS companies

## Working with This Repository

### Skill Usage Requirements

**CRITICAL: When user requests workflow operations, ALWAYS use the corresponding skill:**

- User says "**commit**" → MUST use `Skill(commit)`, NEVER run git commands directly
- User says "**screen job**" → MUST use `Skill(job-screen)`
- User says "**tailor resume**" → MUST use `Skill(tailor-resume)`
- User says "**publish pdf**" or "**publish resume**" → MUST use `Skill(publish-pdf)`
- User says "**publish gist**" → MUST use `Skill(publish-gist)`

**Rationale:** Skills encapsulate full workflows with proper error handling, context gathering, and consistent output. Direct tool usage bypasses established processes and creates inconsistent behavior.

**Exception:** Only use tools directly when NOT explicitly requested by user or when debugging/investigating issues.

### Cover Letter Customization
- Base template is in `archive/coverletter.txt` (archived)
- Variants are tracked in `archive/coverletter variants.txt` (archived)
- Focus on relevant achievements: team building, product delivery, architectural contributions

### Job Screening

**Job screening** is the combined process of downloading a job posting and evaluating it against the resume. This is the primary workflow for processing new job opportunities.

**Process:**
1. **Download** - Fetch and parse job posting with structured metadata extraction
2. **Evaluate** - Compare against resume and append match results to same file

**Output:** Single file at `jobs/{Company}/{Job Title}.md` containing both job details and evaluation

**Quick reference:**
- **Path**: `jobs/{Company}/{Title}.md` (create company subfolder if needed)
- **Extract metadata**: title, location, salary (estimate if not present), coding %, qualifications, summary, company info
- **Evaluate**: Match % and Gaps appended to bottom of file
- **Example**: `jobs/Instacart/Software Engineering Manager, Catalog Interfaces.md`

### Resume Tailoring

**Resume tailoring** creates a customized resume optimized for a specific job posting based on the job screening file.

**Process:**
1. Read job screening file at `jobs/{Company}/{Job Title}.md`
2. Analyze job requirements, gaps, and keywords
3. Create tailored resume emphasizing relevant experience
4. Save to `jobs/{Company}/resume.md`

**What gets tailored:**
- **Summary**: Adjusted to emphasize relevant domain/experience
- **Core Competencies**: Reordered to prioritize job-relevant skills
- **Experience**: Accomplishments rewritten to highlight matching experience

**What stays the same:**
- Job titles and dates
- Company names
- Fundamental facts (no fabrication)

**Example workflow:**
1. Screen job: `screen job https://example.com/job-posting`
2. Tailor resume: `tailor resume for {Company}`
3. Generate PDF: `publish pdf for {Company}`

**Output location:** `jobs/{Company}/resume.md`

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