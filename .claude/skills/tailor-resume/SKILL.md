---
name: tailor-resume
description: Create tailored resume from job screening file. Use when user asks to tailor resume, customize resume for job, or create job-specific resume.
---

# Tailor Resume Skill

Generate a tailored resume optimized for a specific job posting.

## Instructions

This skill creates a customized resume that emphasizes relevant experience and skills based on a job screening file.

### Inputs

- Job screening file path: `jobs/{Company}/{Job Title}.md`

**Example usage:**
- "Tailor resume for Coursera"
- "Create tailored resume for the Clio job"
- "Customize resume for EvenUp Engineering Manager role"

### Output

Tailored resume saved to: `jobs/{Company}/resume.md`

---

## Process Steps

### 1. Read Source Files

Read these files in parallel:
- Base resume: `resume/resume.md`
- Job screening file: `jobs/{Company}/{Job Title}.md`
- Company research file (if present): `jobs/{Company}/company.md`

### 2. Analyze Job Requirements

From the job screening file and company research, extract:
- **Engineering Domain**: Product, Platform, DevOps/SRE, etc.
- **Product Domain**: EdTech, Legal tech, Fintech, Healthcare, etc.
- **Qualifications**: Must-have nad optional skills and experience
- **Gaps**: Areas where candidate doesn't match requirements
- **Tech Stack**: Specific technologies mentioned
- **Key Responsibilities**: What the role entails

### 3. Draft All Proposed Changes

Before writing anything, draft a complete list of proposed changes across all sections. For each change, record:
- **Section**: which part of the resume (Summary, Core Competencies, Experience role+bullet)
- **Rationale**: why this change improves job fit
- **Before**: exact original text
- **After**: proposed replacement text

Group changes by section in this order:
1. Summary
2. Core Competencies (reordering counts as a change)
3. Experience bullets (per role, oldest to newest)

**Rules while drafting:**
- Summary: keep core identity, adjust emphasis and keywords
- **Director roles**: reframe resume title as "Engineering Leader" (not "Engineering Manager")
- Core Competencies: reorder for relevance, rephrase to match job language, keep 8-10 bullets
- Experience: rewrite bullets to lead with outcomes, use job posting language, keep 4-6 per role
- No fabricated content - every change must be traceable to the base resume

### 4. Interactive Change Review

Present each proposed change to the user one at a time using `AskUserQuestion`. Do NOT batch multiple changes into one question.

**Format for each change:**

Show the user:
- Section label (e.g., "Summary", "Core Competencies", "Experience - Toptal")
- Brief rationale (1 sentence)
- Before/After comparison

**Options to offer:**
- **Apply** - use the proposed change
- **Skip** - keep original text for this item
- **Edit** - user provides their own version (follow up with a free-text prompt if selected)

Wait for the user's response before moving to the next change.

**After all changes are reviewed:** Confirm with a brief summary ("X of Y changes applied") before assembling the resume.

### 5. Assemble and Verify Tailored Resume

Build the final resume by applying only the approved changes to the base resume. Then verify:

#### 5a. Structure Verification

- All sections present (Summary, Core Competencies, Experience, Skills, Education)
- Section order matches the original
- Number of experience entries matches
- No new sections added

**If structure differs:** Fix before proceeding.

#### 5b. Content Audit

- Every Core Competency maps to an existing one (reworded is OK, invented is not)
- Every technology mentioned appears in the original or is clearly derived from stated experience
- Every accomplishment is traceable to the original

**If fabricated content found:** Remove it.

#### 5c. Improvement Assessment

Compare against job posting requirements:
- **Requirements Addressed**: which job requirements are now better highlighted
- **Gaps Remaining**: requirements that couldn't be addressed
- **Keywords Added**: count of job-specific terms incorporated

Record this for the final response (do NOT include in the resume file).

### 6. Save Tailored Resume

Save to: `jobs/{Company}/resume.md`

### 7. Response to User

Respond with:

**Success message:** "Tailored resume saved to jobs/{Company}/resume.md"

**Tailoring Notes (from Step 5c):**

```
Requirements Addressed:
- [Requirement] - highlighted via [which section/bullet]

Gaps Remaining:
- [Requirement] - no relevant experience to highlight

Keywords Added: [count] job-specific terms incorporated
```

**Do not include:**
- Full resume text in response
- Redundant list of changes already reviewed interactively

---

## Important Notes

### What to Tailor

**DO tailor:**
- Summary emphasis and keywords
- Core Competencies ordering and phrasing
- Experience section bullet emphasis and ordering
- Technology mentions (add context for similar tech)

**DO NOT tailor:**
- Job titles or dates
- Company names
- Fundamental facts or accomplishments
- Create skills/experience that doesn't exist

### Addressing Gaps

When job requires skills/experience candidate lacks:
- **If related experience exists**: Emphasize it and add relevant context
  - Example: Java requirement + C# experience → mention "strong OOP background in C# with rapid language acquisition ability"
- **If no related experience**: Don't fabricate; focus on transferable skills
  - Example: Legal tech + no legal experience → emphasize "compliance", "security", "regulated environments"

### Tone Consistency

Maintain the professional, results-oriented tone of the base resume:
- Lead with outcomes and impact
- Quantify results where possible
- Balance technical depth with leadership
- Avoid corporate buzzwords and fluff

---

## Examples

### Example 1: Platform Role in EdTech

**Input:** `jobs/Coursera/Engineering Manager.md`

**Key Changes:**
- Summary: Added "platform infrastructure" and "scalable systems" emphasis
- Core Competencies: Moved "System architecture & optimization" to top
- Experience: Highlighted platform modernization and microservices work

### Example 2: Product Role with Remote Requirement

**Input:** `jobs/Wagepoint/Engineering Manager.md`

**Key Changes:**
- Summary: Added "remote engineering teams" in opening line
- Core Competencies: Added "Remote team leadership" as first bullet
- Experience: Emphasized distributed team management and async collaboration
