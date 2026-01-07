# Job Parser Prompt

Parse this job posting and extract structured metadata. Return as markdown.

**Job Posting Content:**
{raw_job_content}

**Extract the following:**

1. **Title** - Two forms:
   - Full original title (for filename): Keep complete title including team/product area
   - Normalized title (for heading): Strip team/product area, keep only role level

2. **Company** - Two fields:
   - Company name (actual employer, not the job board or agency)
   - Posted by: "Direct" if company posted directly, or agency name (e.g., "Jobgether", "Robert Half")
   - If actual company cannot be determined, set company to "_" and note the agency

3. **Engineering Domain** - Product, DevOps/SRE, Platform, etc.

4. **Product Domain** - Fintech, Healthcare, B2C, etc.

5. **Location** - Work location (Remote, Hybrid, Office)

6. **Salary Range** - Include if stated, otherwise estimate with "(estimated)" note

7. **Posted Date** - Use exact date or current month/year

8. **Hands-on %** - Technology-focused activities vs people management (20-80%)

9. **Coding %** - Specifically writing production code (0-60%)
   - 0% signals: broad tech options with "or"/"such as", "leverage experience" language
   - >0% signals: specific required stack, "writing code", "implementing features"

10. **Required Qualifications** - Bullet list of must-haves

11. **Optional Qualifications** - Bullet list of nice-to-haves

12. **Summary** - Succinct overview, no corporate fluff, focus on actual work

13. **Company Description** - Extract from job posting (not external research):
    - What company does (product/service)
    - Industry/market
    - Key projects/technologies mentioned
    - 200 words maximum
    - Do not include company name as heading

**Return format:**
## Parsed Job Metadata

**Full Title:** {value}
**Normalized Title:** {value}
**Company:** {value}
**Posted By:** {Direct or agency name}
**Engineering Domain:** {value}
**Product Domain:** {value}
**Location:** {value}
**Salary Range:** {value}
**Posted Date:** {value}
**Hands-on:** {X}%
**Coding:** {X}%

### Required Qualifications
- {item}

### Optional Qualifications
- {item}

### Summary
{text}

### Company
{company description from job posting - 200 words max}
