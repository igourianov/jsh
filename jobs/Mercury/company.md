# Mercury

- **Company Type:** Platform (fintech banking for startups and SMBs)
- **Stage:** Scale-up
- **Size:** ~800-1,300 (sources disagree: Wikipedia ~800, jobsbyculture ~1,300)
- **Remote Policy:** Remote (postings list Remote, Canada and Remote, US)

## Quick Take
- Profitable for four years, ~$650M annualized revenue, $5.2B valuation after a $200M Series D in 2026.
- Entire backend is Haskell (~2M lines). Hires for aptitude and trains on the job, which matches the Haskell "willing to learn" requirement.
- Moving from partner banks to its own national bank charter (conditional OCC approval 2026-04, operational expected late 2027). Heavy regulatory, risk and compliance load for engineering managers in banking teams.

## Milestones
- 2017: founded in San Francisco by Immad Akhund (CEO), Max Tagher (CTO) and Jason Zhang (COO).
- 2023: gained many customers and deposits after the Silicon Valley Bank collapse.
- 2024-04: launched personal banking. 2024-05: launched bill pay and invoicing software.
- 2024-06: data breach at partner bank Evolve Bank & Trust. Revenue ~$500M for the year.
- 2025-03: $300M Series C (Sequoia-led) at $3.5B valuation. Announced migration away from Evolve to Choice Financial Group and Column N.A.
- 2025: Timothy Mayopoulos (former interim SVB head) joined the board.
- 2025-12-19: applied for OCC national bank charter. Jon Auxier (ex-SoFi, Green Dot, Goldman Sachs) named CEO of the proposed Mercury Bank.
- 2026-04: conditional OCC charter approval.
- 2026-05: $200M Series D led by TCV at $5.2B valuation (up 49% in 14 months).

## Company & Product
Financial stack for startups and small businesses: business checking and savings, treasury, cards, bill pay, invoicing, wires and real-time payments, plus personal banking. Over 300,000 customers, including about a third of early-stage startups. Not a bank today. Banking services are provided through partner banks until the charter goes live. Reported ~$20B in deposits (mid-2025) and ~$248B annual transaction volume.

## Engineering Culture
- Monorepo with Nix-based reproducible builds and remote caching. CI times grow with the repo and require ongoing investment.
- Property-based testing (Hedgehog/QuickCheck), integration and contract tests, types used as compile-time validation.
- Hires for aptitude rather than Haskell experience. Internal education, pairing and documentation support onboarding.
- Interview process includes a "craft round" per interview guides.
- Reported engineering autonomy and high talent density.
- Stated costs: slow compile times, smaller talent pool, less mature tooling.

## Tech Stack
- Backend: Haskell (Yesod, Persistent), 100% of backend.
- Frontend: React, TypeScript, Redux (Elm referenced in some sources).
- Mobile: Swift and Kotlin native apps.
- Infrastructure: AWS (ECS/Kubernetes), Postgres, Nix.

## Team Health
- Glassdoor (Mercury.com): ~4.4 overall, 82% recommend. Software engineer rating 4.7 on a small sample (15 reviews).
- Positives: supportive people, shared mission, strong compensation (engineer range ~$138K-$370K, median ~$214K per third-party data).
- Negatives: communication gaps from fast growth, shifting priorities, uneven work-life balance around regulatory deadlines (4.0/5).
- Glassdoor results mix in unrelated companies named Mercury. Review figures are from third-party summaries and were not verified on Glassdoor directly.

## Business Stability
- Profitable, well-funded (Sequoia, a16z, Coatue, CRV, Sapphire, Spark, TCV).
- No layoffs found in searches.
- Charter reduces dependence on partner banks, which was a risk exposed by the Evolve breach and partner migration.
- Risks: charter build-out through 2027 (regulatory scrutiny, compliance staffing, bank-grade controls), startup-customer concentration tied to venture funding cycles.

## Red Flags
- No major red flags found.
- Watch items: Evolve breach (partner-side, 2024), partner bank migration complexity, regulatory deadline pressure on teams, niche Haskell skill base.

## Sources
- [Wikipedia: Mercury Technologies](https://en.wikipedia.org/wiki/Mercury_Technologies)
- [CNBC: Mercury hits $5.2B valuation](https://www.cnbc.com/2026/05/20/fintech-mercury-valuation-fundraise-bank-charter.html)
- [PYMNTS: Mercury valued at $5.2B](https://www.pymnts.com/news/investment-tracker/2026/mercury-valued-at-5-2-billion-as-it-pushes-deeper-into-banking/)
- [Banking Dive: Mercury nabs conditional OCC charter](https://www.bankingdive.com/news/mercury-nabs-conditional-occ-charter/818674/)
- [Payments Dive: Mercury applies for OCC charter](https://www.paymentsdive.com/news/fintech-mercury-apply-occ-national-bank-charter-fdic-fed-jon-auxier-sofi/808491/)
- [DEV: A Couple Million Lines of Haskell at Mercury](https://dev.to/onsen/a-couple-million-lines-of-haskell-production-engineering-at-mercury-4jd6)
- [jobsbyculture: Working at Mercury 2026](https://jobsbyculture.com/blog/working-at-mercury-2026)
- [Glassdoor: Mercury Software Engineer Reviews](https://www.glassdoor.com/Reviews/Mercury-Software-Engineer-Reviews-EI_IE3583070.0,7_KO8,25.htm)
- [Sacra: Mercury](https://sacra.com/c/mercury/)
- [Tech Interview: Mercury interview guide](https://www.techinterview.org/companies/mercury/)
