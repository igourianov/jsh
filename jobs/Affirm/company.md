# Affirm

- **Company Type:** Fintech product/platform (buy now, pay later consumer lending)
- **Stage:** Public (NASDAQ: AFRM, IPO Jan 2021)
- **Size:** ~2,400 employees (2,366 as of March 2026), engineering ~45% of headcount
- **Remote Policy:** Remote-first. Nearly all postings are tagged Remote; offices in San Francisco, New York, Chicago, Salt Lake City and Pittsburgh are voluntary. Hires Remote Canada.

## Quick Take
- Financially the strongest it has ever been: FY2026 closed at $50.2B GMV, Q4 revenue $1.17B (+33%), GAAP operating margin 12.6% and record profit. Guidance for FY2027 is $64B+ GMV. This is not a company under existential pressure.
- Engineering is a real discipline here: public career framework, active tech blog, aggressive and public adoption of agentic coding (they paused delivery for a week org-wide in 2026 to retool; claim 60%+ of PRs agent-assisted). CEO Levchin has publicly said no AI-driven layoffs.
- The consistent concern is management quality, not the business. Glassdoor 4.0 overall but Management is the lowest-rated category (~3.2), with recurring themes of politics, opaque promotion, managing up and heavy middle-management layers. For an EM role that is both the risk and the opportunity.

## Milestones
- 2012-2013 - Founded by Max Levchin (PayPal co-founder); first consumer financing product launched 2014.
- 2015 - Shopify partnership, the distribution unlock that took Affirm to thousands of merchants.
- Jan 2021 - IPO at $49/share, popped ~98% to a ~$24B valuation on day one.
- 2021 - Amazon and Shopify Shop Pay Installments partnerships; engineering career framework published publicly.
- Feb 2023 - Laid off 19% of staff and shut down the crypto business after a weak Q2 FY2023. The one hard reset in its history.
- 2021-2024 - Affirm Card launched and scaled into the main growth vector (4.4M active cardholders, +146% card GMV by FY2026 Q3).
- Mar 2025 - Lost the Walmart BNPL partnership to Klarna/OnePay. Affirm framed it as declining an "uneconomic" deal; it was ~5% of GMV and ~2% of adjusted operating income.
- Sep 2025 - Affirm pay-later available for in-store Apple Pay purchases.
- Apr 2026 - Org-wide one-week pause of normal delivery to retool engineering around agentic development.
- FY2026 (ended Jun 2026) - $50.2B GMV, first sustained GAAP profitability, record quarterly profit.

## Company & Product
Affirm is a consumer lending platform, not a payments processor. It underwrites point-of-sale installment loans (0% APR through ~36% APR) distributed through merchant integrations (Shopify, Amazon, Peloton, Wayfair, Warby Parker), a direct consumer app, and the Affirm Card, which extends the product to any merchant. Revenue comes from merchant fees, consumer interest and interchange, funded through a capital markets stack (warehouse facilities, securitizations, forward-flow loan sales).

For an engineering leader this means the domain is genuinely hard: real-time underwriting and risk models, money movement, fraud, regulatory and compliance surface (it is a lender, with the audit and controls burden that implies), plus high-availability checkout that merchants depend on at retail peaks. The scale is meaningful: $50B+ annual GMV and ~23M active consumers.

Competitive landscape is crowded and getting rougher: Klarna, PayPal, Block/Afterpay, Apple, and bank-issued installment products. The Walmart loss shows Affirm is willing to walk from volume that does not price properly, which is a discipline signal, though it also shows large partnerships can flip.

## Engineering Culture
- **Public and reasonably substantive tech blog** at tech.affirm.com (Medium). Topics skew infrastructure and architecture: resilient checkout architecture, custom metrics/monitoring/alerting, SQL and MySQL instrumentation, scaling. Not a marketing blog, but not a firehose either.
- **Published career framework for engineering** (2021). Levels defined by scope and impact, explicitly not a promotion checklist. This is a positive signal for an EM: there is a written rubric to calibrate against, and the framework is honest that it is judgment-based. The flip side is that Glassdoor reviews call the promotion path opaque, so the framework does not fully solve calibration in practice.
- **Aggressive agentic AI adoption.** In 2026 Affirm stopped feature delivery organization-wide for a week to retrain and retool around agentic coding, and reports 60%+ of pull requests being agent-assisted. Levchin has stated publicly there are no AI-related layoffs planned. If you lead a platform/infra team, expect agent tooling, developer environments and internal AI enablement to be first-class roadmap items rather than side projects. The Developer Environments EM posting in this folder is consistent with that.
- **Remote-first from before it was normal**, and it stuck. Offices are optional. Async and written communication should be well established.
- Reviews describe engineering as an "exceptionally smart group," strong on the theoretical/CS-rigor side. Positive for hiring bar, less positive if you want fast pragmatic shipping without debate.

## Tech Stack
- **Backend:** Python (Flask heritage; Affirm's core is historically a large Python monolith), Java and Kotlin for newer services, Go in places. Ruby appears in the stack listings.
- **Frontend:** React, Redux, TypeScript/JavaScript, Webpack, Babel, Jest, GraphQL, Gatsby for marketing surfaces.
- **Mobile:** Swift, Objective-C for iOS; Kotlin and RxJava for Android.
- **Data:** MySQL as the primary OLTP store, Redis, Apache Spark, Airflow and Luigi for orchestration, dbt for transformation, S3 as the lake. ML/risk models are a core competency, not a bolt-on.
- **Infrastructure:** AWS (EC2, S3, CloudFront), Docker, Kubernetes, NGINX/OpenResty at the edge, Cloudflare and Fastly CDN.
- **CI/CD and tooling:** Jenkins, Buildkite, AWS CodePipeline, Gradle, WebdriverIO and Sauce Labs for test automation, OpenAPI for service contracts.
- **Ops:** custom-built metrics/monitoring/alerting layer (they blogged about building it rather than buying wholesale), Rollbar, StatusPage.io.

Architecture direction is monolith decomposition plus resiliency work on checkout. Infra Foundations, Reliability Platform and Developer Environments as named EM roles tells you there is a funded platform org with a real internal-platform mandate.

## Team Health
- **Glassdoor: 4.0/5 overall** across 625+ reviews, up 5% year over year. 74% would recommend, 74% positive business outlook.
- **Software Engineers specifically: 3.9/5** (72 reviews). Comp and benefits rate **4.6/5**, which is unusually high. Average SWE salary reported around $207K, ~27% above US average.
- **Management is the weak spot: ~3.2/5**, the lowest-rated category. This is the single most consistent negative theme.
- Positives that recur: fully remote, strong benefits and comp, transparency, talented peers, interesting high-impact problems, decent work-life balance for many.
- Negatives that recur: tight deadlines and deadline stress, management that does not understand engineering requirements, opaque promotion, comp cliff after new-hire equity vests, politics and managing-up culture, top-heavy middle management, meeting-heavy depending on org.
- The review split is wide. Some describe good WLB and mutual respect; others describe nights-and-weekends expectations and toxic leadership pockets. That variance almost always means org-by-org difference rather than a uniform company culture. Worth probing hard on which org and which skip-level.
- Interview process: rated 3/5 difficulty, only ~52% positive experience, which is mediocre and worth noting going in.

## Business Stability
Strong. FY2026 revenue and GMV both beat estimates, GAAP profitability achieved and expanding, record quarterly profit, FY2027 guidance for $64B+ GMV and 30.5%+ adjusted operating margin. Headcount grew ~170 year over year to March 2026, with engineering the fastest-growing function. No recent layoffs, and the CEO explicitly ruled out AI-driven cuts in May 2026.

Structural risks are the ones inherent to lending, not to Affirm's execution:
- Credit risk. 30+ day delinquencies at 2.8% and drifting. A consumer credit downturn hits Affirm directly, unlike a pure processor.
- Funding cost sensitivity to rates.
- Regulatory exposure. BNPL is under ongoing scrutiny in the US and abroad.
- Partnership concentration. Losing Walmart cost ~5% of GMV; Shopify and Amazon are far larger and their loss would be material.
- 2023 precedent shows the company will cut 19% of staff when the numbers turn. The current numbers are good, but the muscle memory exists.

## Red Flags
- **Management quality is the recurring complaint**, at 3.2/5. Politics, managing up, opaque promotion, too many management layers relative to ICs. For an incoming EM this cuts both ways: you may be the fix, or you may be dropped into a political layer with limited air cover. Probe the reporting chain, the skip-level, span of control and how promotion decisions actually get made.
- **Bimodal work-life balance.** Reviews range from "good work/life balance" to "nights and weekends or you don't succeed." This is org-dependent. Ask directly about on-call, incident load and release cadence for the specific team, especially for a Reliability Platform or Infra Foundations role where the pager is the job.
- **Comp cliff after initial equity vests.** Repeated theme. Front-loaded offers that do not refresh well. Negotiate with that in mind.
- **Weak interview experience scores** (~52% positive) suggest an inconsistently run loop.
- **2023 layoff precedent** (19%) plus lending-sector cyclicality. Not a red flag today given the financials, but not a company with zero downside history.
- **Heavy AI/agentic push** could be a green flag (investment, modern tooling, EM roles funded around it) or pressure (delivery expectations recalibrated upward on the assumption of agent leverage). Worth asking how headcount plans changed after the agentic retooling week, given the CEO's no-layoffs statement.

## Sources
- [Affirm Tech Blog](https://tech.affirm.com/)
- [Highly Resilient Affirm Checkout Architecture](https://tech.affirm.com/highly-resilient-affirm-checkout-architecture-031a7dbdc59e)
- [Introducing Affirm's Career Framework for Engineering](https://tech.affirm.com/introducing-affirms-career-framework-for-engineering-db17e106ea7c)
- [How Affirm Retooled its Engineering Organization for Agentic Software Development in One Week](https://medium.com/affirmengineering/how-affirm-retooled-its-engineering-organization-for-agentic-software-development-in-one-week-1fd35268fde6)
- [Affirm Tech Stack (Himalayas)](https://himalayas.app/companies/affirm/tech-stack)
- [Affirm Reviews - Glassdoor](https://www.glassdoor.com/Reviews/Affirm-Reviews-E823564.htm)
- [Affirm Software Engineer Reviews - Glassdoor](https://www.glassdoor.com/Reviews/Affirm-Software-Engineer-Reviews-EI_IE823564.0,6_KO7,24.htm)
- [Affirm Culture - Blind](https://www.teamblind.com/company/Affirm/posts/affirm-culture)
- [Affirm Q4 FY26 slides: record profit, 36% GMV growth](https://www.investing.com/news/company-news/affirm-q4-fy26-slides-record-profit-36-gmv-growth-strong-outlook-93CH-4880314)
- [Affirm Q4 2026 earnings beat](https://finance.yahoo.com/markets/stocks/articles/affirm-q4-2026-earnings-beat-173735811.html)
- [Affirm's Levchin does not plan AI layoffs - American Banker](https://www.americanbanker.com/payments/news/affirms-levchin-does-not-plan-ai-layoffs)
- [Affirm employee count - Revelio Labs](https://www.reveliolabs.com/companies/affirm/employees)
- [Remote-first Affirm - Remote Work Europe](https://remoteworkeurope.eu/insights/remote-first-affirm/)
- [Max Levchin's Affirm pops nearly 100% in market debut - CNBC](https://www.cnbc.com/2021/01/13/affirm-ipo-afrm-starts-trading-on-nasdaq.html)
- [Klarna replaces Affirm as Walmart BNPL partner](https://finance.yahoo.com/news/klarna-replaces-affirm-walmart-bnpl-145300497.html)
- [Affirm COO: Walmart deal was "uneconomic" - Payments Dive](https://www.paymentsdive.com/news/affirm-coo-walmart-deal-was-uneconomic/743944/)
- [Affirm and Klarna Pay Later for in-store Apple Pay - MacRumors](https://www.macrumors.com/2025/09/15/affirm-klarna-pay-later-in-stores/)
- [Affirm Careers (Canada)](https://www.affirm.com/en-ca/careers)
