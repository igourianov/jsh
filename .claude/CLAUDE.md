# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a personal job search repository for Ilia Gourianov, a Software Engineering Manager with over 20 years of IT experience (14 years as a developer, 8 years as a manager). The repository contains resume materials, cover letters, interview preparation documents, and job search resources.


## Language Rules

- User knows Russian and English languages - do not translate between those unless explicitly requested
- Respond in the terminal in the same language the user writes in
- Output results of analysis (job postings, company research, etc) in the language of the source

## Temp Files

When a script needs a JSON payload written to a temp file:

1. Create a temp file name in project root: `mktemp --dry-run --suffix=.json --tmpdir=$(pwd)` using `Bash` tool. It returns a path to a generated unique file as a single line.
2. Use the `Write` tool to save the JSON to the path returned by mktemp. The file doesn't exist yet, so it's safe to write without reading.
3. Run the script with that path, then delete the temp file: `<command-using-temp-path> && rm <temp-path>`

## Key Files

- `resume/` - Base resume (source of truth) and context
- `pdf/` - output folder for generated resume PDFs
- `jobs/` - All company folders. Permanent location, files never move.
	- `jobs/{Company}/{job_title}.md` - Result of the job screen and match against base resume. Contains Status and Progress fields.
	- `jobs/{Company}/resume.md` - Tailored resumes for specific companies
	- `jobs/{Company}/company.md` - Company research online
	- `jobs/{Company}/notes.md` - Notes about application and interview process. Questions, issues, log of actions.
	- `jobs/{Company}/{recruiter_name}.md` - conversation thread with recruiter extracted from email or LinkedIn message. Used for logging and drafting responses.
- `jobs/black-list.md` - Companies and recruiters to avoid. Check this list during job screening before proceeding.
- `jobs-active/` - Directory junctions to active company folders in `jobs/`. Gitignored. Used as a lean view of current applications.
- `LinkedIn-posts/{post_title}.md` - LinkedIn post drafts and editorial versions
- `LinkedIn-search/` - LinkedIn search instructions
- `recruiters/{recruiter_name}.md` - communication threads with individual recruiters extracted from email or LinkedIn messages, but not yet linked to a specific job posting.
- `archive/` - Archived cover letters, interview questions, and other historical materials

## Job posting notes

Whenever I make statements about job application process, job itself, interview or company - save them in the `jobs/{Company}/notes.md`

### Notes file structure

The notes file (`notes.md`) is a running log of everything related to a job application. It combines process tracking, interview notes, prep material and personal impressions in one place.

**Header:** `# {Company} - Notes`

**Sections are organized chronologically by interview round**, each as a `##` heading:
- Include the round type and date: `## Recruiter Screen - 2026-01-15`
- Include interviewer name (and LinkedIn URL when available)
- Optionally note duration, source (inbound/applied), call format (phone/video)

**Within each round, capture:**
- **Key information** - Salary, team size, reporting structure, tech stack, next steps. Bullet points, not prose.
- **Process observations** - How the interview was run, scheduling quality, interviewer preparedness. Honest and unfiltered.
- **Confidence level** - A gut-feel rating (e.g. "Confidence: Low", "Very positive conversation")
- **Concerns / Red flags** - Anything that raised doubts. Can include interviewer quality, org signals, Glassdoor findings.
- **Green flags** - Positive signals worth noting.

**Standalone sections (not per-round):**
- `## Alignment` or `## Strong Alignment` - How the role maps to resume strengths. Bullet points or numbered list.
- `## Questions` - Prepared questions for upcoming interviews. Numbered, specific, sometimes pointed.
- `## Outcome` - Final status (Rejected, Withdrew, Ghosted) with date. Brief explanation if relevant.
- `## Impressions` - Overall gut-feel summary of the company/process.

**Interview prep material** (optional, for promising roles):
- Talking points, STAR-method stories, closing statements
- Red flags to watch for during the interview
- Questions organized by category (Role, Culture, Technical, Growth)

**When to write:**
- After every recruiter/interviewer interaction, log observations immediately
- Before an interview, add prep questions and alignment notes
- When the user shares information about the process, company or role in conversation, save it to notes
- When an application reaches a final state, add an Outcome section

**Style:**
- Bullet points for observations. Short, direct, opinionated.
- No sugarcoating. Personal impressions are honest ("Sweat shop vibes", "interviewer doesn't know how to run inetrviews", "Low confidence, low excitement").
- Dates in ISO format (2026-01-15).
- LinkedIn URLs for interviewers when known.

## Status Tracking

Status and Progress fields live in each screening file's metadata block (the `- **Field:**` section at the top).

**Fields:**
- **Status** - `Screened` (default for new screens), `Active`, `Passed (2026-03-25)`, `Rejected (2026-03-25)`, `Ghosted (2026-03-25)`, `Withdrew (2026-03-25)`. Includes date when status changes to a terminal state. `Passed` is for jobs never applied to. `Withdrew` is for jobs where an application was in progress.
- **Progress** - last process step with date: `Applied`, `Recruiter screen (2026-03-25)`, `Tech interview (2026-04-01)`, `Offer (2026-04-10)`, etc. Applied date is optional since it's usually the same as Saved.

**Rules:**
- When user screens a new job: Status=Screened, Progress empty
- When user applies or says they applied: Status=Active, Progress=Applied
- Update Progress as the application advances through steps
- When an application reaches a terminal state: update Status to Rejected/Ghosted/Withdrew
- When user blacklists a company: add entry to `jobs/black-list.md` with reason. Do not change Status fields in screening files.
- Never move company folders between directories. Update the screening file fields instead.

**Junction management (`jobs-active/`):**
- `jobs-active/` contains Windows directory junctions pointing to active company folders in `jobs/`. It is gitignored.
- When activating a company: create junction via a temp .bat file:
  ```bash
  cat > tmp_mklink.bat << 'EOF'
  mklink /J "jobs-active\{Company}" "jobs\{Company}"
  EOF
  cmd //c "$(pwd)/tmp_mklink.bat" && rm tmp_mklink.bat
  ```
- When archiving a company: remove junction via a temp .bat file (bash `rmdir` doesn't work on Windows junctions):
  ```bash
  cat > tmp_rmdir.bat << 'EOF'
  rmdir "jobs-active\{Company}"
  EOF
  cmd //c "$(pwd)/tmp_rmdir.bat" && rm tmp_rmdir.bat
  ```
- When user says "archive company": update Status in screening file (Rejected/Ghosted/Withdrew), then check all screening `.md` files in the company folder. Only remove the junction if every screening file is in a terminal state (Passed/Rejected/Ghosted/Withdrew). If any screening file is still Screened or Active, keep the junction.
- Older screening files that lack a Status field entirely are treated as terminal state for junction cleanup purposes.

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
