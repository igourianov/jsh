---
name: company-research
description: Research IT/software companies from an Engineering Manager candidate perspective. Use when user says "research company", "research {Company}", or wants company background for job applications.
---

# Company Research Skill

Research IT services or software product companies to inform job application and interview preparation decisions.

## Instructions

This skill gathers engineering-focused company intelligence from publicly available sources to help evaluate opportunities.

### Inputs

Accept any of these inputs:
- Company name (required)
- Optional: company website URL
- Optional: job posting URL

### Output

Single file at `jobs\{Company}\company.md` containing comprehensive company research from an engineering perspective.

---

## Process Steps

### 1. Check for Existing Job Posting

Before starting research:
- Look in `jobs\{Company}\` directory for any `.md` files (job postings)
- If found, extract:
  - Company website URL from job posting metadata
  - Engineering domain and product domain context
  - Tech stack mentions
  - Any company information already captured
- Use this context to inform and validate research

### 2. Gather Information from Multiple Sources

Use web searches and fetches to research:

**Primary sources:**
- Company website (homepage, about page, careers page)
- Engineering blog or tech blog
- Glassdoor reviews (focus on engineering roles)
- Recent news articles and press releases
- LinkedIn company page
- GitHub organization (if exists)

**Search strategies:**
- "{Company name} engineering blog"
- "{Company name} tech stack"
- "{Company name} glassdoor engineering"
- "{Company name} engineering culture"
- "{Company name} funding" or "{Company name} revenue"
- "{Company name} layoffs" or "{Company name} news"
- "{Company name} open source"

### 3. Research Areas

Extract and analyze the following:

#### Company & Product Overview
- Core products/services and target customers
- Business model (B2B SaaS, B2C, Enterprise, etc.)
- Company stage (startup, scale-up, public, enterprise)
- Employee count and estimated engineering team size
- Office locations and remote work policy
- Founded year and growth trajectory

#### Engineering Culture & Practices
- Engineering blog quality and recency
- Open source projects and contributions
- Conference talks or technical thought leadership
- Development methodologies mentioned
- Testing and quality practices
- CI/CD and deployment practices
- DevOps maturity indicators

#### Technology & Architecture
- Tech stack (languages, frameworks, databases)
- Cloud platform (AWS, Azure, GCP, multi-cloud)
- Architecture patterns (microservices, monolith, serverless)
- Scale challenges (traffic, data volume, etc.)
- Legacy technology vs modern stack
- Infrastructure and platform engineering

#### Product & Market Position
- Product-market fit indicators
- Customer reviews and satisfaction
- Main competitors
- Unique value proposition
- Growth trends
- Innovation vs maintenance focus

#### Engineering Team Health
- Glassdoor rating (overall and engineering-specific)
- Common themes in engineering reviews
- Hiring velocity (number of open positions)
- Engineering leadership visibility
- Work-life balance indicators
- Professional development and learning culture
- Team structure and autonomy

#### Financial & Business Stability
- Funding rounds and investors (for private companies)
- Stock performance (for public companies)
- Recent business news (acquisitions, partnerships, pivots)
- Layoff history in past 2 years
- Revenue trends (if available)
- Business model sustainability

#### Red Flags for Engineering Managers
- High engineering turnover signals
- Technical debt mentions in reviews
- Poor engineering processes or tools
- Lack of investment in engineering
- Unclear product roadmap or direction
- "Death march" or burnout culture
- Unrealistic expectations
- Poor communication or politics
- Outdated technology with no migration plan

### 4. Save Complete File

**Path format**: `jobs\{Company}\company.md`

Create company subfolder if it doesn't exist.

**File format:**

```markdown
# Company Research: {Company Name}

**Company Type:** {SaaS/IT Services/Product/Platform} \
**Stage:** {Startup/Scale-up/Public/Enterprise} \
**Remote Policy:** {Remote-first/Hybrid/Office-based/Not specified}

## Quick Take

- {Engineering-focused insight 1}
- {Engineering-focused insight 2}
- {Key opportunity or concern for an EM role}

## Company & Product

{Business overview, products, target market, size, locations}

## Engineering Culture

{Engineering blog, open source, thought leadership, practices, methodologies}

## Tech Stack & Architecture

{Languages, frameworks, infrastructure, cloud, architecture patterns, scale}

## Product & Market Position

{Product-market fit, competitors, growth, innovation focus}

## Engineering Team Health

{Glassdoor insights, hiring, leadership, work-life balance, development opportunities}

## Business Stability

{Funding, news, layoffs, revenue, sustainability}

## Concerns for Engineering Managers

{Red flags, risks, potential issues specific to EM role}

{If no major concerns found, state: "No significant red flags identified during research."}

## Sources

- [Company Website](url)
- [Engineering Blog](url)
- [Glassdoor Reviews](url)
- [News Article](url)
- {Additional sources}
```

### 5. Response to User

Provide brief summary with:
- Research completion status
- File location
- 2-3 sentence quick take on the company
- Any critical red flags (if present)

**Example response:**
```
Company research complete. Saved to jobs\Acme Corp\company.md

Acme is a B2B SaaS company with a strong engineering culture and modern tech stack. Glassdoor reviews are positive (4.2/5) with good work-life balance. No major red flags identified.
```

---

## Examples

**File paths:**
- `jobs\Stripe\company.md`
- `jobs\DataDog\company.md`
- `jobs\Instacart\company.md`

**Typical workflow:**
1. `screen job https://example.com/job-posting` → Creates `jobs\Company\Job Title.md`
2. `research company Company` → Creates `jobs\Company\company.md` (uses job posting for context)
3. `tailor resume for Company` → Creates `jobs\Company\resume.md`
4. `publish pdf for Company` → Creates `jobs\Company\resume.pdf`
