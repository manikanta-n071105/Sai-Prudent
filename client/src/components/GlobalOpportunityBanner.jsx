import React, { useState } from 'react';
import { 
  Globe, 
  GraduationCap, 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  ZoomIn, 
  X, 
  CheckCircle2, 
  Building2,
  Award
} from 'lucide-react';

export default function GlobalOpportunityBanner({ onNavigate }) {
  const [showPosterModal, setShowPosterModal] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-slate-900 to-navy-900 text-white border-b border-amber-500/30">
      {/* Background glow and subtle grid */}
      <div className="absolute inset-0 bg-grid-white/[0.03] pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        
        {/* Top Eyebrow Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wide shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>GLOBAL OPPORTUNITIES • AUSTRIA & EUROPE</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>RISE Austria & TU Wien International Pathways</span>
            </span>
          </div>
        </div>

        {/* Main 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Narrative & Key Achievements */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                Global Opportunities with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">
                  RISE Austria & TU Wien
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Through our enduring international partnership with <strong>RISE (Research Industrial Systems Engineering, Austria)</strong>, 
                <strong> TU Wien</strong>, and <strong>Anahata Stiftung (Germany)</strong>, Sai Prudent scholars access world-caliber 
                European internships, high-profile career placements, and fully funded postgraduate opportunities abroad.
              </p>
            </div>

            {/* 3 Featured Opportunity Cards */}
            <div className="grid grid-cols-1 gap-3.5 pt-1">
              
              {/* Card 1: Top 5 Students Internship */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-800/60 to-slate-800/40 border border-amber-400/30 hover:border-amber-400/60 transition shadow-lg">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/40">
                    <Globe className="w-5 h-5 text-amber-300" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                        Top 5 Scholars Selection
                      </span>
                      <span className="text-xs font-black text-emerald-400">
                        ₹2,00,000 / Month Stipend
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white">
                      International Internship at RISE Austria, Europe
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      The <strong>top 5 students</strong> from the Sai Prudent Scholarship Examination will be considered 
                      for an elite internship with <strong>RISE in Austria, Europe</strong>, accompanied by an exceptional monthly 
                      stipend of <strong>₹2 Lakhs</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Ms. Pranavi Tummuru */}
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/80 hover:border-slate-600 transition">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0 border border-sky-400/30">
                    <GraduationCap className="w-5 h-5 text-sky-300" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black uppercase tracking-wider text-sky-300 bg-sky-500/20 px-2 py-0.5 rounded-full border border-sky-400/30">
                        MS at TU Wien, Austria
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">World Top University</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">
                      Ms. Pranavi Tummuru — MS in Business Informatics
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Sent to pursue her <strong>Master of Science (MS) in Business Informatics</strong> at 
                      <strong> TU Wien, Austria</strong> (one of the world's leading technical universities), 
                      following her successful <strong>3-month internship at RISE Austria</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: Ms. Karizma */}
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/80 hover:border-slate-600 transition">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-400/30">
                    <Briefcase className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
                        Placement Package: ₹6 LPA
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">RISE, India</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">
                      Ms. Karizma — Placed with RISE, India
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Secured a lucrative placement with <strong>RISE, India</strong> with a package of <strong>₹6 Lakhs per annum</strong>. 
                      Both <strong>Pranavi</strong> and <strong>Karizma</strong> completed a prestigious <strong>3-month internship at RISE Austria, Europe</strong>.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate && onNavigate('register')}
                className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm transition shadow-lg flex items-center gap-2"
              >
                <span>Apply for Scholarship Exam (100% Free)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Poster Card Preview */}
          <div className="lg:col-span-5">
            <div 
              onClick={() => setShowPosterModal(true)}
              className="group relative bg-slate-800/80 rounded-3xl p-3 border-2 border-amber-400/40 shadow-2xl overflow-hidden cursor-pointer hover:border-amber-400 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Badge Overlay */}
              <div className="absolute top-5 right-5 z-10 bg-navy-950/90 backdrop-blur-md text-amber-300 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-amber-400/50 shadow flex items-center gap-1.5">
                <ZoomIn className="w-3 h-3 text-amber-400" />
                <span>Click to Enlarge</span>
              </div>

              {/* Poster Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900">
                <img 
                  src="/images/rise_austria_banner.jpg" 
                  alt="Sai Prudent Scholarship - RISE Austria & TU Wien Global Opportunities"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = 'images/rise_austria_banner.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Bottom Card Ribbon */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-bold">RISE Austria • TU Wien • Anahata Stiftung</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-300 font-bold bg-slate-950/80 px-2 py-0.5 rounded">
                    Official Notice
                  </span>
                </div>
              </div>

              {/* Mini Highlights summary below thumbnail */}
              <div className="pt-3 px-2 flex items-center justify-between text-[11px] text-slate-300">
                <span>Top 5 Interns: <strong>₹2 Lakhs/Month</strong></span>
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <span>Full Poster</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal: Full Screen Poster Preview */}
      {showPosterModal && (
        <div 
          onClick={() => setShowPosterModal(false)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn cursor-zoom-out"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative bg-slate-900 rounded-3xl max-w-4xl w-full border border-slate-700 shadow-2xl overflow-hidden cursor-default max-h-[92vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800 text-white">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="text-xs sm:text-sm font-black text-amber-300">
                  Official Announcement • RISE Austria & TU Wien Global Opportunities
                </span>
              </div>
              <button
                onClick={() => setShowPosterModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Poster Image Full-View */}
            <div className="p-2 sm:p-4 overflow-auto flex-1 flex items-center justify-center bg-black/40">
              <img 
                src="/images/rise_austria_banner.jpg" 
                alt="Sai Prudent Scholarship RISE Austria & TU Wien Banner"
                className="w-full h-auto max-h-[75vh] object-contain rounded-xl shadow-lg border border-slate-800"
                onError={(e) => { e.target.src = 'images/rise_austria_banner.jpg'; }}
              />
            </div>

            {/* Modal Footer Info */}
            <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
              <div>
                Sanskrithi School of Engineering & Business • Puttaparthi
              </div>
              <button
                onClick={() => {
                  setShowPosterModal(false);
                  onNavigate && onNavigate('register');
                }}
                className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-lg transition text-xs"
              >
                Apply for Sai Prudent Scholarship →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
