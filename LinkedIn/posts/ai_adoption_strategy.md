Practical AI adoption strategy

I recently interviewed for a senior engineering leader role and had to develop an AI adoption strategy for a product development org as part of the interview process. Didn't get the role, but decided to share my thoughts on the subject online anyway.

Goals
• Short term: quick productivity wins by cutting down on repetitive tasks
• Long term: turn developers into agentic product engineers

Short term track
1-3 months. Implement AI-powered code reviews for Pull Requests.
• First as suggestions only - AI will not approve or reject PR, but provide comments only
  - Fine-tune prompts
  - Gather feedback
  - Build developer trust
• After a grace period, enable automated approve/reject PR reviews
  - High confidence only
  - Target human PR review reduction by 70-80%
• Big short term productivity win
• Easy to implement in a centralized way

Long term track
6-12 months. Requires broad buy-in and participation.
• Start with a shared repo of prompts/skills/agents for daily use
• Hire 1-2 AI evangelists to expand the library and deploy self-hosted LLMs (prevents code leakage)
• Continuously promote adoption through show-and-tell events
• Allow developers to learn by leveraging trivial tasks first
  - e.g. Skill(commit): stage changed files, describe changes in a predefined commit template, commit, push to remote (if not on master)
• Buildup curated prompt library by using both dedicated team and crowdsourcing
• Create prompts for library introspection to facilitate onboarding new talent
• Introduce workflows with planner, test writer, coder, reviewer, etc. agents

That's pretty much it. 20 minutes of brainstorming on the call.

If anyone has gone through AI transformation, care to share your thoughts?
