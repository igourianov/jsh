---
name: convert-txt
description: Convert markdown file to plain text. Use when user says "convert to text", "convert to txt", "plain text version", or asks to create a .txt version of a markdown file.
---

# Convert Markdown to Plain Text

Convert a `.md` file into a clean `.txt` file suitable for pasting into forms, emails, and systems that do not support markdown.

## Instructions

### Input

- Accept a source `.md` file path as argument
- If no path is provided, default to `resume/resume.md`

### Output

- Create a `.txt` file in the same directory as the source, with the same base name
- Example: `resume/resume.md` -> `resume/resume.txt`

### Conversion Rules

1. **Bullets** - Replace markdown list markers (`-`, `*`, `+`) with unicode bullet characters (bullet `•`, dash `–`, equals `=`) for visual hierarchy
2. **Links** - Strip markdown link syntax `[text](url)` but preserve the display text; include URLs only where they are relevant to the reader
3. **Bold/Italic** - Remove `**`, `*`, `__`, `_` markers while keeping the enclosed text
4. **Headings** - Remove `#` markers; use UPPERCASE or visual separators to denote sections
5. **Separators** - Add unicode line separators or blank lines between major sections for readability
6. **Code blocks** - Remove backtick fencing, keep the content
7. **Tables** - Convert to aligned plain text or simple delimited format
8. **Preserve structure** - Maintain the overall document hierarchy and whitespace layout

### Process

1. Read the source `.md` file
2. Apply conversion rules above
3. Write the result to the `.txt` output path
4. If the `.txt` file already exists, overwrite it

### Response to User

Report:
- Source file path
- Output file path
- Confirmation that conversion is complete
