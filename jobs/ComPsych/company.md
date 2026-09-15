# ComPsych

- **Company Type:** Services with a product layer (EAP, behavioral health and absence management delivered through proprietary digital platforms)
- **Stage:** Enterprise, private equity-backed (Stone Point Capital buyout, 2017)
- **Size:** Estimates vary widely: ~1,200 (Revelio Labs, 2026-03) to 1,001-5,000 (LinkedIn band). Operations-heavy workforce (counselors, intake, leave case managers); engineering is a small share.
- **Remote Policy:** Global HQ in Chicago (One Prudential Plaza, moved 2025-07). Leadership frames it as flexible, "trusting staff to determine their optimal work arrangements". The SEM posting is Remote (Canada). Glassdoor reviewers cite work-from-home flexibility as a plus.

## Quick Take
- 40-year-old incumbent and the largest EAP provider by covered lives (160M+ lives, 75,000+ customers, 40% of the Fortune 500). Technology has historically been a cost center behind a services business, and reviews call the systems dated.
- New outside leadership is driving a technology reset: CEO Paul Posey (from 2024), a relaunched GuidanceResources digital platform (2025-01), brand refresh (2025-05) and a new Chief Product & Technology Officer, Pratik Savai (start of 2026), with a visible AI-first engineering hiring push. This role sits inside a modernization that is roughly 8-9 months old under its current tech leader.
- Key concerns: PE hold now ~9 years (exit or recap is overdue by typical timelines), digital-first competitors (Lyra, Spring Health) pressuring the incumbent on product quality, and a split CPTO/CIO structure worth understanding before accepting.

## Milestones
- 1984: Founded in Chicago by Dr. Richard A. Chaifetz as a behavioral health and EAP provider. Chaifetz ran it as CEO for ~40 years and remains Chairman.
- 1998: Added integrated work-life, legal and financial services.
- 2000: Added FMLA leave administration (later the FMLASource brand, now AbsenceResources). Began serving India, Middle East and Africa customers.
- 2017: Stone Point Capital buyout investment; still listed as a current portfolio holding in 2026.
- 2024 (reported January): Paul J. Posey, Jr. becomes CEO. First non-founder CEO. Background: 14 years at Sedgwick (General Counsel, then COO), CEO of Ascension Care Management, then CEO of Robin Healthcare (AI clinical documentation startup) from 2022.
- 2025-01-01: Reimagined GuidanceResources digital platform launched with three pathways (Connect Me, Guide Me with AI-assisted navigation, Assess Me), in 40+ languages. Won an Astrid Award.
- 2025-03-10: New CFO (Bruce Candebat, succeeding retiring Bob Mallers) and a newly created Chief Commercial Officer role (Matt Alberico, ex-Headspace, Amazon Care, Cigna).
- 2025-05-15: First brand refresh and logomark in company history; FMLASource renamed AbsenceResources.
- 2025-07-14: Global HQ moved to One Prudential Plaza, Chicago (50,000 sq ft, collaboration-focused).
- Early 2026: Pratik Savai joins as Chief Product & Technology Officer (previously CTO at LegalZoom from 2025-03 and CTO at Elation Health). AI-first engineering job postings (Staff Frontend, Senior SWE, Senior Engineering Manager) follow.
- 2026-05: Published "Well-being in the Age of AI: Four Paths to Healthy Use"; shipped an AI-powered audio reader for content. Named Shortlister Top Vendor Q2 2026 in three categories.

## Company & Product
ComPsych sells employer-paid mental health and absence programs. Two product lines:

- **GuidanceResources** - EAP, behavioral health counseling, work-life, legal and financial guidance, well-being and health navigation. Delivered through a network of 120,000+ credentialed behavioral health professionals plus a digital app/portal.
- **AbsenceResources** - Federal, state, ADA and company-specific leave administration with employee self-service and automated compliance tooling.

The differentiator is breadth in a single contract (EAP plus work-life plus legal/financial plus leave), global reach (200 countries) and scale. The weakness, per market commentary, is that its digital experience and measurement-based care lag digital-first competitors such as Lyra Health and Spring Health. Customers named on the site include Uber, Nvidia, Yamaha and Hyatt.

Leadership is almost entirely new since 2024: CEO, CFO, CCO and CPTO are all recent hires from outside. Executive team also includes a separate CIO (Jeff Tschiltsch), a Chief Clinical Officer, a Chief Strategy Officer and a VP of Global Development and Strategy.

## Engineering Culture
- No public engineering blog, GitHub organization or conference presence found. Engineering is not externally visible, consistent with a services company that is only now building a product engineering identity.
- Current job postings define the target culture explicitly: "AI-led development practices" where agents generate code, tests and first-pass reviews; engineers spend more time on specification, architecture and verification than on line-by-line coding; Engineering, Product and Design working end to end.
- Stated modernization scope: new customer-facing web and mobile experiences, a unified design system and AI-powered capabilities. Postings emphasize raising "the engineering bar for how we design, build, and operate software", which implies the bar is currently low.
- Practices named in postings: IaC, CI/CD, contract/integration/unit testing strategy, observability and SLOs, OWASP, threat modeling, HIPAA/PHI handling, OAuth2/OIDC.
- Glassdoor tech-related comments mention a focus on updating tech stacks and coding practices and encouragement of AI tooling, alongside older complaints of disorganized IT and underinvestment.

## Tech Stack
Assembled from 2026 job postings. No authoritative public stack description exists.

- **Frontend:** TypeScript with Angular (Staff Frontend posting names Angular as primary), React also referenced. Design system under construction.
- **Backend:** Postings accept Java, Python, C#, Kotlin or Go, which suggests a heterogeneous or undecided backend. The SEM posting points toward Azure/C#.
- **Cloud:** AWS and Azure both named.
- **Platform:** Kubernetes, serverless, Kafka, event-driven/async systems, SQL databases, REST APIs.
- **AI:** LLM application engineering, RAG, agentic development tooling. AI-assisted navigation already in production in GuidanceResources.
- **Compliance context:** PHI/HIPAA and GDPR (EEA/UK data protection notice), global data residency across 200 countries.

Worth asking in interviews: what the legacy core looks like (GuidanceResources and AbsenceResources back ends), whether the modernization is a rewrite or strangler, how much work is offshore or vendor-built and how CPTO and CIO split ownership.

## Team Health
- **Glassdoor** (search snippets, direct fetch blocked): ~4.0/5 on 852 reviews, 71-73% would recommend. Sub-ratings: work-life balance 4.2, culture and values 4.1, career opportunities 3.7, compensation and benefits 3.1-3.2. Software Engineer comp rating 2.1 (only 2 ratings). The overall figure looks high against the tone of several visible review titles and could not be verified directly.
- **Positive themes:** work-life balance, remote flexibility, mission-driven work, recent reviews crediting new leadership with a real focus on growth, technology and people.
- **Negative themes:** below-market pay, dated technology ("seen better technology at companies 10 years ago"), disorganization across HR, IT and teams, weak cross-department communication and transparency, underinvestment in training. Review titles such as "Only if your desperate", "The negative reviews are all true!" and "Should've Listened to Reviews" indicate a long tail of strongly negative experiences, most likely concentrated in operational and counseling roles.
- Engineering-specific review volume is very small, so team health for the technology org is effectively unknown from public data.

## Business Stability
- Private, no disclosed revenue. Stone Point Capital buyout in 2017, still a current holding. No funding or debt events found since.
- Market leader by scale in a category with sticky multi-year employer contracts and broad geographic coverage. Continued recognition (Shortlister Top Vendor 2026, Inc. Best in Business 2024).
- Actively investing: HQ move, brand refresh, new digital platform, new executive hires and an engineering hiring wave. 81 active job postings in 2026, up 3.8% from 2025.
- No layoffs, data breaches or class actions involving ComPsych found in public sources.
- Competitive pressure from venture-funded digital mental health platforms (Lyra, Spring Health, Modern Health, Headspace) is the main structural risk to the incumbent EAP model.

## Red Flags
- **Long PE hold:** Stone Point has held ComPsych for ~9 years. The 2024-2025 wave of new executives, brand refresh and platform relaunch fits a pre-exit value-creation playbook. A sale or recapitalization could bring a new owner, new priorities or cost cuts shortly after joining.
- **Leadership churn and short tenures:** Nearly the whole C-suite is new since 2024. The CPTO left LegalZoom after roughly 9-10 months as CTO before joining ComPsych, so tech leadership continuity is unproven.
- **Split technology ownership:** A Chief Product & Technology Officer and a separate Chief Information Officer both sit on the executive team. Boundaries over infrastructure, legacy systems and security may be contested.
- **Services company DNA:** Technology has historically been a cost center with dated systems and below-market pay. The AI-first engineering vision is new and aspirational, and the org may not yet have the funding, talent density or patience to match the posting language.
- **Heterogeneous stack signals:** Postings accepting five backend languages and both AWS and Azure suggest either an undefined target architecture or a fragmented estate, both of which land on the engineering leader.
- **Opaque engineering org:** No blog, no OSS, almost no engineering reviews. Team size, offshore footprint and delivery maturity must be established in interviews.

## Sources
- [ComPsych: About Us and leadership team](https://www.compsych.com/about-us/)
- [ComPsych: Refreshed brand press release (2025-05-15)](https://www.compsych.com/press-release/compsych-unveils-refreshed-brand-dedicated-to-igniting-human-potential-in-workplaces-worldwide/)
- [ComPsych: Key additions to executive team (2025-03-10)](https://www.compsych.com/press-release/compsych-bolsters-leadership-with-key-additions-to-executive-team/)
- [ComPsych: HQ relocation to Prudential Plaza (2025-07-14)](https://www.compsych.com/press-release/compsych-relocates-global-headquarters-to-prudential-plaza-in-chicago/)
- [ComPsych: In the News](https://www.compsych.com/compsych-in-the-news/)
- [Business Wire: Well-being in the Age of AI (2026-05)](https://www.businesswire.com/news/home/20260518634303/en/ComPsych-Unveils-Well-being-in-the-Age-of-AI-Four-Paths-to-Healthy-Use)
- [Las Vegas Sun: 2025 Health at Work Award Winners (2026-05)](https://lasvegassun.com/news/2026/may/04/compsych-celebrates-mental-health-awareness-month-/)
- [Stone Point Capital: ComPsych portfolio page](https://www.stonepoint.com/company/compsych/)
- [PitchBook: ComPsych profile](https://pitchbook.com/profiles/company/101236-51)
- [Wikipedia: Richard Chaifetz](https://en.wikipedia.org/wiki/Richard_Chaifetz)
- [Crunchbase: Pratik Savai](https://www.crunchbase.com/person/pratik-savai-afa5)
- [GlobeNewswire: LegalZoom appoints Pratik Savai as CTO (2025-03-24)](https://www.globenewswire.com/news-release/2025/03/24/3047892/0/en/legalzoom-appoints-pratik-savai-as-chief-technology-officer-to-drive-innovation-and-growth.html)
- [Ascension: Posey named President, Ascension Risk Services](https://about.ascension.org/news/2014/02/posey-named-president-ascension-risk-services)
- [Revelio Labs: ComPsych employee count](https://www.reveliolabs.com/companies/compsych/employees)
- [freehire: ComPsych Staff Frontend Engineer posting](https://freehire.me/jobs/staff-frontend-engineer-compsych-corporation-r6f3teof)
- [freehire: ComPsych Senior Software Engineer posting](https://freehire.me/jobs/senior-software-engineer-compsych-corporation-xts6as5s)
- [Mantra Care: ComPsych alternatives (competitive positioning)](https://mantra.care/eap/compsych-alternatives/)
- [Shortlister: Spring Health vs Lyra Health](https://www.myshortlister.com/compare/spring-health-vs-lyra-health)

### Unverified (blocked bot access, not yet confirmed)
- [Glassdoor: ComPsych Reviews](https://www.glassdoor.com/Reviews/ComPsych-Reviews-E29641.htm) - 403, ratings taken from search snippets
- [Glassdoor: "Should've Listened to Reviews"](https://www.glassdoor.com/Reviews/Employee-Review-ComPsych-E29641-RVW102552410.htm) - 403
- [Glassdoor: "Only if your desperate"](https://www.glassdoor.com/Reviews/Employee-Review-ComPsych-E29641-RVW98259990.htm) - 403
- [Glassdoor: "The negative reviews are all true!"](https://www.glassdoor.com/Reviews/Employee-Review-ComPsych-E29641-RVW80213386.htm) - 403
- [Glassdoor: Software Engineer review](https://www.glassdoor.com/Reviews/Employee-Review-ComPsych-E29641-RVW6130359.htm) - 403
- [Indeed: ComPsych Reviews](https://www.indeed.com/cmp/Compsych/reviews) - 403, themes taken from search snippets
- [Comparably: ComPsych](https://www.comparably.com/companies/compsych) - 403
