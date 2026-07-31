#!/usr/bin/env node
// Usage: node calculate-match.js '<json>'
//    or: node calculate-match.js path/to/file.json
//
// Input: the object from group-qualifications.js with "match_value" added to
// every scored item:
//   { "categories": [{ category, weight, items: [{ text, weight, tier, match_value }] }] }
//
// Baseline items carry no weight and no match value. They are ignored here.
// Including them would reintroduce the boilerplate this is built to exclude.
//
// Output: match percentage (number)

import { readFileSync } from 'fs';
const arg = process.argv[2];
if (!arg) { console.error('Usage: node calculate-match.js <json|file>'); process.exit(1); }
const raw = arg.trimStart().startsWith('{') ? arg : readFileSync(arg, 'utf8');

const parsed = JSON.parse(raw);
if (!Array.isArray(parsed.categories)) { console.error('Expected an object with a "categories" array.'); process.exit(1); }

const scored = parsed.categories.flatMap((c) => c.items.filter((i) => i.tier === 'scored'));
if (!scored.length) { console.error('No scored qualifications.'); process.exit(1); }

const missing = scored.filter((i) => typeof i.match_value !== 'number');
if (missing.length) {
	console.error(`${missing.length} scored qualification(s) missing match_value:`);
	for (const i of missing.slice(0, 5)) console.error(`  ${JSON.stringify(i.text)}`);
	process.exit(1);
}

const stray = parsed.categories.flatMap((c) => c.items.filter((i) => i.tier === 'baseline' && i.match_value !== undefined));
if (stray.length) {
	console.error(`${stray.length} baseline qualification(s) carry a match_value. Baseline is never scored:`);
	for (const i of stray.slice(0, 5)) console.error(`  ${JSON.stringify(i.text)}`);
	process.exit(1);
}

console.log(Math.round(scored.reduce((s, i) => s + i.weight * i.match_value / 100, 0)));
