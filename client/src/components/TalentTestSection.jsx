import React from 'react';
import { 
  Cpu, 
  BarChart3, 
  GraduationCap, 
  Languages, 
  CheckCircle2, 
  ClipboardCheck, 
  AlertTriangle,
  FileCheck2,
  Clock,
  HelpCircle,
  Banknote,
  Globe,
  Sparkles
} from 'lucide-react';

export default function TalentTestSection({ onNavigate }) {
  const subjects = [
    {
      name: 'Mathematics',
      questions: 80,
      marks: 80,
      weight: '50% of Total Score',
      color: 'bg-navy-900',
      barWidth: 'w-1/2',
      topics: 'Algebra, Matrices, Calculus, Vectors, Coordinate Geometry, Trigonometry, and Probability'
    },
    {
      name: 'Physics',
      questions: 40,
      marks: 40,
      weight: '25% of Total Score',
      color: 'bg-amber-500',
      barWidth: 'w-1/4',
      topics: 'Mechanics, Heat & Thermodynamics, Wave Optics, Electricity & Magnetism, Modern Physics'
    },
    {
      name: 'Chemistry',
      questions: 40,
      marks: 40,
      weight: '25% of Total Score',
      color: 'bg-emerald-600',
      barWidth: 'w-1/4',
      topics: 'Atomic Structure, Chemical Bonding, Thermodynamics, Organic Reactions, Environmental Chemistry'
    }
  ];

  return (
    <div id="talent-test" className="space-y-16 w-full">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold uppercase tracking-wider">
          Standardized Talent Examination
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
          Sai Prudent Talent Test Pattern & Eligibility
        </h2>
        <p className="text-slate-600 text-base leading-relaxed">
          The Sai Prudent talent test is conducted to identify prospective candidates with academic aptitude 
          who require financial support and meritorious opportunities.
        </p>
      </div>

      {/* Eligibility Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xs space-y-4 hover:border-navy-400 hover:shadow-md transition">
            <div className="w-11 h-11 rounded-2xl bg-navy-50 text-navy-900 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-navy-900" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-navy-800 bg-navy-50 border border-navy-200/80 px-2 py-0.5 rounded-full">
                B.Tech Engineering Track
              </span>
              <h3 className="text-lg font-bold text-navy-950 mt-2">
                Class 12 (MPC Stream)
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              II Year Intermediate students with <strong>Mathematics, Physics, and Chemistry (MPC)</strong> group aspiring to join B.Tech programs at Sanskrithi School of Engineering.
            </p>
            <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-3">
              Courses: CSE, AI & Data Science, ECE, Mechanical & Civil Engineering.
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xs space-y-4 hover:border-amber-400 hover:shadow-md transition">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full">
                BBA Management Track
              </span>
              <h3 className="text-lg font-bold text-navy-950 mt-2">
                Class 12 (Any Stream)
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              II Year Intermediate students from <strong>Any Academic Stream</strong> (MEC, CEC, BiPC, MPC, Vocational) eligible to pursue Bachelor of Business Administration (BBA).
            </p>
            <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-3">
              Courses: BBA at Sanskrithi School of Business (SSB).
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xs space-y-4 hover:border-emerald-400 hover:shadow-md transition">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                Master's / Degree Track
              </span>
              <h3 className="text-lg font-bold text-navy-950 mt-2">
                Degree Final Year Students
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Final Year Undergraduate / Degree students from <strong>all academic streams</strong> eligible for MBA and postgraduate professional advancement at Sanskrithi.
            </p>
            <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-3">
              Courses: MBA (Finance, HR, Marketing, Business Analytics).
            </div>
          </div>
        </div>

        {/* Examination Pattern Breakdown Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Official Pattern</span>
              <h3 className="text-2xl font-black text-navy-950 mt-0.5">
                160 Questions • 160 Marks • 2 Hours (Reporting: 8:00 AM)
              </h3>
            </div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>No Negative Marking</span>
              </span>
              <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-800 rounded-full border border-blue-200 flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-blue-600" />
                <span>Bilingual (English & Telugu)</span>
              </span>
            </div>
          </div>

          {/* Top 5 Global Incentive Callout */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-blue-500/10 rounded-2xl p-4 sm:p-5 border border-amber-300/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full font-mono">
                    Top 5 Students Selection
                  </span>
                  <span className="text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    ₹2,00,000 / Month Stipend
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-navy-950">
                  Global Opportunity: RISE Internship in Austria, Europe
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  The top 5 performers in this examination will be considered for an elite internship with <strong>RISE in Austria, Europe</strong> with a monthly stipend of <strong>₹2 Lakhs</strong>.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate && onNavigate('register')}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs transition shadow-2xs whitespace-nowrap self-start sm:self-center shrink-0"
            >
              Apply for Test →
            </button>
          </div>

          {/* Subject Rows */}
          <div className="space-y-6">
            {subjects.map((sub, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-extrabold text-navy-950 text-sm sm:text-base">
                    {sub.name}
                  </span>
                  <div className="text-xs sm:text-sm font-mono font-bold text-slate-700">
                    <span className="text-navy-950 text-base">{sub.questions}</span> Questions / <span className="text-navy-950 text-base">{sub.marks}</span> Marks
                    <span className="text-slate-400 font-normal ml-2">({sub.weight})</span>
                  </div>
                </div>
                
                {/* Visual Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className={`h-3 rounded-full ${sub.color}`} style={{ width: `${(sub.questions / 160) * 100}%` }} />
                </div>
                
                <p className="text-[11px] text-slate-500">
                  <strong className="text-slate-700">Core Areas:</strong> {sub.topics}
                </p>
              </div>
            ))}
          </div>

          {/* Real Examination Atmosphere Showcase */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Authentic Test Environment</span>
                <h4 className="text-lg font-black text-navy-950">Strict, Fair & Disciplined Examination Halls</h4>
              </div>
              <span className="text-xs text-slate-500 hidden sm:inline">Puttaparthi, Sri Sathya Sai District</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
                <img 
                  src="images/exam_hall_1.jpg" 
                  alt="Students writing Sai Prudent Talent Test" 
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = '/images/exam_hall_1.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs flex justify-between items-center">
                  <span className="font-bold">Candidates Writing the Talent Test</span>
                  <span className="text-[10px] bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full font-mono">Exam Hall</span>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
                <img 
                  src="images/exam_hall_2.jpg" 
                  alt="Candidates with official examination kit folders at Sanskrithi School of Engineering" 
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = '/images/exam_hall_2.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs flex justify-between items-center">
                  <span className="font-bold">Aspirants with Official Test Kits</span>
                  <span className="text-[10px] bg-emerald-500/80 backdrop-blur-xs text-white font-bold px-2 py-0.5 rounded-full">Sanskrithi Entrance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Exam Summary Grid */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xs text-slate-500 font-medium flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Exam Duration</span>
              </div>
              <div className="text-lg font-black text-navy-950 mt-1">2 Hours</div>
              <div className="text-[10px] text-slate-400">09:00 AM – 11:00 AM</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Reporting Time</span>
              </div>
              <div className="text-lg font-black text-navy-950 mt-1">08:00 AM</div>
              <div className="text-[10px] text-slate-400">Verification & Seating</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium flex items-center justify-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>Question Style</span>
              </div>
              <div className="text-lg font-black text-navy-950 mt-1">Objective (OMR)</div>
              <div className="text-[10px] text-slate-400">Multiple Choice</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium flex items-center justify-center gap-1">
                <Banknote className="w-3.5 h-3.5 text-emerald-600" />
                <span>Exam Fee</span>
              </div>
              <div className="text-lg font-black text-emerald-700 mt-1">₹0 (Free)</div>
              <div className="text-[10px] text-slate-400">Completely Funded</div>
            </div>
          </div>
        </div>

        {/* Examination Process & Mandatory Candidate Instructions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Examination Process */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-navy-950 flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-navy-900" />
              <span>Examination Process & Roadmap</span>
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed list-disc list-inside">
              <li>
                <strong>Open to All:</strong> The scholarship is open to all eligible candidates without reservation.
              </li>
              <li>
                <strong>2 Months Notice:</strong> The dates of the examination are announced 2 months ahead across colleges, print media, and this official website.
              </li>
              <li>
                <strong>Outreach Channels:</strong> Information is disseminated through word of mouth, digital media, poster and brochure distribution to junior colleges, newspaper announcements, and online portals.
              </li>
              <li>
                <strong>Walk-In Policy:</strong> Candidates who could not register prior are permitted to walk in directly on the morning of the examination with a valid college ID and Aadhaar card photocopy.
              </li>
              <li>
                <strong>Venue:</strong> Sanskrithi School of Business & School of Engineering, Puttaparthi, Sri Sathya Sai District, Andhra Pradesh.
              </li>
            </ul>
          </div>

          {/* Mandatory Instructions for Candidates */}
          <div className="bg-red-50/60 rounded-3xl p-6 sm:p-8 border border-red-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-red-900 font-black text-xs uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>Mandatory Candidate Instructions</span>
            </div>
            <h3 className="text-xl font-bold text-red-950">
              Items to Bring on Examination Day
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-red-950">
              <div className="p-3.5 bg-white rounded-xl border border-red-200 flex items-start gap-3 shadow-2xs">
                <span className="text-red-600 font-black text-base leading-none mt-0.5">1.</span>
                <div>
                  <strong>Exam Hall Ticket Printout (Mandatory):</strong> Download your admit card from this portal and bring a clear physical printout.
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-red-200 flex items-start gap-3 shadow-2xs">
                <span className="text-red-600 font-black text-base leading-none mt-0.5">2.</span>
                <div>
                  <strong>Aadhaar Card Photocopy (Mandatory):</strong> Candidates have to bring an Aadhaar card photocopy for identity verification at the entrance.
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-red-200 flex items-start gap-3 shadow-2xs">
                <span className="text-red-600 font-black text-base leading-none mt-0.5">3.</span>
                <div>
                  <strong>Original College ID:</strong> Current Intermediate or Degree college identity card for walk-in verification.
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-red-200 flex items-start gap-3 shadow-2xs">
                <span className="text-red-600 font-black text-base leading-none mt-0.5">4.</span>
                <div>
                  <strong>Stationery:</strong> Black or Blue ballpoint pen for filling the OMR response sheet.
                </div>
              </div>
            </div>
          </div>

        </div>

    </div>
  );
}

