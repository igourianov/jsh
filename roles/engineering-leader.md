# Engineering Leader

Baseline qualification profile for engineering leadership roles: what a posting shares with every other posting at the same grade.

**The baseline is a Product Engineering Manager.** Someone who leads a product team, ships customer-facing software, and *consumes* the platform, infrastructure and tooling that other teams build. Everything a posting asks beyond that job is job-specific and scores.

This file contains no weights and no scores. It is a filter with an inside and an outside.

Each bullet is one filter entry. What the bullet text describes is inside the filter: baseline, subtracted, not scored.

- `excludes:` lists what falls **outside** the entry despite resembling it, either by exceeding a bound (`16+ engineers` against an entry covering 5 to 15) or by being more specific than the generic the entry covers (`Kubernetes` against an entry covering cloud environments in general). Excluded requirements are job-specific and score.
- `below:` marks an ask that is under-scoped for the grade. Not a gap and never scored. Raises a seniority flag.

Numeric bounds are the only numbers in this file and they are hard.

### Consuming versus building

Direct consequence of the baseline being a Product EM, and it applies to **every entry in this file**, whether or not an `excludes:` line spells it out.

Entries cover the **consuming** side of a capability: using it to run your own team. Building that capability as a platform other teams consume is a different qualification wearing the same words, and it is never baseline here.

`CI/CD` in a product posting means operating a pipeline for your team. `CI/CD` in a DevOps posting means building the pipeline other teams deploy through. Both are unremarkable for their own kind of role, which is why this cannot be resolved by looking at the engineering domain. It is resolved per entry: consuming is inside the filter, building is outside it and scores.

Where an entry spells out the split explicitly it is because the wording is otherwise easy to misread, not because the rule is narrower elsewhere.

This is the one place where a posting can be entirely ordinary for its own role type and still surface a real gap.

## Qualifications

Baseline at every grade unless a grade section says otherwise.

### People management

- Coaching and mentoring engineers, 1:1s, feedback
- Hiring: running loops, screening, closing candidates, designing the interview process for own teams
  - excludes: building a recruiting function, employer branding, hiring programs above own org
- Career development, growth plans, promotions, levelling conversations
- Building and growing high-performing teams
- Performance management, including underperformance and managing out
- Leading remote, hybrid or distributed teams across timezones
  - excludes: a named timezone band with required overlap hours
- Team culture, engagement, retention, psychological safety

### Product management

- Delivery and execution: shipping predictably, on time, owning outcomes
- Cross-functional partnership with Product, Design, UX and other engineering teams
- Stakeholder management and communication with leadership
- Roadmap planning, quarterly cycles, OKRs and goal setting
- Requirements gathering, scoping, breaking down work, discovery
- Prioritization, tradeoffs, backlog management
- Technical strategy and vision for own scope
  - excludes: multi-year strategy, company-level technical vision, board or exec-level input
- Customer focus, user impact, translating user needs to engineering work

### Process management

- Quality: testing strategy, automation, coverage, shift-left, for own team's code
  - excludes: building test infrastructure, frameworks or tooling other teams consume
- Incident response, on-call rotations, escalation, postmortems, reliability ownership for own services
  - excludes: owning reliability org-wide, establishing an SRE practice, error budgets, SLO ownership as a discipline
- SDLC ownership, engineering process improvement, development best practices, ways of working, within own team
  - excludes: defining engineering process org-wide, building an internal developer platform, developer experience as a mandate
- Agile, Scrum, Kanban, sprints, iterative delivery
- CI/CD, deployment pipelines, release process: operating and improving them for own team
  - excludes: building deployment or release platform other teams consume
- Observability, monitoring, engineering metrics, DORA: consuming them to run own team
  - excludes: building the observability or metrics platform

### Technical

- Architecture and system design oversight, design reviews, scalability
- Working in a cloud environment with modern infrastructure: deploying onto it, operating own team's services
  - excludes: any named cloud, orchestrator or IaC tool
  - excludes: building or operating the infrastructure platform itself, capacity and cost ownership, multi-region or DR architecture as a mandate
- Familiarity with AI-assisted development tooling, using it on own team
  - excludes: leading or championing its adoption, establishing practices for validating or governing AI-generated code, agentic development practices as a stated mandate
  - excludes: shipping ML or LLM products, owning an AI platform, driving org-wide AI transition
- Meeting security and compliance requirements for own team's services: secure coding, audit evidence, working within SOC 2, GDPR or similar
  - excludes: owning the security or compliance program, running certification, building security tooling, a named regime as a core requirement
- Using data and analytics to run own team, data-informed decisions
  - excludes: building data pipelines, warehouses or a data platform, owning analytics as a product
- Technical direction and decision-making for own teams
- Technical debt, legacy modernization, refactoring

Every named language, framework, database, platform, protocol, API style or architectural pattern is job-specific. `Architecture and system design oversight` covers the act of doing architecture, never a named architecture: `cloud-native architectures` and `RESTful APIs` both score. Nothing in this file covers them.

### Product domain

The industry vertical and business domain the company sells into: fintech, healthcare, e-commerce, HR tech, legal tech, adtech, logistics, gaming. Company-scoped, so it is normally the same for every role at the company.

- The posting names a product domain or industry vertical
  - excludes: the specific domain named. **Always job-specific.** No product domain is baseline.
- Integrating own team's product with third-party or partner systems
  - excludes: named systems (Salesforce, Workday, a payment processor, a specific ERP)
  - excludes: building an integration platform, owning partner or API ecosystem as a product

### Engineering domain

What the team or org reporting into *this role* builds: product, platform, infrastructure, DevOps/SRE, data, security, ML, mobile, embedded, developer experience. Not what the company builds and not what the wider engineering org builds. A Platform role at a product company is Platform.

Opposite treatment from product domain. Product engineering is the default and is baseline. Every other engineering domain is job-specific.

- Product engineering: building customer-facing features on a product team
  - excludes: any other engineering domain. Platform, Infrastructure, DevOps, SRE, Data, ML/AI Platform, Security Engineering, Mobile, Frontend-only, Embedded, Developer Experience, Internal Tools, Quality Engineering.

A non-Product engineering domain scores once, here. The generic entries elsewhere in this file stay baseline regardless of domain, because a DevOps posting that mentions CI/CD generically is using the same boilerplate a product posting uses. Scoring it again because the role is DevOps would count one signal several times.

What separates those postings is not the topic but the side of it. See Consuming versus building.

### Soft skills

- Communication with technical and non-technical audiences, written and verbal
- Operating under ambiguity, autonomy, self-direction
- Influence without authority, driving alignment, building buy-in

### Education

- Bachelor's or Master's in CS or equivalent practical experience
  - excludes: a degree with no equivalence clause, or a required certification

## Grades

Three grades, defined by scope. Titles map onto them loosely, see Title mapping.

### Technical Lead

Technical leadership without formal reporting lines.

- Technical leadership of a team, no direct reports
- Hands-on production coding as the primary activity
- Code ownership, code review, design documents
- Mentoring engineers on technical craft

From `## Qualifications`, only these apply: coaching and mentoring, delivery and execution, cross-functional partnership, quality, incident response, architecture and system design, technical direction, communication. Everything else in that section is job-specific at this grade.

Thinly evidenced. Authored, not derived from the corpus.

### Manager

One to two teams, direct reports, no management layer in between.

- 3 to 5 years of engineering management
  - excludes: 6+
  - below: under 3
- 5 to 8 years of software engineering
  - excludes: 10+
  - below: under 4
- 5 to 15 engineers as direct reports
  - excludes: 16+, three or more teams, any layer of managers between
  - below: fewer than 5, or no direct reports
- Hands-on technical work: code review, design docs, occasional contribution
  - excludes: a stated coding percentage above 30%, or on-call as an individual contributor

### Director

Multiple teams with managers or leads reporting in.

- 8+ years of engineering management
  - below: under 6
- 10 to 12 years of software engineering
- 20 to 60 engineers across multiple teams
  - excludes: 60+, multiple sub-orgs, directors reporting in
  - below: under 20, or a single team
- Managing managers, second-line leadership
- Organizational design, headcount planning, team topology, reorgs
- Budget ownership, vendor and contractor management
- Multi-team strategy and long-range planning
- Security and compliance ownership across the org, raising it from consuming to owning
  - excludes: building security tooling, or a named regime as a core requirement
- Distributed systems and scale as a stated context

Two expectations **drop** at this grade and become job-specific when a posting states them: hands-on coding, and career development of individual engineers.

Team size bound is provisional. Few postings at this grade state one.

## Title mapping

Title is a weak prior. Grade is set by stated scope: team size, number of teams, and whether managers or leads report in. Where the posting states scope, scope wins. Where it states none, fall back to the title prior and company size.

| Title | Prior | Notes |
|---|---|---|
| Engineering Manager, Software Engineering Manager, Software Development Manager | Manager | |
| Senior Engineering Manager, Senior Manager Engineering | Manager | Title inflation is the norm here, not the exception. Most such postings describe a team of 12 or fewer. Promote to Director only on explicit evidence: managers reporting in, 16+ engineers, or three or more teams. |
| Director of Engineering, Director of Software Engineering, Senior Director | Director | Demote to Manager when the team is under 20 with no management layer. |
| Head of Engineering, VP of Engineering, CTO | Director | Strongest inflation signal, especially at seed and Series A. Demote to Manager below 20 engineers. At a company under 50 people, assume Manager grade until scope proves otherwise. |
| Engineering Team Lead, Lead Software Engineer, Staff Software Engineer | Technical Lead | Demote from Manager when the posting has no direct reports. |

Inflation runs one direction. A small company gives a large title for a small job. Deflation is rare: a Director title at a 2000-person company usually means a Director job.

Grade misfits are not gaps and never score. A posting graded below the target grade is a seniority signal, not a qualification failure.

## Maintenance

Seeded 2026-07-31 from 285 screening files with parseable `## Qualifications` sections: 189 Engineering Manager, 55 Senior Engineering Manager, 33 Director, 3 VP, 4 Technical Lead. 4,614 qualification bullets.

Entries were selected by how often a concept recurred across postings at each grade, measured on qualifications as extracted by `screen-job` rather than on raw posting text. That makes them evidence of what is boilerplate, not a neutral measurement of what employers ask for. Frequency data is deliberately not carried in this file. It is reproducible from the corpus when the file needs revising.

The two domain axes get opposite treatment because the corpus distributions are opposite. Engineering domain is concentrated: a single value covers more than half of all postings, so a default exists and can be treated as noise. Product domain is dispersed across dozens of verticals with no value above a tenth of the corpus, so no default exists and every domain carries signal.

Grow this file from observed recurrence, not guesswork. When the same qualification scores as job-specific across many unrelated postings, that is the signal to promote it here. Every promotion lowers future match scores, so make it a deliberate commit that can be reverted.

Manager grade rests on real corpus volume. Director is thin on team size. Technical Lead is authored from almost nothing and needs replacing as records accumulate.
