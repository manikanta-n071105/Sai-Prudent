import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Download, 
  LogOut, 
  RefreshCw, 
  Inbox, 
  Eye, 
  FileText, 
  Edit3, 
  Trash2, 
  UserPlus, 
  Printer, 
  X, 
  Search, 
  Users, 
  CheckSquare, 
  Sparkles,
  Lock,
  ArrowRight,
  CheckCircle2,
  Layers,
  Zap,
  Check,
  Ticket
} from 'lucide-react';
import { apiFetch, getApiBaseUrl } from '../api';

export default function AdminPanel({
  students,
  rooms,
  onRefresh,
  onDeleteStudent,
  onToggleAttendance,
  onUpdateMarks,
  onViewHallTicket,
  onAddStudent,
  onConsolidateSeats
}) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('sps_admin_logged_in') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStream, setFilterStream] = useState('ALL');
  const [filterAttendance, setFilterAttendance] = useState('ALL');
  const [customApiUrl, setCustomApiUrl] = useState(() => getApiBaseUrl());
  const [showApiSettings, setShowApiSettings] = useState(false);

  // Seating Allotment Print Center States (Defaults to PRESENT_ONLY as requested)
  const [showSeatingModal, setShowSeatingModal] = useState(false);
  const [seatingFilterMode, setSeatingFilterMode] = useState('PRESENT_ONLY'); // 'PRESENT_ONLY' or 'ALL'
  const [seatingActiveTab, setSeatingActiveTab] = useState('ROOM_DOOR'); // 'ROOM_DOOR', 'NOTICE_BOARD', 'DESK_SLIPS'
  const [seatingSelectedRoom, setSeatingSelectedRoom] = useState('ALL');
  const [gateSearchQuery, setGateSearchQuery] = useState('');
  const [mobileViewMode, setMobileViewMode] = useState('CARDS'); // 'CARDS' or 'TABLE' on mobile

  // Modal states
  const [selectedStudentDossier, setSelectedStudentDossier] = useState(null);
  const [marksModalStudent, setMarksModalStudent] = useState(null);
  const [marksForm, setMarksForm] = useState({ maths: 0, physics: 0, chemistry: 0, rank: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    fullName: '',
    guardianName: '',
    coursePursuing: 'Class 12 - MPC (B.Tech Track)',
    institutionName: '',
    studentPhone: '',
    parentPhone: '',
    email: '',
    doorNo: '',
    streetName: '',
    areaLocation: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      const res = await apiFetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        setIsAdminLoggedIn(true);
        localStorage.setItem('sps_admin_logged_in', 'true');
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      // Fallback local check
      if (username.trim() === 'admin' && password.trim() === 'admin123') {
        setIsAdminLoggedIn(true);
        localStorage.setItem('sps_admin_logged_in', 'true');
      } else {
        setLoginError('Invalid username or password. Default is: admin / admin123');
      }
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('sps_admin_logged_in');
  };

  // Filter students
  const filteredStudents = students.filter((s) => {
    if (filterStream !== 'ALL' && !s.stream.toLowerCase().includes(filterStream.toLowerCase())) return false;
    if (filterAttendance !== 'ALL' && s.attendance !== filterAttendance) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        s.fullName.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.phone.includes(q) ||
        s.collegeName.toLowerCase().includes(q) ||
        (s.hallTicketNo && s.hallTicketNo.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Export CSV
  const handleExportCSV = () => {
    if (students.length === 0) {
      alert('No registrations to export.');
      return;
    }
    const headers = [
      'Registration ID', 'Roll Number', 'Full Name', 'Father Name', 'Phone',
      'Stream', 'Target Course', 'College Name', 'District', 'Room Number',
      'Seat Number', 'Attendance', 'Marks Maths', 'Marks Physics', 'Marks Chemistry',
      'Total Marks', 'Rank', 'Registration Channel'
    ];

    const rows = students.map((s) => [
      `"${s.id}"`,
      `"${s.hallTicketNo || ''}"`,
      `"${s.fullName}"`,
      `"${s.fatherName || ''}"`,
      `"${s.phone}"`,
      `"${s.stream}"`,
      `"${s.targetProgram || ''}"`,
      `"${s.collegeName}"`,
      `"${s.district || ''}"`,
      `"${s.roomNo || ''}"`,
      `"${s.seatNo || ''}"`,
      `"${s.attendance || 'Absent'}"`,
      s.evaluated && s.marks ? (s.marks.maths ?? '') : '',
      s.evaluated && s.marks ? (s.marks.physics ?? '') : '',
      s.evaluated && s.marks ? (s.marks.chemistry ?? '') : '',
      s.evaluated && s.marks ? (s.marks.total ?? '') : '',
      s.rank || '',
      `"${s.channel || 'Online'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SPS_Registrations_NeonDB_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveMarks = async (e) => {
    e.preventDefault();
    if (!marksModalStudent) return;

    if (onUpdateMarks) {
      await onUpdateMarks(marksModalStudent.id, {
        maths: parseInt(marksForm.maths, 10) || 0,
        physics: parseInt(marksForm.physics, 10) || 0,
        chemistry: parseInt(marksForm.chemistry, 10) || 0,
        rank: marksForm.rank ? parseInt(marksForm.rank, 10) : null
      });
    }
    setMarksModalStudent(null);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!addForm.fullName.trim() || !addForm.studentPhone.trim() || !addForm.institutionName.trim()) {
      alert('Please fill out all required fields: Name of the Student, Institution, and Student Mobile No.');
      return;
    }

    const fullAddress = [addForm.doorNo, addForm.streetName, addForm.areaLocation].filter(Boolean).join(', ') || 'Puttaparthi, Andhra Pradesh';

    if (onAddStudent) {
      await onAddStudent({
        ...addForm,
        fatherName: addForm.guardianName,
        stream: addForm.coursePursuing,
        collegeName: addForm.institutionName,
        phone: addForm.studentPhone,
        whatsapp: addForm.parentPhone || addForm.studentPhone,
        address: fullAddress,
        district: addForm.areaLocation || 'Sri Sathya Sai',
        channel: 'Offline / Information Sheet'
      });
    }
    setShowAddModal(false);
    setAddForm({
      fullName: '',
      guardianName: '',
      coursePursuing: 'Class 12 - MPC (B.Tech Track)',
      institutionName: '',
      studentPhone: '',
      parentPhone: '',
      email: '',
      doorNo: '',
      streetName: '',
      areaLocation: ''
    });
  };

  // Auto-Consolidate Seats for Present Students (Fills rooms 100% compactly, zero empty gaps)
  const handleConsolidatePresentSeats = () => {
    const presentStudents = students.filter((s) => s.attendance === 'Present');
    if (presentStudents.length === 0) {
      alert('No candidates are marked "Present" yet.\n\nTip: You can use the Campus Gate Rapid Check-in search bar in this printer to mark students as they arrive at the campus, then click this button to pack them into full rooms.');
      return;
    }

    const confirmMsg = `Consolidate seating for ${presentStudents.length} CONFIRMED PRESENT candidates?\n\nThis will pack them sequentially into Room 101, Room 102, Room 103, etc., starting with Seat 01, eliminating all empty gaps between benches.`;
    if (!window.confirm(confirmMsg)) return;

    // Sort present students: keep academic streams grouped together, then by SPS Roll Number
    const sortedPresent = [...presentStudents].sort((a, b) => {
      if (a.stream !== b.stream) {
        return a.stream.localeCompare(b.stream);
      }
      return (a.hallTicketNo || a.id).localeCompare(b.hallTicketNo || b.id);
    });

    let currentStudentIdx = 0;
    const studentUpdatesMap = new Map();

    for (let r = 0; r < rooms.length; r++) {
      const room = rooms[r];
      const cap = room.capacity || 40;

      for (let s = 1; s <= cap && currentStudentIdx < sortedPresent.length; s++) {
        const student = sortedPresent[currentStudentIdx];
        const seatStr = `Seat ${s < 10 ? '0' + s : s}`;
        studentUpdatesMap.set(student.id, {
          roomNo: `${room.roomNo} (${room.block.split('(')[0].trim()})`,
          seatNo: seatStr
        });
        currentStudentIdx++;
      }
      if (currentStudentIdx >= sortedPresent.length) break;
    }

    const updatedStudents = students.map((st) => {
      if (studentUpdatesMap.has(st.id)) {
        const updates = studentUpdatesMap.get(st.id);
        return {
          ...st,
          roomNo: updates.roomNo,
          seatNo: updates.seatNo
        };
      }
      return st;
    });

    if (onConsolidateSeats) {
      onConsolidateSeats(updatedStudents);
    }
    alert(`Success! Consolidated ${presentStudents.length} present candidates into ${Math.ceil(presentStudents.length / 40)} rooms with 100% capacity and zero empty desks.`);
  };

  // Render Login Form if not authenticated
  if (!isAdminLoggedIn) {
    return (
      <section className="py-20 bg-slate-100 min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-2xl max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-navy-950 text-amber-400 font-black text-2xl rounded-2xl flex items-center justify-center mx-auto shadow-md border border-amber-400/20">
              <Lock className="w-7 h-7 text-amber-400" />
            </div>
            <h2 className="text-2xl font-black text-navy-950 tracking-tight">Admin Examination Console</h2>
            <p className="text-xs text-slate-500">
              Restricted portal for Controller of Examinations & Admissions Coordinators.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Admin Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none text-sm"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500">
              <strong>Default Demo Credentials:</strong>
              <div>Username: <code className="text-navy-950 font-bold">admin</code> | Password: <code className="text-navy-950 font-bold">admin123</code></div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-navy-950 hover:bg-navy-900 text-white font-black rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2"
            >
              <span>Sign In to Admin Panel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>
    );
  }

  // Calculate live metrics
  const totalCount = students.length;
  const mpcCount = students.filter((s) => s.stream.includes('MPC')).length;
  const bbaCount = students.filter((s) => s.stream.includes('BBA')).length;
  const degreeCount = students.filter((s) => s.stream.includes('Degree')).length;
  const presentCount = students.filter((s) => s.attendance === 'Present').length;
  const evaluatedCount = students.filter((s) => s.evaluated && s.marks && s.marks.total !== null && s.marks.total !== undefined).length;

  // Seating Candidates based on user-selected filter mode ('PRESENT_ONLY' or 'ALL')
  const seatingCandidates = students.filter((s) => {
    if (seatingFilterMode === 'PRESENT_ONLY') {
      return s.attendance === 'Present';
    }
    return true;
  });

  // Group seating candidates by room
  const candidatesByRoom = seatingCandidates.reduce((acc, s) => {
    const roomKey = s.roomNo || 'Unassigned';
    if (!acc[roomKey]) acc[roomKey] = [];
    acc[roomKey].push(s);
    return acc;
  }, {});

  // Sort candidates in each room by seat number
  Object.keys(candidatesByRoom).forEach((r) => {
    candidatesByRoom[r].sort((a, b) => {
      const seatA = parseInt((a.seatNo || '').replace(/\D/g, ''), 10) || 0;
      const seatB = parseInt((b.seatNo || '').replace(/\D/g, ''), 10) || 0;
      if (seatA !== seatB) return seatA - seatB;
      return (a.rollNo || '').localeCompare(b.rollNo || '');
    });
  });

  // Active rooms with candidates
  const activeRoomsList = rooms.filter(
    (r) => (candidatesByRoom[r.roomNo] || []).length > 0
  );

  // Gate check-in search matches
  const gateSearchFiltered = gateSearchQuery.trim()
    ? students.filter((s) => {
        const q = gateSearchQuery.toLowerCase();
        return (
          (s.name && s.name.toLowerCase().includes(q)) ||
          (s.rollNo && s.rollNo.toLowerCase().includes(q)) ||
          (s.hallTicketNo && s.hallTicketNo.toLowerCase().includes(q)) ||
          (s.phone && s.phone.includes(q))
        );
      })
    : [];

  return (
    <section className="py-6 sm:py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-5 sm:space-y-8">
        
        {/* Admin Header */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1 sm:space-y-1.5 w-full md:w-auto">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-navy-50 text-navy-950 font-extrabold text-[11px] sm:text-xs uppercase rounded-full border border-navy-200/80">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Super Admin</span>
                <span>•</span>
                <span className="text-emerald-700">Neon DB</span>
              </div>
              <button
                onClick={() => setShowApiSettings(true)}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] sm:text-xs font-semibold rounded-full border border-slate-300 transition"
                title="Configure Backend API URL"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="truncate max-w-[150px] sm:max-w-none">API: {getApiBaseUrl() || 'Relative'}</span>
              </button>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-navy-950 leading-tight">
              Candidate Registrations & Controller
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Review live registrations from Neon DB, manage room allocations, enter evaluation marks, and export data.
            </p>
          </div>

          {/* Action Buttons: 2-column on mobile, inline-flex on tablet/desktop */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 w-full md:w-auto pt-2 md:pt-0">
            <button
              type="button"
              onClick={() => setShowSeatingModal(true)}
              className="col-span-2 sm:col-span-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              title="Print Room Door Rosters, Gate Master List & Desk Slips for Present/Confirmed candidates"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Seating Allotment</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="col-span-1 px-3 sm:px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add Candidate</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="col-span-1 px-3 sm:px-4 py-2.5 bg-navy-950 hover:bg-navy-900 text-white font-bold rounded-xl text-xs transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="col-span-2 sm:col-span-1 px-3.5 py-2 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1 cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Real-Time Database Metrics Cards: Compact 2-column mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 text-center">
          <div className="p-3 sm:p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-navy-300 transition">
            <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-black">Total In DB</span>
            <div className="text-xl sm:text-2xl font-black text-navy-950 mt-0.5">{totalCount}</div>
            <span className="text-[10px] text-slate-500 font-medium">Registered</span>
          </div>

          <div className="p-3 sm:p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-300 transition">
            <span className="text-[9px] sm:text-[10px] text-blue-700 uppercase font-black">B.Tech (MPC)</span>
            <div className="text-xl sm:text-2xl font-black text-blue-900 mt-0.5">{mpcCount}</div>
            <span className="text-[10px] text-slate-500 font-medium">Engineering</span>
          </div>

          <div className="p-3 sm:p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-amber-300 transition">
            <span className="text-[9px] sm:text-[10px] text-amber-700 uppercase font-black">BBA Stream</span>
            <div className="text-xl sm:text-2xl font-black text-amber-900 mt-0.5">{bbaCount}</div>
            <span className="text-[10px] text-slate-500 font-medium">Management</span>
          </div>

          <div className="p-3 sm:p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-300 transition">
            <span className="text-[9px] sm:text-[10px] text-blue-700 uppercase font-black">Degree Final</span>
            <div className="text-xl sm:text-2xl font-black text-navy-950 mt-0.5">{degreeCount}</div>
            <span className="text-[10px] text-slate-500 font-medium">Master's</span>
          </div>

          <div className="p-3 sm:p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-300 transition">
            <span className="text-[9px] sm:text-[10px] text-emerald-700 uppercase font-black">Present Verified</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-800 mt-0.5">{presentCount}</div>
            <span className="text-[10px] text-slate-500 font-medium">{totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0}% Attendance</span>
          </div>

          <div className="p-3 sm:p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 transition">
            <span className="text-[9px] sm:text-[10px] text-slate-700 uppercase font-black">Evaluated</span>
            <div className="text-xl sm:text-2xl font-black text-slate-950 mt-0.5">{evaluatedCount}</div>
            <span className="text-[10px] text-slate-500 font-medium">Scorecards</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-2.5 sm:gap-3 items-stretch md:items-center justify-between text-xs">
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate name, SPS ID, phone..."
              className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none text-xs"
            />
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 w-full md:w-auto">
            <select
              value={filterStream}
              onChange={(e) => setFilterStream(e.target.value)}
              className="p-2.5 border border-slate-300 rounded-xl bg-white font-semibold text-slate-700 focus:outline-none text-xs truncate"
            >
              <option value="ALL">All Streams</option>
              <option value="MPC">Class 12 - MPC</option>
              <option value="BBA">Class 12 - BBA</option>
              <option value="Degree">Degree Final Yr</option>
            </select>

            <select
              value={filterAttendance}
              onChange={(e) => setFilterAttendance(e.target.value)}
              className="p-2.5 border border-slate-300 rounded-xl bg-white font-semibold text-slate-700 focus:outline-none text-xs"
            >
              <option value="ALL">All Attendance</option>
              <option value="Present">Present Only</option>
              <option value="Absent">Absent Only</option>
            </select>

            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                className="col-span-2 sm:col-span-1 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                title="Reload from Neon DB"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                <span>Refresh</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Registrations Database (Responsive Cards for Mobile, Full Table for Desktop) */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-3 sm:p-4 bg-slate-50/80 border-b border-slate-200 flex flex-wrap gap-2 justify-between items-center text-xs">
            <span className="font-black text-navy-950 uppercase tracking-wider text-[11px] sm:text-xs">
              Candidates Database ({filteredStudents.length} Records)
            </span>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-slate-400 font-mono text-[11px]">Database: Neon PostgreSQL</span>
              {/* Mobile View Mode Switcher: Cards vs Table */}
              <div className="md:hidden flex items-center bg-slate-200/90 p-0.5 rounded-lg border border-slate-300">
                <button
                  type="button"
                  onClick={() => setMobileViewMode('CARDS')}
                  className={`px-2 py-0.5 rounded text-[10px] font-black transition cursor-pointer ${
                    mobileViewMode === 'CARDS'
                      ? 'bg-navy-950 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Cards
                </button>
                <button
                  type="button"
                  onClick={() => setMobileViewMode('TABLE')}
                  className={`px-2 py-0.5 rounded text-[10px] font-black transition cursor-pointer ${
                    mobileViewMode === 'TABLE'
                      ? 'bg-navy-950 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Table
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE CARDS VIEW (Shown on mobile when mobileViewMode is CARDS) */}
          {mobileViewMode === 'CARDS' && (
            <div className="md:hidden divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <div className="p-8 text-center text-slate-400 space-y-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
                    <Inbox className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <div className="font-bold text-slate-700 text-sm">No Student Registrations Recorded Yet</div>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="mt-2 px-4 py-2 bg-navy-950 text-white font-bold rounded-xl text-xs hover:bg-navy-900 transition shadow-2xs inline-flex items-center gap-1.5"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Add Candidate</span>
                  </button>
                </div>
              ) : (
                filteredStudents.map((st, idx) => {
                  const isPresent = st.attendance === 'Present';
                  return (
                    <div key={st.id} className="p-3.5 sm:p-4 space-y-2.5 bg-white hover:bg-slate-50/50 transition">
                      {/* Top Row: S.No, Name, SPS ID & Attendance Toggle */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 min-w-0">
                          <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-600 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <div className="min-w-0">
                            <h4 className="font-black text-navy-950 text-sm truncate">
                              {st.fullName}
                            </h4>
                            <div className="flex flex-wrap items-center gap-1 font-mono text-[10px] text-slate-500 mt-0.5">
                              <span className="font-bold text-slate-700">{st.id}</span>
                              <span>•</span>
                              <span>Roll: {st.hallTicketNo || 'N/A'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Quick 1-tap Attendance Toggle */}
                        <button
                          type="button"
                          onClick={() => onToggleAttendance && onToggleAttendance(st.id)}
                          className={`shrink-0 px-2.5 py-1 rounded-full font-bold text-[10px] transition cursor-pointer flex items-center gap-1 shadow-2xs ${
                            isPresent
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}
                          title="Tap to toggle attendance"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isPresent ? 'bg-emerald-600' : 'bg-red-600'}`} />
                          <span>{st.attendance || 'Absent'}</span>
                        </button>
                      </div>

                      {/* Middle Details Box */}
                      <div className="grid grid-cols-2 gap-1.5 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase block">Stream</span>
                          <span className="font-semibold text-slate-800 line-clamp-1">{st.stream}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase block">Allotted Seat</span>
                          <span className="font-black text-navy-950 inline-block px-1.5 py-0.5 bg-amber-100/80 text-amber-950 rounded text-[10px]">
                            {st.roomNo ? st.roomNo.split('(')[0].trim() : 'Room 101'} • {st.seatNo || 'N/A'}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-[9px] font-bold text-slate-400 uppercase block">College / School</span>
                          <span className="text-slate-600 text-[11px] line-clamp-1">{st.collegeName || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase block">Candidate Mobile</span>
                          <a href={`tel:${st.phone}`} className="font-mono text-blue-700 font-bold hover:underline text-[11px]">
                            📞 {st.phone}
                          </a>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase block">Score / Result</span>
                          {st.evaluated && st.marks && st.marks.total !== null ? (
                            <span className="font-bold text-emerald-800 text-[11px]">
                              {st.marks.total}/160 {st.rank ? `(Rank #${st.rank})` : ''}
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[11px]">Not Evaluated</span>
                          )}
                        </div>
                      </div>

                      {/* Touch-Friendly Action Buttons */}
                      <div className="grid grid-cols-4 gap-1.5 pt-0.5">
                        <button
                          type="button"
                          onClick={() => setSelectedStudentDossier(st)}
                          className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-[10px] sm:text-[11px] flex items-center justify-center gap-1 transition cursor-pointer"
                        >
                          <FileText className="w-3 h-3 text-slate-500" />
                          <span>Dossier</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setMarksModalStudent(st);
                            setMarksForm({
                              maths: st.marks?.maths !== null && st.marks?.maths !== undefined ? st.marks.maths : '',
                              physics: st.marks?.physics !== null && st.marks?.physics !== undefined ? st.marks.physics : '',
                              chemistry: st.marks?.chemistry !== null && st.marks?.chemistry !== undefined ? st.marks.chemistry : '',
                              rank: st.rank || ''
                            });
                          }}
                          className="py-1.5 px-2 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold rounded-lg text-[10px] sm:text-[11px] flex items-center justify-center gap-1 transition border border-amber-200/50 cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3 text-amber-600" />
                          <span>Marks</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onViewHallTicket && onViewHallTicket(st)}
                          className="py-1.5 px-2 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold rounded-lg text-[10px] sm:text-[11px] flex items-center justify-center gap-1 transition border border-blue-200/50 cursor-pointer"
                        >
                          <Ticket className="w-3 h-3 text-blue-600" />
                          <span>Ticket</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete candidate ${st.fullName} (${st.id}) from Neon DB?`)) {
                              onDeleteStudent && onDeleteStudent(st.id);
                            }
                          }}
                          className="py-1.5 px-2 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-lg text-[10px] sm:text-[11px] flex items-center justify-center gap-1 transition border border-red-200/50 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3 text-red-500" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* DESKTOP TABLE VIEW */}
          <div className={`${mobileViewMode === 'CARDS' ? 'hidden md:block' : 'block'} overflow-x-auto`}>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 uppercase font-black text-[10px] tracking-wider">
                  <th className="p-3">#</th>
                  <th className="p-3">Candidate / SPS ID</th>
                  <th className="p-3">Stream / Institution</th>
                  <th className="p-3">Room & Seat</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Attendance</th>
                  <th className="p-3">Test Score</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-12 text-center text-slate-400 space-y-3">
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
                        <Inbox className="w-6 h-6 stroke-[1.5]" />
                      </div>
                      <div className="font-bold text-slate-700 text-sm">No Student Registrations Recorded in Database Yet</div>
                      <div className="text-xs text-slate-500 max-w-sm mx-auto">
                        When candidates register via Channel 1 (Online) or Channel 2 (Coordinators), they will appear here instantly!
                      </div>
                      <button
                        onClick={() => setShowAddModal(true)}
                        className="mt-3 px-4 py-2 bg-navy-950 text-white font-bold rounded-xl text-xs hover:bg-navy-900 transition shadow-2xs inline-flex items-center gap-1.5"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Add First Candidate Now</span>
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((st, idx) => {
                    const isPresent = st.attendance === 'Present';
                    return (
                      <tr key={st.id} className="hover:bg-slate-50/70 transition">
                        <td className="p-3 font-semibold text-slate-400">{idx + 1}</td>
                        <td className="p-3">
                          <div className="font-bold text-navy-950">{st.fullName}</div>
                          <div className="font-mono text-[11px] text-slate-500">{st.id} • {st.channel || 'Online'}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-semibold text-slate-800">{st.stream}</div>
                          <div className="text-[11px] text-slate-500 truncate max-w-[200px]">{st.collegeName}</div>
                        </td>
                        <td className="p-3">
                          <span className="inline-block px-2 py-0.5 bg-slate-100 font-bold text-navy-900 rounded text-[11px]">
                            {st.roomNo ? st.roomNo.split('(')[0] : 'Room 101'}
                          </span>
                          <div className="font-mono text-[10px] text-slate-500 mt-0.5">Seat: {st.seatNo || 'N/A'}</div>
                        </td>
                        <td className="p-3 font-mono text-slate-600">
                          <div>{st.phone}</div>
                          <div className="text-[10px] text-slate-400">{st.district || 'AP'}</div>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => onToggleAttendance && onToggleAttendance(st.id)}
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] cursor-pointer hover:opacity-80 transition ${
                              isPresent ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                            }`}
                            title="Click to toggle attendance"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${isPresent ? 'bg-emerald-600' : 'bg-red-600'}`} />
                            {st.attendance || 'Absent'}
                          </button>
                        </td>
                        <td className="p-3">
                          {st.evaluated && st.marks && st.marks.total !== null && st.marks.total !== undefined ? (
                            <div>
                              <span className="font-bold text-navy-950">{st.marks.total} / 160</span>
                              {st.rank && <span className="ml-1 text-[10px] font-black text-amber-700">Rank #{st.rank}</span>}
                            </div>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                              Not Evaluated
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setSelectedStudentDossier(st)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-navy-950 transition"
                              title="View Full Student Dossier"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onViewHallTicket && onViewHallTicket(st)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-navy-950 transition"
                              title="View Admit Card"
                            >
                              <FileText className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setMarksModalStudent(st);
                                setMarksForm({
                                  maths: st.marks?.maths !== null && st.marks?.maths !== undefined ? st.marks.maths : '',
                                  physics: st.marks?.physics !== null && st.marks?.physics !== undefined ? st.marks.physics : '',
                                  chemistry: st.marks?.chemistry !== null && st.marks?.chemistry !== undefined ? st.marks.chemistry : '',
                                  rank: st.rank || ''
                                });
                              }}
                              className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-700 transition"
                              title="Enter / Edit Marks"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete candidate ${st.fullName} (${st.id}) from Neon DB?`)) {
                                  onDeleteStudent && onDeleteStudent(st.id);
                                }
                              }}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition"
                              title="Delete Registration"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Candidate Full Dossier */}
        {selectedStudentDossier && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-8 border border-slate-200 shadow-2xl space-y-4 sm:space-y-6 max-h-[92vh] overflow-y-auto my-auto">
              <div className="flex justify-between items-start border-b pb-3 sm:pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full">
                    Candidate Dossier
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-navy-950 mt-1">{selectedStudentDossier.fullName}</h3>
                  <div className="font-mono text-[11px] sm:text-xs text-slate-500">{selectedStudentDossier.id} • Roll: {selectedStudentDossier.hallTicketNo}</div>
                </div>
                <button
                  onClick={() => setSelectedStudentDossier(null)}
                  className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl col-span-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Name of the Student</span>
                  <strong className="text-sm text-navy-950">{selectedStudentDossier.fullName}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Father/Mother/Guardian</span>
                  <strong>{selectedStudentDossier.guardianName || selectedStudentDossier.fatherName || 'N/A'}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Course Pursuing</span>
                  <strong>{selectedStudentDossier.coursePursuing || selectedStudentDossier.stream}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl col-span-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Name of Institution</span>
                  <strong>{selectedStudentDossier.institutionName || selectedStudentDossier.collegeName}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Student Mobile No.</span>
                  <strong className="font-mono">{selectedStudentDossier.studentPhone || selectedStudentDossier.phone}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Parent's Mobile No</span>
                  <strong className="font-mono">{selectedStudentDossier.parentPhone || selectedStudentDossier.whatsapp || 'N/A'}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl col-span-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">e-mail ID</span>
                  <span>{selectedStudentDossier.email || 'N/A'}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl col-span-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Address (D.No., Street, Area)</span>
                  <span>{selectedStudentDossier.address || 'Puttaparthi, Andhra Pradesh'}</span>
                </div>
                <div className="p-2.5 bg-amber-50 rounded-xl col-span-2 border border-amber-200 text-amber-950">
                  <div className="font-bold">Room & Seat: {selectedStudentDossier.roomNo} ({selectedStudentDossier.seatNo})</div>
                  <div className="text-[11px] text-slate-600">Venue: {selectedStudentDossier.examCenter} • {selectedStudentDossier.examDate}</div>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => {
                    const st = selectedStudentDossier;
                    setSelectedStudentDossier(null);
                    onViewHallTicket && onViewHallTicket(st);
                  }}
                  className="flex-1 py-2.5 bg-navy-950 text-white font-bold rounded-xl text-xs hover:bg-navy-900 transition flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Admit Card</span>
                </button>
                <button
                  onClick={() => setSelectedStudentDossier(null)}
                  className="px-5 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-200 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Enter/Edit Marks */}
        {marksModalStudent && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full p-4 sm:p-8 border border-slate-200 shadow-2xl space-y-4 sm:space-y-6 max-h-[92vh] overflow-y-auto my-auto">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    Evaluation Board
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-navy-950 mt-1">
                    Enter Marks for {marksModalStudent.fullName}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">{marksModalStudent.id}</p>
                </div>
                <button
                  onClick={() => setMarksModalStudent(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveMarks} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mathematics Score (Out of 80)</label>
                  <input
                    type="number"
                    max="80"
                    min="0"
                    value={marksForm.maths}
                    onChange={(e) => setMarksForm({ ...marksForm, maths: e.target.value })}
                    required
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Physics Score (Out of 40)</label>
                  <input
                    type="number"
                    max="40"
                    min="0"
                    value={marksForm.physics}
                    onChange={(e) => setMarksForm({ ...marksForm, physics: e.target.value })}
                    required
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Chemistry Score (Out of 40)</label>
                  <input
                    type="number"
                    max="40"
                    min="0"
                    value={marksForm.chemistry}
                    onChange={(e) => setMarksForm({ ...marksForm, chemistry: e.target.value })}
                    required
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Merit Rank (Optional - Top 10 Only)</label>
                  <input
                    type="number"
                    min="1"
                    value={marksForm.rank}
                    onChange={(e) => setMarksForm({ ...marksForm, rank: e.target.value })}
                    placeholder="e.g. 1, 2, 3"
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-950 flex items-center justify-between">
                  <span>Aggregate Subject Total:</span>
                  <strong className="text-sm font-black text-navy-950">
                    {((marksForm.maths !== '' ? parseInt(marksForm.maths, 10) : 0) +
                      (marksForm.physics !== '' ? parseInt(marksForm.physics, 10) : 0) +
                      (marksForm.chemistry !== '' ? parseInt(marksForm.chemistry, 10) : 0))} / 160
                  </strong>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-navy-950 text-white font-bold rounded-xl text-xs hover:bg-navy-900 transition flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>Save & Publish to Neon DB</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setMarksModalStudent(null)}
                    className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-200 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Quick Walk-in Add */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-8 border border-slate-200 shadow-2xl space-y-4 sm:space-y-6 max-h-[92vh] overflow-y-auto my-auto">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full">
                    Coordinator Desk
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-navy-950 mt-1">Add Offline / Walk-in Candidate</h3>
                  <p className="text-[11px] sm:text-xs text-slate-500">Candidate will be inserted directly into Neon PostgreSQL.</p>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Name of the Student *</label>
                    <input
                      type="text"
                      required
                      value={addForm.fullName}
                      onChange={(e) => setAddForm({ ...addForm, fullName: e.target.value })}
                      placeholder="Student full name"
                      className="w-full p-2.5 border rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Father/Mother/Guardian Name</label>
                    <input
                      type="text"
                      value={addForm.guardianName}
                      onChange={(e) => setAddForm({ ...addForm, guardianName: e.target.value })}
                      placeholder="Guardian name"
                      className="w-full p-2.5 border rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Name of the Course Pursuing *</label>
                    <select
                      value={addForm.coursePursuing}
                      onChange={(e) => setAddForm({ ...addForm, coursePursuing: e.target.value })}
                      className="w-full p-2.5 border rounded-xl bg-white"
                    >
                      <option value="Class 12 - MPC (B.Tech Track)">Class 12 - MPC (B.Tech Track)</option>
                      <option value="Class 12 - Any Stream (BBA Track)">Class 12 - Any Stream (BBA Track)</option>
                      <option value="Degree Final Year (All Streams Track)">Degree Final Year (MBA Track)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Name of the Institution *</label>
                    <input
                      type="text"
                      required
                      value={addForm.institutionName}
                      onChange={(e) => setAddForm({ ...addForm, institutionName: e.target.value })}
                      placeholder="College / School Name"
                      className="w-full p-2.5 border rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Student Mobile No. *</label>
                    <input
                      type="tel"
                      required
                      value={addForm.studentPhone}
                      onChange={(e) => setAddForm({ ...addForm, studentPhone: e.target.value })}
                      placeholder="10-digit candidate mobile"
                      className="w-full p-2.5 border rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Parent's Mobile No</label>
                    <input
                      type="tel"
                      value={addForm.parentPhone}
                      onChange={(e) => setAddForm({ ...addForm, parentPhone: e.target.value })}
                      placeholder="10-digit parent mobile"
                      className="w-full p-2.5 border rounded-xl"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">e-mail ID</label>
                    <input
                      type="email"
                      value={addForm.email}
                      onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                      placeholder="student@example.com (optional)"
                      className="w-full p-2.5 border rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">ADDRESS: D.No.</label>
                    <input
                      type="text"
                      value={addForm.doorNo}
                      onChange={(e) => setAddForm({ ...addForm, doorNo: e.target.value })}
                      placeholder="e.g. 12-4-56"
                      className="w-full p-2.5 border rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Street Name</label>
                    <input
                      type="text"
                      value={addForm.streetName}
                      onChange={(e) => setAddForm({ ...addForm, streetName: e.target.value })}
                      placeholder="e.g. Main Road"
                      className="w-full p-2.5 border rounded-xl"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Area / Location</label>
                    <input
                      type="text"
                      value={addForm.areaLocation}
                      onChange={(e) => setAddForm({ ...addForm, areaLocation: e.target.value })}
                      placeholder="e.g. Puttaparthi"
                      className="w-full p-2.5 border rounded-xl"
                    />
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs transition shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Save & Generate Hall Ticket</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-200 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Backend API Settings Modal */}
        {showApiSettings && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-8 space-y-4 sm:space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto my-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base sm:text-lg font-black text-navy-950">Backend API Connection</h3>
                <button onClick={() => setShowApiSettings(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                If your backend is deployed on Render, Railway, or another service, specify the live Backend URL below. All student registrations, hall ticket generation, and mark entries will route to this server.
              </p>

              <form onSubmit={(e) => {
                e.preventDefault();
                if (customApiUrl && customApiUrl.trim()) {
                  localStorage.setItem('sps_api_url', customApiUrl.trim());
                } else {
                  localStorage.removeItem('sps_api_url');
                }
                alert('Backend API URL saved! The portal will now reload.');
                window.location.reload();
              }} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Backend API Base URL:
                  </label>
                  <input
                    type="url"
                    placeholder="e.g. https://sai-prudent-backend.onrender.com"
                    value={customApiUrl}
                    onChange={(e) => setCustomApiUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-navy-900 outline-hidden font-mono"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Leave blank to use default relative / same-domain routing or Vercel proxy.
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowApiSettings(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-black bg-navy-950 hover:bg-navy-900 text-white transition shadow-xs"
                  >
                    Save & Reconnect
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* SEATING ALLOTMENT PRINT CENTER MODAL */}
        {showSeatingModal && (
          <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs z-50 overflow-y-auto flex items-start justify-center p-1.5 sm:p-6 print:p-0 print:static print:bg-white">
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl w-full max-w-6xl my-2 sm:my-4 print:my-0 print:border-none print:shadow-none print:max-w-none print:w-full overflow-hidden print-modal-wrap">
              
              {/* MODAL CONTROL HEADER (Hidden when printing) */}
              <div className="p-4 sm:p-6 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 print:hidden">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
                    <Printer className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                      <span>Seating Allotment Printing Center</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-slate-950">
                        {seatingFilterMode === 'PRESENT_ONLY' ? 'Present Only' : 'All Registered'}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Print official room door rosters, invigilator sheets, and desk stickers for exam day.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex-1 md:flex-initial px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print This Roster (Ctrl+P)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSeatingModal(false)}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition cursor-pointer shrink-0"
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* CONTROLS & FILTER BAR (Hidden when printing) */}
              <div className="p-3 sm:p-5 bg-slate-50 border-b border-slate-200 space-y-3 sm:space-y-4 print:hidden">
                {/* Attendance Filter Mode Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-600">Filter Mode:</span>
                    <div className="inline-flex rounded-xl p-1 bg-slate-200/80 border border-slate-300/80">
                      <button
                        type="button"
                        onClick={() => setSeatingFilterMode('PRESENT_ONLY')}
                        className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                          seatingFilterMode === 'PRESENT_ONLY'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'text-slate-700 hover:text-slate-950'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Present Only ({presentCount})</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSeatingFilterMode('ALL')}
                        className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                          seatingFilterMode === 'ALL'
                            ? 'bg-navy-950 text-white shadow-xs'
                            : 'text-slate-700 hover:text-slate-950'
                        }`}
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>All Registered ({totalCount})</span>
                      </button>
                    </div>
                  </div>

                  {/* Auto-Consolidate Button */}
                  <button
                    type="button"
                    onClick={handleConsolidatePresentSeats}
                    className="w-full sm:w-auto px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    title="Pack present candidates sequentially into Room 101, 102... with zero empty desk gaps for absentees"
                  >
                    <Zap className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
                    <span>Auto-Consolidate Seats (No Gaps)</span>
                  </button>
                </div>

                {/* Gate Rapid Check-in Strip */}
                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                    <span className="font-bold text-navy-950 flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-amber-500" />
                      <span>Campus Gate Rapid Check-in:</span>
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-400">
                      Quickly mark students present as they enter the campus
                    </span>
                  </div>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Type Candidate Name, Hall Ticket No, Roll No, or Phone..."
                      value={gateSearchQuery}
                      onChange={(e) => setGateSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-navy-950 outline-hidden"
                    />
                  </div>

                  {/* Search Results Strip */}
                  {gateSearchFiltered.length > 0 && (
                    <div className="max-h-40 overflow-y-auto divide-y divide-slate-100 border border-slate-100 rounded-xl bg-slate-50 mt-1">
                      {gateSearchFiltered.slice(0, 5).map((candidate) => {
                        const isPresent = candidate.attendance === 'Present';
                        return (
                          <div
                            key={candidate.id}
                            className="p-2 sm:px-3 flex items-center justify-between gap-2 text-xs hover:bg-white transition"
                          >
                            <div className="min-w-0">
                              <div className="font-bold text-slate-900 truncate">
                                {candidate.name}{' '}
                                <span className="font-mono text-[11px] text-slate-500">
                                  ({candidate.rollNo || candidate.hallTicketNo})
                                </span>
                              </div>
                              <div className="text-[10px] text-slate-500">
                                {candidate.stream} • Current: {candidate.roomNo || 'Unassigned'} / {candidate.seatNo || 'No Seat'}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => onToggleAttendance && onToggleAttendance(candidate.id, isPresent ? 'Absent' : 'Present')}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition cursor-pointer shrink-0 flex items-center gap-1 ${
                                isPresent
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-red-100 hover:text-red-700'
                                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                              }`}
                            >
                              <Check className="w-3 h-3" />
                              <span>{isPresent ? 'Present ✓' : 'Mark Present'}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Print Layout Tabs & Room Filter */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 w-full sm:w-auto flex-nowrap">
                    <button
                      type="button"
                      onClick={() => setSeatingActiveTab('ROOM_DOOR')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                        seatingActiveTab === 'ROOM_DOOR'
                          ? 'bg-navy-950 text-white shadow-xs'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <span>🚪 Room Door Chart</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSeatingActiveTab('INVIGILATOR')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                        seatingActiveTab === 'INVIGILATOR'
                          ? 'bg-navy-950 text-white shadow-xs'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <span>✍️ Invigilator Sheet</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSeatingActiveTab('DESK_SLIPS')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                        seatingActiveTab === 'DESK_SLIPS'
                          ? 'bg-navy-950 text-white shadow-xs'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <span>🏷️ Desk Slips</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSeatingActiveTab('NOTICE_BOARD')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                        seatingActiveTab === 'NOTICE_BOARD'
                          ? 'bg-navy-950 text-white shadow-xs'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <span>📋 Gate Master</span>
                    </button>
                  </div>

                  {/* Room Filter Dropdown */}
                  <div className="flex items-center justify-between sm:justify-start gap-1.5 w-full sm:w-auto">
                    <span className="text-xs font-bold text-slate-500 shrink-0">Room:</span>
                    <select
                      value={seatingSelectedRoom}
                      onChange={(e) => setSeatingSelectedRoom(e.target.value)}
                      className="flex-1 sm:flex-initial px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-navy-950 outline-hidden"
                    >
                      <option value="ALL">All Rooms ({activeRoomsList.length} Active)</option>
                      {rooms.map((r) => {
                        const count = (candidatesByRoom[r.roomNo] || []).length;
                        return (
                          <option key={r.roomNo} value={r.roomNo}>
                            {r.roomNo} ({count} candidates)
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>

              {/* PRINTABLE CONTENT BODY */}
              <div className="p-6 sm:p-10 bg-white min-h-[500px]">
                {seatingCandidates.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <Users className="w-12 h-12 text-slate-300 mx-auto" />
                    <h4 className="text-base font-bold text-slate-700">
                      No Candidates Match This Filter
                    </h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      {seatingFilterMode === 'PRESENT_ONLY'
                        ? 'No candidates have been marked "Present" yet. Use the Gate Rapid Check-in search above or the Candidate Registrations table to mark students present as they arrive.'
                        : 'No candidate registrations found.'}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* TAB 1 & 2: ROOM DOOR CHART & INVIGILATOR SIGNATURE SHEET */}
                    {(seatingActiveTab === 'ROOM_DOOR' || seatingActiveTab === 'INVIGILATOR') && (
                      <div className="space-y-12">
                        {(seatingSelectedRoom === 'ALL'
                          ? activeRoomsList
                          : rooms.filter((r) => r.roomNo === seatingSelectedRoom)
                        ).map((room, roomIdx) => {
                          const roomCandidates = candidatesByRoom[room.roomNo] || [];
                          if (roomCandidates.length === 0) return null;

                          return (
                            <div
                              key={room.roomNo}
                              className={`p-6 sm:p-8 bg-white border-2 border-slate-900 rounded-2xl space-y-6 ${
                                roomIdx > 0 ? 'page-break' : ''
                              }`}
                            >
                              {/* Institutional Header */}
                              <div className="text-center pb-4 border-b-2 border-slate-900 space-y-1">
                                <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950">
                                  Sai Prudent Scholarship Examination 2026
                                </h1>
                                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                  Sanskrithi School of Engineering & Sanskrithi School of Business • Puttaparthi
                                </p>
                                <div className="inline-block px-3 py-1 mt-1 bg-slate-950 text-white text-xs font-black uppercase tracking-widest rounded-md">
                                  {seatingActiveTab === 'ROOM_DOOR'
                                    ? 'Official Room Door Seating Allotment Chart'
                                    : 'Invigilator Examination Attendance & Verification Record'}
                                </div>
                              </div>

                              {/* Room & Invigilator Meta Info */}
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-100 rounded-xl border border-slate-300 text-xs">
                                <div>
                                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Room Number:</span>
                                  <span className="font-black text-slate-950 text-sm">{room.roomNo}</span>
                                </div>
                                <div>
                                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Location / Block:</span>
                                  <span className="font-bold text-slate-800 truncate block">{room.block || 'Engineering Block'}</span>
                                </div>
                                <div>
                                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Invigilator:</span>
                                  <span className="font-bold text-slate-800 truncate block">{room.invigilator || 'Faculty In-Charge'}</span>
                                </div>
                                <div>
                                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Candidates Allotted:</span>
                                  <span className="font-black text-emerald-800">{roomCandidates.length} Candidates</span>
                                </div>
                              </div>

                              {/* Candidate Allotment Table */}
                              <table className="print-clean-table text-xs w-full text-left">
                                <thead>
                                  <tr className="bg-slate-200 text-slate-950 font-black">
                                    <th className="w-12 text-center">S.No</th>
                                    <th className="w-20 text-center">Seat No</th>
                                    <th className="w-32">Hall Ticket / Roll No</th>
                                    <th>Candidate Full Name</th>
                                    <th className="w-40">Stream / Track</th>
                                    {seatingActiveTab === 'INVIGILATOR' && (
                                      <>
                                        <th className="w-24 text-center">Booklet No</th>
                                        <th className="w-24 text-center">OMR No</th>
                                      </>
                                    )}
                                    <th className="w-28 text-center">
                                      {seatingActiveTab === 'ROOM_DOOR' ? 'Candidate Sign' : 'Signature'}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {roomCandidates.map((s, idx) => (
                                    <tr key={s.id || idx} className="hover:bg-slate-50">
                                      <td className="text-center font-bold text-slate-700">{idx + 1}</td>
                                      <td className="text-center font-black text-slate-950 bg-slate-50">
                                        {s.seatNo || `Bench ${idx + 1}`}
                                      </td>
                                      <td className="font-mono font-bold text-slate-900">
                                        {s.hallTicketNo || s.rollNo || 'N/A'}
                                      </td>
                                      <td className="font-bold text-slate-900 uppercase">{s.name}</td>
                                      <td className="text-[11px] text-slate-700">{s.stream}</td>
                                      {seatingActiveTab === 'INVIGILATOR' && (
                                        <>
                                          <td className="border border-slate-400 text-center text-slate-300 font-mono text-[10px]">
                                            __________
                                          </td>
                                          <td className="border border-slate-400 text-center text-slate-300 font-mono text-[10px]">
                                            __________
                                          </td>
                                        </>
                                      )}
                                      <td className="border border-slate-400 h-9"></td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>

                              {/* Official Sign-off Box */}
                              <div className="pt-8 grid grid-cols-3 gap-6 text-center text-xs">
                                <div>
                                  <div className="border-t-2 border-slate-900 pt-2 font-bold text-slate-950">
                                    Room Invigilator Signature
                                  </div>
                                  <span className="text-[10px] text-slate-500">Name: {room.invigilator}</span>
                                </div>
                                <div>
                                  <div className="border-t-2 border-slate-900 pt-2 font-bold text-slate-950">
                                    Chief Superintendent
                                  </div>
                                  <span className="text-[10px] text-slate-500">Sanskrithi Center Code: SPS-01</span>
                                </div>
                                <div>
                                  <div className="border-t-2 border-slate-900 pt-2 font-bold text-slate-950">
                                    Official Center Seal
                                  </div>
                                  <span className="text-[10px] text-slate-500">Date: 26 April 2026</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* TAB 3: DESK / BENCH STICKERS (6 per sheet for cutting) */}
                    {seatingActiveTab === 'DESK_SLIPS' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {seatingCandidates.map((s, idx) => (
                          <div
                            key={s.id || idx}
                            className="p-4 rounded-xl border-2 border-dashed border-slate-900 bg-white space-y-3 print-desk-slip"
                          >
                            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                                Sai Prudent Scholarship 2026
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-black text-[10px]">
                                {s.roomNo || 'Room 101'}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-[10px] uppercase font-bold text-slate-400 block">Candidate Name:</span>
                                <span className="text-base font-black text-slate-950 uppercase">{s.name}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] uppercase font-bold text-slate-400 block">Seat / Bench:</span>
                                <span className="text-xl font-black text-emerald-800">{s.seatNo || `Bench ${idx + 1}`}</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
                              <div>
                                <span className="text-[10px] uppercase font-bold text-slate-400 block">Hall Ticket No:</span>
                                <span className="font-mono font-bold text-slate-900">{s.hallTicketNo || s.rollNo}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] uppercase font-bold text-slate-400 block">Stream:</span>
                                <span className="font-bold text-slate-700">{s.stream}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TAB 4: CAMPUS GATE MASTER NOTICE */}
                    {seatingActiveTab === 'NOTICE_BOARD' && (
                      <div className="space-y-6">
                        <div className="text-center pb-4 border-b-2 border-slate-900 space-y-1">
                          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950">
                            Sai Prudent Scholarship Examination 2026
                          </h1>
                          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                            Campus Gate Master Seating Allotment Notice • For Candidate Reference
                          </p>
                          <div className="inline-block px-3 py-1 mt-1 bg-navy-950 text-white text-xs font-black uppercase tracking-widest rounded-md">
                            Alphabetical / Sequential Master Register ({seatingCandidates.length} Candidates)
                          </div>
                        </div>

                        <table className="print-clean-table text-xs w-full text-left">
                          <thead>
                            <tr className="bg-slate-200 text-slate-950 font-black">
                              <th className="w-12 text-center">S.No</th>
                              <th>Candidate Name</th>
                              <th className="w-36">Hall Ticket / Roll No</th>
                              <th>Course / Stream</th>
                              <th className="w-28 text-center font-black bg-slate-300">Room No</th>
                              <th className="w-28 text-center font-black bg-slate-300">Bench / Seat</th>
                              <th className="w-24 text-center">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[...seatingCandidates]
                              .sort((a, b) => (a.name || '').localeCompare(b.name || ''))
                              .map((s, idx) => (
                                <tr key={s.id || idx} className="hover:bg-slate-50">
                                  <td className="text-center font-bold text-slate-600">{idx + 1}</td>
                                  <td className="font-black text-slate-950 uppercase">{s.name}</td>
                                  <td className="font-mono font-bold text-slate-800">{s.hallTicketNo || s.rollNo}</td>
                                  <td className="text-slate-700">{s.stream}</td>
                                  <td className="text-center font-black text-navy-950 bg-slate-50">
                                    {s.roomNo || 'Unassigned'}
                                  </td>
                                  <td className="text-center font-black text-emerald-800 bg-slate-50">
                                    {s.seatNo || 'N/A'}
                                  </td>
                                  <td className="text-center">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                      s.attendance === 'Present'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-slate-100 text-slate-600'
                                    }`}>
                                      {s.attendance === 'Present' ? 'Present' : 'Registered'}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}


