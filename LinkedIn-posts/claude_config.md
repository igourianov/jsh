How to track Claude Code extensions in Git

All the project-level extensions (CLAUDE.md, skills, agents, etc.) already live in the project repo. But what about user-level?

You have options:

1) Init Git repo directly in ~/.claude/.
Lots of Claude's internals in that folder that need to be excluded. Plus an awkward location relative to your typical project folders.

2) Create a Claude plugin.
Much cleaner approach, but a major overkill if you don't intend to share your extensions with other people. Also doesn't handle CLAUDE.md file.

3) Symlinks trick.
This is the one I settled on as the easiest and most effective for my needs, so let's talk about it.

The approach is dead simple:
- Create your typical project folder with Git repo
- Move all the Claude's extensions there from the user root
- Create symbolic links back into the original locations

I've isolated all the files and dirs that are meant to be symlinked in a subfolder that mirrors the ~/.claude structure. Then created a script that iterates over that folder and creates links for everything, so that I don't have to hardcode individual objects.

Note: on Windows, symlinks require admin privileges.

The settings.json is optional. Obviously don't commit it to repo if you keep API keys in there.

Anyone else solving this differently?

#ClaudeCode #AI #DevTools #Git #SoftwareEngineering
