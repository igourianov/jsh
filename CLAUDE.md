# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a personal job search repository for Ilia Gourianov, a Software Engineering Manager with over 20 years of IT experience (14 years as a developer, 8 years as a manager). The repository contains resume materials, cover letters, interview preparation documents, and job search resources.

**Git Repository**: Local repo

## General Rules

- User knows Russian language - do not translate between English and Russian unless explicitly requested
- Respond in the same language the user writes in

## Key Files

- `resume/resume.md` - Main resume in English (source of truth)
- `resume/resume.ru.md` - Main resume in Russian
- `resume/seo.txt` - SEO keywords embedded in PDF metadata
- `jobs/` - Job postings organized as `jobs/{Company}/{Title}.md`
- `jobs/{Company}/resume.md` - Tailored resumes for specific companies
- `jobs/{Company}/company.md` - Company research notes
- `LinkedIn/posts/` - LinkedIn post drafts and editorial versions
- `archive/` - Archived cover letters, interview questions, and other historical materials

## Candidate Profile Context

Use `resume/resume.md` as the source of truth regarding candidate's experience.

**Job Search Focus**: Remote Software Engineering Manager role, preferably in SaaS companies

## Skill Usage Requirements

**CRITICAL: When user requests workflow operations, ALWAYS use the corresponding skill:**

- User says "**commit**" → MUST use `Skill(commit)`, NEVER run git commands directly
- User says "**screen job**" → MUST use `Skill(screen-job)`
- User says "**tailor resume**" → MUST use `Skill(tailor-resume)`
- User says "**publish pdf**" or "**publish resume**" → MUST use `Skill(publish-pdf)`
- User says "**publish gist**" → MUST use `Skill(publish-gist)`
- User says "**cleanup seo**" or "**optimize seo**" → MUST use `Skill(cleanup-seo)`
- User says "**research company**" → MUST use `Skill(research-company)`

**Rationale:** Skills encapsulate full workflows with proper error handling, context gathering, and consistent output. Direct tool usage bypasses established processes and creates inconsistent behavior.

**Exception:** Only use tools directly when NOT explicitly requested by user or when debugging/investigating issues.

## Primary Workflow

The core job search pipeline follows this sequence:

1. **Screen job** (`screen-job`) - Fetch and parse job posting, evaluate match against resume
2. **Research company** (`research-company`) - Optional deep dive into company background
3. **Tailor resume** (`tailor-resume`) - Create customized resume for the role
4. **Publish PDF** (`publish-pdf`) - Generate PDF with SEO metadata
5. **Publish Gist** (`publish-gist`) - Optional: publish resume to public GitHub Gist

Each skill's SKILL.md contains full process details, output formats, and examples.

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
