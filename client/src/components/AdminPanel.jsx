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
  ArrowRight
} from 'lucide-react';

export default function AdminPanel({
  students,
  rooms,
  onRefresh,
  onDeleteStudent,
  onToggleAttendance,
  onUpdateMarks,
  onViewHallTicket,
  onAddStudent
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
      const res = await fetch('/api/admin/login', {
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
      s.marks?.maths || 0,
      s.marks?.physics || 0,
      s.marks?.chemistry || 0,
      s.marks?.total || 0,
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
      await onUpdateMarks(marksModalStudent.id, marksForm);
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
  const evaluatedCount = students.filter((s) => s.evaluated && s.marks?.total > 0).length;

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-navy-50 text-navy-950 font-extrabold text-xs uppercase rounded-full border border-navy-200/80">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Super Admin Console</span>
              <span>•</span>
              <span className="text-emerald-700">Neon PostgreSQL Connected</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 mt-1.5">
              Candidate Registrations & Examination Controller
            </h2>
            <p className="text-xs text-slate-500">
              Review live registrations from Neon DB, manage room allocations, enter evaluation marks, and export data.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex-1 md:flex-initial px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs transition shadow-xs flex items-center justify-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add Walk-In Candidate</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="flex-1 md:flex-initial px-4 py-2.5 bg-navy-950 hover:bg-navy-900 text-white font-bold rounded-xl text-xs transition shadow-xs flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3.5 py-2.5 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 font-bold rounded-xl text-xs transition flex items-center gap-1"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Real-Time Database Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-navy-300 transition">
            <span className="text-[10px] text-slate-400 uppercase font-black">Total In Neon DB</span>
            <div className="text-2xl font-black text-navy-950 mt-1">{totalCount}</div>
            <span className="text-[10px] text-slate-500 font-medium">Registered Students</span>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-300 transition">
            <span className="text-[10px] text-blue-700 uppercase font-black">B.Tech (MPC)</span>
            <div className="text-2xl font-black text-blue-900 mt-1">{mpcCount}</div>
            <span className="text-[10px] text-slate-500 font-medium">Engineering Track</span>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-amber-300 transition">
            <span className="text-[10px] text-amber-700 uppercase font-black">BBA Stream</span>
            <div className="text-2xl font-black text-amber-900 mt-1">{bbaCount}</div>
            <span className="text-[10px] text-slate-500 font-medium">Management Track</span>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-purple-300 transition">
            <span className="text-[10px] text-purple-700 uppercase font-black">Degree Final Yr</span>
            <div className="text-2xl font-black text-purple-900 mt-1">{degreeCount}</div>
            <span className="text-[10px] text-slate-500 font-medium">Master's Track</span>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-300 transition">
            <span className="text-[10px] text-emerald-700 uppercase font-black">Present Verified</span>
            <div className="text-2xl font-black text-emerald-800 mt-1">{presentCount}</div>
            <span className="text-[10px] text-slate-500 font-medium">{totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0}% Attendance</span>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-indigo-300 transition">
            <span className="text-[10px] text-indigo-700 uppercase font-black">Evaluated</span>
            <div className="text-2xl font-black text-indigo-900 mt-1">{evaluatedCount}</div>
            <span className="text-[10px] text-slate-500 font-medium">Scorecards Active</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between text-xs">
          <div className="w-full sm:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by candidate name, SPS ID, phone, college..."
              className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <select
              value={filterStream}
              onChange={(e) => setFilterStream(e.target.value)}
              className="p-2.5 border border-slate-300 rounded-xl bg-white font-semibold text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Academic Streams</option>
              <option value="MPC">Class 12 - MPC (B.Tech)</option>
              <option value="BBA">Class 12 - Any Stream (BBA)</option>
              <option value="Degree">Degree Final Year</option>
            </select>

            <select
              value={filterAttendance}
              onChange={(e) => setFilterAttendance(e.target.value)}
              className="p-2.5 border border-slate-300 rounded-xl bg-white font-semibold text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Attendance</option>
              <option value="Present">Present Only</option>
              <option value="Absent">Absent Only</option>
            </select>

            {onRefresh && (
              <button
                onClick={onRefresh}
                className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition flex items-center gap-1.5"
                title="Reload from Neon DB"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                <span>Refresh</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Registrations Table */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex justify-between items-center text-xs">
            <span className="font-black text-navy-950 uppercase tracking-wider">
              Registered Candidates Database ({filteredStudents.length} Records)
            </span>
            <span className="text-slate-400 font-mono text-[11px]">Database: Neon PostgreSQL</span>
          </div>

          <div className="overflow-x-auto">
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
                          {st.evaluated && st.marks ? (
                            <div>
                              <span className="font-bold text-navy-950">{st.marks.total} / 160</span>
                              {st.rank && <span className="ml-1 text-[10px] font-black text-amber-700">Rank #{st.rank}</span>}
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-400 italic">Not evaluated</span>
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
                                  maths: st.marks?.maths || 0,
                                  physics: st.marks?.physics || 0,
                                  chemistry: st.marks?.chemistry || 0,
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
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6">
              <div className="flex justify-between items-start border-b pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full">
                    Candidate Dossier
                  </span>
                  <h3 className="text-xl font-black text-navy-950 mt-1.5">{selectedStudentDossier.fullName}</h3>
                  <div className="font-mono text-xs text-slate-500">{selectedStudentDossier.id} • Roll: {selectedStudentDossier.hallTicketNo}</div>
                </div>
                <button
                  onClick={() => setSelectedStudentDossier(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition"
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
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    Evaluation Board
                  </span>
                  <h3 className="text-xl font-black text-navy-950 mt-1.5">
                    Enter Marks for {marksModalStudent.fullName}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">{marksModalStudent.id}</p>
                </div>
                <button
                  onClick={() => setMarksModalStudent(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
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

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-950">
                  Total Calculated: <strong>{parseInt(marksForm.maths || 0, 10) + parseInt(marksForm.physics || 0, 10) + parseInt(marksForm.chemistry || 0, 10)} / 160</strong>
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
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full">
                    Coordinator Desk
                  </span>
                  <h3 className="text-xl font-black text-navy-950 mt-1.5">Add Offline / Walk-in Candidate</h3>
                  <p className="text-xs text-slate-500">Candidate will be inserted directly into Neon PostgreSQL.</p>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
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

      </div>
    </section>
  );
}


