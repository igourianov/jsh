# Job Board Search Process

## Process Definition

When searching a job board, follow these steps:

### Input Required
- Starting URL for the search page

### Search method
- If the page contains a search job search form, useparaemeter search
- Otherwise parse the page as a static list of jobs

### Search Parameters (Default)
- **Title/Search String**: Engineering Manager
- **Location**: Canada
- **Type**: Remote

### Execution Steps

1. Navigate to the provided job board URL
2. Execute search with the default parameters above, unless override parameter supplied in my request
3. Extract job listings from search results
4. **Filter out ignored companies** - Check `jobs/company_ignore.md` and exclude any positions from companies on that list
5. For each remaining job, collect:
   - Title
   - Company
   - Location
   - Date Posted (if available)
   - Short Summary (1-2 sentence overview of the role)
   - URL (link to full job posting)

### Output Format

Results are collated in `jobs/search.md` as a markdown table:
Show newer results on top.

```markdown
| Title | Company | Location | Date Posted | Short Summary | URL |
|-------|---------|----------|-------------|---------------|-----|
| ... | ... | ... | ... | ... | ... |
```

### Notes

- If search parameters cannot be applied exactly (e.g., site doesn't support "Remote" filter), adapt as needed and note the limitation
- If date posted is not available, use "N/A"
- Short summary should focus on key responsibilities or team scope
- Append new results to existing `search.md` file (don't overwrite)
