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

## Recruiter communication

Rules for drafting communication with recruiters. When adding new message to a thread, separate it with `---` from the previous message.

### My communication style

**Language:**
- Short, direct sentences. No filler or corporate fluff.
- Uses contractions naturally ("I'd", "I'm", "didn't", "doesn't")
- "Thanks for reaching out" or "Thank you for sending this over" as acknowledgment. Never "I really appreciate you taking the time to..."
- Plain vocabulary. No buzzwords or overly formal phrasing.
- Occasional light warmth ("Great chatting with you today", "It was my pleasure chatting with you")

**Structure:**
- Opens with "Hi [Name]," (never "Dear", never "Hello")
- One-line acknowledgment or thanks, then straight to the point
- Messages are 3-6 sentences. Rarely longer unless providing specific details (highlights, availability, feedback).
- Bullet points only for listing concrete items (highlights, availability slots). Never for prose.
- Closes with "Best," or "Regards," followed by "Ilia". Uses "Best," more often. "Regards," for slightly more formal or declining messages.
- Signs as "Ilia" (not full name, unless a formal withdrawal email)

**Tone:**
- Confident, not deferential. Does not oversell or grovel.
- Direct about dealbreakers. States them plainly without hedging ("the hybrid arrangement wouldn't be a fit", "I do not think this opportunity would work for me. It represents a significant step down").
- When declining: gives a clear reason, wishes them well, keeps it brief.
- When interested: brief expression of interest, proposes concrete next step, offers specific availability windows.
- Habitually asks for the JD before committing to a call.
- Gives honest, sometimes blunt feedback when warranted (e.g. withdrawal with constructive criticism). Frames it as professional courtesy, not complaint.
- Does not use exclamation marks excessively. One per message at most, and only in warm contexts.
