#!/usr/bin/env node
// Usage: node group-qualifications.js '<json>'
//    or: node group-qualifications.js path/to/file.json

import { readFileSync } from 'fs';
const arg = process.argv[2];
if (!arg) { console.error('Usage: node group-qualifications.js <json|file>'); process.exit(1); }
const raw = arg.trimStart().startsWith('[') ? arg : readFileSync(arg, 'utf8');

let qualifications = JSON.parse(raw);
let cats = {};
let catList = [];

for (const q of qualifications) {
	let cat = cats[q.category];
	if (!cat) {
		cats[q.category] = cat = { ...q };
		catList.push(cat);
	} 
	else {
		cat.weight += q.weight;
		cat.text += " | " + q.text;
	}
}

catList.sort((a, b) => b.weight - a.weight);

console.log(JSON.stringify(catList, null, 2));
