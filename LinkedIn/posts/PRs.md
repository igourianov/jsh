
Small PRs => more PRs for the same amount of work => more context switching / overhead => longer development time overall.

Additionally, the change/feature context gets smeared across multiple PRs, often reviewed by different people. Makes it impossible to catch high level problems with business logic or system design.

What are reviews even for in your org? To catch off-by-1 errors or SQL injections? This is just b*tch work that should be done by static analysis tools and LLMs locally. The point of a review by another human is to catch high level problems that require complete context. This can't possibly work within the TBD cargo cult paradigm, where you force your devs to merge daily into massive pile of incomplete and unvetted code.

Ever wondered why modern software is so fragile and full of bugs? This would happen if you piece-meal code complex solutions. This is essentially vibe coding but without any of the benefits.

If your engineers refuse to review large PRs, the issue is not the size of PRs. The issue is that they don't care enough to do context switch in the first place. They view code reviews as interruption, as opposed to part of their collective work. This is a leadership failure, not a procedural one.

---

"Keep PRs small" is a cargo cult.

It's why your software is full of bugs. Because you piecemeal code complex solutions. It's essentially vibe coding, but without any of the benefits.

Small PRs mean more PRs for the same amount of work. More developer context switching. More overhead. Longer development time overall.
But that's not even the worst part.

The real damage: your feature context gets smeared across multiple PRs, often reviewed by different people. Nobody sees the full picture. Nobody catches the design flaw. You've made it structurally impossible to do a meaningful review.

Which raises the obvious question - what are code reviews even for in your org?

Catching off-by-1 errors? SQL injections? Curly bracket placement?
That's grunt work. Static analysis and LLM tools should be handling that locally before the code even leaves your machine. The whole point of having a human reviewer is to catch high-level problems with business logic and system design, not to serve as a glorified compiler.
This requires a complete context.

"But my engineers refuse to review large PRs!"

The issue is not the size of your PRs. The issue is your engineers view reviews as busywork, not as part of their collective responsibility. They don't care enough to understand full context.

That's not a process problem. That is a leadership failure.

Fix the culture, not the PR size.

#softwaredevelopment #codereview #engineeringculture #softwareengineering #leadership
