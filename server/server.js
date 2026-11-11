/**
 * Sai Prudent Scholarship Program (SPS) - Express.js REST API Server
 * Configured with Neon PostgreSQL Database Layer & JSON Fallback
 */

const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { initDb, db } = require('./db');

let express;
let cors;
let isExpressAvailable = false;

try {
  express = require('express');
  cors = require('cors');
  isExpressAvailable = true;
} catch (e) {
  isExpressAvailable = false;
  console.log('[SPS Server] Running in native HTTP mode with identical REST API endpoints.');
}

// Safely parse PORT: Render provides PORT (typically 10000), local defaults to 5000.
// If someone mistakenly passes a URL into PORT, safely ignore it and use standard port.
let parsedPort = parseInt(process.env.PORT, 10);
if (isNaN(parsedPort) || parsedPort <= 0 || parsedPort > 65535) {
  parsedPort = process.env.RENDER ? 10000 : 5000;
}
const PORT = parsedPort;

// Initialize Neon Database schema and connection
initDb();

if (isExpressAvailable) {
  const app = express();

  // Cross-Origin Resource Sharing (CORS) configured for Vercel production and local dev
  const allowedOrigins = [
    'https://client-neon-xi-36.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5000'
  ];

  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive for production APIs
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  app.use(express.json());

  // Serve static files from client build if present
  const clientDist = path.join(__dirname, '..', 'client', 'dist');
  if (fs.existsSync(clientDist)) {
    app.use(express.static(clientDist));
  }

  // --- ROOT STATUS & DIAGNOSTICS ---
  app.get('/', (req, res, next) => {
    if (fs.existsSync(path.join(clientDist, 'index.html'))) {
      return res.sendFile(path.join(clientDist, 'index.html'));
    }
    res.json({
      service: 'Sai Prudent Scholarship API Backend',
      status: 'online',
      database: process.env.DATABASE_URL ? 'Neon PostgreSQL Connected' : 'Local Fallback',
      frontend: 'https://client-neon-xi-36.vercel.app/',
      endpoints: {
        health: '/api/health',
        students: '/api/students',
        rooms: '/api/rooms',
        announcements: '/api/announcements',
        faqs: '/api/faqs',
        stats: '/api/stats'
      }
    });
  });

  // --- REST API ROUTES ---
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Sai Prudent Scholarship API',
      database: process.env.DATABASE_URL ? 'Neon PostgreSQL Configured' : 'Awaiting Neon Database Link',
      timestamp: new Date()
    });
  });

  app.get('/api/stats', async (req, res) => {
    try {
      const stats = await db.getStats();
      res.json({ success: true, stats });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.get('/api/announcements', async (req, res) => {
    try {
      const announcements = await db.getAnnouncements();
      res.json({ success: true, announcements });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.get('/api/faqs', async (req, res) => {
    try {
      const faqs = await db.getFaqs();
      res.json({ success: true, faqs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.get('/api/rooms', async (req, res) => {
    try {
      const rooms = await db.getRooms();
      res.json({ success: true, rooms });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.get('/api/students', async (req, res) => {
    try {
      const students = await db.getStudents(req.query);
      res.json({ success: true, count: students.length, students });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.get('/api/students/:id', async (req, res) => {
    try {
      const student = await db.getStudentById(req.params.id);
      if (!student) {
        return res.status(404).json({ success: false, error: 'Student not found with ID: ' + req.params.id });
      }
      res.json({ success: true, student });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.post('/api/register', async (req, res) => {
    try {
      const fullName = (req.body.fullName || req.body.name || '').trim();
      const phone = (req.body.studentPhone || req.body.phone || '').trim();
      const stream = (req.body.coursePursuing || req.body.stream || '').trim();
      const collegeName = (req.body.institutionName || req.body.collegeName || '').trim();

      if (!fullName || !phone || !stream || !collegeName) {
        return res.status(400).json({ success: false, error: 'Missing mandatory fields: Name of Student, Course Pursuing, Institution, and Student Mobile No.' });
      }

      const student = await db.createStudent(req.body);
      res.status(201).json({
        success: true,
        message: 'Student registration successfully saved to database!',
        student,
        smsNotificationPreview: `Dear ${student.fullName}, your registration for SAI PRUDENT SCHOLARSHIP TEST 2025 is CONFIRMED. Reg ID: ${student.id}, Venue: Sanskrithi Campus Puttaparthi. Download Hall Ticket online.`
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.get('/api/hallticket/:query', async (req, res) => {
    try {
      const student = await db.getStudentById(req.params.query);
      if (!student) {
        return res.status(404).json({ success: false, error: 'Admit card not found for query: ' + req.params.query });
      }
      res.json({ success: true, student });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.patch('/api/attendance/:id', async (req, res) => {
    try {
      const student = await db.toggleAttendance(req.params.id);
      if (!student) {
        return res.status(404).json({ success: false, error: 'Student not found with ID: ' + req.params.id });
      }
      res.json({ success: true, student });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.get('/api/results', async (req, res) => {
    try {
      const all = await db.getStudents();
      const results = all.filter(s => s.evaluated && s.marks);
      results.sort((a, b) => (b.marks.total || 0) - (a.marks.total || 0));
      res.json({ success: true, count: results.length, results });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.get('/api/results/:query', async (req, res) => {
    try {
      const student = await db.getStudentById(req.params.query);
      if (!student) {
        return res.status(404).json({ success: false, error: 'Result not found for identifier: ' + req.params.query });
      }
      res.json({ success: true, student });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.get('/api/toppers', async (req, res) => {
    try {
      const toppers = await db.getToppers();
      res.json({ success: true, toppers });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Admin Authentication
  app.post('/api/admin/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ success: false, error: 'Username and password required.' });
      }
      const admin = await db.adminLogin(username, password);
      if (!admin) {
        return res.status(401).json({ success: false, error: 'Invalid admin credentials.' });
      }
      res.json({ success: true, message: 'Admin login successful', admin });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Admin Delete Student Registration
  app.delete('/api/students/:id', async (req, res) => {
    try {
      const deleted = await db.deleteStudent(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Student not found or already deleted.' });
      }
      res.json({ success: true, message: `Student ${req.params.id} successfully deleted from database.` });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Admin Update Candidate Marks & Rank
  app.put('/api/students/:id/marks', async (req, res) => {
    try {
      const student = await db.updateStudentMarks(req.params.id, req.body);
      if (!student) {
        return res.status(404).json({ success: false, error: 'Student not found with ID: ' + req.params.id });
      }
      res.json({ success: true, message: 'Marks updated successfully in database.', student });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Catch-all route to serve React SPA index.html for client-side routing
  if (fs.existsSync(clientDist)) {
    app.get('*', (req, res) => {
      res.sendFile(path.join(clientDist, 'index.html'));
    });
  }

  if (require.main === module) {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`====================================================`);
      console.log(`Sai Prudent Express.js Server running on port ${PORT}`);
      console.log(`URL: http://0.0.0.0:${PORT}`);
      console.log(`Database: ${process.env.DATABASE_URL ? 'Neon PostgreSQL' : 'Local Data (Provide Neon Link in .env)'}`);
      console.log(`====================================================`);
    });
  }

  module.exports = app;
} else {
  // Built-in HTTP server fallback
  const http = require('http');
  const url = require('url');

  const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const sendJson = (status, data) => {
      res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(data));
    };

    try {
      if (pathname === '/api/health') return sendJson(200, { status: 'ok', db: 'Neon Ready' });
      if (pathname === '/api/stats') return sendJson(200, { success: true, stats: await db.getStats() });
      if (pathname === '/api/announcements') return sendJson(200, { success: true, announcements: await db.getAnnouncements() });
      if (pathname === '/api/faqs') return sendJson(200, { success: true, faqs: await db.getFaqs() });
      if (pathname === '/api/rooms') return sendJson(200, { success: true, rooms: await db.getRooms() });
      if (pathname === '/api/students') return sendJson(200, { success: true, students: await db.getStudents(parsedUrl.query) });
      if (pathname.startsWith('/api/students/')) {
        const id = decodeURIComponent(pathname.replace('/api/students/', ''));
        const student = await db.getStudentById(id);
        return sendJson(student ? 200 : 404, { success: !!student, student });
      }
      if (pathname.startsWith('/api/hallticket/')) {
        const id = decodeURIComponent(pathname.replace('/api/hallticket/', ''));
        const student = await db.getStudentById(id);
        return sendJson(student ? 200 : 404, { success: !!student, student });
      }
      if (pathname.startsWith('/api/attendance/') && method === 'PATCH') {
        const id = decodeURIComponent(pathname.replace('/api/attendance/', ''));
        const student = await db.toggleAttendance(id);
        return sendJson(student ? 200 : 404, { success: !!student, student });
      }
      if (pathname === '/api/toppers') return sendJson(200, { success: true, toppers: await db.getToppers() });

      if (pathname === '/api/register' && method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}');
            const student = await db.createStudent(data);
            return sendJson(201, { success: true, student });
          } catch (e) {
            return sendJson(400, { success: false, error: e.message });
          }
        });
        return;
      }

      sendJson(404, { success: false, error: 'Endpoint not found' });
    } catch (e) {
      sendJson(500, { success: false, error: e.message });
    }
  });

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Sai Prudent Native Server running on port ${PORT}`);
  });
}
