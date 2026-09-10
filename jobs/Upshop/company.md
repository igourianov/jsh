# Upshop

- **Company Type:** Vertical SaaS (retail/grocery store operations platform)
- **Stage:** PE-backed scale-up (roll-up), formerly Applied Data Corporation, ~35 years old
- **Size:** Small-to-mid. One data provider lists 224 employees as of June 2026; post-merger footprint likely 300-500 across Tampa, Toronto and remote
- **Remote Policy:** Remote-friendly. Posts remote roles across North America; the Toronto EM posting is remote

## Quick Take
- A roll-up, not an organic product company. Four acquisitions in four years (Itasca 2022, ShopperKit, Date Check Pro, Invafresh 2024) welded into one "total store" platform. That explains the split C#/.NET plus PHP/Laravel stack in the JD, and it is the single most important thing to probe: an EM here likely inherits an integration and consolidation mandate, not greenfield.
- The Toronto location is almost certainly the ex-Invafresh office (Toronto-based, merged June 2024). Worth confirming whether this team is the Invafresh product line and where it sits in the Upshop 360 consolidation.
- Glassdoor is thin (14 reviews) but consistently negative on leadership: culture 2.9-3.0, senior management 2.9, work-life balance 3.1. Recurring themes are constant reorganization, unrealistic workload, weekend work and abrupt terminations. Engineering itself is described as the organized part of the company.
- Leadership churn at the top: CEO Shamus Hines, who ran the entire roll-up, was replaced by Mike Sanders in April 2025. A new CEO one year after the biggest merger usually means cost and integration pressure.

## Milestones
- 1989 - Founded as Applied Data Corporation (ADC), Tampa FL. Fresh-department scale and labeling systems.
- 2019 - Shift from on-premise to cloud SaaS.
- 2022-08 - Rebrand from ADC to Upshop, positioned as a total store operations platform (FreshIQ, ShopperKit, Date Check Pro).
- 2022-09 - Merger with Itasca Retail Information Systems (Magic Inventory Intelligence, computer-generated ordering).
- 2024-01 - Growth investment from Level Equity; Prairie Capital and existing shareholders retain minority stakes. Scale at the time: 150+ retailers, 30,000 stores.
- 2024-06/07 - Merger with Invafresh (Toronto), the largest deal to date. Combined reach 400+ retailers, 50,000+ stores, 35 countries.
- 2025-04 - Mike Sanders appointed CEO; Shamus Hines moves to a board role.
- 2025-09 - Upshop 360 launched at Groceryshop: five suites (Fresh, Waste, Inventory, Commerce, Compliance) with AI embedded across operational data. Current scale claimed: 450+ retailers, 55,000+ stores.

## Company & Product
Upshop sells store-operations software to grocery and convenience retailers: demand forecasting, ordering and replenishment, fresh/perishable production planning, expiry and compliance, shrink and waste reduction, and eCommerce order fulfillment. Customers named publicly include Kroger and Wegmans. Buyers are enterprise grocery chains, so the sales motion is long-cycle enterprise with heavy deployment and integration work, and end users are store associates on in-store devices.

Business model is subscription SaaS at chain level, priced per store. Revenue concentration risk is real: a handful of national grocers likely dominate the book.

The product surface is the accumulated portfolio of five formerly separate companies. Upshop 360 is the marketing name for unifying them onto a single data model. That unification is the engineering program of record for the next few years.

## Engineering Culture
Little public signal. No engineering blog, no visible GitHub organization, no conference talks or open-source presence. This is a vertical B2B company that does not market to engineers, so evaluate culture from the JD and interviews rather than public artifacts.

What the JD itself reveals:
- Player-coach EM model with ~20% hands-on coding, full people-management remit, reporting to a VP of Software Engineering (the posting inconsistently also names a Senior Director, which suggests an org still in flux).
- Explicit mandate to lead responsible adoption of AI-assisted development tooling, with Cursor named. Unusual to see this as a scored requirement, and a genuine positive.
- Process vocabulary is conventional agile: Definition of Ready, sprint commitment, velocity and throughput reporting, CI/CD, code review, TDD. Nothing exotic.
- Tooling sprawl is a tell: GitHub and GitLab, Azure DevOps and JIRA all named in one posting. That is the fingerprint of unmerged acquisitions rather than a deliberate choice.

Glassdoor commentary specifically calls engineering organized and efficient, in contrast to sales and executive leadership. If accurate, the engineering org may be the healthiest part of the company.

## Tech Stack
- **Backend:** C#/.NET (the ADC/Upshop core) and PHP/Laravel (an acquired line). Microservice-oriented, plus legacy N-tier.
- **Frontend:** React, JavaScript/TypeScript, HTML/CSS with Bootstrap.
- **Data:** Azure SQL, MS SQL, Azure Cosmos DB, ODBC integrations into retailer systems.
- **Cloud/DevOps:** Azure, Azure DevOps, GitHub, GitLab. SRE/DevOps function exists as a managed team.
- **Observability:** DataDog.
- **Testing:** PHPUnit, Jest, Google Test; QA automation roles list CypressIO, WebdriverIO and Karate.
- **AI:** AI forecasting is the product story (Upshop 360); Cursor and AI-assisted development are the internal story.

Two mature stacks in one platform, plus in-store edge integration and retailer data feeds. This is integration-heavy engineering with real legacy weight, not a clean modern codebase.

## Team Health
Glassdoor sample is small (14 reviews), so treat it as directional, not statistical.

- Work-life balance 3.1, compensation and benefits 3.0, career opportunities 3.2, culture and values 2.9-3.0, senior management 2.9.
- Positives: decent pay and benefits, good coworkers, fast-paced and entrepreneurial, strong mission clarity around grocery waste and operations, remote work, engineering seen as well run.
- Negatives, repeated across reviews: leadership described as toxic and out of touch, executives berating employees on calls, HR effectively absent, abrupt terminations with little cause, unrealistic workload, expected overtime and weekend availability, "constant change" and "no stability" as literal review titles.
- The instability theme lines up exactly with the timeline: two mergers, a new PE investor and a CEO swap inside 36 months.

## Business Stability
Solid commercially, unsettled organizationally.

- Backed by Level Equity (2024 growth investment) with Prairie Capital retaining a minority stake. PE-owned, which means a defined exit horizon, likely 2028-2030, and cost discipline in the meantime.
- Real scale and stickiness: 450+ retailers, 55,000+ stores, mission-critical ordering and inventory systems that grocers do not rip out casually.
- Growth has been acquisition-led. Organic growth rate is not public.
- No reported layoffs found, though post-merger consolidation at a 200-500 person company usually involves quiet redundancy in overlapping functions. Nothing public either way.
- Category tailwind is genuine: food waste, labour scarcity and grocery margin pressure are all structural.

## Red Flags
- **Leadership rating is the standout concern.** Senior management 2.9 and culture 2.9-3.0 on a small sample, with explicit accounts of executives berating staff and firing without warning. Probe this directly, and ask the hiring manager about attrition on the team in the last 12 months.
- **CEO change one year after the largest merger.** Ask what changed under Mike Sanders and whether the Toronto/Invafresh line survived the strategy reset intact.
- **Roll-up tech debt.** Two backend stacks, two source-control platforms, two issue trackers. Ask what fraction of the roadmap is platform consolidation versus customer-facing features, and whether the PHP/Laravel line is being maintained, migrated or sunset. If this EM role owns the PHP line, that is a very different job from owning the .NET one.
- **"No stability" and "constant change" as recurring review titles.** Reorg risk is above average.
- **PE exit clock.** Level Equity invested January 2024. Expect margin pressure and possible further M&A or a sale within the tenure of this role.
- **Reporting line ambiguity in the posting** (VP vs Senior Director) suggests the org chart is not settled. Clarify who the manager actually is.

## Sources
- [Upshop - About](https://upshop.com/about/)
- [Upshop - Company](https://upshop.com/company/)
- [Introducing Upshop: The Total Store Operations Platform (rebrand from Applied Data Corporation, 2022)](https://upshop.com/introducing-upshop-the-total-store-operations-platform/)
- [Upshop Solves Supply Chain and Labor Crunch with Itasca Retail Merger (2022)](https://www.prnewswire.com/news-releases/upshop-solves-supply-chain-and-labor-crunch-with-itasca-retail-merger-301626632.html)
- [Upshop Announces Strategic Investment from Level Equity (2024)](https://upshop.com/strategic-investment-from-level-equity/)
- [Upshop and Invafresh Unite to Transform Global Food Retail Technology (2024)](https://www.prnewswire.com/news-releases/upshop-and-invafresh-unite-to-transform-global-food-retail-technology-302192116.html)
- [Upshop acquires Invafresh, prepares to launch food waste initiative - Supermarket News](https://www.supermarketnews.com/grocery-technology/upshop-acquires-invafresh-prepares-to-launch-food-waste-initiative)
- [Upshop Appoints Mike Sanders as CEO (2025)](https://www.businesswire.com/news/home/20250430166344/en/Upshop-Appoints-Mike-Sanders-as-CEO-to-Accelerate-Customer-Innovation-and-Operational-Excellence)
- [Upshop Launches Upshop 360 (2025)](https://upshop.com/upshop-360-ai-powered-operating-system-for-grocery)
- [Level Equity - Upshop investment](https://www.levelequity.com/investments/upshop/)
- [Upshop Reviews - Glassdoor](https://www.glassdoor.com/Reviews/Upshop-Reviews-E8977102.htm)
- [Upshop leadership reviews - Glassdoor](https://www.glassdoor.com/Reviews/Upshop-leadership-Reviews-EI_IE8977102.0,6_KH7,17.htm)
- [Upshop - Tracxn company profile](https://tracxn.com/d/companies/upshop/__CWaszaeiwWV5JmD33RwwfbTXrJps4ny0FfSgW0bLyhw)
