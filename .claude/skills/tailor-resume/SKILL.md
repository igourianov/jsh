---
name: tailor-resume
description: Create tailored resume from job screening file. Use when user asks to tailor resume, customize resume for job, or create job-specific resume.
---

# Tailor Resume

Re-emphasize the base resume for one posting. Everything in the output traces back to the base resume: the tailoring is framing, ordering and vocabulary, never new facts.

## Step 1: Read inputs

### Job context

- `jobs/{Company}/{Job Title}.md` - the screen file. `## Qualifications`, `## Keywords` and `## Summary` carry the signal.
- `jobs/{Company}/company.md` and `jobs/{Company}/notes.md`, if they exist
- Raw JD text already in the conversation, if any. Do not fetch URLs on the skill's own initiative.

### Candidate context

Read `resume/context.md` for candidate context that isn't in the resume, then read the base resume matching the screen file's language, per its `## Language` table. Fall back to English.

## Step 2: Tailor

One pass, three kinds of edit. Anything not covered below stays identical to the base.

### Frame seniority to the target level

Set the header title to the one `resume/context.md` `## Role` gives for the posting's normalized title, in the resume's language. When the level is ambiguous, take the row that file marks level-neutral.

The header is only the label. Seniority is really carried by which scope facts lead: headcount, number of teams, whether leads or managers report in, breadth of influence. The base resume states these at several levels, so match the posting's.

- **Posting is senior, director, or leads multiple teams:** lead with the largest scope the base resume supports, and say it in the summary paragraph too, not only down in the entries.
- **Posting states a small or single team:** lead with single-team, hands-on, direct-delivery facts. Downplay multi-team and manager-of-managers scope: move it below, or drop the bullet whose only point is org-level breadth. Overshooting the stated scope reads as a mis-level and costs the screen.

Choosing which scope fact opens an entry is the whole mechanism. Never state a scope larger than the base resume gives it, and never reframe a historic title: company, title and dates stay verbatim, always.

### Reorder so the relevant comes first

Competencies top-level bullets, the inline list inside each one, the tech stack list, and the bullets within each experience entry. Ordering is the main tool for emphasis. You may drop a bullet that is irrelevant to the role. You may never add one.

### Use the JD's vocabulary

ATS filters match strings, not meaning, so `React.js` in the posting does not hit `ReactJS` in the resume. Walk `## Keywords` from the screen file plus anything named in the JD, technical or not, and for each one:

- **The resume already says it, in other words.** Rewrite the resume's wording into the JD's exact form: spelling, casing, punctuation, word order (`ReactJS` → `React.js`); carry both where the JD abbreviates (`Kubernetes (K8s)`). Same for prose, not just technology tokens. Facts, numbers and outcomes stay intact, only the wording changes.
- **The resume does not say it, but implies it.** A synonym or direct implication of something present: add it beside its source. Prefer competencies and the tech stack; use an experience bullet when it belongs to a specific accomplishment.
- **The resume has no basis for it.** Leave it out. Do not add it anywhere, in any phrasing. A keyword the filter misses costs less than a claim an interviewer catches. Report it under `Not addressed` instead.

### Never

- Invent or imply a technology, skill, metric, customer or responsibility not in the base resume. Any language, framework, cloud, database or tool absent from the base stays absent.
- Change structure: headings, section order, entry count and order, dates, titles, company names.
- State total years of experience, or use age-signaling wording (`seasoned`, `veteran`, `throughout my career`).
- Translate the base resume into another language.

## Step 3: Verify and save

Check the draft, fix what fails, then write it to `jobs/{Company}/resume.md`, overwriting. Same path in every language, and the resume stays in the base's language.

- Headings and experience entries match the base one for one, sub-headings verbatim.
- Every claim, number and scope statement traces to a base resume line.
- Every keyword is either a rewrite of a base resume token or a synonym of one.
- No JD technology the resume genuinely lacks appears anywhere.

### Response

```
{output path}

- Framed as: {target level, and the scope facts now leading}
- Keywords: {renamed: A -> B, ...} {added: comma-separated list}
- Not addressed: {requirements no honest edit could cover, one line each}
```

No resume text, no change log.
