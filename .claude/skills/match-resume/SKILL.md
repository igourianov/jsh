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
- **DO NOT flag general degree requirements (Bachelor's in CS/Engineering) if candidate exceeds required years of experience** - 20 years experience >> 5 years requirement, degree becomes irrelevant
- Flag Quebec-based companies for likely French requirement
- Note location misalignment if relevant

### 3. Strengths Analysis

Succinct bullet-point list (3-5 bullets) of candidate strengths that align with the role.

## Output

Update the job file `jobs/{Company}/{Job Title}.md` by:

1. **Update Match % in header**: Change `**Match:** TBD` to `**Match:** {X}%`

2. **Insert evaluation section** after the header metadata (before "## Required Qualifications"):

```markdown
## Gaps
- **{Category}:** {gap description}
- **{Category}:** {gap description}
- {or "No significant gaps identified"}

## Strengths
- **{Category}:** {strength description}
- **{Category}:** {strength description}
- **{Category}:** {strength description}
```

**Category examples:** Leadership experience, Tech stack, Product domain, Culture fit, Location, Education, Specific skill name, etc.

**Notes:**
- DO NOT duplicate match percentage - only update it in the header
- DO NOT append to the bottom of the file - merge into header section
- Strengths should be 3-5 succinct bullet points highlighting what aligns well with the role
- Focus on experience, skills, and achievements that match job requirements
- **Avoid fluff words**: No "exceptional," "proven," "strong," "excellent," etc. - state facts and numbers only
- Be honest but fair in gap assessment
- Consider company research when evaluating culture fit
