# Job Screen Orchestration Model

This document describes the orchestration model for the job screening workflow with sequential agent execution.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 Custom Slash Command                         │
│                  (main entry point)                          │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              Step 1: Parse Input                             │
│         (determine if URL or file path)                      │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              Step 2: Job Parser Agent                        │
│                                                              │
│  - Extract title, company, salary                            │
│  - Extract requirements                                      │
│  - Generate structured metadata                              │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              Step 3: Company Research Agent                  │
│                                                              │
│   SKIP if:                                                   │
│   - jobs/{Company}/company.md exists, OR                     │
│   - Company is unknown/agency (e.g., Jobgether)              │
│                                                              │
│   Input: Company metadata from parser output                 │
│   Output: jobs/{Company}/company.md                          │
│                                                              │
│  - Web search for company info                               │
│  - Company profile and culture                               │
│  - Tech stack and engineering practices                      │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              Step 4: Job Matching Agent                      │
│                                                              │
│   Inputs:                                                    │
│   - Job parser output (metadata)                             │
│   - jobs/{Company}/company.md                                │
│   - resume/resume.md                                         │
│                                                              │
│   Outputs:                                                   │
│   - Match percentage                                         │
│   - Gaps analysis                                            │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              Step 5: Write Job Output                        │
│         jobs/{Company}/{Title}.md                            │
└─────────────────────────────────────────────────────────────┘
```

## Key Design Decisions

| Aspect | Recommendation |
|--------|----------------|
| **Execution** | Sequential - each agent runs after previous completes |
| **Data flow** | Parser output provides company metadata for research agent |
| **Company reuse** | Company research saved to `company.md` for reuse across multiple jobs |
| **Agent types** | `general-purpose` for all agents |
| **Error handling** | Orchestrator checks each agent output for failures before proceeding |
| **State passing** | Agent outputs passed as prompt context or file references to downstream agents |

## Agent Breakdown

| Agent | subagent_type | Tools Used |
|-------|--------------|------------|
| Job Parser | `general-purpose` | WebFetch, Read |
| Company Research | `general-purpose` | WebSearch, WebFetch, Write |
| Job Matcher | `general-purpose` | Read (resume + company.md) |

---

## Custom Slash Command Implementation

### Location

`.claude/commands/job-screen.md`

### Frontmatter

```yaml
---
allowed-tools: Task, TaskOutput, Read, Write, Glob, WebFetch
description: Download, parse, and evaluate job postings against resume. Use when user says "screen job", "evaluate job", or provides a job posting URL for analysis.
---
```

### Arguments

The user input is available via `$ARGUMENTS` placeholder in the prompt body.

**Example invocation:**
```
/project:job-screen https://example.com/jobs/engineering-manager
```

### Orchestration Steps

#### Step 1: Fetch Job Posting Content

1. Parse `$ARGUMENTS` to determine if URL or file path
2. If URL: use WebFetch to get job posting content
3. If file path: use Read to get content
4. Store raw job posting content for parser agent

#### Step 2: Launch Job Parser Agent

```
Task(
  subagent_type: "general-purpose",
  description: "Parse job posting metadata",
  prompt: <Job Parser Prompt with raw_job_content>
)
```

**Output:** Structured job metadata including company name

#### Step 3: Launch Company Research Agent (Conditional)

**Skip conditions:**
1. `jobs/{Company}/company.md` already exists (unless user explicitly requests re-research)
2. Company cannot be determined from job posting (e.g., posted by recruitment agency like Jobgether, Robert Half, etc.)

Use company metadata extracted from parser output (name, product domain, any mentioned tech stack, etc.):

```
Task(
  subagent_type: "general-purpose",
  description: "Research company background",
  prompt: <Company Research Prompt with company metadata from parser output>
)
```

**Output:** Writes to `jobs/{Company}/company.md`

#### Step 4: Launch Job Matcher Agent

Read `resume/resume.md` and `jobs/{Company}/company.md`, then launch matcher agent:

```
Task(
  subagent_type: "general-purpose",
  description: "Evaluate job match",
  prompt: <Job Matcher Prompt with job_metadata, company.md content, resume content>
)
```

**Output:** Match percentage and gaps analysis

#### Step 5: Save Job Output

Write job file to `jobs\{Company}\{Job Title}.md` with job metadata and match evaluation (company details are in separate `company.md`).

---

## Agent Prompts

### Job Parser Prompt

```
Parse this job posting and extract structured metadata. Return as markdown.

**Job Posting Content:**
{raw_job_content}

**Extract the following:**

1. **Title** - Two forms:
   - Full original title (for filename): Keep complete title including team/product area
   - Normalized title (for heading): Strip team/product area, keep only role level

2. **Company** - Two fields:
   - Company name (actual employer, not the job board or agency)
   - Posted by: "Direct" if company posted directly, or agency name (e.g., "Jobgether", "Robert Half")
   - If actual company cannot be determined, set company to "_" and note the agency

3. **Engineering Domain** - Product, DevOps/SRE, Platform, etc.

4. **Product Domain** - Fintech, Healthcare, B2C, etc.

5. **Location** - Work location (Remote, Hybrid, Office)

6. **Salary Range** - Include if stated, otherwise estimate with "(estimated)" note

7. **Posted Date** - Use exact date or current month/year

8. **Hands-on %** - Technology-focused activities vs people management (20-80%)

9. **Coding %** - Specifically writing production code (0-60%)
   - 0% signals: broad tech options with "or"/"such as", "leverage experience" language
   - >0% signals: specific required stack, "writing code", "implementing features"

10. **Required Qualifications** - Bullet list of must-haves

11. **Optional Qualifications** - Bullet list of nice-to-haves

12. **Summary** - Succinct overview, no corporate fluff, focus on actual work

13. **Company Description** - Extract from job posting (not external research):
    - What company does (product/service)
    - Industry/market
    - Key projects/technologies mentioned
    - 200 words maximum
    - Do not include company name as heading

**Return format:**
## Parsed Job Metadata

**Full Title:** {value}
**Normalized Title:** {value}
**Company:** {value}
**Posted By:** {Direct or agency name}
**Engineering Domain:** {value}
**Product Domain:** {value}
**Location:** {value}
**Salary Range:** {value}
**Posted Date:** {value}
**Hands-on:** {X}%
**Coding:** {X}%

### Required Qualifications
- {item}

### Optional Qualifications
- {item}

### Summary
{text}

### Company
{company description from job posting - 200 words max}
```

### Company Research Prompt

```
Research {company_name} from an Engineering Manager candidate perspective.

**Company metadata from job posting:**
{company_metadata}

Use WebSearch and WebFetch to gather information from:
- Company website (about, careers, engineering blog)
- Glassdoor engineering reviews
- Recent news and press releases
- GitHub organization (if exists)
- Tech blog posts

**Search queries to use:**
- "{company_name} engineering blog"
- "{company_name} tech stack"
- "{company_name} glassdoor engineering reviews"
- "{company_name} layoffs OR funding OR news"

**Extract and analyze:**

1. **Company Overview** - Products, business model, stage, size, remote policy

2. **Engineering Culture** - Blog quality, open source, practices, methodologies

3. **Tech Stack** - Languages, frameworks, cloud, architecture

4. **Team Health** - Glassdoor rating, reviews themes, work-life balance

5. **Business Stability** - Funding, news, layoffs, sustainability

6. **Red Flags** - Turnover, tech debt, poor processes, burnout culture

**Write output to:** `jobs/{company_name}/company.md`

**File format:**
# {company_name}

**Company Type:** {SaaS/Product/Platform/IT Services}
**Stage:** {Startup/Scale-up/Public/Enterprise}
**Size:** {employee count}
**Remote Policy:** {policy}

## Quick Take
- {insight 1}
- {insight 2}
- {key concern or opportunity}

## Company & Product
{overview}

## Engineering Culture
{culture details}

## Tech Stack
{technology details}

## Team Health
{glassdoor and review insights}

## Business Stability
{funding, news, risks}

## Red Flags
{concerns or "No significant red flags identified"}

## Sources
- [Source](url)
```

### Job Matcher Prompt

```
Evaluate this job opportunity against the candidate's resume.

**Job Metadata:**
{job_metadata from parser agent}

**Company Research:**
{content from jobs/{Company}/company.md}

**Candidate Resume:**
{content from resume/resume.md}

**Evaluation approach:**
- Assume recruiter role with bias towards rejection
- Be critical but don't invent non-existent gaps
- Consider company research in overall assessment

**Calculate:**

1. **Match %** - Overall fit considering:
   - Experience alignment
   - Skills match
   - Domain knowledge
   - Tech stack alignment
   - Company culture fit (from research)

2. **Gaps** - Specific missing qualifications:
   - NEVER flag unknown/unspecified information as gaps
   - Only flag when job EXPLICITLY requires something candidate lacks
   - Tech stack gaps ONLY when job states their actual stack (not "or"/"such as" lists)
   - Note domain gaps only when domain is explicitly stated
   - Ignore degree requirements if experience requirement is met
   - Flag Quebec-based companies for likely French requirement
   - Note location misalignment if relevant

**Return format:**
## Job Match Evaluation

**Match:** {X}%

### Gaps
- {gap 1}
- {gap 2}
- {or "No significant gaps identified"}

### Match Analysis
{brief analysis of fit}
```

---

## Final Output Format

### Job File: `jobs/{Company}/{Full Original Job Title}.md`

```markdown
# {Normalized Job Title} | {Engineering domain} | {Product domain}

**URL:** {original job URL, if present} \
**Company:** {Company Name} \
**Location:** {Location} \
**Salary Range:** {Range or "Not specified" or "$X-$Y (estimated)"} \
**Hands-on:** {Z}% | **Coding:** {X}% \
**Posted:** {Date} \
**Match:** {X}%

## Gaps

- {gap 1}
- {gap 2}

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

### Company File: `jobs/{Company}/company.md`

See Company Research Prompt section for format.

---

## Response to User

Respond ONLY with:
- Success status (e.g., "Job screening complete")
- Job file path
- Company file path (note if skipped/reused)
- Match percentage
- One-line company take (from research)

**Example (new company):**
```
Job screening complete.
- Job: jobs/Acme/Software Engineering Manager.md
- Company: jobs/Acme/company.md (new)

Match: 85% | Acme is a growing B2B SaaS with strong engineering culture, no red flags.
```

**Example (existing company):**
```
Job screening complete.
- Job: jobs/Acme/Senior Engineering Manager.md
- Company: jobs/Acme/company.md (existing, skipped research)

Match: 78% | See existing company research.
```

**Example (unknown company - agency posting):**
```
Job screening complete.
- Job: jobs/_/Engineering Manager - Fintech.md
- Company: Unknown (posted by Jobgether, skipped research)

Match: 72% | Company research skipped - actual employer not disclosed.
```

---

## Workflow Summary

1. User initiates with `/project:job-screen {URL or file path}`
2. Custom slash command parses input and fetches job posting content
3. Job parser agent extracts structured metadata (title, company, posted by, requirements, etc.)
4. Company research agent runs IF:
   - Company is known (not `_` / agency posting), AND
   - `company.md` doesn't already exist
5. Job matching agent reads parser output + `company.md` (if exists) + `resume.md`
6. Job file saved to `jobs/{Company}/{Title}.md`

**Output files:**
- `jobs/{Company}/{Title}.md` - Job-specific metadata and match evaluation
- `jobs/{Company}/company.md` - Reusable company research (created once per company, skipped for agency postings)

**Note:** Use `jobs/_/` folder for postings where company cannot be determined (agency postings).
