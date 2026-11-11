/**
 * Sai Prudent Scholarship Program (SPS) - Main Application Controller
 * Features:
 * - Dynamic Page Routing / View Switching
 * - Online Student Registration (Channel 1) with instant SPS ID Generation
 * - Hall Ticket Generation & Download (PDF/Print ready)
 * - Exam Attendance & Room Allotment Real-Time Management
 * - Results Publication & Merit List with Digital Certificate
 * - Offline / Telecalling Integration Simulator (Channel 2)
 */

// Application State
const SPS_STORAGE_KEY = "sai_prudent_students_v1";

class SPSApp {
  constructor() {
    this.students = this.loadStudents();
    this.rooms = ROOMS;
    this.activeView = "home";
    this.currentHallTicketStudent = this.students[0]; // Default preview
    this.currentResultStudent = this.students[0]; // Default preview
    this.attendanceFilter = "ALL";
    this.searchAttendanceQuery = "";

    this.init();
  }

  loadStudents() {
    try {
      const stored = localStorage.getItem(SPS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Could not load from localStorage, using initial dataset.", e);
    }
    return [...INITIAL_STUDENTS];
  }

  saveStudents() {
    try {
      localStorage.setItem(SPS_STORAGE_KEY, JSON.stringify(this.students));
    } catch (e) {
      console.warn("Could not save to localStorage.", e);
    }
  }

  init() {
    this.setupNavigation();
    this.setupRegistrationForm();
    this.setupHallTicketSearch();
    this.setupAttendanceManager();
    this.setupResultsSearch();
    this.renderTopAnnouncements();
    this.renderFaqs();
    this.renderRoomsList();
    this.renderToppersList();
    this.updateStatsCounters();

    // Render default hall ticket and result previews
    this.renderHallTicket(this.students[0]);
    this.renderResultCard(this.students[0]);

    // Check hash for direct routing (e.g. #register, #hallticket, #about)
    const hash = window.location.hash.replace("#", "");
    if (hash && ["home", "about", "exam", "benefits", "register", "hallticket", "attendance", "results"].includes(hash)) {
      this.switchView(hash);
    } else {
      this.switchView("home");
    }
  }

  setupNavigation() {
    const navLinks = document.querySelectorAll("[data-nav-target]");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.getAttribute("data-nav-target");
        this.switchView(target);
        window.location.hash = target;
        // Scroll to top of view
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });

    // Mobile nav toggle if present
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileNav = document.getElementById("mobile-nav");
    if (mobileMenuBtn && mobileNav) {
      mobileMenuBtn.addEventListener("click", () => {
        mobileNav.classList.toggle("hidden");
      });
    }
  }

  switchView(viewName) {
    this.activeView = viewName;

    // Update active nav links
    document.querySelectorAll("[data-nav-target]").forEach((link) => {
      if (link.getAttribute("data-nav-target") === viewName) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Show only the selected view section
    document.querySelectorAll(".view-section").forEach((sec) => {
      if (sec.id === `view-${viewName}`) {
        sec.classList.remove("hidden");
      } else {
        sec.classList.add("hidden");
      }
    });

    // Refresh views if needed
    if (viewName === "attendance") {
      this.renderAttendanceTable();
    } else if (viewName === "results") {
      this.renderToppersList();
    }

    // Close mobile nav
    const mobileNav = document.getElementById("mobile-nav");
    if (mobileNav && !mobileNav.classList.contains("hidden")) {
      mobileNav.classList.add("hidden");
    }
  }

  updateStatsCounters() {
    const totalReg = this.students.length;
    const evaluated = this.students.filter((s) => s.evaluated).length;
    const present = this.students.filter((s) => s.attendance === "Present").length;

    const elTotal = document.getElementById("stat-total-students");
    if (elTotal) elTotal.textContent = totalReg.toLocaleString();

    const elEval = document.getElementById("stat-evaluated-students");
    if (elEval) elEval.textContent = evaluated.toLocaleString();

    const elPresent = document.getElementById("stat-present-students");
    if (elPresent) elPresent.textContent = present.toLocaleString();
  }

  setupRegistrationForm() {
    const form = document.getElementById("online-registration-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fullName = document.getElementById("reg-fullname").value.trim();
      const fatherName = document.getElementById("reg-fathername").value.trim();
      const dob = document.getElementById("reg-dob").value;
      const gender = document.getElementById("reg-gender").value;
      const phone = document.getElementById("reg-phone").value.trim();
      const whatsapp = document.getElementById("reg-whatsapp").value.trim() || phone;
      const email = document.getElementById("reg-email").value.trim();
      const aadhaar = document.getElementById("reg-aadhaar").value.trim();
      const stream = document.getElementById("reg-stream").value;
      const targetProgram = document.getElementById("reg-target-program").value;
      const collegeName = document.getElementById("reg-college").value.trim();
      const district = document.getElementById("reg-district").value.trim();
      const address = document.getElementById("reg-address").value.trim();

      if (!fullName || !phone || !stream || !collegeName) {
        alert("Please complete all required fields (*).");
        return;
      }

      // Generate unique SPS ID
      const newIdNumber = 1000 + this.students.length + 1;
      const newSpsId = `SPS-2025-${newIdNumber}`;

      // Assign room automatically based on stream
      let assignedRoom = "Room 101 (Engineering Block A)";
      let assignedSeat = `R101-${String(this.students.length + 1).padStart(2, "0")}`;
      if (stream.includes("BBA") || stream.includes("Degree")) {
        assignedRoom = "Room 201 (Business School Block)";
        assignedSeat = `R201-${String(this.students.length + 1).padStart(2, "0")}`;
      } else if (this.students.length % 2 === 1) {
        assignedRoom = "Room 102 (Engineering Block A)";
        assignedSeat = `R102-${String(this.students.length + 1).padStart(2, "0")}`;
      }

      const newStudent = {
        id: newSpsId,
        fullName,
        fatherName,
        dob,
        gender,
        phone,
        whatsapp,
        email,
        aadhaar: aadhaar ? `XXXX-XXXX-${aadhaar.slice(-4)}` : "XXXX-XXXX-0000",
        category: "General / EWS",
        stream,
        targetProgram,
        collegeName,
        hallTicketNo: `25010${newIdNumber}`,
        address: address || "Puttaparthi, Andhra Pradesh",
        district: district || "Sri Sathya Sai",
        channel: "Online (Channel 1)",
        registrationDate: new Date().toISOString().split("T")[0],
        examCenter: "Sanskrithi School of Engineering & Business, Puttaparthi",
        examDate: "Sunday, April 20, 2025",
        examTime: "10:00 AM – 12:30 PM",
        reportingTime: "08:45 AM",
        roomNo: assignedRoom,
        seatNo: assignedSeat,
        attendance: "Present",
        attendanceTimestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        evaluated: true,
        marks: {
          maths: Math.floor(Math.random() * 25) + 55,
          physics: Math.floor(Math.random() * 12) + 28,
          chemistry: Math.floor(Math.random() * 12) + 28,
          total: 0
        },
        rank: null,
        prize: "50% Hostel/Bus Fee Waiver + Paid Internship Opportunity",
        qualified: true
      };

      newStudent.marks.total = newStudent.marks.maths + newStudent.marks.physics + newStudent.marks.chemistry;

      this.students.unshift(newStudent);
      this.saveStudents();
      this.updateStatsCounters();

      // Show Confirmation Card
      this.showRegistrationSuccessModal(newStudent);
      form.reset();
    });
  }

  showRegistrationSuccessModal(student) {
    const modal = document.getElementById("reg-success-modal");
    if (!modal) return;

    document.getElementById("modal-reg-id").textContent = student.id;
    document.getElementById("modal-student-name").textContent = student.fullName;
    document.getElementById("modal-stream").textContent = student.stream;
    document.getElementById("modal-room").textContent = student.roomNo;
    document.getElementById("modal-seat").textContent = student.seatNo;
    document.getElementById("modal-sms-msg").textContent = `Dear ${student.fullName}, your registration for SAI PRUDENT SCHOLARSHIP TEST 2025 is CONFIRMED. Reg ID: ${student.id}, Exam Date: ${student.examDate}, Venue: Sanskrithi Campus Puttaparthi. Download your Hall Ticket now. - Sanskrithi Educational Society`;

    modal.classList.remove("hidden");

    // Action button to jump to hall ticket
    const viewTicketBtn = document.getElementById("modal-view-ticket-btn");
    if (viewTicketBtn) {
      viewTicketBtn.onclick = () => {
        modal.classList.add("hidden");
        this.renderHallTicket(student);
        this.switchView("hallticket");
      };
    }

    const closeBtn = document.getElementById("modal-close-btn");
    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.classList.add("hidden");
      };
    }
  }

  setupHallTicketSearch() {
    const searchBtn = document.getElementById("btn-search-hallticket");
    const input = document.getElementById("input-hallticket-search");

    const doSearch = () => {
      const q = (input.value || "").trim().toLowerCase();
      if (!q) {
        alert("Please enter your Registration ID (e.g. SPS-2025-1001), Phone Number, or Name.");
        return;
      }

      const match = this.students.find(
        (s) =>
          s.id.toLowerCase() === q ||
          s.phone.toLowerCase() === q ||
          s.aadhaar.toLowerCase().includes(q) ||
          s.fullName.toLowerCase().includes(q)
      );

      if (match) {
        this.renderHallTicket(match);
      } else {
        alert(`No student record found matching "${input.value}". Please verify your details or register first.`);
      }
    };

    if (searchBtn) searchBtn.addEventListener("click", doSearch);
    if (input) {
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") doSearch();
      });
    }

    // Print Button
    const printBtn = document.getElementById("btn-print-hallticket");
    if (printBtn) {
      printBtn.addEventListener("click", () => {
        window.print();
      });
    }
  }

  renderHallTicket(student) {
    if (!student) return;
    this.currentHallTicketStudent = student;

    const fields = {
      "ht-sps-id": student.id,
      "ht-roll-no": student.hallTicketNo,
      "ht-full-name": student.fullName,
      "ht-father-name": student.fatherName || "N/A",
      "ht-dob": student.dob || "N/A",
      "ht-stream": student.stream,
      "ht-target": student.targetProgram || "B.Tech Engineering",
      "ht-college": student.collegeName,
      "ht-phone": student.phone,
      "ht-exam-center": student.examCenter,
      "ht-exam-date": student.examDate,
      "ht-exam-time": student.examTime,
      "ht-reporting-time": student.reportingTime,
      "ht-room-no": student.roomNo,
      "ht-seat-no": student.seatNo,
      "ht-channel": student.channel
    };

    for (const [id, val] of Object.entries(fields)) {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    }

    // Photo placeholder initial letter
    const photoBox = document.getElementById("ht-photo-box");
    if (photoBox) {
      photoBox.innerHTML = `
        <div class="w-full h-full bg-slate-100 border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-500 p-2 text-center">
          <svg class="w-10 h-10 mb-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          <span class="text-xs font-semibold text-slate-700">${student.fullName}</span>
          <span class="text-[10px] text-slate-400">PASSPORT PHOTO AFFIXED</span>
        </div>
      `;
    }
  }

  setupAttendanceManager() {
    // Room Filter buttons
    const filterContainer = document.getElementById("attendance-room-filters");
    if (filterContainer) {
      filterContainer.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-filter-room]");
        if (!btn) return;

        filterContainer.querySelectorAll("button").forEach((b) => b.classList.remove("active", "bg-navy-900", "text-white"));
        btn.classList.add("active", "bg-navy-900", "text-white");
        this.attendanceFilter = btn.getAttribute("data-filter-room");
        this.renderAttendanceTable();
      });
    }

    // Search input
    const searchInput = document.getElementById("attendance-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchAttendanceQuery = e.target.value.toLowerCase().trim();
        this.renderAttendanceTable();
      });
    }

    // Print attendance sheet
    const printAttendanceBtn = document.getElementById("btn-print-attendance");
    if (printAttendanceBtn) {
      printAttendanceBtn.addEventListener("click", () => {
        window.print();
      });
    }
  }

  renderAttendanceTable() {
    const tbody = document.getElementById("attendance-table-body");
    if (!tbody) return;

    let filtered = this.students.filter((s) => {
      // Room filter
      if (this.attendanceFilter !== "ALL") {
        if (!s.roomNo.includes(this.attendanceFilter)) return false;
      }
      // Search filter
      if (this.searchAttendanceQuery) {
        return (
          s.fullName.toLowerCase().includes(this.searchAttendanceQuery) ||
          s.id.toLowerCase().includes(this.searchAttendanceQuery) ||
          s.phone.includes(this.searchAttendanceQuery) ||
          s.roomNo.toLowerCase().includes(this.searchAttendanceQuery)
        );
      }
      return true;
    });

    tbody.innerHTML = "";

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-8 text-slate-400">
            No student records found matching the current filters.
          </td>
        </tr>
      `;
      return;
    }

    filtered.forEach((st, idx) => {
      const isPresent = st.attendance === "Present";
      const tr = document.createElement("tr");
      tr.className = "hover:bg-slate-50 transition border-b border-slate-200 text-sm";
      tr.innerHTML = `
        <td class="p-3 font-medium text-slate-700">${idx + 1}</td>
        <td class="p-3">
          <div class="font-bold text-slate-900">${st.fullName}</div>
          <div class="text-xs text-slate-500 font-mono">${st.id} • ${st.channel}</div>
        </td>
        <td class="p-3">
          <div class="text-xs font-semibold text-slate-700">${st.stream}</div>
          <div class="text-[11px] text-slate-500 truncate max-w-[200px]">${st.collegeName}</div>
        </td>
        <td class="p-3">
          <span class="inline-block px-2 py-0.5 text-xs bg-slate-100 rounded text-slate-800 font-medium">${st.roomNo.split("(")[0]}</span>
          <div class="text-xs font-mono text-slate-500 mt-0.5">Seat: ${st.seatNo}</div>
        </td>
        <td class="p-3 text-xs text-slate-600 font-mono">
          ${st.phone}
        </td>
        <td class="p-3">
          <span class="${isPresent ? 'badge-present' : 'badge-absent'}">
            <span class="w-2 h-2 rounded-full ${isPresent ? 'bg-emerald-600' : 'bg-red-600'}"></span>
            ${st.attendance || 'Pending'}
          </span>
          <div class="text-[10px] text-slate-400 mt-0.5">${st.attendanceTimestamp || '—'}</div>
        </td>
        <td class="p-3 text-right">
          <button class="toggle-attendance-btn px-3 py-1 text-xs rounded font-semibold transition ${
            isPresent ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'bg-emerald-600 text-white hover:bg-emerald-700'
          }" data-student-id="${st.id}">
            ${isPresent ? 'Mark Absent' : 'Mark Present'}
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Add event listeners for toggle buttons
    tbody.querySelectorAll(".toggle-attendance-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const studentId = btn.getAttribute("data-student-id");
        this.toggleStudentAttendance(studentId);
      });
    });

    // Update Attendance Summary Metrics
    const totalCount = filtered.length;
    const presentCount = filtered.filter((s) => s.attendance === "Present").length;
    const absentCount = totalCount - presentCount;
    const pct = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

    const elTotal = document.getElementById("att-summary-total");
    const elPres = document.getElementById("att-summary-present");
    const elAbs = document.getElementById("att-summary-absent");
    const elPct = document.getElementById("att-summary-pct");

    if (elTotal) elTotal.textContent = totalCount;
    if (elPres) elPres.textContent = presentCount;
    if (elAbs) elAbs.textContent = absentCount;
    if (elPct) elPct.textContent = `${pct}%`;
  }

  toggleStudentAttendance(studentId) {
    const student = this.students.find((s) => s.id === studentId);
    if (!student) return;

    if (student.attendance === "Present") {
      student.attendance = "Absent";
      student.attendanceTimestamp = null;
    } else {
      student.attendance = "Present";
      student.attendanceTimestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    this.saveStudents();
    this.renderAttendanceTable();
    this.updateStatsCounters();
  }

  setupResultsSearch() {
    const searchBtn = document.getElementById("btn-search-results");
    const input = document.getElementById("input-results-search");

    const doSearch = () => {
      const q = (input.value || "").trim().toLowerCase();
      if (!q) {
        alert("Please enter a Registration ID (e.g. SPS-2025-1001) or Hall Ticket number.");
        return;
      }

      const match = this.students.find(
        (s) =>
          s.id.toLowerCase() === q ||
          s.phone.toLowerCase() === q ||
          (s.hallTicketNo && s.hallTicketNo.toLowerCase() === q) ||
          s.fullName.toLowerCase().includes(q)
      );

      if (match) {
        this.renderResultCard(match);
      } else {
        alert(`No score sheet found for "${input.value}". Please check the registration number.`);
      }
    };

    if (searchBtn) searchBtn.addEventListener("click", doSearch);
    if (input) {
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") doSearch();
      });
    }

    // Print Merit Certificate
    const printCertBtn = document.getElementById("btn-print-certificate");
    if (printCertBtn) {
      printCertBtn.addEventListener("click", () => {
        window.print();
      });
    }
  }

  renderResultCard(student) {
    if (!student) return;
    this.currentResultStudent = student;

    const elCard = document.getElementById("results-display-card");
    if (!elCard) return;

    elCard.classList.remove("hidden");

    document.getElementById("res-student-name").textContent = student.fullName;
    document.getElementById("res-sps-id").textContent = student.id;
    document.getElementById("res-roll-no").textContent = student.hallTicketNo;
    document.getElementById("res-stream").textContent = student.stream;
    document.getElementById("res-college").textContent = student.collegeName;

    if (student.evaluated && student.marks) {
      document.getElementById("res-maths-marks").textContent = `${student.marks.maths} / 80`;
      document.getElementById("res-physics-marks").textContent = `${student.marks.physics} / 40`;
      document.getElementById("res-chemistry-marks").textContent = `${student.marks.chemistry} / 40`;
      document.getElementById("res-total-marks").textContent = `${student.marks.total} / 160`;
      
      const pct = Math.round((student.marks.total / 160) * 100);
      document.getElementById("res-pct").textContent = `${pct}% Score`;
      document.getElementById("res-rank").textContent = student.rank ? `Rank #${student.rank}` : "Qualified on Merit";
      document.getElementById("res-prize-info").textContent = student.prize || "50% Hostel & Bus Fee Waiver + Guaranteed Industry Internship";
      document.getElementById("res-status-badge").className = "inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-xs";
      document.getElementById("res-status-badge").innerHTML = `
        <svg class="w-4 h-4 text-emerald-700" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
        SCHOLARSHIP MERIT QUALIFIED
      `;

      // Update Printable Certificate
      this.updateCertificate(student);
    } else {
      document.getElementById("res-maths-marks").textContent = "Under Evaluation";
      document.getElementById("res-physics-marks").textContent = "Under Evaluation";
      document.getElementById("res-chemistry-marks").textContent = "Under Evaluation";
      document.getElementById("res-total-marks").textContent = "Pending";
      document.getElementById("res-pct").textContent = "Pending";
      document.getElementById("res-rank").textContent = "Under Review";
      document.getElementById("res-prize-info").textContent = "Answer sheet currently under official evaluation.";
      document.getElementById("res-status-badge").className = "inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-bold text-xs";
      document.getElementById("res-status-badge").textContent = "EVALUATION IN PROGRESS";
    }
  }

  updateCertificate(student) {
    const certStudentName = document.getElementById("cert-student-name");
    const certId = document.getElementById("cert-sps-id");
    const certRank = document.getElementById("cert-rank-display");
    const certCollege = document.getElementById("cert-college");
    const certReward = document.getElementById("cert-reward");

    if (certStudentName) certStudentName.textContent = student.fullName;
    if (certId) certId.textContent = `Registration ID: ${student.id} | Roll No: ${student.hallTicketNo}`;
    if (certRank) certRank.textContent = student.rank ? `SECURED STATE RANK #${student.rank}` : "AWARDED MERIT SCHOLARSHIP";
    if (certCollege) certCollege.textContent = `${student.collegeName} (${student.district})`;
    if (certReward) certReward.textContent = student.prize || "50% Hostel & Bus Fee Waiver + Paid Internship with Minimum Stipend";
  }

  renderToppersList() {
    const container = document.getElementById("toppers-podium-container");
    if (!container) return;

    // Filter top 3 students
    const toppers = this.students.filter((s) => s.rank && s.rank <= 3).sort((a, b) => a.rank - b.rank);

    container.innerHTML = toppers
      .map((t) => {
        const isGold = t.rank === 1;
        const isSilver = t.rank === 2;
        const isBronze = t.rank === 3;

        const badgeClass = isGold
          ? "podium-rank-1 text-amber-900 border-amber-300"
          : isSilver
          ? "podium-rank-2 text-slate-800 border-slate-300"
          : "podium-rank-3 text-orange-950 border-orange-300";

        const prizeIcon = isGold
          ? "💻 Free High-Performance Laptop"
          : isSilver
          ? "📱 Free Samsung Galaxy Tablet"
          : "📱 Free Smart Tablet & Tech Kit";

        const ribbon = isGold ? "🥇 1ST RANK TOPPER" : isSilver ? "🥈 2ND RANK TOPPER" : "🥉 3RD RANK TOPPER";

        return `
          <div class="podium-card p-6 ${badgeClass} shadow-md flex flex-col justify-between">
            <div>
              <div class="inline-block px-3 py-1 rounded-full text-xs font-extrabold tracking-wider bg-white shadow-sm mb-3">
                ${ribbon}
              </div>
              <h3 class="text-xl font-black text-slate-900 mb-1">${t.fullName}</h3>
              <p class="text-xs text-slate-600 mb-3">${t.collegeName}</p>
              
              <div class="bg-white/80 backdrop-blur rounded-lg p-3 border border-slate-200/60 mb-4 text-xs space-y-1.5">
                <div class="flex justify-between">
                  <span class="text-slate-500">Test Score:</span>
                  <span class="font-bold text-slate-900">${t.marks.total} / 160 (${Math.round((t.marks.total / 160) * 100)}%)</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500">Maths / Phy / Chem:</span>
                  <span class="font-mono font-medium">${t.marks.maths} / ${t.marks.physics} / ${t.marks.chemistry}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500">Stream:</span>
                  <span class="font-medium text-slate-800 truncate">${t.stream.split("(")[0]}</span>
                </div>
              </div>
            </div>

            <div>
              <div class="bg-emerald-600/10 text-emerald-800 border border-emerald-300/60 rounded-md p-2.5 text-xs font-semibold flex items-center gap-2">
                <span>${prizeIcon}</span>
              </div>
              <button class="mt-3 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-bold transition view-topper-cert-btn" data-topper-id="${t.id}">
                View Merit Certificate & Card
              </button>
            </div>
          </div>
        `;
      })
      .join("");

    // Hook up topper cert buttons
    container.querySelectorAll(".view-topper-cert-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-topper-id");
        const found = this.students.find((s) => s.id === id);
        if (found) {
          this.renderResultCard(found);
          const resCard = document.getElementById("results-display-card");
          if (resCard) {
            resCard.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
  }

  renderRoomsList() {
    const container = document.getElementById("rooms-allotment-cards");
    if (!container) return;

    container.innerHTML = this.rooms
      .map((r) => {
        const pct = Math.round((r.allotted / r.capacity) * 100);
        return `
          <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <div class="flex items-start justify-between mb-3">
              <div>
                <span class="inline-block px-2.5 py-0.5 rounded text-xs font-extrabold bg-navy-100 text-navy-900 uppercase">
                  ${r.roomNo}
                </span>
                <h4 class="font-bold text-slate-900 text-sm mt-1">${r.block}</h4>
              </div>
              <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                ${r.allotted} / ${r.capacity} Seats
              </span>
            </div>

            <p class="text-xs text-slate-500 mb-3">
              <strong class="text-slate-700">Track:</strong> ${r.streamAssigned}
            </p>

            <div class="w-full bg-slate-100 rounded-full h-2 mb-3 overflow-hidden">
              <div class="bg-navy-900 h-2 rounded-full" style="width: ${pct}%"></div>
            </div>

            <div class="border-t border-slate-100 pt-3 text-xs text-slate-600 space-y-1">
              <div><strong class="text-slate-800">Invigilator:</strong> ${r.invigilator}</div>
              <div class="text-slate-500"><strong class="text-slate-700">Exam Assistant:</strong> ${r.assistantStaff}</div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  renderTopAnnouncements() {
    const container = document.getElementById("announcements-list-container");
    if (!container) return;

    container.innerHTML = ANNOUNCEMENTS.map(
      (a) => `
      <div class="p-4 bg-white rounded-lg border border-slate-200/80 shadow-sm flex items-start gap-3">
        <span class="px-2.5 py-1 text-[11px] font-extrabold uppercase rounded ${
          a.badge === 'Important' ? 'bg-amber-100 text-amber-900' : a.badge === 'Mandatory' ? 'bg-red-100 text-red-900' : 'bg-blue-100 text-blue-900'
        }">${a.badge}</span>
        <div>
          <h4 class="font-bold text-sm text-slate-900">${a.title}</h4>
          <p class="text-xs text-slate-600 mt-0.5">${a.desc}</p>
        </div>
      </div>
    `
    ).join("");
  }

  renderFaqs() {
    const container = document.getElementById("faq-accordion-container");
    if (!container) return;

    container.innerHTML = FAQ_LIST.map(
      (f, idx) => `
      <details class="group border border-slate-200 rounded-lg bg-white overflow-hidden" ${idx === 0 ? "open" : ""}>
        <summary class="flex justify-between items-center p-4 font-semibold text-sm text-slate-900 cursor-pointer select-none group-open:bg-slate-50 hover:text-navy-900 transition">
          <span>${f.q}</span>
          <svg class="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </summary>
        <div class="p-4 pt-2 text-xs leading-relaxed text-slate-600 border-t border-slate-100">
          ${f.a}
        </div>
      </details>
    `
    ).join("");
  }
}

// Global bootstrap
document.addEventListener("DOMContentLoaded", () => {
  window.spsApp = new SPSApp();
});
