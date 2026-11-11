import React, { useState } from 'react';
import { Printer, CheckCircle2, Users, Search, Building } from 'lucide-react';

export default function RoomAttendancePortal({ rooms, students, onToggleAttendance }) {
  const [selectedRoom, setSelectedRoom] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = students.filter((s) => {
    if (selectedRoom !== 'ALL' && !s.roomNo.includes(selectedRoom)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        s.fullName.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.phone.includes(q) ||
        s.seatNo.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalCount = filteredStudents.length;
  const presentCount = filteredStudents.filter((s) => s.attendance === 'Present').length;
  const absentCount = totalCount - presentCount;
  const pct = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

  const handlePrintRoster = () => {
    window.print();
  };

  return (
    <section id="attendance" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 print:hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 text-navy-900 border border-navy-200 text-xs font-bold uppercase tracking-wider">
            Examinations & Invigilator Operations
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            Room Allotment & Attendance Management
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Module 3 & Module 6: Monitor room capacity, assign invigilators, and record real-time 
            candidate attendance directly synchronized with the SPS central database.
          </p>
        </div>

        {/* 1. Room Allotment Cards (Module 3) */}
        <div className="space-y-6 print:hidden">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Module 3</span>
              <h3 className="text-xl font-bold text-navy-950">
                Examination Room Capacity & Staff Allocation
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500">
              Sanskrithi Puttaparthi Campus
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((r) => {
              const capPct = Math.round((r.allotted / r.capacity) * 100);
              return (
                <div
                  key={r.roomNo}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4 hover:border-navy-400 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-navy-900 text-white font-mono font-black text-xs rounded-lg">
                      {r.roomNo}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {r.allotted} / {r.capacity} Seats ({capPct}%)
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-navy-950">{r.block}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">
                      Assigned: {r.streamAssigned}
                    </p>
                  </div>

                  {/* Capacity Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-navy-800 h-2 rounded-full" style={{ width: `${capPct}%` }} />
                  </div>

                  {/* Staff Info */}
                  <div className="border-t border-slate-200 pt-3 text-xs space-y-1">
                    <div>
                      <strong className="text-slate-800">Invigilator:</strong>{' '}
                      <span className="text-slate-600">{r.invigilator}</span>
                    </div>
                    <div>
                      <strong className="text-slate-800">Staff Assistant:</strong>{' '}
                      <span className="text-slate-600">{r.assistantStaff}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Attendance Management Table (Module 6) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                Module 6 • Live Verification Desk
              </span>
              <h3 className="text-2xl font-black text-navy-950 mt-1">
                Candidate Attendance Roster
              </h3>
              <p className="text-xs text-slate-500">
                Verify identity using Hall Ticket & mark student status in central database.
              </p>
            </div>

            <button
              onClick={handlePrintRoster}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition flex items-center gap-2 print:hidden"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Room-wise Attendance Sheet</span>
            </button>
          </div>

          {/* Filter Bar & Summary Metrics (Hidden in Print) */}
          <div className="space-y-4 print:hidden">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              
              {/* Room Tabs */}
              <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                {['ALL', 'Room 101', 'Room 102', 'Room 103', 'Room 201'].map((rm) => (
                  <button
                    key={rm}
                    onClick={() => setSelectedRoom(rm)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                      selectedRoom === rm
                        ? 'bg-navy-900 text-white shadow'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {rm === 'ALL' ? 'All Rooms' : rm}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="w-full sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student or seat..."
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

            </div>

            {/* Live Counter Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Total Roster</span>
                <div className="text-xl font-black text-navy-950 mt-0.5">{totalCount}</div>
              </div>
              <div>
                <span className="text-[10px] text-emerald-800 font-bold uppercase">Present Verified</span>
                <div className="text-xl font-black text-emerald-700 mt-0.5">{presentCount}</div>
              </div>
              <div>
                <span className="text-[10px] text-red-800 font-bold uppercase">Absent Recorded</span>
                <div className="text-xl font-black text-red-700 mt-0.5">{absentCount}</div>
              </div>
              <div>
                <span className="text-[10px] text-blue-800 font-bold uppercase">Attendance %</span>
                <div className="text-xl font-black text-blue-700 mt-0.5">{pct}%</div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 uppercase font-extrabold text-[10px] tracking-wider">
                  <th className="p-3">#</th>
                  <th className="p-3">Candidate / Reg ID</th>
                  <th className="p-3">Stream / Institution</th>
                  <th className="p-3">Room / Seat</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Attendance</th>
                  <th className="p-3 text-right print:hidden">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-slate-400">
                      No candidates match the selected filter.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((st, i) => {
                    const isPresent = st.attendance === 'Present';
                    return (
                      <tr key={st.id} className="hover:bg-slate-50 transition">
                        <td className="p-3 font-semibold text-slate-400">{i + 1}</td>
                        <td className="p-3">
                          <div className="font-bold text-navy-950">{st.fullName}</div>
                          <div className="font-mono text-[11px] text-slate-500">{st.id} • {st.channel}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-semibold text-slate-800">{st.stream}</div>
                          <div className="text-[11px] text-slate-500 truncate max-w-[200px]">{st.collegeName}</div>
                        </td>
                        <td className="p-3">
                          <span className="inline-block px-2 py-0.5 bg-slate-100 font-bold text-navy-900 rounded text-[11px]">
                            {st.roomNo.split('(')[0]}
                          </span>
                          <div className="font-mono text-[10px] text-slate-500 mt-0.5">Seat: {st.seatNo}</div>
                        </td>
                        <td className="p-3 font-mono text-slate-600">
                          {st.phone}
                        </td>
                        <td className="p-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                              isPresent ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${isPresent ? 'bg-emerald-600' : 'bg-red-600'}`} />
                            {st.attendance || 'Pending'}
                          </span>
                          <div className="text-[9px] text-slate-400 mt-0.5">{st.attendanceTimestamp || '—'}</div>
                        </td>
                        <td className="p-3 text-right print:hidden">
                          <button
                            onClick={() => onToggleAttendance && onToggleAttendance(st.id)}
                            className={`px-3 py-1 rounded text-xs font-bold transition ${
                              isPresent
                                ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                                : 'bg-emerald-600 text-white hover:bg-emerald-700'
                            }`}
                          >
                            {isPresent ? 'Mark Absent' : 'Mark Present'}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Print Sign-off Box */}
          <div className="hidden print:flex justify-between items-end pt-12 text-xs">
            <div>
              <div className="w-36 border-b border-black mb-1" />
              <span>Room Invigilator Signature</span>
            </div>
            <div>
              <div className="w-36 border-b border-black mb-1" />
              <span>Chief Superintendent Signature</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

