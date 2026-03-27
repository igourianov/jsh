# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a personal job search repository for Ilia Gourianov, a Software Engineering Manager with over 20 years of IT experience (14 years as a developer, 8 years as a manager). The repository contains resume materials, cover letters, interview preparation documents, and job search resources.


## Language Rules

- User knows Russian and English languages - do not translate between those unless explicitly requested
- Respond in the terminal in the same language the user writes in
- Output results of analysis (job postings, company research, etc) in the language of the source

## Key Files

- `resume/` - Base resume (source of truth) and context
- `pdf/` - output folder for generated resume PDFs
- `jobs/` - Job postings organized by company folder. Active postings only - the ones I have applied to and expecting a response.
	- `jobs/{Company}/{job_title}.md` - Result of the job screen and match against base resume
	- `jobs/{Company}/resume.md` - Tailored resumes for specific companies
	- `jobs/{Company}/company.md` - Company research online
	- `jobs/{Company}/notes.md` - Notes about application and interview process. Questions, issues, log of actions.
	- `jobs/{Company}/{recruiter_name}.md` - conversation thread with recruiter extracted from email or LinkedIn message. Used for logging and drafting responses.
- `jobs/black-list.md` - Companies and recruiters to avoid. Check this list during job screening before proceeding.
- `jobs-archive/` - job postings move here from the `jobs` folder after rejection or ghosting
- `LinkedIn-posts/{post_title}.md` - LinkedIn post drafts and editorial versions
- `LinkedIn-search/` - LinkedIn search instructions
- `recruiters/{recruiter_name}.md` - communication threads with individual recruiters extracted from email or LinkedIn messages, but not yet linked to a specific job posting.
- `archive/` - Archived cover letters, interview questions, and other historical materials


## LinkedIn Posts

- **Do not overwrite original text** - Add editorial version below the original, separated by a line
- **Maximize engagement** - Structure content to drive comments, shares, and discussion
- **Be brief and concise** - LinkedIn readers scan quickly; get to the point
- **Use unicode emojis sparingly** - 2-4 emojis max for visual emphasis, not decoration
- **Use plain text only** - No markdown formatting (no **, *, #, etc.), no em dashes
- Focus on: hook -> value -> call-to-action

**Source file location:** `LinkedIn/posts/`

## Workflow Rules

- **Always use the `commit` skill when the user says "commit".** Never manually run git add/commit/push.

## Tone and Style

When generating content for this candidate:
- Professional but approachable
- Focus on results and measurable impact
- Balance technical depth with leadership experience
- Emphasize full-stack management capabilities (people + product + technical)
