/**
 * Sai Prudent Scholarship Program (SPS) - Master Data & State Store
 * Clean database initial state - 0 dummy registrations
 */

const INITIAL_STUDENTS = [];

const ROOMS = [
  {
    roomNo: "Room 101",
    block: "Engineering Block A (Ground Floor)",
    capacity: 40,
    allotted: 0,
    invigilator: "Dr. K. Ramanathan (Professor, Dept. of Mathematics)",
    assistantStaff: "Sri M. Chenna Kesavulu (Lab Instructor)",
    streamAssigned: "Class 12 MPC (B.Tech Track)"
  },
  {
    roomNo: "Room 102",
    block: "Engineering Block A (First Floor)",
    capacity: 40,
    allotted: 0,
    invigilator: "Prof. Sunitha Reddy (Associate Professor, Dept. of Physics)",
    assistantStaff: "Smt. G. Lakshmi (Office Superintendent)",
    streamAssigned: "Class 12 MPC (B.Tech Track)"
  },
  {
    roomNo: "Room 103",
    block: "Engineering Block B (Ground Floor)",
    capacity: 35,
    allotted: 0,
    invigilator: "Dr. M. V. Naidu (Head, Dept. of Chemistry)",
    assistantStaff: "Sri V. Ravi Shankar (Technical Assistant)",
    streamAssigned: "Class 12 MPC (B.Tech Track)"
  },
  {
    roomNo: "Room 201",
    block: "Business School Block (First Floor)",
    capacity: 50,
    allotted: 0,
    invigilator: "Dr. Aruna Devi (Dean, School of Business)",
    assistantStaff: "Sri K. Bhaskar (Junior Assistant)",
    streamAssigned: "Class 12 Any Stream (BBA Track) & Degree Final Year"
  },
  {
    roomNo: "Room 202",
    block: "Business School Block (Second Floor)",
    capacity: 50,
    allotted: 0,
    invigilator: "Prof. Srikanth Babu (Controller of Examinations, SPS)",
    assistantStaff: "Smt. P. Vanaja (Senior Assistant)",
    streamAssigned: "Degree Final Year Students (All Streams)"
  }
];

const ANNOUNCEMENTS = [
  {
    date: "November 2026",
    title: "SAIPRUDENT Scholarship Examination 2025-26 Registration Officially Live",
    badge: "Important",
    desc: "Online registration (Channel 1) and Coordinator desk (Channel 2) are active. All eligible Class 12 MPC, Class 12 Any Stream, and Degree Final Year students may apply free of cost."
  },
  {
    date: "Notice",
    title: "Mandatory Document Check for Exam Day",
    badge: "Mandatory",
    desc: "Candidates must bring their Printed Hall Ticket, Photocopy of Aadhaar Card, and valid College Identity Card. Walk-in registration is also permitted on the exam morning."
  },
  {
    date: "Scholarship & Prizes",
    title: "International Partnership with Anahata Stiftung & RISE, Austria",
    badge: "Partnership",
    desc: "All qualifying students receive 50% hostel and bus transport subsidy, minimum stipend internships, with Free Laptops and Tablets awarded to top performers."
  }
];

const FAQ_LIST = [
  {
    q: "What is the Sai Prudent Scholarship Program (SPS)?",
    a: "Instituted in 2015 under Sanskrithi Educational Society and supported by Anahata Stiftung (Germany) and RISE (Austria), SPS provides free, merit-based financial support and world-class technical education to talented students from humble economic backgrounds."
  },
  {
    q: "Who is eligible to write the Sai Prudent Scholarship Test?",
    a: "1) Class 12 Intermediate MPC students for B.Tech Engineering admissions. 2) Class 12 students from Any Stream for BBA admissions. 3) Degree Final Year students from any stream for MBA/Management programs."
  },
  {
    q: "Is there any examination or registration fee?",
    a: "No! The Sai Prudent Scholarship Test is 100% FREE OF COST. The education and opportunities provided are designed to eliminate poverty as a barrier to higher education."
  },
  {
    q: "What is the pattern and syllabus of the test?",
    a: "Total: 160 Objective Questions for 160 Marks (Maths: 80 Q, Physics: 40 Q, Chemistry: 40 Q). Duration is 2.5 hours. Bilingual questions (English & Telugu) are provided with zero negative marking."
  },
  {
    q: "Can students walk in directly on the day of the exam?",
    a: "Yes! While prior online registration is strongly recommended to get an allotted room and instant hall ticket, walk-in candidates can report directly to the Puttaparthi campus on exam day with their valid College ID and Aadhaar card."
  },
  {
    q: "What are the prizes and scholarships awarded?",
    a: "Top 3 Rank Holders receive Free Laptops, Free Tablets, and honors. Qualifying students receive 50% scholarship on Hostel and Bus transportation fees, along with guaranteed stipend-backed industry internships."
  }
];
