---
name: publish-pdf
description: Generate PDF from resume markdown with embedded SEO metadata. Use when user asks to publish resume, generate PDF, or create resume PDF.
---

# Publish PDF Skill

Generate PDF version of the resume with SEO metadata.

## Instructions

### 1. Extract Parameters from Source File

Read the specified markdown file to extract name and title:
- **Name**: Line 1 (H1 heading) - strip the `#` and whitespace. For combined formats like `# Name | Title`, take the part before `|`.
- **Title**: Line 3 (H3 heading) - strip the `###` and whitespace. If line 1 uses `# Name | Title` format, take the part after `|`.

### 2. Run the Script

```bash
${CLAUDE_SKILL_DIR}/scripts/publish-pdf.sh <source-file> <name> <title>
```

**Base resume:**
```bash
${CLAUDE_SKILL_DIR}/scripts/publish-pdf.sh resume/resume.md "Ilia Gourianov" "Engineering Manager"
```

**Tailored resume:**
```bash
${CLAUDE_SKILL_DIR}/scripts/publish-pdf.sh "jobs/Sprout Social/resume.md" "Ilia Gourianov" "Software Engineering Manager"
```

Output goes to `pdf/{name} - {title}.pdf`.
