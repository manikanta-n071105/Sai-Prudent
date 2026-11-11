const fs = require('fs');

async function run() {
  const url = 'https://drive.google.com/drive/folders/1JjR6jccoB05DCyLI29x-znKUJzlzy-LY';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });

  console.log('HTTP status:', res.status);
  const html = await res.text();
  fs.writeFileSync('scripts/drive_page.html', html);
  console.log('Saved page, length:', html.length);

  // Search for file IDs and names in the Google Drive folder payload
  // Google Drive folder embed payload format typically contains [id, name, mimeType...]
  const matches = [...html.matchAll(/"([a-zA-Z0-9_-]{25,})"[^\]]*?"([^"\\]+\.(?:jpg|jpeg|png|webp|JPG|JPEG|PNG))"/g)];
  console.log('Regex 1 matches:', matches.length);
  for (const m of matches.slice(0, 20)) {
    console.log('File:', m[2], 'ID:', m[1]);
  }

  // Also look for any occurrence of .jpg, .png, etc.
  const filenames = [...html.matchAll(/([a-zA-Z0-9_\s-]+\.(?:jpg|jpeg|png|webp))/gi)].map(m => m[1]);
  console.log('Unique image filenames found:', [...new Set(filenames)]);
}

run().catch(console.error);

