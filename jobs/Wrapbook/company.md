# Wrapbook

- **Company Type:** SaaS / Fintech Platform (entertainment production payroll, accounting, compliance and insurance)
- **Stage:** Scale-up (Series B, venture-backed, profitable trajectory)
- **Size:** ~400 employees (402 as of Q1 2026; was 284 in Sept 2024, so growing fast)
- **Remote Policy:** Remote-first across US and Canada. Launched WFH location support in onboarding (July 2024). NYC office exists but remote is the norm.

## Quick Take
- Vertical fintech for the entertainment industry: payroll, production accounting, onboarding, compliance and insurance in one platform. Replacing legacy incumbents like Entertainment Partners. Strong, defensible niche.
- Solid modern engineering: large Ruby on Rails monolith (180k+ LOC, 50+ daily contributors, six teams), PostgreSQL, AWS, Hotwire/Turbo/Stimulus, ViewComponents. Active engineering blog signals real maturity (zero-downtime migrations, feature-flag-driven refactors).
- Key concern for an EM: rapid-growth pressure. Glassdoor flags "high pressure performance cycles", "more work than staff", and a cultural shift from people-first startup to more corporate. Strong domain but expect to manage scaling pains and stress.

## Milestones
- **2018 (March):** Founded by Ali Javid (CEO), Cameron Woodward (CMO), Naysawn Naji (former CPO) and Hesham El-Nahhas (former CTO).
- **Aug 2020:** $3.6M seed round (Equal Ventures). Revenue grew ~7x in 2020 despite industry contraction.
- **March 2021:** $27M Series A.
- **Nov 2021:** $100M Series B at a $1B valuation (led by Tiger Global) - reached unicorn status.
- **2022:** Co-founders Naji and El-Nahhas (CPO and CTO) departed to start separate ventures, amid litigation over alleged misappropriation of earlier "Tradekraft" software concepts. Notable founder turnover.
- **Sept 2024:** $20M round at a $750M valuation (Bessemer Venture Partners) - down from the 2021 $1B peak. Total raised ~$150.6M.
- **Dec 2025:** Acquired Cinapse, a fast-growing production scheduling platform - expanding beyond finance into broader production workflow.
- **March 2026:** Published "2026 State of Production Finance" report (thought-leadership / market positioning).

## Company & Product
Wrapbook is an all-in-one production finance platform for film, TV, commercials and live events. It handles payroll, startwork/onboarding, production accounting, budgeting and cost management in a single system, with native union compliance (SAG-AFTRA, DGA, IATSE, Teamsters) including automated hours-to-gross and fringe calculations, plus federal and local tax filing across all 50 states.

Business model is transaction-based: no monthly, annual or platform fees. Wrapbook charges a processing fee of roughly 0.75%-1.49% of wages processed depending on project scope and union status. The product benefits from network effects - reportedly over 50% of hired crew already have Wrapbook profiles, reducing onboarding friction on new productions. Unverified figures put 2023 revenue around $35M.

## Engineering Culture
- Active, technically substantive engineering blog (wrapbook.engineering) covering real production problems: zero-downtime PostgreSQL migrations with AWS DMS, changing column types with zero-downtime deploys, rewriting 400+ ERB views behind feature flags over 9 months, system testing ViewComponents, "The Road to Ruby 3".
- Codebase is a large Rails monolith: 180k+ lines, 400+ ERB files, six teams, 50+ daily contributors. Signals an org that has invested in keeping a monolith maintainable rather than fragmenting prematurely.
- Practices that surface: feature-flag-driven large-scale refactoring, zero-downtime deployment discipline, system/integration testing, branch-specific DB rollback tooling.
- Glassdoor engineering reviews praise "transparent culture, psychological safety, high caliber engineering practices" and "talented people, interesting problem space."

## Tech Stack
- **Languages:** Ruby, JavaScript, HTML/ERB
- **Backend:** Ruby on Rails (monolith)
- **Frontend:** Hotwire, Turbo, StimulusJS, ViewComponents (server-rendered, Rails-native rather than heavy SPA)
- **Database:** PostgreSQL (on AWS RDS)
- **Cloud/Infra:** AWS (RDS, DMS); Cloudflare DNS
- **Tooling:** feature flags, Audited gem, Mixpanel (analytics)

## Team Health
- Glassdoor: ~3.8/5 overall (50 reviews), 68% would recommend, ~3.7/5 work-life balance.
- **Positives:** talented engineers, psychological safety, transparent culture, interesting domain, employees feel supported, stock options.
- **Negatives:** growing pains as the company scales, high-pressure performance cycles, "more work than staff to handle it", communication friction, stress, and remote work "requires a certain fit." Work-life balance varies by team and manager.

## Business Stability
- Venture-backed with credible investors (Tiger Global, Bessemer, Equal Ventures). ~$150M raised total.
- No layoffs found for 2025-2026; the company is expanding via acquisition (Cinapse, Dec 2025) and hiring, which suggests offensive rather than defensive posture.
- Caution flag: the Sept 2024 round was at $750M, a markdown from the $1B 2021 valuation, reflecting the broader fintech/venture reset rather than company-specific distress. A small ($20M) extension round rather than a large up-round.
- Revenue concentration risk: entertainment industry is cyclical and was hit by the 2023 WGA/SAG-AFTRA strikes; production slowdowns directly affect transaction-fee revenue.

## Red Flags
- **Early founder turnover with litigation:** two of four founders (CTO and CPO) left in 2022 amid IP-misappropriation litigation tied to the company's origins. Worth probing for any lingering cultural or legal overhang.
- **Scaling stress:** repeated Glassdoor/Indeed themes of high-pressure performance cycles, understaffing relative to workload, and a shift from "people-first startup" to "corporate." Directly relevant to an EM managing team load and retention.
- **Valuation markdown:** $1B (2021) to $750M (2024) and a modest extension round; not distress, but tighter capital environment - expect efficiency pressure.
- **Industry cyclicality:** transaction-fee revenue is exposed to entertainment production volume, which is volatile (strikes, content-spend pullbacks).

## Sources
- [Wrapbook official site](https://www.wrapbook.com/)
- [Wrapbook Careers](https://www.wrapbook.com/careers)
- [Wrapbook Engineering blog](https://wrapbook.engineering/)
- [Contrary Research - Wrapbook business breakdown](https://research.contrary.com/company/wrapbook)
- [Glassdoor - Wrapbook reviews](https://www.glassdoor.com/Reviews/Wrapbook-Reviews-E3281198.htm)
- [AlleyWatch - $20M Series B extension, Sept 2024](https://alleywatch.com/2024/09/wrapbook-finance-payroll-production-platform-entertainment-industry-employer-of-record-cameron-woodward/)
- [BusinessWire - 2020 funding / platform launch](https://www.businesswire.com/news/home/20200825005316/en/Wrapbook-Funding-Accelerates-First-All-in-One-Payroll-Compliance-and-Insurance-Platform-for-Entertainment-Industry)
- [Tracxn - Wrapbook company profile](https://tracxn.com/d/companies/wrapbook/__YkZjgygbtL2LnYqRLCCB9zIv9_dMWQLqDcLQZs-ovSE)
- [HR Software - Wrapbook review 2026](https://www.hr.software/reviews/wrapbook)
- [GetLatka - Wrapbook revenue](https://getlatka.com/companies/wrapbook.com)
