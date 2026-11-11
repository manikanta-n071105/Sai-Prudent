import React from 'react';
import { 
  GraduationCap, 
  Bus, 
  Laptop, 
  ArrowRight, 
  Download, 
  BookOpen, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  Award
} from 'lucide-react';

export default function Hero({ onNavigate }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-50/70 via-white to-slate-50 pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200">
      
      {/* Background Decorative Accents */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-navy-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Mission & Core Value Proposition */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Pill Header */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300/80 text-amber-950 text-xs font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>A Noble Philanthropic Initiative • Since 2015</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight leading-tight">
              Talent Should Never Be Hindered by Poverty.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-navy-900 via-navy-800 to-amber-600">
                Education Will Always Be Free.
              </span>
            </h1>

            {/* Narrative Subtitle (Inspired by Vadaanya) */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
              The <strong>Sai Prudent Scholarship (SPS)</strong> program was instituted in 2015 
              with Sanskrithi School of Engineering under Sanskrithi Educational Society. 
              Supported internationally by <strong>Anahata Stiftung (Germany)</strong> and <strong>RISE (Austria)</strong>, 
              we conduct a comprehensive talent test to identify ambitious students of lesser economic 
              backgrounds and fund their transition into world-class engineers and business leaders.
            </p>

            {/* Key Benefits Cards with Lucide Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3 hover:border-navy-300 transition group">
                <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                  <GraduationCap className="w-5 h-5 text-navy-900" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-extrabold text-navy-950">Zero Tuition Fee</div>
                  <div className="text-[11px] text-slate-500 font-medium">100% Free Education</div>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3 hover:border-amber-300 transition group">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                  <Bus className="w-5 h-5 text-amber-700" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-extrabold text-navy-950">50% Subsidy</div>
                  <div className="text-[11px] text-slate-500 font-medium">Hostel & Bus Transport</div>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3 hover:border-emerald-300 transition group">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                  <Laptop className="w-5 h-5 text-emerald-700" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-extrabold text-navy-950">Free Laptops</div>
                  <div className="text-[11px] text-slate-500 font-medium">Tablets & Paid Internships</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-4">
              <button
                onClick={() => onNavigate('register')}
                className="px-6 py-3.5 rounded-xl text-sm font-black text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Apply for Scholarship (Free)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('hallticket')}
                className="px-6 py-3.5 rounded-xl text-sm font-bold text-navy-950 bg-white border border-slate-300 hover:bg-slate-50 shadow-2xs transition flex items-center gap-2"
              >
                <span>Download Hall Ticket</span>
                <Download className="w-4 h-4 text-slate-500" />
              </button>

              <button
                onClick={() => onNavigate('talent-test')}
                className="px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-navy-950 transition flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span>Exam Pattern & Syllabus</span>
              </button>
            </div>

            {/* Reassurance Trust Pills */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Open to all candidates without reservation
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Walk-ins permitted on exam date with College ID
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Quick Card & International Alliance */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6 relative">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Talent Test 2025-26
                  </span>
                  <h3 className="text-xl font-black text-navy-950 mt-1.5">
                    Sai Prudent Scholarship
                  </h3>
                </div>
                <div className="w-12 h-12 bg-navy-950 rounded-2xl flex flex-col items-center justify-center text-amber-400 font-black text-xs shadow-md border border-amber-400/20">
                  <span className="text-sm font-mono leading-none">160</span>
                  <span className="text-[9px] uppercase tracking-tighter text-slate-400">Marks</span>
                </div>
              </div>

              {/* Quick Details Table */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Eligibility:</span>
                  <span className="font-semibold text-slate-800 text-right">Class 12 MPC (B.Tech) • Any Stream (BBA) • Degree Final Yr</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Format:</span>
                  <span className="font-semibold text-slate-800 text-right">160 Questions (Maths 80, Phy 40, Chem 40)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Examination Venue:</span>
                  <span className="font-semibold text-slate-800 text-right">Sanskrithi Campus, Puttaparthi</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Registration Fee:</span>
                  <span className="font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">₹0 (Completely Free)</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Required on Exam Day:</span>
                  <span className="font-semibold text-red-800 bg-red-50 border border-red-200 px-2 py-0.5 rounded">Hall Ticket + Aadhaar Card Photocopy</span>
                </div>
              </div>

              {/* International Alliance Showcase */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2.5">
                  Global Philanthropic & Technical Alliance
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                    <div className="text-xs font-black text-navy-950">Anahata Stiftung</div>
                    <div className="text-[10px] text-slate-500">Stuttgart, Germany</div>
                    <div className="text-[9px] text-amber-700 font-semibold mt-0.5">International Support</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                    <div className="text-xs font-black text-navy-950">RISE</div>
                    <div className="text-[10px] text-slate-500">Vienna, Austria</div>
                    <div className="text-[9px] text-navy-700 font-semibold mt-0.5">Technical Partner</div>
                  </div>
                </div>
              </div>

              {/* Direct QR & Google Form Quick Link */}
              <div className="flex items-center justify-between pt-1">
                <div className="text-xs">
                  <span className="font-bold text-slate-800 block">Prefer Google Forms?</span>
                  <span className="text-[11px] text-slate-500">Direct instant registration link</span>
                </div>
                <a
                  href="https://forms.gle/Aoamr5bMkqMK99Hw7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
                >
                  <span>Open Form</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

