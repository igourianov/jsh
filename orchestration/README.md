# Job Screen Orchestration Model

This document describes the orchestration model for the job screening workflow using modular skills with isolated execution contexts.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│             Orchestrator Skill: screen-job                   │
│                    (main entry point)                        │
│                   .claude/skills/screen-job/                 │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ Invokes skills sequentially
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ parse-job   │ │ research-   │ │ match-      │
│ skill       │ │ company     │ │ resume      │
│             │ │ skill       │ │ skill       │
│ context:    │ │ context:    │ │ context:    │
│ fork        │ │ fork        │ │ fork        │
└─────────────┘ └─────────────┘ └─────────────┘
      │               │               │
      │               │               │
   Isolated        Isolated        Isolated
   subagent        subagent        subagent
   context         context         context
```

### Modular Skills (Independent Invocation)

Each skill can be invoked independently OR as part of the orchestrated workflow:

```
Orchestrated:                  Independent:
/screen-job URL           →    /parse-job URL
  ├─ parse-job (fork)          /research-company Company
  ├─ research-company (fork)   /match-resume Company
  └─ match-resume (fork)
```

## Key Design Decisions

| Aspect | Recommendation |
|--------|----------------|
| **Architecture** | Skills with `context: fork` for modularity + isolation |
| **Entry point** | Orchestrator skill (`screen-job`) invokes modular skills |
| **Execution** | Sequential - each skill runs after previous completes |
| **Isolation** | Each skill runs in forked subagent context (isolated from main conversation) |
| **Modularity** | Skills can be invoked independently for re-running specific steps |
| **Data flow** | Parser output provides company metadata for research skill |
| **Company reuse** | Company research saved to `company.md` for reuse across multiple jobs |
| **Agent type** | `general-purpose` agent for all forked contexts |
| **Error handling** | Orchestrator checks each skill output for failures before proceeding |
| **State passing** | Skill outputs passed as prompt context or file references to downstream skills |

## Skills Breakdown

| Skill | Location | context: fork | Prompt Template |
|-------|----------|---------------|-----------------|
| **parse-job** | `.claude/skills/parse-job/` | Yes | [job-parser.md](prompts/job-parser.md) |
| **research-company** | `.claude/skills/research-company/` | Yes | [company-research.md](prompts/company-research.md) |
| **match-resume** | `.claude/skills/match-resume/` | Yes | [job-matcher.md](prompts/job-matcher.md) |
| **screen-job** | `.claude/skills/screen-job/` | No | Orchestrator (invokes above skills) |

### Why `context: fork`?

Skills with `context: fork`:
- Run in isolated subagent context (no pollution of main conversation)
- Start with fresh context (only skill instructions + parameters)
- Provide same isolation as launching subagents explicitly
- Can be invoked independently OR as part of orchestration
- Simpler than thin shell subagent wrappers

---

## Orchestrator Skill Implementation

### Location

`.claude/skills/screen-job/SKILL.md`

### Frontmatter

```yaml
---
name: screen-job
description: Complete job screening workflow (parse, research, match). Use when user says "screen job" or provides job posting URL.
---
```

### Arguments

The user input is available via `$ARGUMENTS` placeholder in the skill prompt.

**Example invocation:**
```
/screen-job https://example.com/jobs/engineering-manager
```

### Orchestration Steps

The orchestrator skill invokes modular skills sequentially. Each skill runs in an isolated forked context.

#### Step 1: Invoke parse-job Skill

The orchestrator invokes the `parse-job` skill with the URL or file path from `$ARGUMENTS`.

**parse-job skill** (runs in forked context):
1. Determine input type and fetch job posting content:
   - **URL**: `WebFetch(url, prompt: "Extract the full job posting content")`
   - **File path**: `Read(file_path)` (typically `temp.txt` with pasted job description)
2. Parse using [job-parser.md](prompts/job-parser.md) template
3. Extract structured metadata (title, company, salary, requirements, etc.)
4. Save initial job file to `jobs/{Company}/{Title}.md`

**Output:** Structured job metadata including company name

#### Step 2: Invoke research-company Skill (Conditional)

**Skip conditions:**
1. `jobs/{Company}/company.md` already exists (unless user explicitly requests re-research)
2. Company cannot be determined from job posting (e.g., posted by recruitment agency like Jobgether, Robert Half, etc.)

The orchestrator extracts company metadata from parser output and invokes `research-company` skill.

**research-company skill** (runs in forked context):
1. Use company metadata (name, product domain, tech stack mentions)
2. Execute web research using [company-research.md](prompts/company-research.md) template
3. WebSearch and WebFetch for company information
4. Write output to `jobs/{Company}/company.md`

**Output:** `jobs/{Company}/company.md` (company research file)

#### Step 3: Invoke match-resume Skill

The orchestrator invokes `match-resume` skill with company name.

**match-resume skill** (runs in forked context):
1. Read `jobs/{Company}/{Title}.md` (job metadata)
2. Read `jobs/{Company}/company.md` (if exists)
3. Read `resume/resume.md`
4. Evaluate match using [job-matcher.md](prompts/job-matcher.md) template
5. Calculate match percentage and identify gaps
6. Append evaluation to `jobs/{Company}/{Title}.md`

**Output:** Match percentage and gaps analysis appended to job file

#### Step 4: Report Results

Orchestrator reports completion status to user with match summary.

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

1. User initiates with `/screen-job {URL or file path}`
2. Orchestrator skill (`screen-job`) invokes modular skills sequentially
3. **parse-job** skill (forked context) extracts structured metadata (title, company, posted by, requirements, etc.)
4. **research-company** skill (forked context) runs IF:
   - Company is known (not `_` / agency posting), AND
   - `company.md` doesn't already exist
5. **match-resume** skill (forked context) reads parser output + `company.md` (if exists) + `resume.md`
6. Job file saved to `jobs/{Company}/{Title}.md` with evaluation appended

**Output files:**
- `jobs/{Company}/{Title}.md` - Job-specific metadata and match evaluation
- `jobs/{Company}/company.md` - Reusable company research (created once per company, skipped for agency postings)

**Independent skill invocation:**
- `/parse-job {URL or file path}` - Parse job posting only (e.g., `/parse-job temp.txt`)
- `/research-company {Company}` - Research company only
- `/match-resume {Company}` - Evaluate match only (useful after resume updates)

**Note:** Use `jobs/_/` folder for postings where company cannot be determined (agency postings).
