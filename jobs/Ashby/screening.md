# Screening Questions - Ashby Engineering Manager

## Describe the best engineer you've worked with, someone else in your top 5, and the difference between the two.

The best engineer I've worked with could take a loosely defined problem and deliver a complete solution without needing to be managed. You'd describe the outcome and they'd come back with something better than what you imagined, because they deeply understood the problem space and made sharp trade-offs. Strong opinions held loosely, challenged decisions when they saw a better path, wrote code others could build on months later. They raised the bar through code reviews, design discussions, and mentoring juniors without being asked.

Another top-5 engineer operated differently. Where the first thrived on ambiguity and end-to-end ownership, this one was a force multiplier through depth. They'd dive into the hardest technical problems and come out with solutions that were both elegant and practical. They cared deeply about developer experience: build times, test reliability, deployment friction. They saw infrastructure as a product and treated other engineers as their users.

The difference: the first engineer's superpower was product intuition combined with technical excellence, they shipped the right thing fast. The second's was technical craft and leverage, they made everyone else faster.

## Describe a situation where you exhibited courage as a leader and achieved an impactful outcome.

Our teams shared a deployment pipeline where any team's changes could block or break another team's test environment deployments. It was accepted as the cost of working in a large codebase. Teams would coordinate deployments through schedules and Slack messages, and when conflicts happened, engineers would spend hours untangling them.

I pushed to redesign the entire git branching model toward trunk-based development, giving each team autonomous deployment capability. This wasn't a popular proposal. It meant changing workflows that dozens of engineers across multiple teams had been using for years, and other engineering managers saw it as unnecessary risk to their own delivery timelines. I had to make the case to leadership that the short-term disruption was worth it, run proof-of-concept branches with my team to demonstrate it worked, and then champion the rollout across the organization.

The result was a 90% reduction in deployment failures. Teams could deploy independently without coordination overhead, iteration cycles got faster, and engineers stopped losing hours to merge conflicts and environment issues. What started as one manager refusing to accept "that's just how it works" became the standard workflow for the entire engineering organization.
