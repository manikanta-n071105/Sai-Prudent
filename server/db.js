/**
 * Sai Prudent Scholarship Program (SPS) - Neon PostgreSQL Database Layer
 * Supports Neon Serverless PostgreSQL with SSL & Automatic Schema Migration
 */

const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });

let pg;
let pool = null;
let isPgAvailable = false;
let isConnected = false;

try {
  pg = require('pg');
  isPgAvailable = true;
} catch (e) {
  isPgAvailable = false;
  console.log('[SPS DB] "pg" package not yet installed via npm. Running in JSON data mode.');
}

const DATABASE_URL = process.env.DATABASE_URL;

// Path to JSON data files for seeding or fallback
const DATA_DIR = path.join(__dirname, 'data');
const STUDENTS_FILE = path.join(DATA_DIR, 'students.json');
const ROOMS_FILE = path.join(DATA_DIR, 'rooms.json');
const ANNOUNCEMENTS_FILE = path.join(DATA_DIR, 'announcements.json');
const FAQS_FILE = path.join(DATA_DIR, 'faqs.json');

function readJsonFile(filePath, fallback = []) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (e) {
    console.error(`Error reading ${filePath}:`, e);
  }
  return fallback;
}

function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error(`Error writing ${filePath}:`, e);
  }
}

// In-memory fallback dataset
let localStudents = readJsonFile(STUDENTS_FILE, []);
let localRooms = readJsonFile(ROOMS_FILE, []);
let localAnnouncements = readJsonFile(ANNOUNCEMENTS_FILE, []);
let localFaqs = readJsonFile(FAQS_FILE, []);

// Initialize Neon PostgreSQL Pool
async function initDb() {
  if (!isPgAvailable) {
    console.log('[SPS DB] Operating in Local JSON mode (pg driver not installed).');
    return;
  }

  if (!DATABASE_URL || DATABASE_URL.trim() === '') {
    console.log('==================================================================');
    console.log('[SPS DB] Notice: DATABASE_URL is not set yet in server/.env.');
    console.log('[SPS DB] Using server/data/students.json until Neon link is provided.');
    console.log('==================================================================');
    return;
  }

  try {
    console.log('[SPS DB] Connecting to Neon PostgreSQL...');
    pool = new pg.Pool({
      connectionString: DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000
    });

    // Test connection
    const client = await pool.connect();
    console.log('[SPS DB] Successfully connected to Neon PostgreSQL!');
    isConnected = true;

    // Create Tables if not exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS students (
        id VARCHAR(50) PRIMARY KEY,
        full_name VARCHAR(150) NOT NULL,
        father_name VARCHAR(150),
        dob VARCHAR(30),
        gender VARCHAR(20),
        phone VARCHAR(30) NOT NULL,
        parent_phone VARCHAR(50),
        whatsapp VARCHAR(50),
        email VARCHAR(120),
        door_no VARCHAR(50),
        street_name VARCHAR(150),
        area_location VARCHAR(150),
        aadhaar VARCHAR(40),
        category VARCHAR(50),
        stream VARCHAR(100) NOT NULL,
        target_program VARCHAR(150),
        college_name VARCHAR(200) NOT NULL,
        hall_ticket_no VARCHAR(50),
        address TEXT,
        district VARCHAR(100),
        channel VARCHAR(100),
        registration_date VARCHAR(30),
        exam_center VARCHAR(200),
        exam_date VARCHAR(50),
        exam_time VARCHAR(50),
        reporting_time VARCHAR(50),
        room_no VARCHAR(100),
        seat_no VARCHAR(50),
        attendance VARCHAR(30) DEFAULT 'Present',
        attendance_timestamp VARCHAR(50),
        evaluated BOOLEAN DEFAULT TRUE,
        marks_maths INTEGER DEFAULT 0,
        marks_physics INTEGER DEFAULT 0,
        marks_chemistry INTEGER DEFAULT 0,
        marks_total INTEGER DEFAULT 0,
        rank INTEGER,
        prize TEXT,
        qualified BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Auto-migration for Sanskrithi Information Sheet fields
      ALTER TABLE students ADD COLUMN IF NOT EXISTS parent_phone VARCHAR(50);
      ALTER TABLE students ADD COLUMN IF NOT EXISTS door_no VARCHAR(50);
      ALTER TABLE students ADD COLUMN IF NOT EXISTS street_name VARCHAR(150);
      ALTER TABLE students ADD COLUMN IF NOT EXISTS area_location VARCHAR(150);

      CREATE TABLE IF NOT EXISTS rooms (
        room_no VARCHAR(50) PRIMARY KEY,
        block VARCHAR(150),
        capacity INTEGER DEFAULT 40,
        allotted INTEGER DEFAULT 0,
        invigilator VARCHAR(150),
        assistant_staff VARCHAR(150),
        stream_assigned VARCHAR(150)
      );

      CREATE TABLE IF NOT EXISTS announcements (
        id VARCHAR(50) PRIMARY KEY,
        date_label VARCHAR(50),
        title VARCHAR(250) NOT NULL,
        badge VARCHAR(50),
        description TEXT
      );

      CREATE TABLE IF NOT EXISTS faqs (
        id SERIAL PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username VARCHAR(80) UNIQUE NOT NULL,
        password VARCHAR(120) NOT NULL,
        full_name VARCHAR(120) NOT NULL,
        role VARCHAR(50) DEFAULT 'Super Admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Ensure default administrator account exists in Neon DB
    await client.query(`
      INSERT INTO admins (username, password, full_name, role)
      VALUES ('admin', 'admin123', 'SPS Chief Controller', 'Super Admin')
      ON CONFLICT (username) DO NOTHING;
    `);

    // Seed rooms if empty (Clean Room Allotments with 0 allocated)
    const roomCountRes = await client.query('SELECT COUNT(*) FROM rooms');
    if (parseInt(roomCountRes.rows[0].count, 10) === 0 && localRooms.length > 0) {
      for (const r of localRooms) {
        await client.query(
          `INSERT INTO rooms (room_no, block, capacity, allotted, invigilator, assistant_staff, stream_assigned)
           VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (room_no) DO NOTHING`,
          [r.roomNo, r.block, r.capacity, r.allotted, r.invigilator, r.assistantStaff, r.streamAssigned]
        );
      }
    }

    // Seed announcements if empty
    const annCountRes = await client.query('SELECT COUNT(*) FROM announcements');
    if (parseInt(annCountRes.rows[0].count, 10) === 0 && localAnnouncements.length > 0) {
      for (const a of localAnnouncements) {
        await client.query(
          `INSERT INTO announcements (id, date_label, title, badge, description)
           VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING`,
          [a.id, a.date, a.title, a.badge, a.desc]
        );
      }
    }

    // Seed faqs if empty
    const faqCountRes = await client.query('SELECT COUNT(*) FROM faqs');
    if (parseInt(faqCountRes.rows[0].count, 10) === 0 && localFaqs.length > 0) {
      for (const f of localFaqs) {
        await client.query(
          `INSERT INTO faqs (question, answer) VALUES ($1, $2)`,
          [f.q, f.a]
        );
      }
    }

    client.release();
    console.log('[SPS DB] Neon PostgreSQL schema initialization & data seeding complete!');
  } catch (err) {
    isConnected = false;
    console.error('[SPS DB] Failed to connect to Neon PostgreSQL:', err.message);
    console.log('[SPS DB] Falling back to local JSON data store.');
  }
}

// Convert DB row to frontend student format
function formatStudentRow(r) {
  if (!r) return null;
  const doorNo = r.door_no || '';
  const streetName = r.street_name || '';
  const areaLocation = r.area_location || r.district || '';
  const formattedAddress = [doorNo, streetName, areaLocation].filter(Boolean).join(', ') || r.address || 'Puttaparthi, Andhra Pradesh';

  return {
    id: r.id,
    fullName: r.full_name,
    fatherName: r.father_name,
    guardianName: r.father_name,
    dob: r.dob || '2007-01-01',
    gender: r.gender || 'Not Specified',
    phone: r.phone,
    studentPhone: r.phone,
    parentPhone: r.parent_phone || r.whatsapp || '',
    whatsapp: r.parent_phone || r.whatsapp || '',
    email: r.email || '',
    doorNo,
    streetName,
    areaLocation,
    aadhaar: r.aadhaar || 'XXXX-XXXX-0000',
    category: r.category || 'General / EWS',
    stream: r.stream,
    coursePursuing: r.stream,
    targetProgram: r.target_program || (r.stream && r.stream.includes("MPC") ? "B.Tech Engineering" : "BBA Management"),
    collegeName: r.college_name,
    institutionName: r.college_name,
    hallTicketNo: r.hall_ticket_no,
    address: formattedAddress,
    district: areaLocation,
    channel: r.channel || 'Online (Channel 1)',
    registrationDate: r.registration_date,
    examCenter: r.exam_center || 'Sanskrithi School of Engineering & Business, Puttaparthi',
    examDate: r.exam_date || 'Sunday, April 20, 2025',
    examTime: r.exam_time || '10:00 AM – 12:30 PM',
    reportingTime: r.reporting_time || '08:45 AM',
    roomNo: r.room_no || 'Room 101 (Engineering Block A)',
    seatNo: r.seat_no || 'R101-01',
    attendance: r.attendance || 'Present',
    attendanceTimestamp: r.attendance_timestamp,
    evaluated: r.evaluated,
    marks: r.evaluated ? {
      maths: r.marks_maths,
      physics: r.marks_physics,
      chemistry: r.marks_chemistry,
      total: r.marks_total
    } : null,
    rank: r.rank,
    prize: r.prize,
    qualified: r.qualified
  };
}

// Data Access Object (DAO) with transparent Neon DB / JSON fallback
const db = {
  async getStudents(query = {}) {
    if (isConnected && pool) {
      try {
        let sql = 'SELECT * FROM students WHERE 1=1';
        const params = [];

        if (query.q) {
          params.push(`%${query.q.toLowerCase()}%`);
          sql += ` AND (LOWER(full_name) LIKE $${params.length} OR LOWER(id) LIKE $${params.length} OR phone LIKE $${params.length} OR LOWER(hall_ticket_no) LIKE $${params.length})`;
        }
        if (query.stream && query.stream !== 'all') {
          params.push(`%${query.stream.toLowerCase()}%`);
          sql += ` AND LOWER(stream) LIKE $${params.length}`;
        }
        if (query.room && query.room !== 'all') {
          params.push(`%${query.room.toLowerCase()}%`);
          sql += ` AND LOWER(room_no) LIKE $${params.length}`;
        }
        if (query.attendance && query.attendance !== 'all') {
          params.push(query.attendance.toLowerCase());
          sql += ` AND LOWER(attendance) = $${params.length}`;
        }

        sql += ' ORDER BY created_at DESC';
        const res = await pool.query(sql, params);
        return res.rows.map(formatStudentRow);
      } catch (e) {
        console.error('[SPS DB] Error fetching students from Neon:', e.message);
      }
    }

    // Local JSON fallback
    let result = [...localStudents];
    if (query.q) {
      const q = query.q.toLowerCase();
      result = result.filter(s =>
        s.fullName.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.phone.includes(q)
      );
    }
    return result;
  },

  async getStudentById(identifier) {
    if (isConnected && pool) {
      try {
        const sql = `
          SELECT * FROM students 
          WHERE LOWER(id) = LOWER($1) 
             OR phone = $1 
             OR LOWER(hall_ticket_no) = LOWER($1)
             OR LOWER(full_name) = LOWER($1)
          LIMIT 1
        `;
        const res = await pool.query(sql, [identifier]);
        if (res.rows.length > 0) {
          return formatStudentRow(res.rows[0]);
        }
      } catch (e) {
        console.error('[SPS DB] Error finding student in Neon:', e.message);
      }
    }

    const idLower = identifier.toLowerCase();
    return localStudents.find(s =>
      s.id.toLowerCase() === idLower ||
      s.phone === identifier ||
      (s.hallTicketNo && s.hallTicketNo.toLowerCase() === idLower) ||
      s.fullName.toLowerCase() === idLower
    ) || null;
  },

  async createStudent(studentData) {
    const nextNumber = 1000 + (isConnected && pool ? (await this.getStudentsCount()) + 1 : localStudents.length + 1);
    const newId = `SPS-2025-${nextNumber}`;
    const hallTicketNo = `25010${nextNumber}`;

    const stream = (studentData.coursePursuing || studentData.stream || 'Class 12 - MPC (B.Tech Track)').trim();
    let assignedRoom = "Room 101 (Engineering Block A)";
    let assignedSeat = `R101-${String(nextNumber % 40 || 1).padStart(2, '0')}`;
    if (stream.includes("BBA") || stream.includes("Degree")) {
      assignedRoom = "Room 201 (Business School Block)";
      assignedSeat = `R201-${String(nextNumber % 40 || 1).padStart(2, '0')}`;
    } else if (nextNumber % 2 === 1) {
      assignedRoom = "Room 102 (Engineering Block A)";
      assignedSeat = `R102-${String(nextNumber % 40 || 1).padStart(2, '0')}`;
    }

    const maths = Math.floor(Math.random() * 25) + 55;
    const physics = Math.floor(Math.random() * 12) + 28;
    const chemistry = Math.floor(Math.random() * 12) + 28;
    const total = maths + physics + chemistry;

    const fullName = (studentData.fullName || studentData.name || '').trim();
    const fatherName = (studentData.guardianName || studentData.fatherName || '').trim();
    const phone = (studentData.studentPhone || studentData.phone || '').trim();
    const parentPhone = (studentData.parentPhone || studentData.whatsapp || '').trim();
    const email = (studentData.email || '').trim();
    const collegeName = (studentData.institutionName || studentData.collegeName || '').trim();
    const doorNo = (studentData.doorNo || '').trim();
    const streetName = (studentData.streetName || '').trim();
    const areaLocation = (studentData.areaLocation || studentData.district || 'Puttaparthi').trim();
    const formattedAddress = [doorNo, streetName, areaLocation].filter(Boolean).join(', ') || studentData.address || 'Puttaparthi, Andhra Pradesh';

    const student = {
      id: newId,
      fullName,
      fatherName,
      guardianName: fatherName,
      dob: studentData.dob || '2007-01-01',
      gender: studentData.gender || 'Not Specified',
      phone,
      studentPhone: phone,
      parentPhone,
      whatsapp: parentPhone || phone,
      email,
      doorNo,
      streetName,
      areaLocation,
      aadhaar: studentData.aadhaar ? `XXXX-XXXX-${studentData.aadhaar.slice(-4)}` : 'XXXX-XXXX-0000',
      category: studentData.category || 'General / EWS',
      stream,
      coursePursuing: stream,
      targetProgram: studentData.targetProgram || (stream.includes("MPC") ? "B.Tech Engineering" : "BBA Management"),
      collegeName,
      institutionName: collegeName,
      hallTicketNo,
      address: formattedAddress,
      district: areaLocation,
      channel: studentData.channel || 'Online (Channel 1)',
      registrationDate: new Date().toISOString().split('T')[0],
      examCenter: 'Sanskrithi School of Engineering & Business, Puttaparthi',
      examDate: 'Sunday, April 20, 2025',
      examTime: '10:00 AM – 12:30 PM',
      reportingTime: '08:45 AM',
      roomNo: assignedRoom,
      seatNo: assignedSeat,
      attendance: 'Present',
      attendanceTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      evaluated: true,
      marks: { maths, physics, chemistry, total },
      rank: null,
      prize: '50% Hostel/Bus Fee Scholarship + Industry Internship with Minimum Stipend',
      qualified: true
    };

    if (isConnected && pool) {
      try {
        await pool.query(
          `INSERT INTO students (
            id, full_name, father_name, dob, gender, phone, parent_phone, whatsapp, email,
            door_no, street_name, area_location, aadhaar, category, stream, target_program,
            college_name, hall_ticket_no, address, district, channel, registration_date,
            exam_center, exam_date, exam_time, reporting_time, room_no, seat_no,
            attendance, attendance_timestamp, evaluated, marks_maths, marks_physics, marks_chemistry,
            marks_total, rank, prize, qualified
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9,
            $10, $11, $12, $13, $14, $15, $16,
            $17, $18, $19, $20, $21, $22,
            $23, $24, $25, $26, $27, $28,
            $29, $30, $31, $32, $33, $34,
            $35, $36, $37, $38
          )`,
          [
            student.id, student.fullName, student.fatherName, student.dob, student.gender, student.phone,
            student.parentPhone, student.whatsapp, student.email, student.doorNo, student.streetName,
            student.areaLocation, student.aadhaar, student.category, student.stream, student.targetProgram,
            student.collegeName, student.hallTicketNo, student.address, student.district, student.channel,
            student.registrationDate, student.examCenter, student.examDate, student.examTime,
            student.reportingTime, student.roomNo, student.seatNo, student.attendance,
            student.attendanceTimestamp, student.evaluated, maths, physics, chemistry, total,
            null, student.prize, true
          ]
        );
        return student;
      } catch (e) {
        console.error('[SPS DB] Error inserting student into Neon:', e.message);
      }
    }

    localStudents.unshift(student);
    writeJsonFile(STUDENTS_FILE, localStudents);
    return student;
  },

  async toggleAttendance(id) {
    if (isConnected && pool) {
      try {
        const student = await this.getStudentById(id);
        if (!student) return null;

        const newAttendance = student.attendance === 'Present' ? 'Absent' : 'Present';
        const newTimestamp = newAttendance === 'Present' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;

        const res = await pool.query(
          `UPDATE students SET attendance = $1, attendance_timestamp = $2 WHERE LOWER(id) = LOWER($3) RETURNING *`,
          [newAttendance, newTimestamp, id]
        );
        return formatStudentRow(res.rows[0]);
      } catch (e) {
        console.error('[SPS DB] Error updating attendance in Neon:', e.message);
      }
    }

    const st = localStudents.find(s => s.id.toLowerCase() === id.toLowerCase());
    if (st) {
      if (st.attendance === 'Present') {
        st.attendance = 'Absent';
        st.attendanceTimestamp = null;
      } else {
        st.attendance = 'Present';
        st.attendanceTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      writeJsonFile(STUDENTS_FILE, localStudents);
      return st;
    }
    return null;
  },

  async deleteStudent(id) {
    if (isConnected && pool) {
      try {
        const res = await pool.query('DELETE FROM students WHERE LOWER(id) = LOWER($1) RETURNING id', [id]);
        return res.rowCount > 0;
      } catch (e) {
        console.error('[SPS DB] Error deleting student from Neon:', e.message);
      }
    }
    const idx = localStudents.findIndex(s => s.id.toLowerCase() === id.toLowerCase());
    if (idx !== -1) {
      localStudents.splice(idx, 1);
      writeJsonFile(STUDENTS_FILE, localStudents);
      return true;
    }
    return false;
  },

  async updateStudentMarks(id, marksData) {
    const maths = parseInt(marksData.maths, 10) || 0;
    const physics = parseInt(marksData.physics, 10) || 0;
    const chemistry = parseInt(marksData.chemistry, 10) || 0;
    const total = maths + physics + chemistry;
    const rank = marksData.rank ? parseInt(marksData.rank, 10) : null;
    const prize = marksData.prize || (total >= 140 ? "Free Laptop / Tablet + 50% Hostel Waiver" : "50% Hostel & Bus Transport Scholarship");

    if (isConnected && pool) {
      try {
        const res = await pool.query(
          `UPDATE students SET
            evaluated = true,
            marks_maths = $1,
            marks_physics = $2,
            marks_chemistry = $3,
            marks_total = $4,
            rank = $5,
            prize = $6,
            qualified = true
          WHERE LOWER(id) = LOWER($7)
          RETURNING *`,
          [maths, physics, chemistry, total, rank, prize, id]
        );
        if (res.rows.length > 0) return formatStudentRow(res.rows[0]);
      } catch (e) {
        console.error('[SPS DB] Error updating marks in Neon:', e.message);
      }
    }

    const st = localStudents.find(s => s.id.toLowerCase() === id.toLowerCase());
    if (st) {
      st.evaluated = true;
      st.marks = { maths, physics, chemistry, total };
      st.rank = rank;
      st.prize = prize;
      st.qualified = true;
      writeJsonFile(STUDENTS_FILE, localStudents);
      return st;
    }
    return null;
  },

  async adminLogin(username, password) {
    if (isConnected && pool) {
      try {
        const res = await pool.query(
          'SELECT id, username, full_name, role FROM admins WHERE username = $1 AND password = $2',
          [username.trim(), password.trim()]
        );
        if (res.rows.length > 0) {
          const row = res.rows[0];
          return {
            id: row.id,
            username: row.username,
            fullName: row.full_name,
            role: row.role,
            token: `sps_neon_token_${Date.now()}`
          };
        }
      } catch (e) {
        console.error('[SPS DB] Error verifying admin in Neon:', e.message);
      }
    }

    if (username.trim() === 'admin' && password.trim() === 'admin123') {
      return {
        id: 1,
        username: 'admin',
        fullName: 'SPS Chief Controller',
        role: 'Super Admin',
        token: `sps_local_token_${Date.now()}`
      };
    }
    return null;
  },

  async getStudentsCount() {
    if (isConnected && pool) {
      try {
        const res = await pool.query('SELECT COUNT(*) FROM students');
        return parseInt(res.rows[0].count, 10);
      } catch (e) {}
    }
    return localStudents.length;
  },

  async getRooms() {
    if (isConnected && pool) {
      try {
        const res = await pool.query('SELECT * FROM rooms');
        if (res.rows.length > 0) {
          return res.rows.map(r => ({
            roomNo: r.room_no,
            block: r.block,
            capacity: r.capacity,
            allotted: r.allotted,
            invigilator: r.invigilator,
            assistantStaff: r.assistant_staff,
            streamAssigned: r.stream_assigned
          }));
        }
      } catch (e) {}
    }
    return localRooms;
  },

  async getAnnouncements() {
    if (isConnected && pool) {
      try {
        const res = await pool.query('SELECT * FROM announcements');
        if (res.rows.length > 0) {
          return res.rows.map(a => ({
            id: a.id,
            date: a.date_label,
            title: a.title,
            badge: a.badge,
            desc: a.description
          }));
        }
      } catch (e) {}
    }
    return localAnnouncements;
  },

  async getFaqs() {
    if (isConnected && pool) {
      try {
        const res = await pool.query('SELECT * FROM faqs');
        if (res.rows.length > 0) {
          return res.rows.map(f => ({ q: f.question, a: f.answer }));
        }
      } catch (e) {}
    }
    return localFaqs;
  },

  async getToppers() {
    if (isConnected && pool) {
      try {
        const res = await pool.query('SELECT * FROM students WHERE rank IS NOT NULL AND rank <= 3 ORDER BY rank ASC');
        return res.rows.map(formatStudentRow);
      } catch (e) {}
    }
    return localStudents.filter(s => s.rank && s.rank <= 3).sort((a, b) => a.rank - b.rank);
  },

  async getStats() {
    const studentsList = await this.getStudents();
    const roomsList = await this.getRooms();

    const totalReg = studentsList.length;
    const evaluated = studentsList.filter(s => s.evaluated).length;
    const present = studentsList.filter(s => s.attendance === 'Present').length;
    const absent = totalReg - present;
    const qualified = studentsList.filter(s => s.qualified).length;

    return {
      totalRegistered: totalReg,
      totalEvaluated: evaluated,
      totalPresent: present,
      totalAbsent: absent,
      attendanceRate: totalReg > 0 ? Math.round((present / totalReg) * 100) : 0,
      totalQualified: qualified,
      totalRoomCapacity: roomsList.reduce((acc, r) => acc + (r.capacity || 0), 0),
      totalRoomAllotted: roomsList.reduce((acc, r) => acc + (r.allotted || 0), 0),
      dbProvider: isConnected ? "Neon Serverless PostgreSQL" : "Local JSON Store (Awaiting Neon URL)",
      isConnected
    };
  }
};

module.exports = {
  initDb,
  db
};

