#!/usr/bin/env node
// Usage: node group-qualifications.js '<json>'
//    or: node group-qualifications.js path/to/file.json

import { readFileSync } from 'fs';
const arg = process.argv[2];
if (!arg) { console.error('Usage: node group-qualifications.js <json|file>'); process.exit(1); }
const raw = arg.trimStart().startsWith('[') ? arg : readFileSync(arg, 'utf8');

const cats = {};

for (const q of JSON.parse(raw)) {
	const cat = cats[q.category];
	if (!cat) {
		cats[q.category] = { ...q };
	} else {
		cat.weight += q.weight;
		cat.text += ' | ' + q.text;
	}
}

const result = Object.values(cats).sort((a, b) => b.weight - a.weight);
console.log(JSON.stringify(result, null, 2));
