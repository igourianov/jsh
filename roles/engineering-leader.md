# Engineering Leader

Baseline qualification profile for engineering leadership roles: what a posting shares with every other posting at the same grade.

**The baseline is a Product Engineering Manager.** Someone who leads a product team, ships customer-facing software, and *consumes* the platform, infrastructure and tooling that other teams build. Every entry covers the consuming side of its capability, whether or not an `excludes:` line spells it out.

Legend. Each bullet is one entry; its text is what the entry covers.

- `excludes:` lists what falls **outside** the entry despite resembling it, either by exceeding a bound (`16+ engineers` against an entry covering 5 to 15) or by being more specific than the generic the entry covers (`Kubernetes` against an entry covering cloud environments in general).
- `below:` marks an ask that is under-scoped for the grade.

Numeric bounds are the only numbers in this file and they are hard.

## Categories

The category vocabulary for a qualification, shared by this file's `###` headings and by the `## Qualifications` section of every screening file.

| Category | Covers |
|---|---|
| Eligibility | Threshold facts that gate consideration: years in role, industry or engineering as general experience rather than a specific skill; spoken language proficiency; the seniority qualification when one is emitted. Baseline entries for these live under `## Grades`, not under `## Qualifications`. |
| Engineering domain | What the team or org reporting into this role builds. Role-scoped, not company-scoped. |
| People management | Hiring, career development, performance assessment, team growth and scaling. |
| Product management | Delivery, backlog, ownership, stakeholder alignment, requirements gathering, cross-functional communication about product or strategy. |
| Process management | SDLC, Agile/Scrum/Kanban, CI/CD, shift-left and QA automation, process optimization, incident response and on-call, post-mortems, and process tools (Jira, Confluence, Miro). |
| Product domain | Industry vertical and business domain knowledge, third-party system integrations (HRIS, CRM, ERP, payment processors) and CMS tools. |
| Technical | Architectural oversight, system design, tech-debt management, code review, exploration and experimentation, named technologies, development tools, frameworks and languages. |
| Education | Degree, certification, formal credential. |
| Soft skills | General communication ability, culture, adaptability. |

Categorize a communication requirement by its subject, not by the act of communicating: product strategy goes to Product management, not Soft skills.

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

`Architecture and system design oversight` covers the act of doing architecture, never a named architecture. No named language, framework, database, platform, protocol, API style or architectural pattern appears anywhere in this file.

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

The generic entries elsewhere in this file cover the same ground at every engineering domain: `CI/CD` in a product posting is the pipeline the team deploys through, and so is `CI/CD` in a DevOps posting. What separates the two is the consuming/building side of it, not the topic.

### Soft skills

- Communication with technical and non-technical audiences, written and verbal
- Operating under ambiguity, autonomy, self-direction
- Influence without authority, driving alignment, building buy-in

### Education

- Bachelor's or Master's in CS or equivalent practical experience
  - excludes: a degree with no equivalence clause, or a required certification

## Grades

Four grades, defined by span and by what the role is accountable for. Titles map onto them loosely, see Title mapping.

| Grade | Span | Accountable for |
|---|---|---|
| Technical Lead | One team, no direct reports | The code |
| Manager | One or two teams, direct reports, no layer in between | The team's delivery |
| Senior Manager | Multiple teams, directly or through team leads. Or one team plus an outsized org mandate | Delivery across a group, hands still on the teams |
| Director | Pure second line, everything reaching them through a management layer | The org: strategy, structure, headcount |

**Senior Manager and Director are the pair that gets confused.** Reporting structure alone does not separate them, because a Senior Manager routinely has team leads in between. Two things do:

- **What the role runs.** Senior Manager runs teams, whether directly or through leads, and stays operationally close to their delivery. Director runs an organization and reaches delivery only through the managers who own it.
- **Where the mandate points.** Senior Manager's is execution across a group: shipping, quality, process, modernization. Director's is strategic: org design, headcount planning, budget ownership, multi-year direction.

A single-team scope also reaches Senior Manager when the role carries outsized influence beyond the team, such as owning a special project or an initiative that cuts across the org. Span is not the only route in.

Grade on substance, never on the layer's title. Team leads reporting in is ordinary Senior Manager shape and says nothing on its own; managers who own their teams' delivery reporting in, with the role's own mandate sitting above delivery, is Director.

**How a grade section is read.** Grades never inherit from each other. Each section is complete for its grade, and its bounds replace rather than extend the bounds another grade states: Manager's 5 to 15 engineers says nothing about Director.

- Technical Lead is a side branch. Its section names the `## Qualifications` entries that are baseline at that grade; everything else in that section is job-specific.
- Manager, Senior Manager and Director each use their own section plus all of `## Qualifications`, minus whatever their section explicitly drops.

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
  - excludes: 16+, three or more teams, any lead or manager layer in between (that is second line, see Senior Manager)
  - below: fewer than 5, or no direct reports
- Hands-on technical work: code review, design docs, occasional contribution
  - excludes: a stated coding percentage above 30%, or on-call as an individual contributor

### Senior Manager

Multiple teams, run directly or through team leads. Or one team plus a mandate reaching beyond it. Operational rather than strategic: the role still owns delivery.

- 5 to 8 years of engineering management
  - excludes: 10+
  - below: under 4
- 8 to 12 years of software engineering
- 12 to 30 engineers across two to four teams
  - excludes: 30+, five or more teams, sub-orgs, managers owning their teams' delivery reporting in
  - below: a single team with no mandate beyond it
- Leading through team leads: 1:1s with leads, skip-levels with engineers
- Career development and growth of engineers, directly or through their leads
- Delivery ownership across the group: roadmap, quality, process, modernization
- Outsized influence beyond own teams: a special project, a cross-org initiative, a mandate other teams adopt
- Taking part in budget and compensation planning
  - excludes: owning the budget, vendor and contractor management
- Limited hands-on work: architecture guidance and code review, not production contribution
  - excludes: a stated coding percentage above 20%

Inherits all of `## Qualifications`. Nothing drops at this grade: career development and team culture are still core here and only become job-specific at Director.

Thinly evidenced. Authored to close the gap the corpus left between Manager and Director, not derived from it. The headcount and tenure bounds are the weakest part and should be revisited once records accumulate under it.

### Director

Pure second line. Managers own their teams' delivery and the role owns the organization: strategy, structure, headcount. Reaches the engineers only through that layer.

- 8+ years of engineering management
  - below: under 6
- 10 to 12 years of software engineering
- 20 to 60 engineers across multiple teams
  - excludes: 60+, multiple sub-orgs, directors reporting in
  - below: under 20, or a single team
- Managing managers, second-line leadership
  - excludes: team leads rather than managers in that layer, which is Senior Manager shape
- Organizational design, headcount planning, team topology, reorgs
- Budget ownership, vendor and contractor management
- Multi-team strategy and long-range planning
- Security and compliance ownership across the org, raising it from consuming to owning
  - excludes: building security tooling, or a named regime as a core requirement
- Distributed systems and scale as a stated context

Two expectations **drop** at this grade and become job-specific when a posting states them: career development of individual engineers, which is otherwise baseline under `## Qualifications`, and hands-on coding, which has no baseline entry at this grade at all.

Team size bound is provisional. Few postings at this grade state one.

## Title mapping

Two different questions, two columns, never used together:

- **Claims** - the grade the title asserts, at face value. Read it whenever a title has to be compared against a grade, such as detecting a title/grade mismatch. It is what the title says, not a judgment about the job.
- **Fallback grade** - the grade to assume when the posting describes no scope at all. Where scope is stated it decides the grade and this column is not read, so no row refers to team size or reporting structure. It discounts for inflation, which is why it can sit below the claim.

| Title | Claims | Fallback grade | Notes |
|---|---|---|---|
| Engineering Manager, Software Engineering Manager, Software Development Manager | Manager | Manager | |
| Senior Engineering Manager, Senior Manager Engineering, Group Engineering Manager | Senior Manager | Manager | Title inflation is the norm here, not the exception. Most such postings describe a team of 12 or fewer, so the scopeless fallback deflates a grade. That deflation is the table working as intended and is never a mismatch. |
| Director of Engineering, Director of Software Engineering, Senior Director | Director | Director | |
| Head of Engineering, VP of Engineering, CTO | Director | Director | Strongest inflation signal, especially at seed and Series A. At a company under 50 people, take Manager as the fallback instead. |
| Engineering Team Lead, Lead Software Engineer, Staff Software Engineer | Technical Lead | Technical Lead | |

Inflation runs one direction. A small company gives a large title for a small job. Deflation is rare: a Director title at a 2000-person company usually means a Director job.

## Resume framing

Which scope facts lead when a resume is tailored for a posting at this grade. `tailor-resume` reads the grade off the screening file and takes the row; it never re-derives the grade and never states a scope the base resume does not support. An inflated title over a small team gets the title's label and the small team's facts, not both at full volume.

| Grade | What leads |
|---|---|
| Technical Lead | Single team, hands-on, direct delivery. Drop the bullet whose only point is org-level breadth. |
| Manager | Single team, hands-on, direct delivery. Multi-team and manager-of-managers scope moves below, or the bullet goes. Overshooting the stated scope reads as a mis-level and costs the screen. |
| Senior Manager | Multi-team span and the leads in between, not org structure and not single-team delivery. Delivery stays on the facts: teams shipping, quality, modernization, cross-team initiatives owned. Keep one hands-on signal. Drop bullets whose only point is org-level breadth. |
| Director | The largest scope the base resume supports, in the summary paragraph as well as the entries. Org-level facts carry each entry: headcount, structure, developing managers, breadth of mandate. |

## Maintenance

Edit this file only from observed recurrence: when the same qualification keeps classifying as job-specific across unrelated postings. Every entry added lowers all future match scores, so an entry that has not earned its place by repetition is a permanent tax on the numbers.

Seeded 2026-07-31 from 285 screening files with parseable `## Qualifications` sections: 189 Engineering Manager, 55 Senior Engineering Manager, 33 Director, 3 VP, 4 Technical Lead. 4,614 qualification bullets.

Entries were selected by how often a concept recurred across postings at each grade, measured on qualifications as extracted by `screen-job` rather than on raw posting text. That makes them evidence of what is boilerplate, not a neutral measurement of what employers ask for. Frequency data is deliberately not carried in this file. It is reproducible from the corpus when the file needs revising.

The two domain axes get opposite treatment because the corpus distributions are opposite. Engineering domain is concentrated: a single value covers more than half of all postings, so a default exists and can be treated as noise. Product domain is dispersed across dozens of verticals with no value above a tenth of the corpus, so no default exists and every domain carries signal.

Manager grade rests on real corpus volume. Director is thin on team size. Technical Lead and Senior Manager are authored from almost nothing and need replacing as records accumulate.

Senior Manager added 2026-09-16. The original scheme sent any lead layer straight to Director, which graded an ordinary Senior EM job over four team leads as a Director and then flagged its own title as a mismatch. A lead layer is normal Senior Manager shape and carries no Director signal on its own. What separates the two is whether the role still owns delivery or owns the organization. Records screened before this date may carry a Director grade that would now read Senior Manager; they are not migrated.
