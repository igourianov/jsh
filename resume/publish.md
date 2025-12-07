# Resume Publishing Guide

This document explains how to generate and publish the resume.

## Publishing Scripts

### Generate PDF Locally

**Purpose**: Generate a PDF version of the resume for testing or local use.

**Command:**
```bash
cd resume
./publish-pdf.sh <source-file> <name> <title>
```

**Parameters:**
- `source-file` (required): Path to source markdown file
- `name` (required): Person's name (extracted from line 1 of resume markdown)
- `title` (required): Job title (extracted from line 3 of resume markdown)

**What publish-pdf.sh does:**
1. **Verify source**: Checks that source file exists and converts to absolute path
2. **Check dependencies**: Verifies/installs node dependencies if needed
3. **Generate PDF**: Creates PDF as `{name} - {title}.pdf` in same directory as source file
4. **Inject metadata**: Embeds SEO keywords from `resume/seo.txt` (650 keywords) and Author metadata
5. **Open PDF**: Opens the generated PDF in OS default viewer (supports macOS, Linux, Windows Git Bash)

**Examples:**
```bash
# Generate PDF from base resume
./publish-pdf.sh resume.md "Ilia Gourianov" "Engineering Manager"

# Generate PDF from tailored resume
./publish-pdf.sh ../jobs/Zapier/resume.md "Ilia Gourianov" "Senior Engineering Manager"

# Generate PDF from Sprout Social resume
./publish-pdf.sh ../jobs/Sprout\ Social/resume.md "Ilia Gourianov" "Software Engineering Manager"
```

**Important Notes:**
- All three parameters are required
- Output PDF is always placed in the same directory as the source file
- Output filename format: `{name} - {title}.pdf`
- Extract Name and Title from resume markdown before calling the script:
  - Name: Line 1 (# Name) - strip the `#` and whitespace
  - Title: Line 3 (### Title) - strip the `###` and whitespace

### Publish Resume to GitHub Gist (Make Public)

**Definition**: "Publishing the resume gist" or "to gist" means making it publicly available via the GitHub Gist at `git@gist.github.com:17c7ea00a40cdc436bc5fb7913382d10.git`

**Command:**
```bash
cd resume
./publish-gist.sh [source-file]
```

**Parameters:**
- `source-file` (optional): Path to source markdown file (defaults to `resume/resume.md`)

**What publish-gist.sh does (fully automated):**
1. **Extract filename**: Reads Name (line 1) and Title (line 3) from source markdown to generate `{Name} - {Title}.md`
2. **Copy**: Copies source file to `resume/gist/{Name} - {Title}.md`
3. **Check changes**: Verifies if there are actual changes to publish
4. **Commit**: Stages and commits the markdown file with an auto-generated commit message
5. **Push**: Pushes to GitHub Gist

**Examples:**
```bash
# Publish default resume.md
./publish-gist.sh

# Publish a specific resume file
./publish-gist.sh ../jobs/Zapier/resume.md
```

**Important Notes:**
- `resume/gist/` is a separate git repository (not tracked by main JobSearch repo)
- Public Gist URL: https://gist.github.com/17c7ea00a40cdc436bc5fb7913382d10
- Git remote: `git@gist.github.com:17c7ea00a40cdc436bc5fb7913382d10.git`
- Resume is published with full contact information including email and phone
- Only the markdown file is published (no PDF in the gist)
- Target filename is dynamically generated from resume content

## Resume Publishing Workflow

### Making Resume Updates

1. Edit `resume/resume.md` (source of truth)
2. Use `./publish-pdf.sh` to generate PDF locally
3. Use `./publish-gist.sh` to publish to GitHub Gist (makes it public)
4. When published, it's copied to the gist folder with filename dynamically generated from resume content (e.g., `{Name} - {Title}.md`)
5. Maintain consistent formatting and structure

## Technical Details

### SEO Keywords
- Keywords stored in `resume/seo.txt`
- Format: Alphabetically sorted, newline-separated
- Embedded in PDF metadata during conversion
- Count: 650 keywords
- Injected into all generated PDFs (base and targeted resumes)

### PDF Metadata
PDFs are generated with the following metadata:
- **Keywords**: All 650 keywords from `resume/seo.txt`
- **Author**: Extracted from resume name (first line of markdown file)
- **Title**: Extracted from resume title (third line of markdown file)

### Conversion Tooling
- Location: `resume/mdtopdf/`
- Main script: `resume/mdtopdf/convert-to-pdf.js`
- Generic PDF converter with keyword and metadata injection
- Used by publish-pdf.sh
- Dependencies: Node.js, packages in package.json

### Dynamic Filename Generation
All PDFs use dynamic naming based on resume content:
- Name extracted from line 1 (H1 heading)
- Title extracted from line 3 (H3 heading)
- Format: `{Name} - {Title}.pdf`
- Example: `Ilia Gourianov - Engineering Manager.pdf`

### Repository Structure
- `resume/gist/` is a **separate git repository**
- Connected to GitHub Gist
- Excluded from main repo via `.gitignore`
- Contains publicly published resume with full contact information

## Tailored Resume Creation

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
