#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get project root (3 levels up from .claude/skills/cleanup-seo)
const projectRoot = path.resolve(__dirname, '../../..');
const seoFilePath = path.join(projectRoot, 'resume', 'assets', 'seo.txt');
const backupPath = seoFilePath + '.bak';

// Read the SEO file
if (!fs.existsSync(seoFilePath)) {
  console.error(`Error: File not found: ${seoFilePath}`);
  process.exit(1);
}

const content = fs.readFileSync(seoFilePath, 'utf-8');
const lines = content.split('\n').map(line => line.trim()).filter(t => t);

console.log(`Original: ${lines.length} terms`);

// Convert lines to objects with pre-computed lowercase for efficiency
const terms = lines.map(line => ({
  line: line,
  lowerLine: line.toLowerCase(),
  redundant: false
}));

// Find and mark redundant terms
for (let i = 0; i < terms.length; i++) {
  const termA = terms[i];

  // Skip if already marked redundant
  if (termA.redundant) continue;

  for (let j = 0; j < terms.length; j++) {
    if (i === j) continue;

    const termB = terms[j];

    // Skip if they're exactly the same (case-insensitive duplicate)
    if (termA.lowerLine === termB.lowerLine) {
      // Keep first occurrence only
      if (i > j) {
        termA.redundant = true;
        break;
      }
      continue;
    }

    // Check if termA is contained in termB
    if (termB.lowerLine.includes(termA.lowerLine)) {
      // Word boundary check for meaningful containment
      // This ensures "scale" in "Enterprise-scale" is caught
      // but prevents false positives
      const escaped = termA.lowerLine.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp('(^|[\\s\\-/,(])' + escaped + '($|[\\s\\-/,)])', 'i');

      if (regex.test(termB.lowerLine)) {
        termA.redundant = true;
        break;
      }
    }
  }
}

// Sort all terms alphabetically using pre-computed lowercase (case-insensitive)
terms.sort((a, b) => a.lowerLine.localeCompare(b.lowerLine));

// Separate kept and redundant terms (already sorted from terms.sort() above)
const kept = terms.filter(t => !t.redundant).map(t => t.line);
const redundant = terms.filter(t => t.redundant).map(t => t.line);

// Create backup
fs.copyFileSync(seoFilePath, backupPath);
console.log(`Backup created: ${backupPath}`);

// Write optimized file
fs.writeFileSync(seoFilePath, kept.join('\n') + '\n');

console.log(`Optimized: ${kept.length} terms`);
console.log(`Removed: ${redundant.length} redundant terms`);

if (redundant.length > 0) {
  console.log('\nRemoved terms:');
  // Redundant terms are already sorted from terms.sort() above
  redundant.forEach(term => console.log(`  - ${term}`));
}

console.log(`\n✓ SEO file optimized: ${seoFilePath}`);
