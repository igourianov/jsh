# Jobgether

- **Company Type:** Job board / AI matching platform (intermediary, not the employer)
- **Stage:** Seed-stage startup
- **Size:** 11-50 employees (LinkedIn); third-party trackers report anywhere from 39 to 472, so the number is unreliable
- **Remote Policy:** Fully remote, distributed team

## Quick Take
- Jobgether is not the hiring company. It is a Brussels-based remote job marketplace that posts roles on behalf of partner employers and keeps the employer's name hidden until you create an account and pass its AI match score.
- The actual employer for this posting is undisclosed: a "fast-growing fintech serving e-commerce" with a legacy PHP product being rewritten on Rails 8 / Ruby 4, AWS and Aurora MySQL. Nothing verifiable exists about it. Research on culture, team health, funding or tech debt is impossible before contact.
- Main concern is the intermediary layer itself: an AI gatekeeper sits between you and the hiring manager, the employer is anonymous, and Trustpilot reviewers accuse the platform of low-balling match scores to push premium subscriptions. For a Manager-level candidate this means no way to assess the org and no direct line to the decision maker.

## Milestones
- 2020: Founded in Brussels by Juan Bourgois (CEO), Alexis Rodriguez (CTO) and Alexandre Hernandez. Ryan Seeras now listed as CPO in place of Hernandez.
- 2023: Raised roughly EUR 1.4M (about USD 1.48M) seed led by finance&invest.brussels and 4Ventures, plus angels. Some sources put total raised near EUR 2M.
- 2024-2026: Repositioned from a plain remote job search engine to an "AI career navigation platform for senior professionals", adding Match Score, AI CV review and a paid premium tier.
- 2026: Claims 3M+ registered talent, 200,000+ curated remote jobs from 40,000 companies, 100+ countries. Over 5M LinkedIn followers against a headcount of 11-50, which is the scale of the LinkedIn job-posting funnel.

## Company & Product
Jobgether operates a two-sided remote hiring marketplace. Candidates get a free profile, an AI-generated Match Score per role and role-specific feedback; employers get a pre-screened shortlist instead of raw applicant volume. Revenue comes from employer placements plus an optional candidate premium subscription (career coaching, profile optimization).

The posting model matters more than the product. Jobgether aggregates and reposts partner roles under its own name on LinkedIn. The company name is hidden on the public listing and only revealed after account creation. Applications are screened by the AI first; "strong profiles are shared with hiring teams", and if the employer is interested they contact the candidate directly. There is no named recruiter to chase, no published SLA and no guaranteed human review at the free tier.

For this specific role the employer stayed undisclosed even in the full description: a fintech serving e-commerce, engineering fully remote across in-house and nearshore, North American hours with most of the team Eastern, reporting line to the CTO, 6-8 mid-to-senior engineers. Size, funding stage, and identity all unknown.

## Engineering Culture
Nothing useful is knowable about the actual employer. No engineering blog, no GitHub org, no name.

What the posting itself leaks about them:
- Mid-modernization: legacy PHP being rewritten as Rails. That usually means a dual-maintenance period, strangler-pattern politics and a backlog that competes with the rewrite.
- Explicitly AI-assisted development (Cursor, Copilot, Claude Code) with a stated expectation that a human reviews and owns AI-generated code. That is an unusually mature framing and the strongest positive signal in the posting.
- A stated mandate to "introduce structure and consistency" to planning and delivery, which is an admission that process is currently weak.
- Low experience bars (1 year management, 3 years engineering) against a $170-200K CAD band. The band and the bar do not match, suggesting either an inflated title or an inexperienced hiring process.

Jobgether's own engineering culture is irrelevant here since they are not the employer.

## Tech Stack
Employer (from the posting): Ruby on Rails 8 on Ruby 4, legacy PHP codebase being retired, Aurora MySQL, AWS, server-rendered HTML with light JavaScript, AI coding tools (Cursor, GitHub Copilot, Claude Code). Server-rendered Rails with minimal JS points at a Hotwire/Turbo-style approach rather than a SPA front end.

Jobgether platform: AI/LLM-based CV parsing and job matching over a scraped and curated remote job index. No public technical writing or open source.

## Team Health
- Glassdoor for Jobgether: only 5 reviews, all skewing positive ("incredible flexible company", "amazing company to work for", one warning "don't wear out"). Sample too small to mean anything, and it covers Jobgether staff, not the employer.
- Trustpilot for jobgether.com: 4.3 from about 1,085 reviews, 67% five-star, most posted in the last 12 months. This measures the candidate product, not employment.
- Employer team health: unknown. 6-8 engineers split in-house and nearshore, reporting to a CTO who is currently absorbing the management load. A first-time EM hire under a CTO in a 6-8 person org means the role's scope is whatever the CTO chooses to delegate.

## Business Stability
Jobgether: seed-stage, roughly EUR 1.4-2M raised in 2023 with no publicly reported round since. Three years without a follow-on at a small headcount, plus the pivot to candidate-paid premium, reads like a company reaching for revenue from the job seeker side. No layoff news, no acquisition news. Low but not alarming risk, and it is not the employer anyway.

Employer: undisclosed, so funding, runway and stability cannot be checked. "Fast-growing fintech" is a self-description with no evidence attached. Fintech serving e-commerce with a PHP legacy stack implies the company has been around long enough to accumulate real debt, which is mildly reassuring on survival but says nothing about capital position.

## Red Flags
- **Anonymous employer.** No way to check Glassdoor, funding, leadership, turnover or interview process before investing time. Everything you would normally screen for is unavailable.
- **AI gatekeeper between you and the hiring manager.** Trustpilot complaints allege deliberately deflated match scores to drive premium conversions, and one reviewer was rated unfit for a role they currently hold. A low score can kill the application before a human sees it.
- **Reposting model.** Multiple reviewers claim Jobgether posts jobs on LinkedIn mainly to drive signups and profile completions. Broken links and listings that "felt entirely non-existent" show up in reviews, so some of these roles may be stale or already filled.
- **No named contact.** Nothing to follow up on and no recruiter thread. The record has no ghost-clock counterpart because there is nobody to chase.
- **Employer-side signals in the posting:** experience bars far below the comp band, an explicit admission that delivery process is broken and a mid-flight PHP-to-Rails rewrite. Any one is fine; together they describe an org still building its engineering function from scratch.
- **DEI written into the requirements**, not the footer (already captured in the screening file).

## Sources
- [Jobgether - About Us](https://jobgether.com/about-us)
- [How Jobgether Works](https://jobgether.com/how-jobgether-works)
- [Jobgether on LinkedIn](https://be.linkedin.com/company/jobgether)
- [Jobgether reviews on Trustpilot](https://www.trustpilot.com/review/jobgether.com)
- [Jobgether reviews on Glassdoor](https://www.glassdoor.com/Reviews/Jobgether-Reviews-E4902304.htm)
- [Jobgether Raises EUR 1.4M in Seed Funding - FinSMEs](https://www.finsmes.com/2023/03/jobgether-raises-e1-4m-in-seed-funding.html)
- [Jobgether raises $1.48M seed - TechrSeries](https://techrseries.com/remote-and-virtual-work/jobgether-a-remote-work-search-engine-raises-1-48-million-in-seed-funding/)
- [Jobgether - Crunchbase](https://www.crunchbase.com/organization/jobgether)
- [Jobgether - Tracxn profile](https://tracxn.com/d/companies/jobgether/__bUnB9yktM1pFQSK-qM-ezcs89iDntP4i6tWERvG8UjE)
