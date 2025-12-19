# Job Screening Process

This guide defines the complete workflow for screening job postings: downloading, parsing, and evaluating them against Ilia's resume.

## Overview

**Job screening** is the combined process of:
1. **Downloading** a job posting and extracting structured metadata
2. **Evaluating** the job against the resume and appending match results

**Output:** Single file at `jobs/{Company}/{Job Title}.md` containing job details and evaluation.

---

## Process Steps

When given a job posting URL or text file:

1. **Fetch and parse** the job description content
2. **Extract metadata** according to the template below
3. **Evaluate** the job against the resume (see Evaluation section)
4. **Save** complete file with evaluation appended to `jobs\{Company}\{Job Title}.md`
5. Create company subfolder if it doesn't exist

---

# Part 1: Job Download

## Required Data Fields

Extract the following information from the job posting:

### Title
Extract both the full original job title and the normalized job title:

**Full original title** - Used for filename
- Keep complete title as listed in posting including team/product area
- Example: "Software Engineering Manager, Catalog Interfaces"
- Example: "Senior Engineering Manager - Signals Team"

**Normalized title** - Used for H1 heading in file (strips team/product area, keeps only role level)
- "Software Engineering Manager, Catalog Interfaces" → normalized: "Software Engineering Manager"
- "Senior Engineering Manager - Signals Team" → normalized: "Senior Engineering Manager"
- "Engineering Manager, Ads Platform" → normalized: "Engineering Manager"

### Job Domain
The area in which this role operates, e.g.:
- Fintech product engineering
- Sales growth engineering
- DevOps/SRE
- Platform
- Observability Solutions

### Location
Work location (e.g., "Remote - US", "San Francisco, CA", "Hybrid - New York")

### Salary Range
- Include if explicitly stated in the posting
- If not stated, provide an **estimated range** based on role level, location, and market data
- **Always note when salary is estimated**: `(estimated)`

**Example estimates:**
- Engineering Manager (Remote, US): $150,000 - $220,000 (estimated)
- Senior Engineering Manager (San Francisco): $180,000 - $260,000 (estimated)
- Director of Engineering (Remote, US): $200,000 - $300,000 (estimated)

### Hands-on and Coding Requirements

Estimate two separate percentages that describe the technical nature of the role:

#### Understanding Hands-on vs Coding

These are two SEPARATE concepts:

**1. Hands-on Technical Work** (Technology-focused activities)
Estimate what % of the role involves working on technology aspects (as opposed to people management, product management, communication, scheduling, administrative work).

Hands-on activities include:
- Writing code (production code)
- Code reviews
- Technical discussions with team
- Architectural evaluation and planning
- System design
- Technical strategy and evaluation
- Infrastructure/DevOps oversight
- Technology evaluation
- Establishing quality standards

**Typical Hands-on Percentages:**
- People-focused EM roles: **20-40% hands-on** (mostly code reviews, architecture discussions)
- Balanced EM roles: **40-60% hands-on** (mix of technical and people leadership)
- Tech-lead EM roles: **60-80% hands-on** (heavy technical involvement)

**2. Coding Requirement** (Subset of hands-on work)
Estimate what % of the role specifically requires writing production code.

Key signals:
- Look for explicit mentions of "writing code", "implementing features", "shipping code"
- "Participating in code reviews" = reviewing, NOT writing (does not count as coding)
- "Technical fundamentals" or "past coding experience" = requirement for background, not active coding
- "Leverage experience" language = technical credibility, NOT active coding

#### Key Signals for NO Coding (0%)
- Broad tech stack options listed interchangeably (e.g., "Java, Python, C#, C++")
- Language like "leverage experience" rather than "implement" or "build"
- Focus primarily on team building, coaching, and leadership
- No specific tech stack requirements

#### Key Signals FOR Coding
- Specific tech stack required (e.g., "must have Python experience")
- Explicit mentions: "writing code", "implementing features", "shipping code"
- Tech-lead or IC+Manager hybrid language

#### Typical Coding Percentages
- Pure people-focused EM roles: **0% coding**
- People-focused EM roles with some IC work: **10-20% coding**
- Tech-lead hybrid EM roles: **40-60% coding**

**Important:** Base coding estimate on the job posting's responsibilities, not the candidate's abilities.

### Required Qualifications
Bullet point list of must-have qualifications, skills, and experience.

### Optional Qualifications
Bullet point list of nice-to-have qualifications, preferred skills, and bonus experience.

### Summary
A concise overview of the role in **200 words or less**. Focus on:
- Primary responsibilities
- Team structure
- Key outcomes expected

### Company
Section with description including:
- What the company does (product/service)
- Industry/market
- Key projects or technologies
- **200 words maximum**
- **Do not include company name as heading** (already in metadata)

---

# Part 2: Job Evaluation

After parsing the job posting, evaluate it against Ilia's resume.

## Evaluation Approach

- Assume recruiter role
- Compare with bias towards rejection to identify genuine gaps
- Be critical, but don't invent non-existent gaps
- Highlight tech stack mismatches (e.g., C#/.NET vs Python, Azure vs AWS)
- Be realistic about ramp-up time requirements

## Evaluation Output

Calculate a **Match %** and identify **Gaps**:

- **Match %**: Overall fit considering experience, skills, domain knowledge, and tech stack alignment
- **Gaps**: Specific missing qualifications, experience, or skills
  - Prioritize critical gaps that would require significant ramp-up
  - Include tech stack mismatches
  - Note missing domain experience where relevant
  - Consider degree requirements if absent

---

# Complete File Format

```markdown
# {Normalized Job Title} | {Job domain}

**Company:** {Company Name} \
**Location:** {Location} \
**Salary Range:** {Range or "Not specified" or "Estimated: $X-$Y (estimated)"} \
**Hands-on:** {Z}% | **Coding:** {X}% \
**Posted:** {Date if available}
**Match:** {X}%

### Gaps

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
- {Required qualification 3}
...

## Optional Qualifications

- {Optional qualification 1}
- {Optional qualification 2}
- {Optional qualification 3}
...

## Company

{200-word description of company, products, projects, industry. Do not include company name as heading}

```

---

## File Naming Convention

- **Path format**: `jobs\{Company}\{Full Original Job Title}.md`
- **Company folder**: Use clean company name (e.g., "Meta", "Google", "Bamboo Rose", "Instacart")
- **File name**: Use full original job title from the posting
  - Keep team/product area context (e.g., "Catalog Interfaces", "Infrastructure", "Signals Team")
  - Only remove unsafe filesystem characters (e.g., `/`, `\`, `:`, `*`, `?`, `"`, `<`, `>`, `|`)
  - Preserve commas, hyphens, and other safe punctuation
  - Use title case
  - Example: `Software Engineering Manager, Catalog Interfaces.md`
  - Example: `Senior Engineering Manager - Signals Team.md`

**Note:** The normalized title (role level only) is used in the file's H1 heading, not the filename.

## Examples

- `jobs\Zapier\Engineering Manager.md`
- `jobs\Meta\Engineering Manager - Infrastructure.md`
- `jobs\Instacart\Software Engineering Manager, Catalog Interfaces.md`
- `jobs\Grafana Labs\Engineering Manager.md`
