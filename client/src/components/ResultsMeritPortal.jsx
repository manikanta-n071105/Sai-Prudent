import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Award, 
  Crown, 
  Medal, 
  Gift, 
  Printer, 
  Search, 
  BarChart2, 
  CheckCircle2,
  Sparkles,
  FileCheck,
  GraduationCap
} from 'lucide-react';
import { apiFetch } from '../api';

export default function ResultsMeritPortal({ students, currentStudent, onSelectStudent }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  // Top three rank holders
  const toppers = students
    .filter((s) => s.rank && s.rank <= 3)
    .sort((a, b) => a.rank - b.rank);

  const handleSearch = async (e) => {
    e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    setLoading(true);
    setNotFound(false);

    // 1. Search in memory
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

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <section id="results" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 print:hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold uppercase tracking-wider">
            Module 7 • Merit Ranks & Convocation
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            Sai Prudent Results & Scholarship Announcement
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Review state rank holders, search individual scorecards, and generate your official Certificate of Merit.
          </p>
        </div>

        {/* Top 3 Rank Holders Podium (Print: Hidden) */}
        <div className="space-y-6 print:hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800">Top Performers</span>
              <h3 className="text-2xl font-black text-navy-950 mt-0.5">
                Top Three Rank Holders & Grand Prize Winners
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500 font-mono">
              Evaluated on 160-Marks OMR Standard
            </span>
          </div>

          {toppers.length === 0 ? (
            <div className="bg-white p-10 rounded-3xl border border-dashed border-slate-300 text-center space-y-3">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto text-amber-700">
                <Trophy className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-navy-950 text-base">State Top Rank Holders Showcase</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Official topper ranks and Free Laptop & Tablet winners will be spotlighted here once the central evaluation board publishes results.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {toppers.map((t) => {
                const isGold = t.rank === 1;
                const isSilver = t.rank === 2;

                const cardStyle = isGold
                  ? 'bg-gradient-to-b from-amber-50/80 to-white border-amber-400'
                  : isSilver
                  ? 'bg-gradient-to-b from-slate-100/80 to-white border-slate-300'
                  : 'bg-gradient-to-b from-orange-50/80 to-white border-orange-300';

                const MedalIcon = isGold ? Crown : isSilver ? Medal : Award;
                const medalLabel = isGold ? 'Rank 1 (State Topper)' : isSilver ? 'Rank 2' : 'Rank 3';
                const prize = isGold
                  ? 'Free High-Performance Laptop'
                  : isSilver
                  ? 'Free Samsung Galaxy Tablet'
                  : 'Free Smart Tablet & Tech Kit';

                return (
                  <div
                    key={t.id}
                    className={`rounded-3xl p-6 border-2 shadow-md hover:shadow-xl transition-all flex flex-col justify-between ${cardStyle}`}
                  >
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white shadow-2xs mb-3 text-slate-900 border border-slate-200/80">
                        <MedalIcon className="w-3.5 h-3.5 text-amber-600" />
                        <span>{medalLabel}</span>
                      </div>
                      <h4 className="text-xl font-black text-navy-950 mb-1">{t.fullName}</h4>
                      <p className="text-xs text-slate-600 mb-4">{t.collegeName}</p>

                      <div className="bg-white/95 rounded-2xl p-3.5 border border-slate-200 space-y-2 text-xs mb-4">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Total Score:</span>
                          <span className="font-extrabold text-navy-950">{t.marks.total} / 160 ({Math.round((t.marks.total / 160) * 100)}%)</span>
                        </div>
                        <div className="flex justify-between font-mono text-[11px]">
                          <span className="text-slate-500">M / P / C:</span>
                          <span className="font-bold text-slate-800">{t.marks.maths} / {t.marks.physics} / {t.marks.chemistry}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Stream:</span>
                          <span className="font-medium text-slate-700 truncate max-w-[160px]">{t.stream.split('(')[0]}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="p-2.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-bold mb-3 flex items-center gap-2">
                        <Gift className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span className="truncate">{prize}</span>
                      </div>

                      <button
                        onClick={() => setSelectedStudent(t)}
                        className="w-full py-2.5 bg-navy-950 hover:bg-navy-900 text-white rounded-xl text-xs font-bold transition shadow-2xs flex items-center justify-center gap-1.5"
                      >
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>View Full Scorecard & Certificate</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Scorecard Search Bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4 print:hidden">
          <h4 className="text-base font-bold text-navy-950">
            Check Individual Candidate Result & Merit Certificate
          </h4>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Registration ID (e.g. SPS-2025-1001) or Mobile Number..."
                className="w-full pl-10 pr-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-navy-950 hover:bg-navy-900 text-white font-bold rounded-xl text-sm transition shadow-2xs flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Search Result</span>
            </button>
          </form>

          {notFound && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs">
              No examination score found matching "{searchQuery}".
            </div>
          )}
        </div>

        {/* Empty State when no student selected */}
        {!selectedStudent && (
          <div className="bg-white rounded-3xl p-12 border border-dashed border-slate-300 text-center space-y-3">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
              <BarChart2 className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="text-lg font-bold text-navy-950">Candidate Scorecard Portal</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Please enter your Registration ID or registered mobile number above to fetch your examination marks, rank, and official Merit Certificate.
            </p>
          </div>
        )}

        {/* Detailed Scorecard Component */}
        {selectedStudent && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg space-y-8 print:hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  Scorecard • SPS 2025-26
                </span>
                <h3 className="text-2xl font-black text-navy-950 mt-1.5">
                  {selectedStudent.fullName}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  {selectedStudent.id} • Roll No: {selectedStudent.hallTicketNo} • {selectedStudent.collegeName}
                </p>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  onClick={() => {
                    setSelectedStudent(null);
                    setSearchQuery('');
                  }}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition flex items-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5 text-slate-500" />
                  <span>Search Another Student</span>
                </button>
                <button
                  onClick={handlePrintCertificate}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs transition shadow-2xs flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Official Certificate</span>
                </button>
              </div>
            </div>

            {/* Marks Breakdown Grid */}
            {selectedStudent.evaluated && selectedStudent.marks ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-xs text-slate-500 font-semibold block">Mathematics</span>
                    <span className="text-2xl font-black text-navy-950 mt-1 block">
                      {selectedStudent.marks.maths} <span className="text-xs text-slate-400 font-normal">/ 80</span>
                    </span>
                    <span className="text-[10px] text-slate-400">80 Questions</span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-xs text-slate-500 font-semibold block">Physics</span>
                    <span className="text-2xl font-black text-navy-950 mt-1 block">
                      {selectedStudent.marks.physics} <span className="text-xs text-slate-400 font-normal">/ 40</span>
                    </span>
                    <span className="text-[10px] text-slate-400">40 Questions</span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-xs text-slate-500 font-semibold block">Chemistry</span>
                    <span className="text-2xl font-black text-navy-950 mt-1 block">
                      {selectedStudent.marks.chemistry} <span className="text-xs text-slate-400 font-normal">/ 40</span>
                    </span>
                    <span className="text-[10px] text-slate-400">40 Questions</span>
                  </div>

                  <div className="p-4 bg-navy-950 rounded-2xl border border-navy-950 text-white">
                    <span className="text-xs text-amber-300 font-semibold block">Total Marks</span>
                    <span className="text-2xl font-black text-white mt-1 block">
                      {selectedStudent.marks.total} <span className="text-xs text-slate-300 font-normal">/ 160</span>
                    </span>
                    <span className="text-[10px] text-emerald-300 font-semibold">
                      {Math.round((selectedStudent.marks.total / 160) * 100)}% Aggregate
                    </span>
                  </div>
                </div>

                {/* Scholarship Eligibility Callout */}
                <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 text-emerald-800 font-extrabold text-xs uppercase tracking-wide">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Official Scholarship Status: QUALIFIED ON MERIT</span>
                    </div>
                    <div className="text-sm font-bold text-navy-950">
                      Entitled to 50% Scholarship on Hostel & Bus Transportation Fees + Guaranteed Industry Internship
                    </div>
                    {selectedStudent.prize && (
                      <div className="text-xs font-semibold text-amber-800">
                        Awarded: {selectedStudent.prize}
                      </div>
                    )}
                  </div>
                  <span className="px-3.5 py-1.5 bg-emerald-700 text-white text-xs font-black rounded-lg shrink-0">
                    ADMISSION OFFERED
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-sm text-center">
                Candidate examination answer sheet is currently under review by the evaluation board.
              </div>
            )}
          </div>
        )}

        {/* Printable Official Certificate of Merit */}
        {selectedStudent && (
          <div className="bg-white rounded-3xl border-[8px] border-navy-950 p-8 sm:p-14 shadow-2xl relative overflow-hidden print:border-[4px] print:p-6 print:shadow-none print:rounded-none">
            
            {/* Golden Decorative Inner Border */}
            <div className="border-2 border-amber-500/80 p-6 sm:p-10 rounded-2xl text-center space-y-6">
              
              {/* Institution Seal */}
              <div className="space-y-2">
                <img src="/logo.jpg" alt="Sanskrithi Logo" className="w-16 h-16 rounded-2xl object-cover shadow-md mx-auto border border-slate-200" />
                <h2 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
                  SANSKRITHI EDUCATIONAL SOCIETY
                </h2>
                <div className="text-xs font-extrabold uppercase tracking-widest text-amber-700">
                  SAI PRUDENT SCHOLARSHIP EXAMINATION • CERTIFICATE OF MERIT
                </div>
                <p className="text-[11px] text-slate-500">
                  Instituted in 2015 • Supported by Anahata Stiftung (Germany) & RISE (Austria)
                </p>
              </div>

              <div className="w-24 h-0.5 bg-amber-500 mx-auto" />

              {/* Certificate Text */}
              <div className="space-y-4 max-w-2xl mx-auto text-slate-700 text-sm leading-relaxed">
                <p>This is to certify that</p>
                <div className="text-2xl sm:text-3xl font-black text-navy-950 underline decoration-amber-500 decoration-2 underline-offset-8">
                  {selectedStudent.fullName}
                </div>
                <p className="text-xs font-mono text-slate-500">
                  Registration ID: <strong>{selectedStudent.id}</strong> • Roll No: <strong>{selectedStudent.hallTicketNo}</strong>
                </p>
                <p>
                  from <strong>{selectedStudent.collegeName}</strong> has successfully written the 
                  Sai Prudent Scholarship Test and secured a distinguished merit score of{' '}
                  <strong className="text-navy-950">{selectedStudent.marks ? selectedStudent.marks.total : 140} / 160</strong>
                  {selectedStudent.rank && (
                    <span>, ranking <strong className="text-amber-700">#{selectedStudent.rank} statewide</strong></span>
                  )}.
                </p>
                <p className="font-semibold text-navy-950 bg-amber-50 py-2 px-4 rounded-xl border border-amber-200 inline-block text-xs">
                  Awarded: {selectedStudent.prize || '50% Hostel & Bus Transport Fee Scholarship + Paid Internship with Minimum Stipend'}
                </p>
              </div>

              {/* Signatories */}
              <div className="pt-10 flex justify-between items-end text-xs text-slate-600 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="font-bold text-navy-950">Dr. K. Ramanathan</div>
                  <div className="w-36 border-b border-slate-400 my-1 mx-auto" />
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Controller of Exams, SPS</span>
                </div>

                <div className="w-16 h-16 rounded-full border-2 border-amber-500 flex items-center justify-center text-amber-700 font-extrabold text-[9px] uppercase tracking-tighter text-center">
                  OFFICIAL<br />SEAL
                </div>

                <div className="text-center">
                  <div className="font-bold text-navy-950">Anahata & RISE Boards</div>
                  <div className="w-36 border-b border-slate-400 my-1 mx-auto" />
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">International Trustees</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
