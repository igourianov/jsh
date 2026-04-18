---
name: tailor-resume
description: Create tailored resume from job screening file. Use when user asks to tailor resume, customize resume for job, or create job-specific resume.
---

# Tailor Resume Skill

## Purpose

Generate a tailored resume for a specific job posting. The output mirrors the base resume structure exactly, emphasizes points of alignment with the role, de-emphasizes gaps, and folds in ATS-friendly keywords from the screen file without fabricating skills or experience the candidate does not have.

## Inputs

**Required:**
- Base resume: `resume/resume.md`
- Candidate context: `resume/context.md`
- Job screen file: `jobs/{Company}/{Job Title}.md`

**Optional (use if present):**
- Company research: `jobs/{Company}/company.md`
- Raw job description text already loaded into the conversation context (pasted by user, or fetched earlier in this session). Use as supplemental signal alongside the screen file. Do not fetch URLs on the skill's own initiative.

## Output

Tailored resume saved to `jobs/{Company}/resume.md`. Overwrite any existing file at that path.

## Process

### Step 1. Load source material

Read the following in parallel:
- `resume/resume.md`
- `resume/context.md`
- `jobs/{Company}/{Job Title}.md`
- `jobs/{Company}/company.md` (if it exists)

If a raw JD is already present in the conversation context, note it and use it in Step 2.

### Step 2. Extract signal from the screen file and JD

From the screen file and any raw JD in context, extract:

- **Qualifications by category**: People management, Technical, Product management, Product domain, Baseline. Record the match percentage for each category.
- **Gaps**: any category below 100% match, plus any sub-bullet within a category that the candidate does not clearly satisfy.
- **Keywords**: the `## Keywords` list from the screen file, verbatim. This is the ATS keyword pool.
- **Tech stack**: languages, frameworks, cloud providers, databases, tools mentioned in the JD or screen file.
- **Role shape**: player/coach vs pure manager, platform vs product, regulated vs not, team size, reporting line, any unusual responsibilities.

### Step 3. Plan the tailoring edits

Do this internally. Do not show the plan to the user.

For each base resume section, decide what to change:

**Opening paragraph (summary under the header line).**
- Keep the core identity (Engineering Manager who builds teams and products, stays hands-on, champions AI-augmented development, deep SaaS and regulated industries expertise).
- Adjust emphasis to match the role's domain and responsibilities.
- Weave in 2-4 keywords that map to strong alignment areas.
- Header title rule: use `# Ilia Gourianov | Engineering Manager` when the target role is an Engineering Manager. For any other engineering leadership title (Director, Head of Engineering, VP, Team Lead, Tech Lead, Engineering Lead, Staff/Principal, etc.), use `# Ilia Gourianov | Engineering Leader` instead. The goal is to align the header with the level of the target role without misrepresenting seniority.

**Competencies section.**
- Keep the same top-level bullets as the base (People leadership, Technical leadership, Product delivery, Process, Tech stack).
- Reorder the top-level bullets so the most relevant bullet for this role comes first.
- Inside each bullet's inline list, reorder items so role-relevant ones come first.
- Rephrase items to use the JD's vocabulary where it maps cleanly to existing content.
- You may add keywords to an inline list only if they are synonyms of or clearly implied by items already present.
- Do not add new top-level bullets. Do not remove top-level bullets.

**Tech stack bullet specifically.**
- Reorder so technologies matching the JD come first.
- Allowed additions (synonym or direct implication): examples include adding "TypeScript" next to "JavaScript", "OOP" next to "C#", "IaC" next to "Terraform", "SRE practices" next to "Prometheus+Grafana", "observability" next to "Prometheus+Grafana".
- Forbidden additions: any language, framework, cloud provider, database, messaging system or tool not already in the base resume. Specifically never add Python, Go, Ruby, Rust, Scala, Java, GCP, DynamoDB, PostgreSQL, MongoDB, RabbitMQ, GraphQL, etc. if they are not already there.

**Experience entries.**
- Keep every entry from the base, in the same order.
- Keep the same company name, job title and date range for each entry exactly as written in the base resume. Do not rewrite or reframe any job title (e.g. do not change "Engineering Manager, Transformation" to "Platform Engineering Manager", do not change "Lead Developer" to "Tech Lead"). Do not alter dates. Do not split, merge, drop or reorder entries.
- Within each entry you may:
  - Reorder bullets so the most role-relevant ones come first.
  - Rephrase bullets to use the JD's language, keeping the underlying fact intact.
  - Emphasize numbers, scope and outcomes that map to the role.
- You must not add new bullets. You may drop a bullet only if it is not relevant to the target role.

### Step 4. ATS keyword pass

Walk the `## Keywords` list from the screen file, one keyword at a time:

1. Check if the keyword already appears somewhere in the drafted tailored resume. If yes, move on.
2. If missing, check whether the candidate has an existing resume item that is a synonym or a strong implication of the keyword.
3. If yes, insert the keyword in the most natural place. Prefer the competencies section or the tech stack bullet. Fall back to an experience bullet if the keyword is tied to a specific accomplishment.
4. If there is no synonym or implication in the base resume, skip the keyword.

Never add a keyword that represents a skill or technology the candidate does not have.

### Step 5. Ageism pass

Scan the drafted resume text and remove or rewrite any of the following:

- Total years of experience: "20+ years", "over two decades", "two decades of", "20 years of", "more than 20 years", etc.
- Age-signaling vocabulary: "seasoned", "veteran", "battle-tested", "throughout my career", "lifelong".
- Phrases implying long tenure: "since the early 2000s", "since the dot-com era", etc.

Do not alter dates on experience entries. Do not drop the earliest role. The base resume structure stays intact.

### Step 6. Verification

Before writing, self-check the draft:

- Top-level section headings match the base exactly: `# Ilia Gourianov | Engineering Manager` or `# Ilia Gourianov | Engineering Leader` per the header title rule, `# Competencies`, `# Experience`, plus the `### {Title} @ {Company} | {Dates}` sub-headings.
- Number of experience entries matches the base (currently 4: Engineering Manager Transformation, Engineering Manager Product, Lead Developer, Software Developer).
- Every Experience sub-heading is verbatim from the base resume: company name, job title and date range all match character-for-character. No job title was rewritten, reframed or abbreviated to match the target role.
- Every accomplishment, metric, customer and technology is traceable to the base resume. No invented outcomes, numbers, customers or technologies.
- No ageism-flagged phrase remains.
- Header title rule was applied correctly: `Engineering Manager` for EM roles, `Engineering Leader` for everything else (Director, VP, Head of Eng, Team Lead, Tech Lead, Engineering Lead, Staff/Principal).
- Every keyword that was added has a clear synonym or implication in the base resume.

If any check fails, fix the draft before writing.

### Step 7. Save

Write the tailored resume to `jobs/{Company}/resume.md` using the Write tool. Overwrite if it exists.

### Step 8. Respond to the user

Respond with:

1. Success line: `Tailored resume saved to jobs/{Company}/resume.md`
2. A short "Tailoring notes" block with three parts:
   - **Requirements addressed**: 3-6 bullets, each mapping a role requirement to the resume section or entry that now highlights it.
   - **Gaps remaining**: requirements that could not be addressed honestly. One line each.
   - **ATS keywords added**: a count plus a comma-separated list of the keywords that were inserted during Step 4.

Do not dump the full resume text into the response. Do not enumerate every wording change.

## Rules and constraints

**Do:**
- Mirror the base resume structure exactly: same headings, same order, same number of experience entries.
- Emphasize alignment by reordering and rephrasing existing content.
- Use the JD's vocabulary where it maps to real experience.
- Fold in screen-file keywords that are synonyms or clear implications of existing content.
- Reframe the top-of-resume header title as "Engineering Leader" for any non-EM leadership role (Director, VP, Head of Eng, Team Lead, Tech Lead, Engineering Lead, Staff/Principal).

**Do not:**
- Add or remove sections. Merge or split experience entries. Change any dates.
- Rewrite job titles inside the Experience section. Company names, job titles and date ranges on each role must match the base resume verbatim.
- Fabricate skills, technologies, outcomes, metrics, customers or responsibilities.
- State total years of experience or use age-signaling vocabulary.
- Run an interactive per-change review loop. Apply all edits in one pass and save.
- Fetch URLs on the skill's own initiative. Use only material already loaded into context.

## Examples

### Example 1: Platform role at an infra-heavy SaaS

Representative edits:
- Summary: swap "multi-tenant enterprise SaaS" emphasis toward "platform services and scalable systems". Weave in "microservices" and "zero-downtime deployments" as keywords.
- Competencies: move Technical leadership bullet to first position. Add "service decomposition" and "core platform services" to its inline list (both directly implied by the base resume).
- Experience: in the Transformation EM entry, move the monolith-decomposition and calculation-engine-extraction bullets to the top.

### Example 2: Product role at a B2B SaaS with strong people management emphasis

Representative edits:
- Summary: lead with people leadership and cross-functional partnership. Weave in "hiring", "scaling teams" and "eNPS" as keywords.
- Competencies: move People leadership bullet to first position. Reorder Product delivery inline list so "cross-functional partnership with Product, UX and Architecture" comes first.
- Experience: in the Product EM entry, move the "zero voluntary attrition for 6 consecutive years" and "promoted 12 engineers" bullets to the top.
