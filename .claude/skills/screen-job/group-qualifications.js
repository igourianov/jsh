#!/usr/bin/env node
// Usage: node group-qualifications.js '<json>'
//    or: node group-qualifications.js path/to/file.json

import { readFileSync } from 'fs';
const arg = process.argv[2];
if (!arg) { console.error('Usage: node group-qualifications.js <json|file>'); process.exit(1); }
const raw = arg.trimStart().startsWith('[') ? arg : readFileSync(arg, 'utf8');

const qualifications = JSON.parse(raw);

// Normalize weights to sum to 100
const total = qualifications.reduce((sum, q) => sum + q.weight, 0);
if (total !== 100) {
	const delta = (100 - total) / qualifications.length;
	for (const q of qualifications)
		q.weight = Math.round((q.weight + delta) * 10) / 10;
}

// Group by category
const cats = qualifications.reduce((acc, q) => {
	const cat = acc[q.category];
	if (!cat) {
		acc[q.category] = { category: q.category, weight: q.weight, qualifications: [q.text] };
	} else {
		cat.weight += q.weight;
		cat.qualifications.push(q.text);
	}
	return acc;
}, {});

const result = Object.values(cats).sort((a, b) => b.weight - a.weight);
console.log(JSON.stringify(result, null, 2));
