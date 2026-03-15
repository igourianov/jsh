const title = process.argv[2];
if (!title) {
  console.error('Usage: node sanitize-filename.js "<title>"');
  process.exit(1);
}

const sanitized = title
  .replace(/\W+/g, '-')
  .replace(/^[\-]+|[\-]+$/g, '');

console.log(sanitized);
