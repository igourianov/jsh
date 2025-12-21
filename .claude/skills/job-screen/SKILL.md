---
name: job-screen
description: Download, parse, and evaluate job postings against resume. Use when user says "screen job", "evaluate job", or provides a job posting URL for analysis.
---

# Job Screen Skill

Download, parse, and evaluate job postings against Ilia's resume.

## Instructions

This skill performs complete job screening: downloading job details and evaluating fit against the resume.

### Inputs

Accept any of these inputs:
- URL to job posting
- Text file with job description
- Job description text pasted directly

### Output

Single file at `jobs\{Company}\{Job Title}.md` containing job details and evaluation.

---

## Process Steps

### 1. Fetch and Parse Job Content

Extract the following metadata from the job posting:

**Title**
- **Full original title** (for filename): Keep complete title including team/product area
  - Example: "Software Engineering Manager, Catalog Interfaces"
- **Normalized title** (for H1 heading): Strip team/product area, keep only role level
  - Example: "Software Engineering Manager, Catalog Interfaces" → "Software Engineering Manager"

**Engineering Domain**
- Product, Sales growth engineering, DevOps/SRE, Platform, Observability Solutions, etc.

**Product Domain**
- Fintech, Healthcare, B2C sales, Social media, etc.

**Location**
- Work location (e.g., "Remote - US", "San Francisco, CA", "Hybrid - New York")

**Salary Range**
- Include if explicitly stated
- If not stated, provide **estimated range** based on role level, location, and market data
- Always note when salary is estimated: `(estimated)`

**Posted Date**
- Use exact date from posting if available (e.g., "December 5, 2025")
- Otherwise use current month and year (e.g., "December 2025")
- **IMPORTANT**: Always use year from posting or current year - never default to previous year

**Hands-on % and Coding %**

These are two SEPARATE concepts:

1. **Hands-on %**: Technology-focused activities vs people management
   - Includes: code reviews, architectural planning, system design, tech strategy, quality standards
   - Typical ranges:
     - People-focused EM: 20-40%
     - Balanced EM: 40-60%
     - Tech-lead EM: 60-80%

2. **Coding %**: Specifically writing production code (subset of hands-on)
   - Key signals for NO coding (0%):
     - Broad tech stack options listed interchangeably
     - "Leverage experience" language vs "implement" or "build"
     - Focus on team building and coaching
   - Key signals FOR coding:
     - Specific tech stack required
     - Explicit mentions: "writing code", "implementing features", "shipping code"
   - Typical ranges:
     - Pure people-focused EM: 0%
     - People-focused EM with some IC work: 10-20%
     - Tech-lead hybrid EM: 40-60%

**Required Qualifications**
- Bullet list of must-have qualifications, skills, experience

**Optional Qualifications**
- Bullet list of nice-to-have qualifications, preferred skills, bonus experience

**Summary**
- Concise overview of role in **200 words or less**
- Focus on: primary responsibilities, team structure, key outcomes

**Company**
- What company does (product/service)
- Industry/market, key projects/technologies
- **200 words maximum**
- **Do not include company name as heading**

### 2. Evaluate Job Against Resume

Read `resume/resume.md` as source of truth for candidate's experience.

**Evaluation approach:**
- Assume recruiter role
- Compare with bias towards rejection to identify genuine gaps
- Be critical, but don't invent non-existent gaps
- Highlight tech stack mismatches when job explicitly mentions specific tech requirements
- Be realistic about ramp-up time

**Calculate:**
- **Match %**: Overall fit considering experience, skills, domain knowledge, tech stack alignment
- **Gaps**: Specific missing qualifications
  - Prioritize critical gaps requiring significant ramp-up
  - Include tech stack mismatches ONLY when posting explicitly mentions specific tech requirements
  - Do NOT flag tech stack as gap if posting doesn't mention specific technologies
  - Note missing product or engineering domain experience where relevant
  - Do not consider degree requirements if experience requirement is met
  - Flag companies with primary offices in Quebec as likely requiring French language skills
  - Note location misalignment if relevant (e.g., hybrid in Toronto while candidate in Fort Erie)

### 3. Save Complete File

**Path format**: `jobs\{Company}\{Full Original Job Title}.md`

Create company subfolder if it doesn't exist.

**File format:**

```markdown
# {Normalized Job Title} | {Engineering domain} | {Product domain}

**URL** {original job URL, if present} \
**Company:** {Company Name} \
**Location:** {Location} \
**Salary Range:** {Range or "Not specified" or "$X-$Y (estimated)"} \
**Hands-on:** {Z}% | **Coding:** {X}% \
**Posted:** {Date} \
**Match:** {X}%

## Gaps

- {Critical gap 1}
- {Critical gap 2}
- {Technical mismatch}
- {Domain/experience gap}
...

## Summary

{200-word summary of the role}

## Required Qualifications

- {Required qualification 1}
- {Required qualification 2}
...

## Optional Qualifications

- {Optional qualification 1}
- {Optional qualification 2}
...

## Company

{200-word description of company, size, products, projects, industry. Do not include company name as heading}
```

### 4. Response to User

Respond ONLY with:
- Success status (e.g., "Job screening complete" or "Saved to [path]")
- Match percentage

**Do not include:**
- Detailed gap analysis in response
- Key highlights
- Commentary on match
- All details should only be in saved file

---

## Examples

**File paths:**
- `jobs\Zapier\Engineering Manager.md`
- `jobs\Meta\Engineering Manager - Infrastructure.md`
- `jobs\Instacart\Software Engineering Manager, Catalog Interfaces.md`
- `jobs\Grafana Labs\Engineering Manager.md`
