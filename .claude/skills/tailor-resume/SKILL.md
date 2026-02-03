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

### 3. Create Tailored Resume

Copy base resume structure and tailor these sections:

#### Summary (Paragraph 1)
- Keep core identity: "Engineering Leader with X years of experience..."
- Adjust emphasis based on engineering domain (Product vs Platform vs DevOps)
- Highlight relevant product domain experience if applicable
- Add specific keywords from job requirements
- Keep it concise (3-4 sentences max)

**Example patterns:**
- Platform roles: emphasize "scalable systems", "infrastructure", "architecture"
- Product roles: emphasize "product delivery", "cross-functional collaboration", "customer impact"
- EdTech: add "learning" or "education impact" if relevant
- Legal tech: add "compliance", "security", "data protection"

#### Core Competencies (Bulleted List)
- Reorder bullets to put most relevant skills first
- Add domain-specific competencies if missing but justified by experience
- Adjust wording to match job posting language
- Keep 8-10 bullets maximum

**Prioritization:**
1. Skills explicitly mentioned in Required Qualifications
2. Skills that address identified Gaps (if candidate has related experience)
3. Domain-specific skills (e.g., "Remote team leadership" for remote roles)
4. Core engineering management skills

#### Experience Section
- Keep all roles and dates unchanged
- Rewrite accomplishment bullets to emphasize relevant experience
- Add context where it addresses gaps (e.g., "payroll" for payroll-adjacent roles)
- Quantify impact where possible
- Keep 4-6 key accomplishments per role

**Bullet rewriting guidelines:**
- Lead with outcomes, not activities
- Use job posting language where natural
- Emphasize scale and complexity for senior roles
- Highlight relevant technical skills in context

### 4. Quality Checks

Before saving, verify:
- ✓ Summary mentions relevant domain/product area
- ✓ Core Competencies are reordered for job relevance
- ✓ No fabricated experience or skills
- ✓ All dates and facts match base resume
- ✓ Formatting is consistent with base resume
- ✓ File is valid markdown

### 5. Verification

Perform a three-part verification before saving:

#### 5a. Structure Verification

Compare the tailored resume against the base resume to ensure:
- All sections from the original are present (Summary, Core Competencies, Experience, Skills, Education)
- Section order matches the original
- Number of experience entries matches
- No new sections were added

**If structure differs:** Fix discrepancies before proceeding.

#### 5b. Content Audit

Cross-reference every skill, technology, and accomplishment in the tailored resume against the base resume:
- Every Core Competency must map to an existing competency (reworded is OK, invented is not)
- Every technology mentioned must appear in the original or be clearly derived from stated experience
- Every accomplishment must be traceable to the original (rephrased for emphasis is OK, fabricated is not)

**If fabricated content found:** Remove it and use only content from the base resume.

#### 5c. Improvement Assessment

Compare the tailored resume against the job posting requirements and report:
- **Requirements Addressed**: List which job requirements are now better highlighted
- **Gaps Remaining**: List requirements that couldn't be addressed (no relevant experience exists)
- **Keywords Matched**: Count of job posting keywords now present in the tailored resume

Record this assessment for output to the user (do NOT include in the resume file).

### 6. Save Tailored Resume

Save to: `jobs/{Company}/resume.md`

### 7. Response to User

Respond with:

**Success message:** "Tailored resume created at jobs/{Company}/resume.md"

**Key changes summary (2-3 bullets):**
- What was emphasized in Summary
- How Core Competencies were reordered
- What experience was highlighted

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
- Detailed change log

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
