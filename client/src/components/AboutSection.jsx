import React, { useState } from 'react';
import { 
  UserCheck, 
  BookOpen, 
  Globe, 
  Layers, 
  HeartHandshake, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Building2,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import FounderProfileSection from './FounderProfileSection';

export default function AboutSection({ onNavigate, showHeader = true }) {
  const [activeModule, setActiveModule] = useState('founder'); // 'founder', 'genesis', 'partners', 'pillars', 'stories', 'all'

  const subModules = [
    {
      id: 'founder',
      label: 'Founder Profile',
      tag: 'Sri B. Vijay Reddy',
      icon: UserCheck,
      badge: 'Chairman & Director'
    },
    {
      id: 'genesis',
      label: 'The Genesis',
      tag: 'Estd. 2015',
      icon: BookOpen,
      badge: 'Origin Story'
    },
    {
      id: 'partners',
      label: 'Global Partners',
      tag: 'Germany & Austria',
      icon: Globe,
      badge: 'Anahata & RISE'
    },
    {
      id: 'pillars',
      label: 'Four Pillars',
      tag: 'Program Lifecycle',
      icon: Layers,
      badge: 'Architecture'
    },
    {
      id: 'stories',
      label: 'Scholar Journeys',
      tag: 'Real Impact',
      icon: HeartHandshake,
      badge: 'Alumni Voices'
    },
    {
      id: 'all',
      label: 'All Modules',
      tag: 'Complete Story',
      icon: Sparkles,
      badge: 'Full View'
    }
  ];

  const pillars = [
    {
      num: '01',
      title: 'Talent Discovery Test',
      desc: 'An open, merit-based offline examination designed to uncover authentic raw potential in Mathematics, Physics, and Chemistry, free of charge to any student regardless of background.'
    },
    {
      num: '02',
      title: 'RISE Austria Global Pathways',
      desc: 'The top 5 students from Sai Prudent will be considered for an internship at RISE in Austria, Europe with a monthly stipend of ₹2 Lakhs, alongside TU Wien Master’s admissions.'
    },
    {
      num: '03',
      title: '50% Living & Commute Aid',
      desc: 'Significant financial relief covering half of all hostel boarding, mess, and regional college bus transportation costs across the region.'
    },
    {
      num: '04',
      title: 'Stipend Internships & Careers',
      desc: 'Students gain real industry experience with guaranteed monthly stipends, graduating as confident young professionals ready for global technology firms.'
    }
  ];

  const stories = [
    {
      name: 'Ramesh Babu',
      village: 'Bukkapatnam, Sri Sathya Sai Dist.',
      course: 'B.Tech CSE (Batch of 2021)',
      role: 'Software Engineer @ Cloud Systems',
      quote: 'My father is a daily wage weaver. Engineering was an impossible dream until the Sai Prudent Scholarship Test. Not only was my education completely free, but the 50% hostel subsidy and internship stipend allowed me to support my family.'
    },
    {
      name: 'Haritha K.',
      village: 'Dharmavaram Rural',
      course: 'B.Tech ECE (Batch of 2023)',
      role: 'Embedded Systems Specialist @ Automotive Tech',
      quote: 'Winning a Free Laptop in the Sai Prudent exam gave me my first digital window. The faculty and international partners from Germany and Austria mentored us with modern labs. It changed my life trajectory.'
    }
  ];

  // Helper to switch to next/previous sub-module
  const navigateSubModule = (direction) => {
    const ids = ['founder', 'genesis', 'partners', 'pillars', 'stories'];
    const currentIdx = ids.indexOf(activeModule);
    if (currentIdx === -1) {
      setActiveModule('founder');
      return;
    }
    if (direction === 'next') {
      const nextIdx = (currentIdx + 1) % ids.length;
      setActiveModule(ids[nextIdx]);
    } else {
      const prevIdx = (currentIdx - 1 + ids.length) % ids.length;
      setActiveModule(ids[prevIdx]);
    }
  };

  return (
    <div id="about" className="space-y-10 w-full select-none">
      
      {/* Optional Top Title Header */}
      {showHeader && (
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 text-navy-900 border border-navy-200 text-xs font-bold uppercase tracking-wider">
            Our Story & Core Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            Bridging the Gap Between Rural Talent and Global Opportunity
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Inspired by grassroots educational philanthropy, the Sai Prudent Scholarship program 
            empowers students whose brilliance might otherwise be extinguished by economic poverty.
          </p>
        </div>
      )}

      {/* Sub-Module Segmented Navigation Bar */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 border border-slate-200 shadow-md">
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-2 pb-2.5 border-b border-slate-100 mb-2">
          <span className="flex items-center gap-1.5 text-navy-950 font-bold">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>Select About Us Sub-Module</span>
          </span>
          <span className="hidden sm:inline text-[11px] text-slate-400">Click to switch modules</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {subModules.map((m) => {
            const Icon = m.icon;
            const isActive = activeModule === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveModule(m.id)}
                className={`p-3 rounded-2xl text-left transition-all duration-200 flex flex-col justify-between border cursor-pointer ${
                  isActive
                    ? 'bg-navy-950 text-white border-navy-950 shadow-md ring-2 ring-amber-400/30'
                    : 'bg-slate-50 hover:bg-white text-slate-700 hover:text-navy-950 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center ${isActive ? 'bg-white/10 text-amber-300' : 'bg-white text-slate-700 shadow-2xs'}`}>
                    {m.id === 'founder' ? (
                      <img 
                        src="/images/chairman_vijay_reddy.jpg" 
                        alt="Chairman" 
                        className="w-full h-full object-cover object-top"
                        onError={(e) => { e.target.src = 'images/chairman_vijay_reddy.jpg'; }}
                      />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-600'}`}>
                    {m.badge}
                  </span>
                </div>
                <div>
                  <div className={`font-black text-xs sm:text-sm tracking-tight ${isActive ? 'text-white' : 'text-navy-950'}`}>
                    {m.label}
                  </div>
                  <div className={`text-[10px] truncate ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                    {m.tag}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* MODULE 1: FOUNDER & CHAIRMAN PROFILE (Sri B. Vijay Reddy) */}
      {(activeModule === 'founder' || activeModule === 'all') && (
        <div className="space-y-6 animate-fadeIn">
          {activeModule === 'all' && (
            <div className="flex items-center gap-2 pt-4">
              <span className="px-3 py-1 rounded-full bg-navy-950 text-amber-300 text-xs font-mono font-bold">
                Module 1 of 5
              </span>
              <h3 className="text-xl font-black text-navy-950">Founder & Chairman Profile</h3>
            </div>
          )}
          <FounderProfileSection />
        </div>
      )}

      {/* MODULE 2: THE GENESIS (2015) */}
      {(activeModule === 'genesis' || activeModule === 'all') && (
        <div className="space-y-6 animate-fadeIn">
          {activeModule === 'all' && (
            <div className="flex items-center gap-2 pt-8 border-t border-slate-200">
              <span className="px-3 py-1 rounded-full bg-navy-950 text-amber-300 text-xs font-mono font-bold">
                Module 2 of 5
              </span>
              <h3 className="text-xl font-black text-navy-950">The Genesis & Founding Conviction</h3>
            </div>
          )}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-wider">
                Origin Story • Established 2015
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
                The Genesis: Instituted in 2015
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                The noble intention behind the Sai Prudent initiative was straightforward yet profound: 
                to identify young minds who possess deep curiosity and academic aptitude, but whose aspirations 
                for higher technical education are stalled simply by a lack of financial means.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  The <strong>Sai Prudent Scholarship program (SPS)</strong> was instituted in 2015 in 
                  tandem with the establishment of the <strong>Sanskrithi School of Engineering</strong> under 
                  the aegis of the <strong>Sanskrithi Educational Society</strong> in Puttaparthi, Andhra Pradesh.
                </p>
                <p>
                  At Sanskrithi, our conviction is that <strong className="text-navy-950 font-bold">financial constraints must never hinder deserving talent</strong>. 
                  The program focuses on incoming students pursuing Bachelor of Technology (B.Tech) 
                  and Bachelor of Business Administration (BBA) degrees, enabling them to graduate 
                  not burdened by debt, but empowered as capable, ethical young professionals.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => onNavigate('register')}
                    className="px-5 py-2.5 bg-navy-950 text-amber-400 rounded-xl text-xs sm:text-sm font-black hover:bg-navy-900 transition shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Register for Talent Test</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onNavigate('talent-test')}
                    className="px-5 py-2.5 text-navy-950 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer"
                  >
                    View Exam Format
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md group">
                  <img 
                    src="images/exam_hall_3.jpg" 
                    alt="Sanskrithi School of Engineering Main Campus Entrance" 
                    className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = '/images/exam_hall_3.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold flex justify-between items-center z-10">
                    <span className="truncate">Sanskrithi Main Portico, Puttaparthi</span>
                    <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full shrink-0">Estd. 2015</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 3: INTERNATIONAL PHILANTHROPIC PARTNERS */}
      {(activeModule === 'partners' || activeModule === 'all') && (
        <div className="space-y-6 animate-fadeIn">
          {activeModule === 'all' && (
            <div className="flex items-center gap-2 pt-8 border-t border-slate-200">
              <span className="px-3 py-1 rounded-full bg-navy-950 text-amber-300 text-xs font-mono font-bold">
                Module 3 of 5
              </span>
              <h3 className="text-xl font-black text-navy-950">International Support & Technical Partners</h3>
            </div>
          )}
          <div className="bg-gradient-to-br from-navy-950 via-slate-900 to-navy-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden space-y-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-3 max-w-2xl">
              <div className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold tracking-wider uppercase border border-amber-400/30">
                International Support & Technical Partners
              </div>
              <h4 className="text-2xl sm:text-3xl font-black leading-snug">
                Powered by Global Philanthropic Solidarity
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                The Sai Prudent Scholarship Program is sustained through dedicated partnerships 
                with internationally recognized institutions that share our vision of educational equity:
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Anahata Stiftung */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-sm">
                      DE
                    </div>
                    <span className="text-[10px] font-mono uppercase bg-white/15 px-2 py-0.5 rounded text-amber-300">
                      Stuttgart, Germany
                    </span>
                  </div>
                  <h5 className="font-black text-white text-lg">Anahata Stiftung (Germany)</h5>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    Our international support partner based in Stuttgart, Germany. Anahata Stiftung provides philanthropic grant endowments that cover educational scholarships and living subsidies for economically disadvantaged scholars.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 text-xs text-amber-300 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Philanthropic Endowments & Living Subsidies</span>
                </div>
              </div>

              {/* RISE Austria & TU Wien */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-sm">
                      AT
                    </div>
                    <span className="text-[10px] font-mono uppercase bg-white/15 px-2 py-0.5 rounded text-emerald-300">
                      Vienna, Austria
                    </span>
                  </div>
                  <h5 className="font-black text-white text-lg">RISE (Austria, Europe) & TU Wien</h5>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    Our international partner from Vienna, Austria. Top 5 students from Sai Prudent will be considered for a 3-month internship at RISE in Austria with a monthly stipend of ₹2 Lakhs. This year, <strong>Pranavi Tummuru</strong> pursues MS at <strong>TU Wien</strong>, and <strong>Ms. Karizma</strong> secured placement with RISE India with <strong>₹6 Lakhs per annum</strong>.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 text-xs text-emerald-300 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>₹2 Lakhs/Mo Stipend • TU Wien MS Admissions</span>
                </div>
              </div>
            </div>

            {/* Scholars and Faculty Stage Photo */}
            <div className="relative rounded-2xl overflow-hidden border border-white/15 group">
              <img 
                src="images/award_stage_1.jpg" 
                alt="Sanskrithi Engineering Scholars and Faculty Mentors with Sai Prudent Banner" 
                className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.target.src = '/images/award_stage_1.jpg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-xs text-slate-200 font-semibold flex justify-between items-center z-10">
                <span>Sanskrithi Engineering Scholars & Faculty Mentors</span>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded-full">SPS Global Alliance</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 4: THE FOUR PILLARS */}
      {(activeModule === 'pillars' || activeModule === 'all') && (
        <div className="space-y-6 animate-fadeIn">
          {activeModule === 'all' && (
            <div className="flex items-center gap-2 pt-8 border-t border-slate-200">
              <span className="px-3 py-1 rounded-full bg-navy-950 text-amber-300 text-xs font-mono font-bold">
                Module 4 of 5
              </span>
              <h3 className="text-xl font-black text-navy-950">The Four Transformation Pillars</h3>
            </div>
          )}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 text-navy-900 border border-navy-200 text-xs font-bold uppercase tracking-wider">
                Program Architecture
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
                The Four Pillars of the Sai Prudent Program
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                A comprehensive lifecycle designed to take students from school desks to professional engineering careers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:bg-white hover:shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="text-amber-600 font-mono font-black text-3xl mb-2">
                      {p.num}
                    </div>
                    <h4 className="font-extrabold text-navy-950 text-base mb-2 group-hover:text-amber-700 transition">
                      {p.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {p.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-200/60 text-[11px] font-bold text-navy-900 flex items-center gap-1">
                    <span>Guaranteed Merit Support</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODULE 5: SCHOLAR SUCCESS STORIES */}
      {(activeModule === 'stories' || activeModule === 'all') && (
        <div className="space-y-6 animate-fadeIn">
          {activeModule === 'all' && (
            <div className="flex items-center gap-2 pt-8 border-t border-slate-200">
              <span className="px-3 py-1 rounded-full bg-navy-950 text-amber-300 text-xs font-mono font-bold">
                Module 5 of 5
              </span>
              <h3 className="text-xl font-black text-navy-950">Authentic Scholar Journeys</h3>
            </div>
          )}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-slate-50 rounded-3xl p-6 sm:p-10 border border-amber-300/40 space-y-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                Impact in Action
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
                Transforming Lives Across Rural Andhra Pradesh
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Read how students from humble backgrounds broke generational barriers through the Sai Prudent Scholarship program.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stories.map((st, i) => (
                <div key={i} className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-md space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-amber-500 text-4xl font-serif leading-none">“</div>
                    <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                      {st.quote}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <h5 className="font-black text-sm text-navy-950">{st.name}</h5>
                      <p className="text-[11px] text-slate-500">{st.village} • {st.course}</p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      {st.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Module Pagination Footer (when a single module is selected) */}
      {activeModule !== 'all' && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <button
            onClick={() => navigateSubModule('prev')}
            className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs border border-slate-200 shadow-2xs transition flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Module</span>
          </button>

          <span className="text-xs font-mono font-bold text-slate-500">
            Current: <strong className="text-navy-950">{subModules.find((m) => m.id === activeModule)?.label}</strong>
          </span>

          <button
            onClick={() => navigateSubModule('next')}
            className="px-4 py-2.5 bg-navy-950 hover:bg-navy-900 text-amber-400 font-black rounded-xl text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            <span>Next Module</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
