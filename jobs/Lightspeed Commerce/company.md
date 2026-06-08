# Lightspeed Commerce

- **Company Type:** SaaS / Commerce Platform (POS + Payments + eCommerce)
- **Stage:** Public (TSX: LSPD, NYSE: LSPD)
- **Size:** ~3,300 employees (Oct 2025), across 6 continents
- **Remote Policy:** Hybrid. Combination of remote and on-site work. Flexible PTO plus up to two months fully remote per year.

## Quick Take
- Montreal-founded public company that grew via an aggressive acquisition spree (ShopKeep, Upserve, Vend, Ecwid, NuORDER), then spent 2024 cutting costs and refocusing on profitable growth.
- Founder Dax Dasilva returned as CEO in 2024 and engineered a turnaround. By Q3 FY2026 the company raised its full-year outlook and held ~$479M cash, so business stability has improved markedly since the layoff cycle.
- Key concern for an EM: Glassdoor engineering reviews repeatedly flag heavy legacy tech debt, weak technical leadership continuity and severe management churn (some reports of 10+ managers in 3-4 years). This is a turnaround org, not a clean greenfield.

## Milestones
- 2005: Founded in Montreal by Dax Dasilva as "Lightspeed Retail", bootstrapped with ~$750K seed from friends and family. Initially Mac-based POS for small retailers.
- 2019 (Mar): IPO on Toronto Stock Exchange, described as the most successful Canadian tech IPO in nearly a decade.
- 2020 (Sep): Dual-listed on NYSE.
- 2020 (Nov): Acquired ShopKeep for ~US$440M.
- 2021 (Mar): Acquired Vend (New Zealand) for ~US$350M. Also acquired Upserve, Ecwid (~US$500M) and NuORDER (~US$425M) in this period.
- 2022 (Feb): Dasilva steps down as CEO after 16 years.
- 2024: Dasilva reappointed CEO. Two restructurings in the year, including ~200 layoffs (~10% of staff in one round), amid a strategic review and exploration of a possible sale.
- 2026 (Q3 FY): Accelerated growth in Customer Locations and GTV, new Lightspeed AI and Marketplace features, raised full-year revenue / gross profit / Adjusted EBITDA outlook. ~$479M cash as of Dec 31, 2025.

## Company & Product
Lightspeed Commerce (formerly Lightspeed POS / Lightspeed HQ) builds a unified cloud commerce platform for retail and hospitality businesses. Core offering connects suppliers, merchants and consumers with omnichannel POS, integrated payments, inventory management, eCommerce storefronts, customer-facing displays, B2B ordering (NuORDER) and reporting/analytics. The platform was assembled from a single-product POS into a multi-industry suite largely through acquisition. Payments and the move to "profitable growth" (GTV, payments attach) are the strategic priorities under the current leadership.

## Engineering Culture
- Public GitHub orgs exist (github.com/lightspeed, github.com/lightspeedretail) but open source presence is thin (~6 repos: BigQuery view tooling, translation GitHub Actions). Not an open-source-forward engineering brand.
- Documented infra philosophy favors GCP (chosen for native Kubernetes support), Kubernetes as the container standard, and Go (chosen for readability). Indicates a modern cloud-native direction on newer services.
- Reviews describe "constant reinvention of the wheel" and a shortage of long-tenured technical authorities, suggesting inconsistent architectural governance across the many acquired codebases.
- No prominent, high-quality public engineering blog surfaced. Most "blog" content is merchant/business-facing marketing, not engineering.

## Tech Stack
- Languages: Go (newer services), Python, JavaScript. PHP/Ruby legacy likely present in acquired products.
- Cloud / Infra: Google Cloud Platform (GCP), Kubernetes (standardized), Docker.
- Data: BigQuery (internal tooling published on GitHub).
- Tooling: GitHub, VS Code, Docker. ~295 technologies tracked across the org per tech-stack databases.
- Architecture: Cloud-native microservices direction, but a heterogeneous landscape of acquired monoliths/codebases underneath.

## Team Health
- Glassdoor overall ~3.9/5 for Software Developer roles (43 dev reviews), so individual dev experience trends positive.
- Pros cited: collaborative colleagues, people who want you to succeed, generally good work environment, solid benefits (flexible PTO, remote allowance), recognized as a Canada Top Employer.
- Cons cited (engineering-specific and pointed):
  - Legacy tech: "every single codebase is ancient", services left on 10-year-old versions, limited growth for juniors.
  - Technical leadership vacuum: no long-tenured technical authority figures.
  - Severe management churn: constant re-proving to ever-changing managers/directors; reports of 10+ managers over 3-4 years.
  - Unresolved integration debt from the acquisition-heavy past: acquired companies (ShopKeep, Upserve, Vend, Ecwid) bolted on faster than systems, teams and processes get consolidated, so the integration work never finishes. (Loosely-worded Glassdoor theme, from search summaries not a direct read.)

## Business Stability
- Public, dual-listed (TSX/NYSE). Materially de-risked vs the 2024 layoff/strategic-review period.
- 2024 was rough: two restructurings, ~200 jobs cut (~10% in one round), exploration of a sale.
- FY2026 trajectory is positive: accelerating Customer Locations and GTV, new AI/Marketplace products, raised guidance, ~$479M cash on hand. The turnaround under founder-CEO Dasilva appears to be working.
- Net: financially stable now, but the recent volatility means cost discipline and reorg risk remain plausible.

## Red Flags
- Heavy, well-documented legacy tech debt across acquired codebases. An EM should expect modernization/migration work, not greenfield.
- Chronic management turnover reported in reviews. Organizational instability at the leadership layer is the standout cultural risk for someone joining as a manager.
- Two restructurings and ~200 layoffs in 2024; a sale was actively explored. Recent enough to warrant due diligence on team stability and roadmap commitment.
- Acquisition-driven sprawl created duplicated systems and "reinventing the wheel" dynamics.
- Thin engineering brand (no strong eng blog, minimal open source) limits external visibility into current practices.

## Sources
- [Lightspeed Commerce - Wikipedia](https://en.wikipedia.org/wiki/Lightspeed_Commerce)
- [Dax Dasilva - Wikipedia](https://en.wikipedia.org/wiki/Dax_Dasilva)
- [Lightspeed lays off 200 employees in second restructuring of the year - BetaKit](https://betakit.com/lightspeed-lays-off-200-employees-in-second-restructuring-of-the-year/)
- [Lightspeed reduces staff by 10 percent following Dax Dasilva's return - BetaKit](https://betakit.com/lightspeed-reduces-staff-by-10-percent-in-suite-of-cost-cutting-steps-following-dax-dasilvas-return/)
- [Lightspeed Announces Third Quarter 2026 Financial Results and Raises Fiscal 2026 Outlook - PR Newswire](https://www.prnewswire.com/news-releases/lightspeed-announces-third-quarter-2026-financial-results-and-raises-fiscal-2026-outlook-302679696.html)
- [Lightspeed Reviews - Glassdoor](https://www.glassdoor.com/Reviews/Lightspeed-Reviews-E648762.htm)
- [Lightspeed Software Developer Reviews - Glassdoor](https://www.glassdoor.com/Reviews/Lightspeed-Software-Developer-Reviews-EI_IE648762.0,10_KO11,29.htm)
- [Lightspeed Tech Stack - StackShare](https://stackshare.io/companies/lightspeed)
- [Lightspeed Commerce Technology Stack - RocketReach](https://rocketreach.co/lightspeed-commerce-technology-stack_b5d1db30f42e4ca7)
- [Lightspeed Commerce Inc. - GitHub](https://github.com/lightspeed)
- [Careers at Lightspeed Commerce](https://www.lightspeedhq.com/careers/)
- [Lightspeed Buys eCommerce Providers in a $925 Million Deal - Tech.co](https://tech.co/news/lightspeed-ecommerce-providers-deal)
