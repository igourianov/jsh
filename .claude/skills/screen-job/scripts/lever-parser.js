#!/usr/bin/env node

import puppeteer from 'puppeteer';

const url = process.argv[2];

if (!url) {
  console.error('Error: URL is required');
  console.error('Usage: node lever-parser.js <url>');
  process.exit(1);
}

if (!url.includes('jobs.lever.co')) {
  console.error('Error: This parser is designed for jobs.lever.co URLs only');
  process.exit(1);
}

console.error('Launching browser...');
const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

try {
  const page = await browser.newPage();

  console.error(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle2' });

  console.error('Extracting LD+JSON data...');

  let ldJson = await page.evaluate(() => {
    const script = document.querySelector('script[type="application/ld+json"]');
    if (!script) return null;
    return JSON.parse(script.textContent);
  });

  if (!ldJson) {
    console.error('Error: No LD+JSON script found on page');
    process.exit(1);
  }

  console.error('LD+JSON data extracted successfully');

  // ============================================================
  // USER MODIFICATION SECTION
  // Add your JSON transformations here
  // ============================================================

  ldJson = {
	datePosted: ldJson.datePosted,
	title: ldJson.title,
	description: ldJson.description,
	company: ldJson.hiringOrganization?.name,
	country: ldJson.jobLocation?.address?.addressLocality
  };

  // ============================================================
  // END USER MODIFICATION SECTION
  // ============================================================

  // Output the final JSON to stdout (this is what Claude will capture)
  console.log(JSON.stringify(ldJson, null, 2));

} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
} finally {
  await browser.close();
}
