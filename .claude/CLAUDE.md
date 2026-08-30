# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is Ilia Gourianov's personal job search repository: resume materials, cover letters, interview preparation documents and job search resources.

`resume/resume.md` is the single source of truth for career facts (titles, dates, tenure, scope, tech). Never restate them here or infer them from memory. Read the resume.


## Language Rules

- Respond in the terminal in the same language the user writes in
- Output results of analysis (job postings, company research, etc) in the language of the source

## Key Files

- `resume/` - Base resume (source of truth) and context
- `roles/engineering-leader.md` - Baseline qualification profile: what every engineering leadership posting asks. Used by screen-job to filter boilerplate out before matching against the resume, so only job-specific factors are scored. See Screening baseline.
- `pdf/` - output folder for generated resume PDFs
- `scripts/job.mjs` - Job application state machine. Only writer of Status and Progress. See Status Tracking.
- `jobs/` - All company folders. Permanent location, files never move.
	- `jobs/{Company}/{job_title}.md` - The complete record of one application: screen and match against base resume, Status and Progress fields, and the `## Log` narrative.
	- `jobs/{Company}/resume.md` - Tailored resumes for specific companies
	- `jobs/{Company}/company.md` - Company research online
	- `jobs/{Company}/notes.md` - Company-scoped notes only. Anything tied to one application belongs in that application's `## Log`.
	- `jobs/{Company}/{recruiter_name}.md` - conversation thread with recruiter extracted from email or LinkedIn message. Used for logging and drafting responses.
- `jobs/black-list.md` - Companies and recruiters to avoid. Check this list during job screening before proceeding.
- `jobs-active/` - Directory junctions to active company folders in `jobs/`. Gitignored. Used as a lean view of current applications.
- `LinkedIn-posts/{post_title}.md` - LinkedIn post drafts and editorial versions
- `LinkedIn-search/` - LinkedIn search instructions
- `recruiters/{recruiter_name}.md` - communication threads with individual recruiters extracted from email or LinkedIn messages, but not yet linked to a specific job posting.
- `archive/` - Archived cover letters, interview questions, and other historical materials

## Job posting notes

Whenever I make statements about the application process, the job, an interview or the company, save them. Which file depends on scope.

**Application-scoped** goes in the screening file's `## Log`: rounds, outcomes, what was said in an interview, why a specific role died.

**Company-scoped** goes in `jobs/{Company}/notes.md`: research, Glassdoor findings, key contacts, the published interview process, overall impressions, lessons that carry across roles.

A company can have many applications, so anything tied to one role must live with that role. When in doubt, ask whether the note would still be true if you applied to a different job at the same company. If yes, it is company-scoped.

### `## Log` in the screening file

Sits at the bottom of the screening file. One `###` heading per round, matching a Progress entry exactly by date and stage:

```
## Log

### 2026-04-21 Recruiter screen

- Interviewer: Karman (Technical Recruiter)
- Expected range: $210-220k CAD base, no bonus
- Confidence: pretty positive
```

`check` enforces the match, so log the entry with `job.mjs log` first, then write the narrative under it.

**Within each round, capture:**
- **Key information** - Salary, team size, reporting structure, tech stack, next steps. Bullet points, not prose.
- **Process observations** - How the interview was run, scheduling quality, interviewer preparedness. Honest and unfiltered.
- **Confidence level** - A gut-feel rating (e.g. "Confidence: Low", "Very positive conversation")
- **Concerns / Red flags** - Anything that raised doubts. Can include interviewer quality, org signals, Glassdoor findings.
- **Green flags** - Positive signals worth noting.

There is no `## Outcome` section any more. The terminal Progress entry is the outcome, and its narrative goes under the matching `###` heading.

**Screening file structure.** `.claude/skills/screen-job/output-template.md` is the shape, placeholders and all. Read it rather than a description of it, whether writing a file or parsing one. Do not invent sections it does not carry.

Two things it cannot tell you:

**Which files are screening files.** Any `.md` under `jobs/` carrying a `- **Status:**` field above the first `##`. Same test `job.mjs` uses, and it excludes `notes.md`, `company.md` and recruiter threads.

**Which to exclude from statistics.** 84 or so files predate the current screen format. Detect them by the absence of `(weight:` and `(baseline)` annotations under `## Qualifications`, or by a `## Gaps`, `## Alignment`, `## Required Qualifications` or `## Optional Qualifications` heading. Their match numbers are on the pre-baseline scale and must never be aggregated, sorted or averaged together with current ones. They are legacy, left alone rather than migrated.

### Screening baseline

`roles/engineering-leader.md` is a closed whitelist of leadership boilerplate, keyed to a grade (Technical Lead, Manager, Director). `screen-job` splits every extracted qualification against it, and the two tiers read differently:

- `(baseline)` - boilerplate. No weight, no match value, excluded from the number. Kept in the file for reference and for `tailor-resume`.
- `(weight:X%, match:Y%)` - job-specific. Weights are renormalized across these alone, so they sum to 100 and are the entire match.

Both tiers live under one `###` heading per category. Categories are never split by tier.

**Match numbers under this format are not comparable to older ones and will be much lower.** 20-50% is normal.

**Sections in `notes.md`** (company-scoped, no dates in headings):
- `## Research` - What the company does, funding, org signals, Glassdoor.
- `## Key Contacts` - Recruiters and hiring managers, with LinkedIn URLs.
- `## Interview Process` - The published or reported loop, when it applies to the company rather than one role.
- `## Impressions` - Overall gut-feel summary of the company.
- `## Lessons` - What to do differently next time. Survives the application it came from.

### Interview prep

Prep goes to the narrowest scope it is still true at:

| Scope | Where | Example |
|---|---|---|
| Every interview, any company | `interview.md` (repo root) | "About Me", "Why I'm Interested", standing talking points |
| One company, any role there | `jobs/{Company}/notes.md` `## Questions` | PE exit timeline, org stability, comp bands |
| One application | screening file `## Questions` | Questions raised by this posting, and for any round of it |

There is no per-round prep section. `## Questions` is one living list for the whole application, regardless of what is scheduled: prep is reused across rounds, and splitting it per round only forces you to move it every time something gets booked.

The split that matters is direction, not scope. `## Questions` is forward-looking and mutable, pruned as things get answered. `## Log` is backward-looking and append-only. When a question is answered on a call, the answer is part of what happened, so it goes in that round's `###` block and the question leaves the list.

`check` only constrains `###` headings of the form `YYYY-MM-DD Stage`, so `####` sub-blocks inside a round are free-form if you want to group its notes.

**When to write:**
- After every recruiter/interviewer interaction, log the stage with `job.mjs log`, then write observations under its `###` heading
- When the user shares information about the process, company or role in conversation, save it to the right scope
- When an application closes, log the terminal stage and write why underneath it

**Style:**
- Bullet points for observations. Short, direct, opinionated.
- No sugarcoating. Personal impressions are honest ("Sweat shop vibes", "interviewer doesn't know how to run inetrviews", "Low confidence, low excitement").
- Dates in ISO format (2026-01-15).
- LinkedIn URLs for interviewers when known.

## Status Tracking

State lives in each screening file's metadata block:

```
- **Status:** Active
- **Progress:**
  - 2026-06-24 Saved
  - 2026-06-25 Applied
  - 2026-07-08 Contacted: recruiter screen booked for 2026-07-14
  - 2026-07-14 Recruiter screen
```

**Every entry is a fact about something that has already happened.** The log is a record, not a plan. An entry's stage names the event that occurred on that date, never an intention or a future action. A booked interview is not an entry; the recruiter reaching out to book it is, and the interview gets its own entry on the day it happens.

Anything forward-looking after the colon is incidental and has a shelf life. "booked for 2026-07-14" is useful until the call happens and is then just trivia.

The Progress log is the source of truth. There are no `Saved` or `Updated` fields: the first and last log dates carry them.

**Never hand-edit Status or Progress.** `scripts/job.mjs` is the only writer, which is what keeps the summary from drifting away from the history:

```
node scripts/job.mjs log <file> <stage> [--date YYYY-MM-DD] [--note "..."]
```

It appends the entry in date order, recomputes Status and validates the result.

### Status values

Derived, never set by hand.

| Status | Open | Meaning |
|---|---|---|
| `Saved` | yes | Recorded and evaluated, not applied to |
| `Applied` | yes | Submitted, no contact yet. Ghost clock running |
| `Active` | yes | Contact made: outreach, interviewing, awaiting result |
| `Passed` | — | I declined without applying |
| `Rejected` | — | They said no, no human contact |
| `Failed` | — | They said no after contact |
| `Ghosted` | — | No response for 21+ days |
| `Withdrew` | — | I pulled out mid-process |
| `Accepted` | — | Offer taken |

### Stages

| Rank | Stages |
|---|---|
| 0 | `Saved` |
| 1 | `Applied` |
| 2 | `Contacted`, `Recruiter screen`, `Hiring manager`, `Technical interview`, `Panel`, `Offer` |
| neutral | `Follow-up` |
| terminal | `Passed`, `Rejected`, `Failed`, `Ghosted`, `Withdrew`, `Accepted` |

Status is the furthest rank reached in the current cycle, or the terminal entry if the log ends in one.

- `Contacted` is any inbound approach from the company: a recruiter cold-reaching out, or reaching back after you applied to book a screen. It is the entry that moves a record to `Active`, because someone there engaged. A record that starts from outreach rather than a posting opens with it instead of `Saved`.
- `Follow-up` is outbound, so it does not reset the ghost clock. Chasing a silent application must not hide that it is dead.
- Reapplying appends to the same record. A terminal entry may be followed by `Saved`, `Applied` or `Contacted`, which reopens it.

### Rules

- New screen: one `Saved` entry, dated that day.
- User applies: `node scripts/job.mjs log <file> Applied`.
- Any round, outcome or outreach: log it with the stage and the date it happened.
- Recruiter reaches out to book a call: that is `Contacted`, dated the day they reached out. Put the booking in the note. Log the round itself on the day it takes place, with its notes.
- A note goes after a colon: `2026-07-09 Applied: asked $180K CAD on application form`. Use it sparingly; anything longer than a clause belongs under the entry's `###` heading in `## Log`.
- Ghost sweep is a query, not a judgment call: `node scripts/job.mjs ghost` lists anything silent past 21 days, `--apply` marks them.
- Blacklisting a company: add an entry to `jobs/black-list.md` with the reason. Do not touch Status.
- Never move company folders. The state machine tracks state, the filesystem does not.

### Junctions (`jobs-active/`)

Gitignored directory junctions pointing at companies with at least one open application. Fully derived, so never create or remove them by hand:

```
node scripts/job.mjs sync            # dry run
node scripts/job.mjs sync --apply
```

### Validation

```
node scripts/job.mjs check           # all records
node scripts/job.mjs list --open     # live pipeline
node scripts/job.mjs list --stale    # open and silent past 21 days
```

`check` runs automatically after edits under `jobs/`. If it reports a violation, fix it with `job.mjs log` rather than by editing the file.

## LinkedIn Posts

- **Do not overwrite original text** - Add editorial version below the original, separated by a line
- **Maximize engagement** - Structure content to drive comments, shares, and discussion
- **Be brief and concise** - LinkedIn readers scan quickly; get to the point
- **Use unicode emojis sparingly** - 2-4 emojis max for visual emphasis, not decoration
- **Use plain text only** - No markdown formatting (no **, *, #, etc.)
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
