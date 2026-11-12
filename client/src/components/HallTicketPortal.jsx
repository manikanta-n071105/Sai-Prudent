import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Printer, 
  User, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Clock,
  Ticket,
  AlertTriangle,
  FileCheck2,
  Globe,
  Sparkles
} from 'lucide-react';
import { apiFetch } from '../api';

export default function HallTicketPortal({ students, currentStudent, onSelectStudent }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(currentStudent || null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentStudent) {
      setSelectedStudent(currentStudent);
      setNotFound(false);
    }
  }, [currentStudent]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    setLoading(true);
    setNotFound(false);

    // 1. Search in local state
    const found = students.find(
      (s) =>
        s.id.toLowerCase() === q ||
        (s.phone && s.phone.includes(q)) ||
        (s.studentPhone && s.studentPhone.includes(q)) ||
        (s.hallTicketNo && s.hallTicketNo.toLowerCase() === q)
    );

    if (found) {
      setSelectedStudent(found);
      if (onSelectStudent) onSelectStudent(found);
      setNotFound(false);
      setLoading(false);
      return;
    }

    // 2. Query Neon DB API
    try {
      const res = await apiFetch(`/api/students/${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.student) {
          setSelectedStudent(data.student);
          if (onSelectStudent) onSelectStudent(data.student);
          setNotFound(false);
          setLoading(false);
          return;
        }
      }
    } catch (err) {}

    setSelectedStudent(null);
    setNotFound(true);
    setLoading(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="hallticket" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 print:hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 text-navy-900 border border-navy-200 text-xs font-bold uppercase tracking-wider">
            Official Admit Card Desk
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            Hall Ticket Download & Verification
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Enter your Registration ID (e.g. <code>SPS-2025-1001</code>), registered mobile number, 
            or full name to download your official examination admit card.
          </p>
        </div>

        {/* Search Bar & Quick Student Selector (Hidden in Print) */}
        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4 print:hidden">
          {/* RISE Austria Target Pill */}
          <div className="p-3 bg-amber-100/70 rounded-xl border border-amber-300 text-xs flex items-center justify-between gap-3 text-amber-950 font-medium">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-800 shrink-0" />
              <span><strong>Top 5 Rankers Incentive:</strong> Eligible for RISE Austria Internship with <strong>₹2 Lakhs / Month Stipend</strong> & TU Wien MS admissions.</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded shrink-0">Global Goal</span>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Registration ID (e.g. SPS-2025-1001) or Mobile Number..."
                className="w-full pl-10 pr-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none bg-white"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-navy-950 hover:bg-navy-900 text-white font-bold rounded-xl text-sm transition shadow-2xs flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Search Hall Ticket</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-sm transition shadow-2xs flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
          </form>

          {notFound && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>No hall ticket found matching "{searchQuery}". Please verify your registration ID or mobile number.</span>
            </div>
          )}

          {/* Clean Prompt when search is empty */}
          {students.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap text-xs pt-2 border-t border-slate-200 text-slate-500">
              <span className="font-semibold text-slate-700">Recent Registrations:</span>
              {students.slice(0, 4).map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => {
                    setSelectedStudent(st);
                    setNotFound(false);
                  }}
                  className={`px-2.5 py-1 rounded-lg border transition ${
                    selectedStudent?.id === st.id
                      ? 'bg-navy-950 text-white border-navy-950'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {st.fullName} ({st.id})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Empty State when no student selected */}
        {!selectedStudent && (
          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-3xl p-12 text-center space-y-3">
            <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center mx-auto text-slate-400 shadow-2xs">
              <Ticket className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="text-lg font-bold text-navy-950">Admit Card Search Ready</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Enter your Registration ID (e.g. <code>SPS-2025-1008</code>) or registered mobile number in the search box above to display and print your official examination hall ticket.
            </p>
          </div>
        )}

        {/* The Official Printable Hall Ticket Card */}
        {selectedStudent && (
          <div className="bg-white rounded-3xl border-2 border-navy-950 p-6 sm:p-10 shadow-2xl relative overflow-hidden print:border print:shadow-none print:p-6 print:rounded-none">
            
            {/* Watermark in background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] text-navy-950 font-black text-6xl sm:text-8xl rotate-[-25deg]">
              SAI PRUDENT
            </div>

            {/* Header: Institutional Credentials */}
            <div className="border-b-2 border-navy-950 pb-6 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                
                <div className="flex items-center gap-3.5">
                  <img src="/logo.jpg" alt="Sanskrithi Logo" className="w-14 h-14 rounded-2xl object-cover shadow-md border border-slate-200" />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight">
                      SANSKRITHI EDUCATIONAL SOCIETY
                    </h3>
                    <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                      SAI PRUDENT SCHOLARSHIP EXAMINATION (SPS) 2025-26
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Approved by AICTE • Affiliated to JNTUA • Puttaparthi, Sri Sathya Sai Dist., AP
                    </p>
                  </div>
                </div>

                <div className="text-center sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                  <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    International Partners
                  </div>
                  <div className="text-xs font-bold text-navy-950">Anahata Stiftung (Germany)</div>
                  <div className="text-xs font-bold text-navy-950">& RISE (Austria)</div>
                  <span className="inline-block mt-1 px-2.5 py-0.5 bg-navy-100 text-navy-950 text-[10px] font-black rounded-full">
                    OFFICIAL ADMIT CARD
                  </span>
                </div>

              </div>
            </div>

            {/* Student & Center Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Photo Box: 3 Cols on desktop */}
              <div className="md:col-span-3 flex flex-col items-center">
                <div className="w-36 h-44 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-inner">
                  <User className="w-12 h-12 text-slate-400 mb-1" />
                  <span className="text-xs font-bold text-slate-800 uppercase leading-snug">{selectedStudent.fullName}</span>
                  <span className="text-[9px] text-slate-400 mt-1 font-mono">PHOTO VALIDATED</span>
                </div>
                <div className="mt-3 text-center">
                  <div className="font-mono text-xs font-black text-navy-950">{selectedStudent.id}</div>
                  <div className="text-[10px] text-slate-500 font-mono">Roll: {selectedStudent.hallTicketNo}</div>
                </div>
              </div>

              {/* Information Table: 9 Cols */}
              <div className="md:col-span-9 space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Candidate Name</span>
                    <span className="font-extrabold text-navy-950 text-sm">{selectedStudent.fullName}</span>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Father's Name</span>
                    <span className="font-bold text-slate-800">{selectedStudent.fatherName || 'N/A'}</span>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Stream / Track</span>
                    <span className="font-bold text-navy-900">{selectedStudent.stream}</span>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Target Program</span>
                    <span className="font-bold text-slate-800">{selectedStudent.targetProgram || 'B.Tech Engineering'}</span>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 sm:col-span-2">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Institution / Junior College</span>
                    <span className="font-semibold text-slate-800">{selectedStudent.collegeName}</span>
                  </div>
                </div>

                {/* Exam Schedule & Venue Box */}
                <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-2 text-xs">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div>
                      <span className="text-amber-800 block text-[10px] uppercase font-bold">Examination Date</span>
                      <span className="font-extrabold text-navy-950">{selectedStudent.examDate}</span>
                    </div>

                    <div>
                      <span className="text-amber-800 block text-[10px] uppercase font-bold">Examination Timings</span>
                      <span className="font-extrabold text-navy-950">{selectedStudent.examTime}</span>
                    </div>

                    <div>
                      <span className="text-amber-800 block text-[10px] uppercase font-bold">Reporting Time</span>
                      <span className="font-extrabold text-red-700">{selectedStudent.reportingTime}</span>
                    </div>

                    <div>
                      <span className="text-amber-800 block text-[10px] uppercase font-bold">Allotted Room & Seat</span>
                      <span className="font-black text-navy-950">{selectedStudent.roomNo ? selectedStudent.roomNo.split('(')[0] : 'Room 101'} • {selectedStudent.seatNo}</span>
                    </div>
                  </div>

                  <div className="border-t border-amber-200/80 pt-2 text-slate-700">
                    <strong className="text-navy-950">Examination Center:</strong> {selectedStudent.examCenter}
                  </div>
                </div>

              </div>

            </div>

            {/* Test Pattern & Candidate Instructions Box */}
            <div className="mt-6 pt-6 border-t-2 border-slate-200 space-y-4 text-xs">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="font-extrabold text-navy-950 uppercase tracking-wide">
                  Test Format: Mathematics (80 Marks) • Physics (40 Marks) • Chemistry (40 Marks) = 160 Marks
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  Barcode: ||| ||||| |||| |||||||| |||||||||| {selectedStudent.id}
                </span>
              </div>

              {/* Instructions Callout */}
              <div className="bg-red-50 p-4 rounded-2xl border border-red-200 text-red-950 space-y-1">
                <div className="font-black text-[11px] uppercase tracking-wider text-red-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                  <span>Mandatory Candidate Instructions:</span>
                </div>
                <ol className="list-decimal list-inside space-y-0.5 text-[11px] leading-relaxed">
                  <li>Candidates <strong>MUST bring this printed Hall Ticket and an Aadhaar Card photocopy</strong> (mandatory for entry).</li>
                  <li>Carry original College Identity Card for verification.</li>
                  <li>Report at least 45 minutes prior to commencement (Reporting: 08:45 AM).</li>
                  <li>Use Black/Blue ballpoint pen only for darkening the OMR circles. No electronic devices permitted.</li>
                </ol>
              </div>

              {/* Signature Blocks */}
              <div className="pt-8 flex justify-between items-end text-center text-xs">
                <div>
                  <div className="w-40 border-b border-slate-400 mb-1" />
                  <span className="text-slate-500 text-[10px] font-semibold">Candidate's Signature</span>
                </div>

                <div>
                  <div className="w-40 border-b border-slate-400 mb-1" />
                  <span className="text-slate-500 text-[10px] font-semibold">Invigilator's Signature</span>
                </div>

                <div>
                  <div className="text-navy-900 font-bold text-xs">Dr. K. Ramanathan</div>
                  <div className="w-40 border-b border-navy-900 mb-1" />
                  <span className="text-navy-950 text-[10px] font-black uppercase">Controller of Examinations</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
