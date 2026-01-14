---
name: research-company
description: Research company background from Engineering Manager candidate perspective
context: fork
---

Research company: $ARGUMENTS

## Skip Conditions

**Before researching, check:**
1. If company name is "_" (unknown/agency posting): Skip, respond "Skipped: unknown company"
2. If `jobs/{Company}/company.md` already exists: Skip, respond "Skipped: research exists"

## Input

Company name provided as $ARGUMENTS.

## Research Approach

Use WebSearch and WebFetch to gather information from:
- Company website (about, careers, engineering blog)
- Glassdoor engineering reviews
- Recent news and press releases
- GitHub organization (if exists)
- Tech blog posts

**Search queries:**
- "{company_name} engineering blog"
- "{company_name} tech stack"
- "{company_name} glassdoor engineering reviews"
- "{company_name} layoffs OR funding OR news"

## Information to Extract

1. **Company Overview** - Products, business model, stage, size, remote policy

2. **Company History** - Brief history since founding + major events in past 5 years (acquisitions, pivots, leadership changes, IPO, major product launches)

3. **Engineering Culture** - Blog quality, open source, practices, methodologies

4. **Tech Stack** - Languages, frameworks, cloud, architecture

5. **Team Health** - Glassdoor rating, review themes, work-life balance

6. **Business Stability** - Funding, news, layoffs, sustainability

7. **Red Flags** - Turnover, tech debt, poor processes, burnout culture

## Output

Write to `jobs/{company_name}/company.md` with format:

```markdown
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

**Notes:**
- Focus on Engineering Manager perspective (culture, tech stack, team health)
- Be objective - include both positives and concerns
- Cite sources for verification
