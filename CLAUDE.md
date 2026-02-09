# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a personal job search repository for Ilia Gourianov, a Software Engineering Manager with over 20 years of IT experience (14 years as a developer, 8 years as a manager). The repository contains resume materials, cover letters, interview preparation documents, and job search resources.


## Language Rules

- User knows Russian and English languages - do not translate between those unless explicitly requested
- Respond in the terminal in the same language the user writes in
- Output results of analysis (job postings, company research, etc) in the language of the source

## Key Files

- `resume/resume.md` - Main resume in English (source of truth)
- `resume/resume.ru.md` - Main resume in Russian
- `resume/seo.txt` - SEO keywords embedded in PDF metadata
- `jobs/` - Job postings organized as `jobs/{Company}/{Title}.md`. Active postings only - the ones I have applied to and expecting a response.
- `jobs/{Company}/resume.md` - Tailored resumes for specific companies
- `jobs/{Company}/company.md` - Company research notes
- `jobs-archive/` - job postings move here from the `jobs` folder after rejection or ghosting 
- `LinkedIn/posts/` - LinkedIn post drafts and editorial versions
- `archive/` - Archived cover letters, interview questions, and other historical materials


## File Format Conversions

**Converting Markdown to Plain Text:**

- Create a new file in the same folder with `.txt` extension
- Replace markdown formatting with plain text equivalents
- Use unicode bullet characters (bullet, dash, equals) in place of markdown bullets and for visual separation
- Strip markdown links but preserve URLs where relevant
- Remove bold/italic markers while keeping the text
- Add visual separators for readability

**Example:** `resume/resume.md` → `resume/resume.txt`

**LinkedIn Post Editorial Process:**

- **Do not overwrite original text** - Add editorial version below the original, separated by a line
- **Maximize engagement** - Structure content to drive comments, shares, and discussion
- **Be brief and concise** - LinkedIn readers scan quickly; get to the point
- **Use unicode emojis sparingly** - 2-4 emojis max for visual emphasis, not decoration
- **Use plain text only** - No markdown formatting (no **, *, #, etc.), no em dashes
- Focus on: hook -> value -> call-to-action

**Source file location:** `LinkedIn/posts/`

## Tone and Style

When generating content for this candidate:
- Professional but approachable
- Focus on results and measurable impact
- Balance technical depth with leadership experience
- Emphasize full-stack management capabilities (people + product + technical)
