---
name: parse-job
description: Parse job posting from URL or file and extract structured metadata
context: fork
agent: general-purpose
---

Parse job posting from: $ARGUMENTS

## Input Detection

Determine if input is:
- **URL** (starts with http/https): Use WebFetch to retrieve content
- **File path** (e.g., temp.txt): Use Read to load content

## Parsing Instructions

Extract the following structured metadata from the job posting:

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

## Output

Save structured job file to `jobs/{Company}/{Full Original Title}.md` with format:

```markdown
# {Normalized Title} | {Engineering domain} | {Product domain}

**URL:** {original job URL, if present} \
**Company:** {Company Name} \
**Location:** {Location} \
**Salary Range:** {Range or "Not specified" or "$X-$Y (estimated)"} \
**Hands-on:** {Z}% | **Coding:** {X}% \
**Posted:** {Date} \
**Match:** TBD

## Required Qualifications

- {qualification 1}
- {qualification 2}

## Optional Qualifications

- {qualification 1}
- {qualification 2}

## Summary

{role summary}

## Company

{company description from job posting - 200 words max}
```

**Notes:**
- Use `jobs/_/{Title}.md` if company cannot be determined (agency postings)
- Leave **Match:** as "TBD" - will be filled by match-resume skill
- Return company name for orchestrator to pass to next skills
