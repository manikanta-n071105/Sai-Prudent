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
  Award,
  ExternalLink
} from 'lucide-react';

export default function GlobalOpportunityBanner({ onNavigate }) {
  const [showPosterModal, setShowPosterModal] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-slate-50 text-slate-900 border-b border-slate-200/90 w-full max-w-full">
      {/* Subtle light background accents */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.7))] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        
        {/* Top Eyebrow Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/90 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>GLOBAL OPPORTUNITIES • AUSTRIA & EUROPE</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>RISE Austria & TU Wien International Pathways</span>
            </span>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Headlines, Opportunity Cards & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-950 tracking-tight leading-tight">
                Global Opportunities with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 via-amber-700 to-amber-600">
                  RISE Austria & TU Wien
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Through our international partnership with <strong>RISE (Research Industrial Systems Engineering, Austria)</strong>, 
                <strong> TU Wien</strong>, and <strong>Anahata Stiftung (Germany)</strong>, Sai Prudent scholars access world-caliber 
                European internships, high-profile career placements, and prestigious master's admissions abroad.
              </p>
            </div>

            {/* 3 Key Opportunity Cards */}
            <div className="grid grid-cols-1 gap-3.5 pt-1">
              
              {/* Card 1: Top 5 Interns at Austria */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-amber-200/80 shadow-xs hover:shadow-md hover:border-amber-400/80 transition-all duration-300">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full">
                        Top 5 Students Selection
                      </span>
                      <span className="text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        Monthly Stipend: ₹2 Lakhs
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-extrabold text-navy-950">
                      RISE Internship in Austria, Europe
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      The <strong>top 5 students</strong> from Sai Prudent will be considered for an internship at 
                      <strong> RISE in Austria, Europe</strong>. A monthly stipend of <strong>₹2 Lakhs</strong> will be given to the interns.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Ms. Pranavi Tummuru */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-300">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                        TU Wien, Austria
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">World Top University</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-extrabold text-navy-950">
                      Ms. Pranavi Tummuru — MS in Business Informatics
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      This year, we have sent <strong>Pranavi Tummuru</strong> to undergo her <strong>MS in Business Informatics at TU Wien, Austria</strong>, one of the top universities in the world. Pranavi previously underwent an internship at RISE Austria for three months.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: Ms. Karizma */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        RISE, India Placement
                      </span>
                      <span className="text-xs font-black text-emerald-900 bg-emerald-100/70 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                        Package: ₹6 Lakhs per Annum
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-extrabold text-navy-950">
                      Ms. Karizma — Placed with RISE & Dual Austria Internships
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      <strong>Ms. Karizma</strong> got placement with <strong>RISE, India</strong> with a package of <strong>₹6 Lakhs per annum</strong>. Both <strong>Karizma and Pranavi</strong> underwent an internship at RISE Austria for three months.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate && onNavigate('register')}
                className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Apply for Scholarship Exam (100% Free)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowPosterModal(true)}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-navy-950 font-bold text-xs sm:text-sm border border-slate-300 hover:border-slate-400 transition-all flex items-center gap-2 shadow-2xs cursor-pointer"
              >
                <ZoomIn className="w-4 h-4 text-amber-600" />
                <span>View Full Official Poster</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Poster Card Preview */}
          <div className="lg:col-span-5">
            <div 
              onClick={() => setShowPosterModal(true)}
              className="group relative bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-400/60 transition-all duration-300 cursor-pointer"
            >
              {/* Badge Overlay */}
              <div className="absolute top-6 right-6 z-10 bg-navy-950/85 backdrop-blur-md text-amber-300 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-400/40 shadow-xs flex items-center gap-1.5">
                <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                <span>Click to Enlarge</span>
              </div>

              {/* Poster Image */}
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200/80">
                <img 
                  src="/images/rise_austria_banner.jpg" 
                  alt="Sai Prudent Scholarship - RISE Austria & TU Wien Global Opportunities"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = 'images/rise_austria_banner.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-transparent to-transparent pointer-events-none" />
                
                {/* Bottom Card Ribbon */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>RISE Austria & TU Wien Pathways</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-300 font-bold bg-navy-950/80 px-2 py-0.5 rounded border border-amber-400/30">
                    Official Announcement
                  </span>
                </div>
              </div>

              {/* Footer text below preview */}
              <div className="pt-3 px-1 flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold text-navy-950">Top 5 Interns: <strong className="text-emerald-700 font-extrabold">₹2 Lakhs/Month</strong></span>
                <span className="text-amber-700 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Enlarge Poster</span>
                  <ArrowRight className="w-3.5 h-3.5" />
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
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn cursor-zoom-out"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden cursor-default max-h-[92vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-navy-950 border-b border-navy-900 text-white">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="text-xs sm:text-sm font-black text-amber-300">
                  Official 12th Sai Prudent Scholarship Announcement • RISE Austria & TU Wien
                </span>
              </div>
              <button
                onClick={() => setShowPosterModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-navy-900 transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Poster Image Full-View */}
            <div className="p-2 sm:p-4 overflow-auto flex-1 flex items-center justify-center bg-slate-100">
              <img 
                src="/images/rise_austria_banner.jpg" 
                alt="Sai Prudent Scholarship RISE Austria & TU Wien Banner"
                className="w-full h-auto max-h-[75vh] object-contain rounded-xl shadow-md border border-slate-200"
                onError={(e) => { e.target.src = 'images/rise_austria_banner.jpg'; }}
              />
            </div>

            {/* Modal Footer Info */}
            <div className="px-5 py-3 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
              <div className="font-medium text-navy-950">
                Sanskrithi School of Engineering & Business • Puttaparthi
              </div>
              <button
                onClick={() => {
                  setShowPosterModal(false);
                  onNavigate && onNavigate('register');
                }}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl transition text-xs shadow-2xs"
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
