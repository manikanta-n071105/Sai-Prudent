const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { initDb, db } = require('./db');

async function test() {
  console.log('[VERIFY] Initializing Neon DB connection...');
  await initDb();
  
  console.log('[VERIFY] Checking student count in DB...');
  const count = await db.getStudentsCount();
  console.log('[VERIFY] Student count in Neon DB:', count);

  console.log('[VERIFY] Checking admin login with "admin" / "admin123"...');
  const admin = await db.adminLogin('admin', 'admin123');
  console.log('[VERIFY] Admin login result:', admin ? `Success (${admin.fullName}, Role: ${admin.role})` : 'Failed');

  console.log('[VERIFY] Checking rooms count...');
  const rooms = await db.getRooms();
  console.log('[VERIFY] Rooms count:', rooms.length);

  console.log('[VERIFY] Checking stats...');
  const stats = await db.getStats();
  console.log('[VERIFY] Stats:', JSON.stringify(stats, null, 2));

  process.exit(0);
}

test().catch(err => {
  console.error('[VERIFY] Error:', err);
  process.exit(1);
});

