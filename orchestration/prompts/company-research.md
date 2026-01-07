# Company Research Prompt

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

2. **Company History** - Brief history since founding + major events in past 5 years (acquisitions, pivots, leadership changes, IPO, major product launches)

3. **Engineering Culture** - Blog quality, open source, practices, methodologies

4. **Tech Stack** - Languages, frameworks, cloud, architecture

5. **Team Health** - Glassdoor rating, reviews themes, work-life balance

6. **Business Stability** - Funding, news, layoffs, sustainability

7. **Red Flags** - Turnover, tech debt, poor processes, burnout culture

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
