---
name: publish-pdf
description: Generate PDF from resume markdown. Use when user asks to publish resume, generate PDF, or create resume PDF.
---

# Publish PDF Skill

Generate PDF version of the resume.

## Instructions

### 1. Extract the Header from the Source File

Read line 1 of the specified markdown file and strip the leading `#` and surrounding whitespace. Pass the rest verbatim. Do not split it, reorder it or substitute anything into it: it becomes the PDF's document title as-is, and the script derives the output filename from it.

### 2. Run the Script

```bash
${CLAUDE_SKILL_DIR}/scripts/publish-pdf.sh <source-file> <header>
```

**Base resume:**
```bash
${CLAUDE_SKILL_DIR}/scripts/publish-pdf.sh resume/resume.md "Ilia Gourianov | Engineering Manager"
```

**Tailored resume:**
```bash
${CLAUDE_SKILL_DIR}/scripts/publish-pdf.sh "jobs/Sprout Social/resume.md" "Ilia Gourianov | Software Engineering Manager"
```

**Output location:** The script prints the path of the generated PDF (relative to project root) as the final line of stdout. Use that value. Do not reconstruct it from inputs.

PDF is always compiled inside `pdf/` (where the `assets/` folder lives) under a temp name, then moved to the final destination. By convention that destination is the source's folder when the source lives inside `jobs/`, otherwise `pdf/`.
