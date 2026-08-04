#!/usr/bin/env node
// Usage: node score-qualifications.js path/to/file.json
//
// Input: JSON array of classified, weighted and evaluated qualifications.
//   [{ "category": "...", "text": "...", "weight": 10, "tier": "scored", "match_value": 75 },
//    { "category": "...", "text": "...", "tier": "baseline" }]
//
//   tier "baseline" - matched an entry in roles/engineering-leader.md. Carried
//                     into the output file for reference. No weight, no
//                     match_value. Never scored.
//   tier "scored"   - job-specific. Weight is relative and gets normalized to
//                     sum to 100 across scored qualifications ONLY, which is
//                     what gives the job-specific factors their full weight.
//                     match_value (0-100) is required.
//
// Output: the match percentage, the thin flag, and the rendered
// "## Qualifications" markdown block, ready to paste into the screening file.
//
// One payload, one call. Weights are normalized, scored and rendered here so
// they are never transcribed by hand: the number in the file and the number
// the score was computed from are the same number by construction.

import { readFileSync } from 'fs';

const path = process.argv[2];
if (!path) { console.error('Usage: node score-qualifications.js <file.json>'); process.exit(1); }

const fail = (msg, items) => {
	console.error(msg);
	if (items) for (const i of items.slice(0, 5)) console.error(`  ${JSON.stringify(i.text ?? i)}`);
	process.exit(1);
};

const qualifications = JSON.parse(readFileSync(path, 'utf8'));
if (!Array.isArray(qualifications)) fail('Expected a JSON array of qualifications.');

const nameless = qualifications.filter((q) => !q.category || !q.text);
if (nameless.length) fail(`${nameless.length} qualification(s) missing "category" or "text":`, nameless);

const badTier = qualifications.filter((q) => q.tier !== 'baseline' && q.tier !== 'scored');
if (badTier.length) fail(`Every qualification needs tier "baseline" or "scored". ${badTier.length} missing or invalid:`, badTier);

const scored = qualifications.filter((q) => q.tier === 'scored');
if (!scored.length) fail('No scored qualifications. Posting is entirely baseline: report that rather than a match number.');

const noMatch = scored.filter((q) => typeof q.match_value !== 'number' || q.match_value < 0 || q.match_value > 100);
if (noMatch.length) fail(`${noMatch.length} scored qualification(s) missing a match_value in 0-100:`, noMatch);

const stray = qualifications.filter((q) => q.tier === 'baseline' && q.match_value !== undefined);
if (stray.length) fail(`${stray.length} baseline qualification(s) carry a match_value. Baseline is never scored:`, stray);

// Normalize scored weights proportionally to sum to 100. Proportional, not
// additive: the scored set is a subset of what was extracted, so its weights
// sum to well under 100 and spreading the difference evenly would flatten the
// relative importance the weights are carrying.
const total = scored.reduce((sum, q) => sum + (q.weight || 0), 0);
if (total <= 0) fail('Scored qualifications have no weight.');

// Largest remainder, so the integer weights written to the file sum to exactly
// 100. Scoring off those same integers keeps the file self-consistent: the
// match can be recomputed by hand from what the file shows.
const exact = scored.map((q) => (q.weight || 0) * 100 / total);
const floors = exact.map(Math.floor);
const order = exact.map((e, i) => [e - floors[i], i]).sort((a, b) => b[0] - a[0]);
let slack = 100 - floors.reduce((s, n) => s + n, 0);
for (const [, i] of order) { if (slack <= 0) break; floors[i]++; slack--; }
scored.forEach((q, i) => { q.weight = floors[i]; });

const match = Math.round(scored.reduce((s, q) => s + q.weight * q.match_value / 100, 0));

const cats = new Map();
for (const q of qualifications) {
	if (!cats.has(q.category)) cats.set(q.category, { category: q.category, weight: 0, items: [] });
	const cat = cats.get(q.category);
	if (q.tier === 'scored') cat.weight += q.weight;
	cat.items.push(q);
}

// Categories by scored weight descending, so baseline-only categories sort
// last at 0. Within a category, scored items first, heaviest first, then
// baseline in the order given.
const ordered = [...cats.values()].sort((a, b) => b.weight - a.weight);
for (const cat of ordered) cat.items.sort((a, b) => (b.weight ?? -1) - (a.weight ?? -1));

// Few scored qualifications means one odd requirement can swing the result.
const thin = scored.length < 4;

console.log(`Match: ${match}%`);
console.log(`Scored: ${scored.length} of ${qualifications.length} qualifications`);
console.log(`Thin: ${thin}`);
console.log('');
console.log('## Qualifications');
for (const cat of ordered) {
	console.log('');
	console.log(`### ${cat.category}`);
	for (const i of cat.items) {
		console.log(i.tier === 'scored'
			? `- ${i.text} (weight:${i.weight}%, match:${i.match_value}%)`
			: `- ${i.text} (baseline)`);
	}
}
