const fs = require('fs');

const html = fs.readFileSync('scripts/drive_page.html', 'utf8');

// Match aria-label="... Image ..." and the ssk attribute with file ID
const regex = /aria-label="([^"]+?)\s+(?:Image|Photo|Video|Shared).*?"[^>]*?ssk='[^']*?:([a-zA-Z0-9_-]{20,})-[0-9]+-[0-9]+'/g;

const files = [];
let match;
while ((match = regex.exec(html)) !== null) {
  files.push({
    name: match[1].trim(),
    id: match[2]
  });
}

// Remove duplicates
const uniqueFiles = [];
const seen = new Set();
for (const f of files) {
  if (!seen.has(f.id)) {
    seen.add(f.id);
    uniqueFiles.push(f);
  }
}

console.log(`Found ${uniqueFiles.length} files:`);
console.log(JSON.stringify(uniqueFiles, null, 2));

fs.writeFileSync('scripts/drive_files.json', JSON.stringify(uniqueFiles, null, 2));
