#!/usr/bin/env node
// Usage: node group-qualifications.js '<json>'
//    or: node group-qualifications.js path/to/file.json
//
// Input: JSON array of classified qualifications.
//   [{ "category": "...", "text": "...", "weight": 10, "tier": "scored" }, ...]
//
//   tier "baseline" - matched an entry in roles/engineering-leader.md. Carried
//                     into the output file for reference. Weight is ignored and
//                     may be omitted. Never scored.
//   tier "scored"   - job-specific. Weights are normalized to sum to 100 across
//                     scored qualifications ONLY, which is what gives the
//                     job-specific factors their full weight.
//
// Output: { "categories": [{ category, weight, items: [{ text, weight, tier }] }], "thin": bool }
//   One entry per category, holding both tiers. Categories sorted by scored
//   weight descending, so baseline-only categories sort last with weight 0.

import { readFileSync } from 'fs';
const arg = process.argv[2];
if (!arg) { console.error('Usage: node group-qualifications.js <json|file>'); process.exit(1); }
const raw = arg.trimStart().startsWith('[') ? arg : readFileSync(arg, 'utf8');

const qualifications = JSON.parse(raw);

const bad = qualifications.filter((q) => q.tier !== 'baseline' && q.tier !== 'scored');
if (bad.length) {
	console.error(`Every qualification needs tier "baseline" or "scored". ${bad.length} missing or invalid:`);
	for (const q of bad.slice(0, 5)) console.error(`  ${JSON.stringify(q.text ?? q)}`);
	process.exit(1);
}

const scoredQs = qualifications.filter((q) => q.tier === 'scored');
if (!scoredQs.length) {
	console.error('No scored qualifications. Posting is entirely baseline: report that rather than a match number.');
	process.exit(1);
}

// Normalize scored weights proportionally to sum to 100. Proportional, not
// additive: the scored set is a subset of what was extracted, so its weights
// sum to well under 100 and spreading the difference evenly would flatten the
// relative importance the weights are carrying.
const total = scoredQs.reduce((sum, q) => sum + (q.weight || 0), 0);
if (total <= 0) { console.error('Scored qualifications have no weight.'); process.exit(1); }
for (const q of scoredQs) q.weight = Math.round(q.weight * 100 / total * 10) / 10;

const round = (n) => Math.round(n * 10) / 10;

const cats = new Map();
for (const q of qualifications) {
	if (!cats.has(q.category)) cats.set(q.category, { category: q.category, weight: 0, items: [] });
	const cat = cats.get(q.category);
	if (q.tier === 'scored') {
		cat.weight = round(cat.weight + q.weight);
		cat.items.push({ text: q.text, weight: q.weight, tier: 'scored' });
	} else {
		cat.items.push({ text: q.text, tier: 'baseline' });
	}
}

// Scored items first within a category, heaviest first, then baseline.
for (const cat of cats.values()) {
	cat.items.sort((a, b) => (b.weight ?? -1) - (a.weight ?? -1));
}

console.log(JSON.stringify({
	categories: [...cats.values()].sort((a, b) => b.weight - a.weight),
	// Few scored qualifications means one odd requirement can swing the result.
	thin: scoredQs.length < 4,
}, null, 2));
