# JobSearch

Personal job search workspace. Everything is plain markdown in git: the resume, one file per application, company research and recruiter threads. Custom skills to do the screening, matching, tailoring and note taking; a Node script controls application state transitions.

The point is to keep the whole pipeline in one reviewable place instead of scattered across a spreadsheet, an inbox and a dozen job boards.

## Workflow

1. **Screen** a job posting, score and write a screening file.
2. **Research** the company, if the role looks worth the time.
3. **Tailor** the resume to the posting and convert to a PDF.
4. **Log** every event: outreach, interviews, outcomes.
5. **Take notes** after each conversation, against the role or the company.
6. **Sweep** the pipeline for what's open, what's stale and what's been ghosted.

## Layout

| Path | Purpose |
|---|---|
| `resume/` | Base resume and candidate context |
| `roles/` | Baseline profile of a role family, used to filter boilerplate out of screening |
| `jobs/` | One folder per company: screening files, tailored resume, research, notes |
| `recruiters/` | Recruiter comms threads not yet tied to a posting |
| `scripts/job.mjs` | Application state machine |
| `pdf/` | Target and assets for PDF generation |
| `.claude/` | Workflow skills and the conventions Claude follows |
