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
│              Step 1: Fetch Job Posting                       │
│         (URL → WebFetch, file → Read)                        │
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

| Agent | subagent_type | Tools Used | Prompt |
|-------|--------------|------------|--------|
| Job Parser | `general-purpose` | WebFetch, Read | [job-parser.md](prompts/job-parser.md) |
| Company Research | `general-purpose` | WebSearch, WebFetch, Write | [company-research.md](prompts/company-research.md) |
| Job Matcher | `general-purpose` | Read (resume + company.md) | [job-matcher.md](prompts/job-matcher.md) |

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

#### Step 1: Fetch Job Posting

1. Parse `$ARGUMENTS` to determine if URL or file path
2. Fetch content:
   - URL: `WebFetch(url, prompt: "Extract the full job posting content")`
   - File path: `Read(file_path)`
3. Store raw job posting content for parser agent

#### Step 2: Launch Job Parser Agent

```
Task(
  subagent_type: "general-purpose",
  description: "Parse job posting metadata",
  prompt: <prompts/job-parser.md with raw_job_content>
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
  prompt: <prompts/company-research.md with company metadata from parser output>
)
```

**Output:** Writes to `jobs/{Company}/company.md`

#### Step 4: Launch Job Matcher Agent

Read `resume/resume.md` and `jobs/{Company}/company.md`, then launch matcher agent:

```
Task(
  subagent_type: "general-purpose",
  description: "Evaluate job match",
  prompt: <prompts/job-matcher.md with job_metadata, company.md content, resume content>
)
```

**Output:** Match percentage and gaps analysis

#### Step 5: Save Job Output

Write job file to `jobs\{Company}\{Job Title}.md` with job metadata and match evaluation (company details are in separate `company.md`).

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

See [company-research.md](prompts/company-research.md) for format.

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
