#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get project root (3 levels up from .claude/skills/cleanup-seo)
const projectRoot = path.resolve(__dirname, '../../..');
const seoFilePath = path.join(projectRoot, 'resume', 'seo.txt');
const backupPath = seoFilePath + '.bak';

// Read the SEO file
if (!fs.existsSync(seoFilePath)) {
  console.error(`Error: File not found: ${seoFilePath}`);
  process.exit(1);
}

const content = fs.readFileSync(seoFilePath, 'utf-8');
const lines = content.split('\n').map(line => line.trim()).filter(t => t);

console.log(`Original: ${lines.length} terms`);

// Find and remove redundant terms
const redundant = new Set();
const kept = [];

for (let i = 0; i < lines.length; i++) {
  const termA = lines[i];
  const termALower = termA.toLowerCase();

  let isRedundant = false;

  for (let j = 0; j < lines.length; j++) {
    if (i === j) continue;

    const termB = lines[j];
    const termBLower = termB.toLowerCase();

    // Skip if they're exactly the same (case-insensitive duplicate)
    if (termALower === termBLower) {
      // Keep first occurrence only
      if (i > j) {
        isRedundant = true;
        break;
      }
      continue;
    }

    // Check if termA is contained in termB
    if (termBLower.includes(termALower)) {
      // Word boundary check for meaningful containment
      // This ensures "scale" in "Enterprise-scale" is caught
      // but prevents false positives
      const escaped = termALower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp('(^|[\\s\\-/,(])' + escaped + '($|[\\s\\-/,)])', 'i');

      if (regex.test(termBLower)) {
        isRedundant = true;
        redundant.add(termA);
        break;
      }
    }
  }

  if (!isRedundant) {
    kept.push(termA);
  }
}

// Sort alphabetically (case-insensitive)
const optimized = kept.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

// Create backup
fs.copyFileSync(seoFilePath, backupPath);
console.log(`Backup created: ${backupPath}`);

// Write optimized file
fs.writeFileSync(seoFilePath, optimized.join('\n') + '\n');

console.log(`Optimized: ${optimized.length} terms`);
console.log(`Removed: ${redundant.size} redundant terms`);

if (redundant.size > 0) {
  console.log('\nRemoved terms:');
  const removedList = Array.from(redundant).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  removedList.forEach(term => console.log(`  - ${term}`));
}

console.log(`\n✓ SEO file optimized: ${seoFilePath}`);
