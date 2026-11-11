# Sai Prudent Scholarship Program (SPS) Web Platform

> **Instituted in 2015** with the establishment of **Sanskrithi School of Engineering** under **Sanskrithi Educational Society**, Puttaparthi, Andhra Pradesh.  
> **Supported by:** **Anahata Stiftung** (Stuttgart, Germany) and **RISE** (Vienna, Austria), our international support and technical partners.  
> **Reference Website:** Inspired by the design language, mission storytelling, and high-trust philanthropic structure of [Vadaanya](https://www.vadaanya.org/) and [Vadaanya About](https://www.vadaanya.org/about).  
> **Tech Stack:** **React.js** (Frontend), **Express.js** (Backend), and **Neon PostgreSQL** (Database).

---

## 🐘 Neon PostgreSQL Database Integration

The Express.js backend is configured to persist all student registrations, room allotments, attendance records, and exam results into **Neon Serverless PostgreSQL**.

### 1. Configure Your Neon Database URL
Open [`server/.env`](server/.env) and paste your Neon DB connection string:
```env
DATABASE_URL=postgresql://neondb_owner:npg_xxxx@ep-cool-pond-xxxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
PORT=5000
```

### 2. Automatic Schema Migration & Seeding
When the backend starts (`node server/server.js`):
- It connects to Neon with SSL (`rejectUnauthorized: false`).
- Automatically creates all necessary relational tables:
  - `students`: Candidate personal, academic, room allotment, attendance, and evaluation records.
  - `rooms`: Room capacity, invigilator assignments, and tracks.
  - `announcements`: Important notices and advisories.
  - `faqs`: Frequently asked questions.
- Automatically seeds initial student records and room allotments if the tables are freshly created.
- **Fail-Safe Fallback:** If `DATABASE_URL` is not yet set, the server gracefully defaults to `server/data/students.json` without crashing.

---

## 🌟 Implementation of All 7 Document Modules

| # | Document Module | Implementation Details |
|---|---|---|
| **1** | **Development of Dedicated Website** | Responsive portal with comprehensive examination info, syllabus breakdown, eligibility rules, important circulars, and updates. |
| **2** | **Student Registration – Two Channels** | **Channel 1 (Online):** Full application form writing directly to Neon PostgreSQL with instant unique SPS ID (`SPS-2025-XXXX`), room & seat allotment.<br>**Alternative:** Direct link to [Official Google Form](https://forms.gle/Aoamr5bMkqMK99Hw7) and live QR code.<br>**Channel 2 (Offline):** Telecalling desk & coordinator intake into the central database. |
| **3** | **Room Allotment System** | Room capacity tracking (Room 101, 102, 103, 201, 202), stream-wise segregation (MPC Engineering vs. BBA/Degree), and assigned invigilators. |
| **4** | **Communication to Students** | Automated confirmation preview (SMS/WhatsApp), exam date/time/venue notifications, and dedicated helplines (+91 91009 66777). |
| **5** | **Hall Ticket Generation & Download** | Official Admit Card generator with student photo box, SPS ID, roll number, room number, reporting time, barcode, and **1-click A4 Print / PDF**. |
| **6** | **Attendance Management** | Real-time candidate identity verification, 1-click **Mark Present / Mark Absent** toggle, attendance metrics (% verified), and room-wise printable sheets. |
| **7** | **Results & Scholarship Announcement** | Scorecard lookup (Maths 80, Physics 40, Chemistry 40 = 160 Marks), **Top 3 Toppers Podium**, and official **Certificate of Merit** generator. |

---

## 🎓 Examination Details & Eligibility

- **Eligibility:**
  - **Class 12 (MPC Stream):** For B.Tech Engineering admissions at Sanskrithi School of Engineering (SSE).
  - **Class 12 (Any Stream):** For Bachelor of Business Administration (BBA) at Sanskrithi School of Business (SSB).
  - **Degree Final Year (All Streams):** For Master of Business Administration (MBA) admissions.
- **Process:** Open to all eligible candidates without reservation. Announced 2 months in advance. **Walk-ins permitted on exam day with a valid College ID**.
- **Test Pattern:**
  - **Mathematics:** 80 Questions / 80 Marks (50% weight)
  - **Physics:** 40 Questions / 40 Marks (25% weight)
  - **Chemistry:** 40 Questions / 40 Marks (25% weight)
  - **Total:** **160 Questions / 160 Marks** | Duration: 2.5 Hours (150 Mins) | No negative marking.
- **Mandatory on Exam Day:**
  1. Exam Hall Ticket printout
  2. Aadhaar Card photocopy
  3. Original College ID card

---

## 🎁 Scholarship Benefits & Grand Prizes for Toppers

1. **50% Scholarship** on Hostel accommodation and regional college bus transportation fees.
2. **Guaranteed Industry Internships** with minimum monthly stipends.
3. **Special Recognition & Rewards** for Top 3 Performers.
4. **Grand Prizes for Toppers:**
   - **🥇 Rank 1:** Free High-Performance Engineering Laptop
   - **🥈 Rank 2:** Free Samsung Galaxy Digital Tablet
   - **🥉 Rank 3:** Free Smart Tablet & Tech Kit

---

## 🏗️ Architecture & Directory Layout

```
Sai Prudent/
├── client/                     # React.js Frontend (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/         # Modular UI Components (Navbar, Hero, Portals, etc.)
│   │   ├── App.jsx             # Main Router & State
│   │   └── index.css           # Styling & Print rules
│   └── package.json
│
├── server/                     # Express.js Backend REST API
│   ├── data/                   # JSON seed fallbacks
│   ├── db.js                   # Neon PostgreSQL integration & auto-migrations
│   ├── server.js               # Express API endpoints
│   ├── .env                    # Neon DB connection URL (DATABASE_URL)
│   └── package.json            # pg, dotenv, express, cors
│
├── index.html                  # Standalone instant-run Single Page App (Zero-setup)
└── README.md                   # Project documentation
```

---

## 🔐 Admin Examination Console & Candidate Access Portal

### 1. Admin Examination Console (`Admin Panel 🔒`)
- Accessible from the top navigation bar.
- **Default Super Admin Credentials:**
  - **Username:** `admin`
  - **Password:** `admin123`
- **Capabilities:**
  - **Live Neon DB Metrics:** Real-time counters for Total Candidates, MPC (B.Tech), BBA, Degree Final Year, Verified Attendance %, and Evaluated scorecards.
  - **Search & Filters:** Search by candidate name, SPS ID (`SPS-2025-XXXX`), phone number, or college; filter by academic stream and attendance status.
  - **Dossier & Hall Ticket:** View complete candidate profile (parent details, Aadhaar, DOB, room, seat) and 1-click navigate to their official Admit Card.
  - **Evaluation Board:** Enter and edit Mathematics (out of 80), Physics (out of 40), Chemistry (out of 40), and Top 10 Merit Ranks directly into Neon PostgreSQL.
  - **Walk-in Candidate Addition:** Quickly register on-the-spot candidates arriving on exam morning.
  - **Export Data:** 1-click **Export CSV** for university records and invigilation rosters.
  - **Delete Candidate:** Safely remove invalid or cancelled registrations from Neon DB.

### 2. Candidate Access Portal (`Register / Sign In`)
- **New Registration:** Apply online (Channel 1) with instant SPS ID (`SPS-2025-XXXX`), automated room allotment, and instant Admit Card download.
- **Candidate Sign In:** Existing candidates can log in anytime using their **SPS ID** or **Registered 10-Digit Mobile Number** to check their exam room, seat, timings, and download their Hall Ticket.

---

## 🚀 Running the Project

```bash
# 1. Start the Express backend with Neon DB:
npm run server
# (or: node server/server.js)

# 2. Start the React frontend (Vite):
npm run client
# (or: cd client && npm run dev)
```

- **Frontend URL:** `http://localhost:5173`
- **Backend API:** `http://localhost:5000`
- **Standalone Mode:** You can also double-click `index.html` in your browser for instant viewing!
