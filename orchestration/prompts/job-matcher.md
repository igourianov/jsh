# Job Matcher Prompt

Evaluate this job opportunity against the candidate's resume.

**Job Metadata:**
{job_metadata from parser agent}

**Company Research:**
{content from jobs/{Company}/company.md}

**Candidate Resume:**
{content from resume/resume.md}

**Evaluation approach:**
- Assume recruiter role with bias towards rejection
- Be critical but don't invent non-existent gaps
- Consider company research in overall assessment

**Calculate:**

1. **Match %** - Overall fit considering:
   - Experience alignment
   - Skills match
   - Domain knowledge
   - Tech stack alignment
   - Company culture fit (from research)

2. **Gaps** - Specific missing qualifications:
   - NEVER flag unknown/unspecified information as gaps
   - Only flag when job EXPLICITLY requires something candidate lacks
   - Tech stack gaps ONLY when job states their actual stack (not "or"/"such as" lists)
   - Note domain gaps only when domain is explicitly stated
   - Ignore degree requirements if experience requirement is met
   - Flag Quebec-based companies for likely French requirement
   - Note location misalignment if relevant

**Return format:**
## Job Match Evaluation

**Match:** {X}%

### Gaps
- {gap 1}
- {gap 2}
- {or "No significant gaps identified"}

### Match Analysis
{brief analysis of fit}
