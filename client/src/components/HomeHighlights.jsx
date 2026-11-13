import React from 'react';
import { 
  HeartHandshake, 
  BookOpen, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export default function HomeHighlights({ onNavigate }) {
  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Program Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
            Key Pillars of the Sai Prudent Initiative
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Everything you need to know about the scholarship test, international pathways, and student rewards.
          </p>
        </div>

        {/* 3 Pillar Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: About the Genesis & Global Alliance */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-navy-300 transition flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-xl bg-navy-50 text-navy-950 flex items-center justify-center border border-navy-200/60">
                <HeartHandshake className="w-5 h-5 text-navy-900" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider">
                  Philanthropy Since 2015
                </span>
                <h3 className="text-lg font-black text-navy-950 mt-1">
                  About SPS & Global Alliance
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instituted under Sanskrithi Educational Society in Puttaparthi and sustained by international partners 
                <strong> Anahata Stiftung (Germany)</strong> and <strong>RISE (Austria)</strong> to ensure education provided to deserving talent will always be free.
              </p>
            </div>
            
            <div className="pt-4 mt-4 border-t border-slate-200/60">
              <button
                onClick={() => onNavigate('about')}
                className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-navy-950 hover:text-white border border-slate-200 text-navy-950 font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-2xs group-hover:border-navy-900"
              >
                <span>Read Full Origin Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Talent Examination */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center border border-amber-200/60">
                <BookOpen className="w-5 h-5 text-amber-800" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider">
                  160 Marks • 2 Hours
                </span>
                <h3 className="text-lg font-black text-navy-950 mt-1">
                  Standardized Talent Test
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Open to all candidates without reservation: Class 12 MPC (B.Tech track), Class 12 Any Stream (BBA), and Degree Final Year students. Bilingual test in English and Telugu with zero negative marking.
              </p>
            </div>
            
            <div className="pt-4 mt-4 border-t border-slate-200/60">
              <button
                onClick={() => onNavigate('talent-test')}
                className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-amber-400 hover:text-slate-950 border border-slate-200 text-navy-950 font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-2xs group-hover:border-amber-400"
              >
                <span>View Pattern & Syllabus</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Scholarships & Prizes */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center border border-emerald-200/60">
                <Award className="w-5 h-5 text-emerald-800" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider">
                  50% Subsidy & Laptops
                </span>
                <h3 className="text-lg font-black text-navy-950 mt-1">
                  Rewards & Scholarships
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Qualifying candidates receive 50% waiver on hostel boarding and college bus transportation, monthly stipend internships, plus Free Laptops and Tablets awarded to top 3 rank holders.
              </p>
            </div>
            
            <div className="pt-4 mt-4 border-t border-slate-200/60">
              <button
                onClick={() => onNavigate('benefits')}
                className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-emerald-600 hover:text-white border border-slate-200 text-navy-950 font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-2xs group-hover:border-emerald-500"
              >
                <span>Explore Prizes & Benefits</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Founder & Leadership Spotlight on Home */}
        <div className="bg-gradient-to-br from-navy-950 via-slate-900 to-navy-900 rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-4 lg:col-span-3 flex justify-center">
              <div className="relative w-40 h-48 sm:w-48 sm:h-56 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-xl group bg-slate-900">
                <img
                  src="images/chairman_vijay_reddy.jpg"
                  alt="Sri B. Vijay Reddy - Founder & Chairman"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = '/images/chairman_vijay_reddy.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2 left-2 right-2 text-center text-[10px] font-black bg-amber-400 text-slate-950 py-0.5 rounded-md uppercase tracking-wider">
                  Founder & Chairman
                </span>
              </div>
            </div>

            <div className="md:col-span-8 lg:col-span-9 space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Founder's Personal Guarantee</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
                "Financial constraints must never hinder deserving talent."
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                Under the leadership of <strong>Sri B. Vijay Reddy</strong> (Chairman, Sanskrithi Group & Director – Global Operations, RISE Austria), the Sai Prudent initiative ensures that every ambitious student from rural Rayalaseema receives an uncompromised path to higher engineering education, industry stipends, and international European careers.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs transition shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Read Full Leadership Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-slate-400 font-medium">
                  Operating across 16+ countries • Supported by Anahata Stiftung & RISE Austria
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Compact Quick Action Card */}
        <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              Online Registration Live
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Register for Sai Prudent Scholarship 2025-26
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Online registration is open. Instant hall ticket generated with seat allocation. Walk-ins with College ID also accepted on the exam morning.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('register')}
              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition shadow-md flex items-center gap-1.5"
            >
              <span>Apply Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('hallticket')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition border border-white/20"
            >
              Download Hall Ticket
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

