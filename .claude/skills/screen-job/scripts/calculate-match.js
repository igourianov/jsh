#!/usr/bin/env node
// Usage: node calculate-match.js '<json>'
//    or: node calculate-match.js path/to/file.json
//
// Input: JSON array of grouped qualifications with match values:
//   [{ "category": "...", "weight": 30, "match_value": 75 }, ...]
//
// Output: match percentage (number)

import { readFileSync } from 'fs';
const arg = process.argv[2];
if (!arg) { console.error('Usage: node calculate-match.js <json|file>'); process.exit(1); }
const raw = arg.trimStart().startsWith('[') ? arg : readFileSync(arg, 'utf8');

const qualifications = JSON.parse(raw);
const match = qualifications.reduce((sum, q) => sum + (q.weight * q.match_value / 100), 0);
console.log(Math.round(match));
