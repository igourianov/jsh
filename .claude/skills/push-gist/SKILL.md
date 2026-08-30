---
name: push-gist
description: Publish the base resume to the public GitHub Gist. Use when user asks to push or publish the gist, update the gist, or share the resume publicly.
---

# Push Gist Skill

Publish `resume/resume.md` to the public GitHub Gist.

## Instructions

Run the script. It takes no arguments:

```bash
${CLAUDE_SKILL_DIR}/scripts/push-gist.sh
```

The script clones the gist into a temp folder over SSH, copies the resume in, commits and pushes, then deletes the clone. It exits without committing when the resume has not changed.

Report the final line of stdout: either the public URL or the up to date message.

## Notes

- Only the base English resume goes here. The gist is the public "Engineering Manager" resume, so tailored and translated variants are never published to it.
- The published filename is hardcoded in the script. Renaming it would break the gist's raw URL.
- Public URL: https://gist.github.com/17c7ea00a40cdc436bc5fb7913382d10
