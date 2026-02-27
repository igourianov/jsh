# NEOGOV

- **Company Type:** SaaS / Platform
- **Stage:** Private equity-backed (mature)
- **Size:** ~750-770 employees
- **Remote Policy:** Fully remote (US/Canada)

## Quick Take
- Market leader in public sector HR SaaS with 25 years of entrenched customer relationships and 98% retention - a defensible moat
- Currently mid-ownership-change (EQT/CPP Investments acquiring for $3.1B) which typically signals a push for growth and efficiency, not stability
- Engineering reviews from ICs are notably negative - offshoring, legacy-first culture, and non-technical leadership are recurring themes

## Milestones
- **2000:** Founded in El Segundo, CA by Ward Komers and Damir Davidovic; launched GovernmentJobs.com
- **2016:** Warburg Pincus invested, beginning the PE ownership phase
- **2017:** Acquired FirstNet Learning (learning management)
- **2018:** Acquired High Line (HRIS)
- **2020:** Launched NEOED brand (education-focused HR suite); merged with PowerDMS (compliance and policy management for public safety)
- **2021:** Carlyle Group joined as minority shareholder; PowerDMS merger completed; acquired three public safety tech companies (PlanIt Schedule, Agency360, CueHit)
- **2022:** Integrated PlanIt, Agency360, CueHit into the PowerDMS platform
- **2025 (July):** Acquired by EQT X fund and CPP Investments for ~$3.1B from Warburg Pincus and Carlyle
- **2025 (September):** Achieved FedRAMP Moderate authorization

## Company & Product

NEOGOV is the dominant SaaS provider for public sector HR in North America, serving nearly 10,000 government agencies, public safety organizations and educational institutions. The platform covers the full employee lifecycle under three brands:

- **NEOGOV** - Core public sector HR suite: Insight (ATS), Attract (CRM), Onboard, Perform, Learn, eForms, HRIS, Vetted (background investigations), Policy, and payroll/benefits/time & attendance
- **PowerDMS** - Public safety management platform (policy compliance, accreditation, scheduling for police, fire, 911)
- **NEOED** - HR suite tailored for education sector

GovernmentJobs.com (operated by NEOGOV) is the largest public sector job board in the US. Revenue estimated at $141-156M ARR. Customer retention is 98%, reflecting high switching costs in the regulated public sector.

## Engineering Culture

The role targets managing multiple scrum teams doing dual-track work: maintaining a legacy ASP.NET MVC/.NET Framework monolith while building cloud-native .NET Core 8 services on Azure. This modernization mandate is central to the EM role.

No public engineering blog. No notable open source contributions. The tech posture is standard enterprise SaaS - FedRAMP compliance, Azure cloud, CI/CD, and recent investment in AI tooling (GitHub Copilot is required daily use per the job posting). The "Shift Left" and full feature ownership model is called out as a positive cultural signal.

PE-backed companies at this stage typically apply pressure on velocity and cost reduction, which can translate into unrealistic team capacity expectations. One recent review explicitly called out AI being used to justify pushing more work onto teams with no corresponding compensation increase.

## Tech Stack

- **Languages:** C#, .NET Framework (legacy), .NET Core 8 (modern)
- **Frontend:** Angular, Knockout.js (legacy)
- **Databases:** SQL Server, MongoDB, Elasticsearch, Apache Solr (legacy)
- **Cloud:** Azure
- **Architecture:** ASP.NET MVC monolith + cloud-native microservices (DDD, CQRS, event-driven)
- **DevOps:** Git, CI/CD, GitHub Copilot
- **Compliance:** FedRAMP Moderate (certified September 2025)

The stack is squarely Microsoft/Azure. The presence of Knockout.js and Apache Solr signals meaningful legacy surface area that hasn't been fully modernized.

## Team Health

- **Glassdoor overall:** 3.2/5 (226 reviews), 49% would recommend
- **Work-life balance:** 3.6/5
- **Culture & values:** 3.0/5
- **Career opportunities:** 3.0/5

Positive themes from general employees: flexible remote work, nice and collaborative people, mission-driven culture serving public sector.

Negative themes specifically from engineering: leadership described as non-technical and resistant to IC input; legacy of offshoring that created a "yes men" dynamic; micromanagement and blame-shifting cited; AI hype driving unrealistic throughput expectations with no compensation offset. One review directly stated "engineering leadership is clueless at this company."

Interview process is described as conversational and informal, averaging ~19 days end-to-end.

## Business Stability

Stable and improving. Public sector SaaS has structural advantages: long contract cycles, regulatory lock-in, non-cyclical spend. 98% retention and a 10,000-agency client base validate the moat. The $3.1B acquisition price by two reputable institutional investors (EQT and CPP Investments) signals confidence in the growth trajectory.

Revenue estimated ~$141-156M. Market growing at ~12% CAGR. FedRAMP certification (September 2025) opens the federal agency market previously inaccessible to them, representing a meaningful expansion opportunity.

The ownership transition from Warburg Pincus/Carlyle to EQT/CPP is a PE-to-PE handoff, not a distress event. EQT's stated strategy includes advancing AI capabilities and operational efficiency - expect headcount discipline and product acceleration pressure.

## Red Flags

- **Engineering leadership credibility gap:** Recurring IC complaints about non-technical management and a culture where engineers pushing for better practices are sidelined. An incoming EM would be entering this environment either as part of the problem or as an agent of change - the latter is harder than it sounds in entrenched cultures.
- **Offshoring dynamic:** Legacy of offshoring cited as institutionalizing deference over competence. Could make team rebuilding or culture change slow.
- **PE ownership transition:** EQT acquisition brings new investor pressure. Early post-acquisition period typically involves efficiency reviews, reorganizations and potential headcount changes.
- **AI-as-velocity-pressure:** Reviews indicate AI tools are being used to justify higher output expectations without resourcing or compensation adjustments - a burnout signal.
- **Legacy tech surface area:** Knockout.js and Apache Solr indicate pockets of the codebase that are challenging to staff and maintain.

## Sources
- [NEOGOV - Wikipedia](https://en.wikipedia.org/wiki/Neogov)
- [EQT and CPP Investments to acquire NEOGOV (EQT press release)](https://eqtgroup.com/news/eqt-and-cpp-investments-to-acquire-neogov-a-provider-of-hr-and-compliance-software-for-us-public-sector-agencies-from-warburg-pincus-and-carlyle-2025-07-28)
- [Warburg Pincus and Carlyle announce sale to EQT (PR Newswire)](https://www.prnewswire.com/news-releases/warburg-pincus-and-carlyle-announce-agreement-to-sell-neogov-to-eqt-and-cpp-investments-302515060.html)
- [NEOGOV announces Carlyle/Warburg Pincus investment (PR Newswire)](https://www.prnewswire.com/news-releases/neogov-announces-growth-investment-from-the-carlyle-group-and-warburg-pincus-301301190.html)
- [NEOGOV and PowerDMS join forces (PR Newswire)](https://www.prnewswire.com/news-releases/neogov-and-powerdms-join-forces-301191499.html)
- [NEOGOV three public safety acquisitions (PRWeb)](https://www.prweb.com/releases/neogov_announces_three_key_acquisitions_in_public_safety_tech/prweb18421787.htm)
- [NEOGOV FedRAMP Certification announcement](https://www.prweb.com/releases/neogov-announces-fedramp-certification-302556038.html)
- [NEOGOV GovTech 100 2025](https://blog.neogov.com/press/govtech100-2025)
- [NEOGOV Glassdoor reviews](https://www.glassdoor.com/Reviews/NEOGOV-Reviews-E356140.htm)
- [NEOGOV Software Engineer Glassdoor reviews](https://www.glassdoor.com/Reviews/NEOGOV-Software-Engineer-Reviews-EI_IE356140.0,6_KO7,24.htm)
- [NEOGOV Careers](https://www.neogov.com/about-us/careers/)
- [NEOGOV revenue estimate (Kona Equity)](https://www.konaequity.com/company/neogov-4395636930/)
- [EQT strategic analysis of NEOGOV acquisition (ainvest)](https://www.ainvest.com/news/strategic-acquisition-neogov-eqt-cpp-investments-high-conviction-play-public-sector-saas-market-2507/)
