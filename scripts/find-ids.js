const fs = require('fs');

const html = fs.readFileSync('scripts/drive_page.html', 'utf8');

// Look for patterns like ["<ID>", ... "<FILENAME>"] or similar
// Let's search for "Sai Prudent SSE exam" in the html and print surrounding 500 characters
const idx = html.indexOf('Sai Prudent SSE exam');
if (idx !== -1) {
  console.log('--- Sai Prudent context ---');
  console.log(html.slice(Math.max(0, idx - 300), Math.min(html.length, idx + 300)));
} else {
  console.log('Sai Prudent not found directly');
}

const idx2 = html.indexOf('DSC_1204');
if (idx2 !== -1) {
  console.log('--- DSC_1204 context ---');
  console.log(html.slice(Math.max(0, idx2 - 300), Math.min(html.length, idx2 + 300)));
}
