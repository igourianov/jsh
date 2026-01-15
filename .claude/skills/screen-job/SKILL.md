---
name: screen-job
description: Complete job screening workflow - parse, match. Use when user says "screen job" or provides job posting URL for analysis.
context: fork
---

Screen job: $ARGUMENTS

## Step 1: Fetch Job Posting

Determine input type:
- **Lever URL** (contains jobs.lever.co): Use lever-parser.js script with Bash
  - First ensure dependencies are installed: `cd .claude/skills/screen-job && npm install`
  - Then run: `node lever-parser.js <url>`
  - Script extracts JSON and outputs to stdout
- **Other URL** (starts with http/https): Use WebFetch to retrieve content
- **File path** (e.g., temp.txt): Use Read to load content

## Step 2: Parse Metadata

Extract the following from the job posting:

1. **Title** - Two forms:
   - Full original title (for filename)
   - Normalized title (for heading)

2. **Company** - Two fields:
   - Company name (actual employer)
   - Posted by: "Direct" or agency name

3. **Engineering Domain** - Product, DevOps/SRE, Platform, etc.

4. **Product Domain** - Fintech, Healthcare, B2C, etc.

5. **Location** - Remote, Hybrid, Office

6. **Salary Range** - Include if stated, otherwise estimate with "(estimated)"

7. **Posted Date** - Use exact date or current month/year

8. **Hands-on %** - Technology-focused activities vs people management (20-80%)

9. **Coding %** - Specifically writing production code (0-60%)
   - 0% signals: broad tech options with "or"/"such as", "leverage experience" language
   - >0% signals: specific required stack, "writing code", "implementing features"

10. **Required Qualifications** - Must-haves

11. **Optional Qualifications** - Nice-to-haves

12. **Summary** - Succinct overview, no corporate fluff

13. **Company Description** - From job posting only (200 words max)

## Step 3: Evaluate Match

Read `resume/resume.md` and evaluate fit.

**Approach:**
- Assume recruiter role with bias towards rejection
- Be critical but don't invent non-existent gaps

### Calculate Match Percentage (0-100%)

Consider:
- Experience alignment
- Skills match
- Domain knowledge
- Tech stack alignment

### Identify Gaps

**IMPORTANT - Only flag actual gaps:**
- NEVER flag unknown/unspecified information
- Only flag when job EXPLICITLY requires something candidate lacks
- **Parse requirements by core statement, not examples**: When a requirement says "experience with X (A, B, C, etc.)" the core requirement is X, and the parenthetical list illustrates X. Example: "modern programming languages (PHP, Python, Go, etc.)" means any modern language qualifies - C# counts.
- Tech stack gaps ONLY when job states their actual stack as a specific requirement, not example lists
- Note domain gaps only when domain is explicitly stated
- **DO NOT flag general degree requirements (Bachelor's in CS/Engineering) if candidate exceeds required years of experience** - 20 years experience >> 5 years requirement, degree becomes irrelevant
- Flag Quebec-based companies for likely French requirement
- Note location misalignment if relevant

### Identify Strengths

Succinct bullet-point list (3-5 bullets) of candidate strengths that align with the role.

**Avoid fluff words**: No "exceptional," "proven," "strong," "excellent," etc. - state facts and numbers only.

## Output

Save to `jobs/{Company}/{Full Original Title}.md`:

```markdown
# {Normalized Title} | {Engineering domain} | {Product domain}

**URL:** {original job URL, if present} \
**Company:** {Company Name} \
**Location:** {Location} \
**Salary Range:** {Range or "Not specified" or "$X-$Y (estimated)"} \
**Hands-on:** {Z}% | **Coding:** {X}% \
**Posted:** {Date} \
**Match:** {X}%

## Gaps
- **{Category}:** {gap description}
- {or "No significant gaps identified"}

## Strengths
- **{Category}:** {strength description}
- **{Category}:** {strength description}
- **{Category}:** {strength description}

## Summary

{role summary}

## Required Qualifications

- {qualification 1}
- {qualification 2}

## Optional Qualifications

- {qualification 1}
- {qualification 2}

## Company

{Company description from job posting, 200 words max}
```

**Category examples:** Leadership experience, Tech stack, Product domain, Culture fit, Location, Education, Specific skill name, etc.

**Notes:**
- Use `jobs/_/{Title}.md` if company cannot be determined (agency postings)
- Strengths should be 3-5 succinct bullet points highlighting what aligns well with the role

## Response

```
Screening complete: jobs/{Company}/{Title}.md
Match: {X}% | {One-line take}
```
