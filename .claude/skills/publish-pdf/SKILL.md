---
name: publish-pdf
description: Generate PDF from resume markdown with embedded SEO metadata. Use when user asks to publish resume, generate PDF, or create resume PDF.
---

# Publish PDF Skill

Generate PDF version of the resume with SEO metadata.

## Instructions

This skill generates a PDF from a resume markdown file with embedded SEO keywords and metadata.

### Command

```bash
.claude/skills/publish-pdf/publish-pdf.sh <source-file> <name> <title>
```

### Parameters

All three parameters are **required**:

1. **source-file**: Path to source markdown file
2. **name**: Person's name (extract from line 1 of resume markdown)
3. **title**: Job title (extract from line 3 of resume markdown)

### Process Steps

#### 1. Read Source File

Read the specified markdown file to extract name and title:
- **Name**: Line 1 (H1 heading) - strip the `#` and whitespace
- **Title**: Line 3 (H3 heading) - strip the `###` and whitespace

#### 2. Run publish-pdf.sh

**For base resume:**
```bash
.claude/skills/publish-pdf/publish-pdf.sh resume/resume.md "Ilia Gourianov" "Engineering Manager"
```

**For tailored resumes:**
```bash
# Zapier example
.claude/skills/publish-pdf/publish-pdf.sh jobs/Zapier/resume.md "Ilia Gourianov" "Senior Engineering Manager"

# Sprout Social example (handle spaces in paths)
.claude/skills/publish-pdf/publish-pdf.sh "jobs/Sprout Social/resume.md" "Ilia Gourianov" "Software Engineering Manager"
```

### What the Script Does

The `publish-pdf.sh` script performs these steps automatically:

1. **Verify source**: Checks that source file exists, converts to absolute path
2. **Create output directory**: Creates `pdf/` folder under project root if it doesn't exist
3. **Check dependencies**: Verifies/installs node dependencies if needed
4. **Generate PDF**: Creates PDF as `{name} - {title}.pdf` in the `pdf/` folder
5. **Inject metadata**: Embeds SEO keywords from `resume/seo.txt` (650 keywords) and Author metadata
6. **Open PDF**: Opens the generated PDF in OS default viewer

### Important Notes

- **Output location**: All PDFs are placed in the `pdf/` folder under project root
- **Output filename format**: `{name} - {title}.pdf`
- **SEO metadata**: All 650 keywords from `resume/seo.txt` are embedded in PDF metadata
- **PDF metadata includes**:
  - Keywords: All 650 keywords from `resume/seo.txt`
  - Author: Extracted from resume name
  - Title: Extracted from resume title

### Examples

**Base resume:**
```bash
.claude/skills/publish-pdf/publish-pdf.sh resume/resume.md "Ilia Gourianov" "Engineering Manager"
```
Output: `pdf/Ilia Gourianov - Engineering Manager.pdf`

**Tailored resume:**
```bash
.claude/skills/publish-pdf/publish-pdf.sh jobs/Zapier/resume.md "Ilia Gourianov" "Senior Engineering Manager"
```
Output: `pdf/Ilia Gourianov - Senior Engineering Manager.pdf`

### Common Use Cases

1. **Generate PDF from base resume** - After updating `resume/resume.md`
2. **Generate PDF from tailored resume** - After creating company-specific resume in `jobs/{Company}/resume.md`
3. **Test resume changes** - Generate PDF locally to review formatting before publishing

### Technical Details

- **Conversion tooling**: `resume/mdtopdf/convert-to-pdf.js`
- **Dependencies**: Node.js and packages in package.json
- **SEO keywords**: Stored in `resume/seo.txt` (alphabetically sorted, newline-separated)
- **Dynamic filename**: Generated from resume content (name and title)
