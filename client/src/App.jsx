import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ImpactStats from './components/ImpactStats';
import HomeHighlights from './components/HomeHighlights';
import AboutSection from './components/AboutSection';
import CampusGallery from './components/CampusGallery';
import TalentTestSection from './components/TalentTestSection';
import BenefitsPrizesSection from './components/BenefitsPrizesSection';
import StudentAuthPortal from './components/StudentAuthPortal';
import HallTicketPortal from './components/HallTicketPortal';
import ResultsMeritPortal from './components/ResultsMeritPortal';
import RoomAttendancePortal from './components/RoomAttendancePortal';
import AdminPanel from './components/AdminPanel';
import AnnouncementsFaqSection from './components/AnnouncementsFaqSection';
import HelplineContactSection from './components/HelplineContactSection';
import Footer from './components/Footer';
import GlobalOpportunityBanner from './components/GlobalOpportunityBanner';
import ModuleHeaderBanner from './components/ModuleHeaderBanner';
import RiseInfoSidebar from './components/RiseInfoSidebar';
import { apiFetch } from './api';
import { getPathForTab, getTabFromPath, updateDocumentTitle } from './routes';

// Zero Dummy Data - Clean Initial Database State
const DEFAULT_STUDENTS = [];

const DEFAULT_ROOMS = [
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

const DEFAULT_ANNOUNCEMENTS = [
  {
    id: "ann-1",
    date: "Official Notice",
    title: "SAIPRUDENT Scholarship Examination 2025-26 Registration Live",
    badge: "Important",
    desc: "Online registration (Channel 1) and Coordinator desk (Channel 2) are active. All eligible Class 12 MPC, Class 12 Any Stream, and Degree Final Year students may apply free of cost."
  },
  {
    id: "ann-2",
    date: "Exam Rule",
    title: "Mandatory Document Check: Hall Ticket Printout & Aadhaar Card Photocopy",
    badge: "Mandatory",
    desc: "Candidates must bring their Printed Hall Ticket, Photocopy of Aadhaar Card, and valid College Identity Card. Walk-in registration is also permitted on the exam morning."
  },
  {
    id: "ann-3",
    date: "Philanthropy",
    title: "International Partnership with Anahata Stiftung & RISE, Austria",
    badge: "Partnership",
    desc: "Qualifying students receive 50% hostel and bus transport subsidy, monthly stipend internships, with consideration for RISE Austria internships (₹2 Lakhs/month)."
  }
];

const DEFAULT_FAQS = [
  {
    q: "What is the Sai Prudent Scholarship Program (SPS)?",
    a: "Instituted in 2015 with Sanskrithi School of Engineering under Sanskrithi Educational Society, SPS is supported by Anahata Stiftung (Germany) and RISE (Austria). Its noble intention is to ensure economic hardship never halts a student's higher education."
  },
  {
    q: "Who is eligible to write the Sai Prudent Scholarship Test?",
    a: "1) Class 12 (MPC group) for B.Tech Engineering courses. 2) Class 12 (Any stream) for BBA management courses. 3) Degree Final Year students from all streams for MBA/Master's programs."
  },
  {
    q: "Is there any examination or application fee?",
    a: "None whatsoever. The Sai Prudent Scholarship Test and admission guidance are completely 100% FREE OF COST for all eligible candidates without reservation."
  },
  {
    q: "What is the structure and pattern of the examination?",
    a: "Total 160 Questions for 160 Marks (Mathematics: 80 Questions / 80 Marks; Physics: 40 Questions / 40 Marks; Chemistry: 40 Questions / 40 Marks). Duration is 2 hours. Reporting time: 8:00 AM. No negative marking."
  },
  {
    q: "Can students walk in directly on the day of the exam?",
    a: "Yes! While prior online registration is encouraged to receive an allotted room and instant hall ticket, walk-in students with a valid college ID and Aadhaar card photocopy are welcomed on the exam morning at the Puttaparthi campus."
  },
  {
    q: "What are the scholarship benefits and topper rewards?",
    a: "Qualifying scholars receive a 50% Scholarship on Hostel and Bus Transportation fees, plus industry internship opportunities with a monthly stipend. The top 5 performers will be considered for an internship at RISE in Austria, Europe (₹2 Lakhs/month), alongside Free Laptops and Free Tablets."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState(getTabFromPath);
  const [students, setStudents] = useState(DEFAULT_STUDENTS);
  const [rooms, setRooms] = useState(DEFAULT_ROOMS);
  const [announcements, setAnnouncements] = useState(DEFAULT_ANNOUNCEMENTS);
  const [faqs, setFaqs] = useState(DEFAULT_FAQS);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Sync tab with URL navigation and back/forward browser history
  useEffect(() => {
    updateDocumentTitle(activeTab);

    const onLocationChange = () => {
      const currentTab = getTabFromPath();
      setActiveTab(currentTab);
      updateDocumentTitle(currentTab);
    };

    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onLocationChange);
    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onLocationChange);
    };
  }, []);

  // Load live data from Neon PostgreSQL via Express API
  const fetchNeonData = async () => {
    try {
      const [resStudents, resRooms, resAnnounce, resFaqs] = await Promise.allSettled([
        apiFetch('/api/students').then((r) => r.json()),
        apiFetch('/api/rooms').then((r) => r.json()),
        apiFetch('/api/announcements').then((r) => r.json()),
        apiFetch('/api/faqs').then((r) => r.json())
      ]);

      if (resStudents.status === 'fulfilled' && resStudents.value?.students) {
        setStudents(resStudents.value.students);
      }
      if (resRooms.status === 'fulfilled' && resRooms.value?.rooms) {
        setRooms(resRooms.value.rooms);
      }
      if (resAnnounce.status === 'fulfilled' && resAnnounce.value?.announcements) {
        setAnnouncements(resAnnounce.value.announcements);
      }
      if (resFaqs.status === 'fulfilled' && resFaqs.value?.faqs) {
        setFaqs(resFaqs.value.faqs);
      }
    } catch (err) {
      console.log('Backend not reached yet, running in client mode.', err);
    }
  };

  useEffect(() => {
    fetchNeonData();
  }, []);

  const handleNavigate = (tabId, updateHistory = true) => {
    setActiveTab(tabId);
    updateDocumentTitle(tabId);
    if (updateHistory && typeof window !== 'undefined') {
      const newPath = getPathForTab(tabId);
      if (window.location.pathname !== newPath) {
        window.history.pushState({ tab: tabId }, '', newPath);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegisterSuccess = (newStudent) => {
    setStudents((prev) => [newStudent, ...prev]);
    setSelectedStudent(newStudent);
  };

  const handleToggleAttendance = async (studentId) => {
    try {
      await apiFetch(`/api/attendance/${studentId}`, { method: 'PATCH' });
    } catch (e) {
      console.log('Updated locally.');
    }

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const isPresent = s.attendance === 'Present';
          return {
            ...s,
            attendance: isPresent ? 'Absent' : 'Present',
            attendanceTimestamp: isPresent ? null : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
        return s;
      })
    );
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      const res = await apiFetch(`/api/students/${studentId}`, { method: 'DELETE' });
      if (res.ok) {
        setStudents((prev) => prev.filter((s) => s.id !== studentId));
        if (selectedStudent?.id === studentId) {
          setSelectedStudent(null);
        }
      } else {
        alert('Could not delete student from Neon DB.');
      }
    } catch (e) {
      setStudents((prev) => prev.filter((s) => s.id !== studentId));
    }
  };

  const handleUpdateMarks = async (studentId, marksData) => {
    try {
      const res = await apiFetch(`/api/students/${studentId}/marks`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(marksData)
      });
      if (res.ok) {
        const data = await res.json();
        setStudents((prev) => prev.map((s) => (s.id === studentId ? data.student : s)));
        alert('Marks and ranking updated in Neon DB!');
      }
    } catch (e) {
      console.error('Error updating marks:', e);
    }
  };

  const handleAddStudent = async (newStudentData) => {
    try {
      const res = await apiFetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudentData)
      });
      if (res.ok) {
        const data = await res.json();
        setStudents((prev) => [data.student, ...prev]);
        setSelectedStudent(data.student);
        alert(`Candidate ${data.student.fullName} (${data.student.id}) added to Neon DB!`);
      }
    } catch (e) {
      console.error('Error adding walk-in student:', e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col w-full max-w-full overflow-x-hidden">
      {/* Top Navbar (Print: Hidden) */}
      <div className="print:hidden w-full max-w-full overflow-x-hidden">
        <Navbar activeTab={activeTab} onNavigate={handleNavigate} />
      </div>

      {/* Main View Router */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* HOME VIEW: Full-Width Majestic Layout with Official Poster Showcase */}
        {activeTab === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            <ImpactStats stats={{ totalRegistered: students.length }} />
            <GlobalOpportunityBanner onNavigate={handleNavigate} />
            <HomeHighlights onNavigate={handleNavigate} />
            <CampusGallery />
            <AnnouncementsFaqSection announcements={announcements} faqs={faqs} />
            <HelplineContactSection />
          </>
        )}

        {/* ABOUT VIEW: Module Header Banner (Left: Info, Right: RISE Austria 4-Paras) + Full-Width Body */}
        {activeTab === 'about' && (
          <>
            <ModuleHeaderBanner
              badge="Our Story & Core Philosophy"
              title="Bridging the Gap Between Rural Talent and Global Opportunity"
              description="Inspired by grassroots educational philanthropy, the Sai Prudent Scholarship program empowers students whose brilliance might otherwise be extinguished by economic poverty."
              features={[
                "Estd. 2015 under Sanskrithi Educational Society",
                "Supported by Anahata Stiftung (Germany)",
                "RISE (Austria) Global Opportunities"
              ]}
              ctaText="Register for Talent Test"
              ctaAction={() => handleNavigate('register')}
              onNavigate={handleNavigate}
            />
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
              <AboutSection onNavigate={handleNavigate} showHeader={false} />
            </div>
            <CampusGallery />
            <ImpactStats stats={{ totalRegistered: students.length }} />
            <HelplineContactSection />
          </>
        )}

        {/* TALENT TEST VIEW: Module Header Banner (Left: Info, Right: RISE Austria 4-Paras) + Full-Width Body */}
        {activeTab === 'talent-test' && (
          <>
            <ModuleHeaderBanner
              badge="Standardized Talent Examination"
              title="Sai Prudent Talent Test Pattern & Eligibility"
              description="Comprehensive offline scholarship test evaluating fundamental aptitude in Mathematics, Physics, and Chemistry. 100% Free of Cost."
              features={[
                "160 Questions • 160 Marks",
                "Duration: 2 Hours (9:00 AM – 11:00 AM)",
                "Reporting Time: 8:00 AM",
                "No Negative Marking"
              ]}
              ctaText="Apply Online Free"
              ctaAction={() => handleNavigate('register')}
              onNavigate={handleNavigate}
            />
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
              <TalentTestSection onNavigate={handleNavigate} showHeader={false} />
            </div>
            <HelplineContactSection />
          </>
        )}

        {/* SCHOLARSHIPS VIEW: Module Header Banner (Left: Info, Right: RISE Austria 4-Paras) + Full-Width Body */}
        {activeTab === 'benefits' && (
          <>
            <ModuleHeaderBanner
              badge="Transformative Opportunities"
              title="Special Scholarship Benefits & Exciting Prizes"
              description="Participating in the Sai Prudent Exam gives students an opportunity to earn life-changing scholarships, European internships with monthly stipend, and tech prizes."
              features={[
                "Top 5 Considered for RISE Austria (₹2 Lakhs/Mo)",
                "50% Hostel & Bus Transport Fee Subsidy",
                "Industry Internships with Monthly Stipend",
                "Free Laptops & Samsung Galaxy Tablets"
              ]}
              ctaText="Register to Win Prizes"
              ctaAction={() => handleNavigate('register')}
              onNavigate={handleNavigate}
            />
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
              <BenefitsPrizesSection onNavigate={handleNavigate} showHeader={false} />
            </div>
            <HelplineContactSection />
          </>
        )}

        {/* REGISTER VIEW: Module Header Banner (Left: Info, Right: RISE Austria 4-Paras) + Full-Width Form */}
        {activeTab === 'register' && (
          <>
            <ModuleHeaderBanner
              badge="Official Candidate Registration"
              title="Student Information & Registration Desk"
              description="Fill out the official student information sheet to register for the Sai Prudent Scholarship Examination and generate your Admit Card immediately."
              features={[
                "100% Free Registration",
                "Instant Hall Ticket Allotment",
                "Class 12 MPC, Class 12 Any Stream & Degree Final Year"
              ]}
              ctaText="Already Registered? Download Admit Card"
              ctaAction={() => handleNavigate('hallticket')}
              onNavigate={handleNavigate}
            />
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
              <StudentAuthPortal
                students={students}
                onRegisterSuccess={handleRegisterSuccess}
                onSelectStudent={setSelectedStudent}
                onNavigate={handleNavigate}
                showHeader={false}
              />
            </div>
            <HelplineContactSection />
          </>
        )}

        {/* ADMIT CARD VIEW: Module Header Banner (Left: Info, Right: RISE Austria 4-Paras) + Full-Width Card */}
        {activeTab === 'hallticket' && (
          <>
            <ModuleHeaderBanner
              badge="Official Admit Card Desk"
              title="Hall Ticket Download & Verification Portal"
              description="Enter your SPS Registration Number (e.g. SPS-2025-1001) or registered mobile number to retrieve and print your official Admit Card."
              features={[
                "Instant PDF / Print Ready Admit Card",
                "Allocated Room & Seat Number",
                "Verified Examination Rules & Timings"
              ]}
              ctaText="Need to Register First?"
              ctaAction={() => handleNavigate('register')}
              onNavigate={handleNavigate}
            />
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
              <HallTicketPortal
                students={students}
                currentStudent={selectedStudent}
                onSelectStudent={setSelectedStudent}
                showHeader={false}
              />
            </div>
            <HelplineContactSection />
          </>
        )}

        {/* RESULTS & MERIT VIEW: Module Header Banner (Left: Info, Right: RISE Austria 4-Paras) + Full-Width Table */}
        {activeTab === 'results' && (
          <>
            <ModuleHeaderBanner
              badge="Merit Ranks & Convocation"
              title="Sai Prudent Results & Scholarship Announcement"
              description="Review state rank holders, search individual scorecards, and generate your official Certificate of Merit."
              features={[
                "Transparent Marks & State Ranks",
                "Subject-wise breakdown (Maths, Physics, Chemistry)",
                "Top 5 Consideration for RISE Austria Internship"
              ]}
              ctaText="View Hall Ticket"
              ctaAction={() => handleNavigate('hallticket')}
              onNavigate={handleNavigate}
            />
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
              <ResultsMeritPortal
                students={students}
                currentStudent={selectedStudent}
                onSelectStudent={setSelectedStudent}
                showHeader={false}
              />
            </div>
            <HelplineContactSection />
          </>
        )}

        {activeTab === 'attendance' && (
          <>
            <RoomAttendancePortal
              rooms={rooms}
              students={students}
              onToggleAttendance={handleToggleAttendance}
            />
            <HelplineContactSection />
          </>
        )}

        {activeTab === 'admin' && (
          <AdminPanel
            students={students}
            rooms={rooms}
            onRefresh={fetchNeonData}
            onDeleteStudent={handleDeleteStudent}
            onToggleAttendance={handleToggleAttendance}
            onUpdateMarks={handleUpdateMarks}
            onAddStudent={handleAddStudent}
            onViewHallTicket={(st) => {
              setSelectedStudent(st);
              handleNavigate('hallticket');
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
