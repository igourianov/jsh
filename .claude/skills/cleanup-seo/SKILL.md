---
name: cleanup-seo
description: Optimize SEO keywords file by removing redundant terms. Use when user says "cleanup seo", "optimize seo keywords", or "remove redundant SEO terms".
---

# Cleanup SEO Skill

Remove redundant terms from the SEO keywords file.

## Instructions

This skill optimizes `resume/seo.txt` by removing terms that are already contained within other terms.

### What It Does

Reads `resume/seo.txt` and removes any term that exists as a substring within another term (case-insensitive).

**Examples of removals:**
- Remove "API" because "API design" exists
- Remove "CI/CD" because "Continuous Integration/Continuous Deployment (CI/CD)" exists
- Remove "DevOps" because "Azure DevOps" exists
- Remove "ownership" because "End-to-end ownership" exists
- Remove "scale" because "Enterprise-scale" exists

### Process

1. Read all lines from `resume/seo.txt`
2. For each term, check if it appears as a complete word/phrase within any other term
3. If yes, mark it as redundant
4. Keep only non-redundant terms
5. Create backup at `resume/seo.txt.bak`
6. Save optimized list back to `resume/seo.txt`

### Execution

Simply run the Node.js script:
```bash
node .claude/skills/cleanup-seo/cleanup-seo.js
```

### Response to User

Report:
- Original count
- Optimized count
- Number of terms removed
- Backup file location
- List of removed terms

**Do not include:**
- Detailed analysis in response
- Only summarize the optimization results

### Important Notes

- Always creates backup before modifying
- Case-insensitive matching
- Preserves alphabetical ordering
- Only removes terms that are proper substrings of other terms
- Word boundary checking ensures meaningful containment
