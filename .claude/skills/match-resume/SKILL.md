---
name: match-resume
description: Evaluate job fit against resume and identify gaps
context: fork
agent: general-purpose
---

Evaluate job match for company: $ARGUMENTS

## Input Files

Read the following files:

1. **Job metadata**: `jobs/{Company}/*.md` (find the job file in company folder)
2. **Company research**: `jobs/{Company}/company.md` (if exists)
3. **Resume**: `resume/resume.md`

## Evaluation Approach

- Assume recruiter role with bias towards rejection
- Be critical but don't invent non-existent gaps
- Consider company research in overall assessment

## Calculate

### 1. Match Percentage (0-100%)

Consider:
- Experience alignment
- Skills match
- Domain knowledge
- Tech stack alignment
- Company culture fit (from research)

### 2. Gaps Analysis

Identify specific missing qualifications:

**IMPORTANT - Only flag actual gaps:**
- NEVER flag unknown/unspecified information
- Only flag when job EXPLICITLY requires something candidate lacks
- Tech stack gaps ONLY when job states their actual stack (not "or"/"such as" lists)
- Note domain gaps only when domain is explicitly stated
- Ignore degree requirements if experience requirement is met
- Flag Quebec-based companies for likely French requirement
- Note location misalignment if relevant

### 3. Match Analysis

Brief analysis of fit considering strengths and gaps.

## Output

Append evaluation to the job file `jobs/{Company}/{Job Title}.md`:

```markdown
---

## Match: {X}%

### Gaps
- {gap 1}
- {gap 2}
- {or "No significant gaps identified"}

### Match Analysis
{brief analysis of fit}
```

**Notes:**
- Update the **Match:** field in the job file header from "TBD" to actual percentage
- Be honest but fair in gap assessment
- Consider company research when evaluating culture fit
