import React, { useState } from 'react';
import { 
  Globe, 
  GraduationCap, 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  ZoomIn, 
  X, 
  Phone, 
  MapPin, 
  ExternalLink,
  Award,
  CheckCircle2
} from 'lucide-react';

export default function RiseSidebarWidget({ onNavigate }) {
  const [showPosterModal, setShowPosterModal] = useState(false);

  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Beedupalle,+College+Area,+Bade+Nayak+Thanda,+Puttaparthi,+Andhra+Pradesh+515134";

  return (
    <aside className="space-y-6 print:hidden w-full">
      {/* Main RISE Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-300/80 shadow-md hover:shadow-xl transition-all duration-300 space-y-5">
        
        {/* Header Badges */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>GLOBAL OPPORTUNITIES • AUSTRIA</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-navy-950 tracking-tight leading-snug">
            RISE Austria & TU Wien Pathways
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            Strategic international collaboration with <strong>RISE (Austria)</strong>, <strong>TU Wien</strong>, and <strong>Anahata Stiftung (Germany)</strong>.
          </p>
        </div>

        {/* Poster Visual Preview with Click-to-Enlarge */}
        <div 
          onClick={() => setShowPosterModal(true)}
          className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 shadow-xs cursor-pointer"
        >
          <img 
            src="/images/rise_austria_banner.jpg" 
            alt="Sai Prudent Scholarship - RISE Austria Announcement Poster"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.src = 'images/rise_austria_banner.jpg'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent pointer-events-none" />
          
          {/* Top Badge Overlay */}
          <div className="absolute top-3 right-3 z-10 bg-navy-950/85 backdrop-blur-md text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-amber-400/40 shadow-xs flex items-center gap-1">
            <ZoomIn className="w-3 h-3 text-amber-400" />
            <span>Enlarge Poster</span>
          </div>

          {/* Bottom Card Strip */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px]">
            <div className="flex items-center gap-1 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>RISE Austria & TU Wien</span>
            </div>
            <span className="text-[10px] font-mono text-amber-300 font-bold bg-navy-950/80 px-2 py-0.5 rounded">
              12th Edition
            </span>
          </div>
        </div>

        {/* 3 Core Global Highlights */}
        <div className="space-y-3 pt-1">
          
          {/* Highlight 1: Top 5 Interns ₹2 Lakhs */}
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/90 text-xs space-y-1">
            <div className="flex items-center justify-between gap-1 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full font-mono">
                Top 5 Students Selection
              </span>
              <span className="text-xs font-black text-emerald-800 bg-emerald-100/90 border border-emerald-200 px-2 py-0.5 rounded">
                ₹2 Lakhs / Month
              </span>
            </div>
            <h4 className="font-extrabold text-navy-950 text-xs sm:text-sm pt-0.5">
              RISE Internship in Austria, Europe
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Top 5 students from Sai Prudent will be considered for an internship at <strong>RISE in Austria, Europe</strong> with a monthly stipend of <strong>₹2 Lakhs</strong>.
            </p>
          </div>

          {/* Highlight 2: Ms. Pranavi Tummuru */}
          <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200/80 text-xs space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-100/80 border border-blue-200 px-2 py-0.5 rounded-full font-mono">
                TU Wien, Austria
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">World Top University</span>
            </div>
            <h4 className="font-extrabold text-navy-950 text-xs sm:text-sm pt-0.5">
              Ms. Pranavi Tummuru — MS in Business Informatics
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Sent to undergo her <strong>MS in Business Informatics at TU Wien, Austria</strong>, after completing an internship at RISE Austria for three months.
            </p>
          </div>

          {/* Highlight 3: Ms. Karizma */}
          <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200/80 text-xs space-y-1">
            <div className="flex items-center justify-between gap-1 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100/80 border border-emerald-200 px-2 py-0.5 rounded-full font-mono">
                RISE, India Placement
              </span>
              <span className="text-xs font-black text-emerald-800 bg-emerald-100/90 border border-emerald-200 px-2 py-0.5 rounded">
                ₹6 LPA Package
              </span>
            </div>
            <h4 className="font-extrabold text-navy-950 text-xs sm:text-sm pt-0.5">
              Ms. Karizma Placed with RISE & Dual Austria Internships
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Ms. Karizma secured placement with <strong>RISE, India</strong> with a package of <strong>₹6 Lakhs per annum</strong>. Both Karizma and Pranavi completed internships at RISE Austria for three months.
            </p>
          </div>

        </div>

        {/* Quick Apply CTA Button */}
        <button
          onClick={() => onNavigate && onNavigate('register')}
          className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-sm hover:shadow-md transition flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
        >
          <span>Apply for Sai Prudent Scholarship</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>

      {/* Official Helplines Card */}
      <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-navy-950 uppercase tracking-wider">
              Official Helpline Numbers
            </h4>
            <span className="text-[11px] text-slate-500">Student Admissions & Exam Desk</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 pt-1">
          {[
            { num: '9100974536', formatted: '+91 91009 74536' },
            { num: '9100974530', formatted: '+91 91009 74530' },
            { num: '9100974543', formatted: '+91 91009 74543' }
          ].map((item, idx) => (
            <a
              key={idx}
              href={`tel:+91${item.num}`}
              className="px-3.5 py-2.5 bg-white hover:bg-amber-50 text-navy-950 hover:text-amber-900 border border-slate-200 hover:border-amber-300 rounded-xl font-mono font-bold text-xs transition flex items-center justify-between shadow-2xs"
            >
              <span>{item.formatted}</span>
              <span className="text-[10px] text-amber-700 font-sans font-semibold">Call Now →</span>
            </a>
          ))}
        </div>
      </div>

      {/* Examination Venue & Google Maps Card */}
      <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-navy-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <MapPin className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-navy-950 uppercase tracking-wider">
              Examination Venue
            </h4>
            <span className="text-[11px] text-slate-500">Sanskrithi Campus, Puttaparthi</span>
          </div>
        </div>

        <div className="text-xs text-slate-700 space-y-1 bg-white p-3.5 rounded-2xl border border-slate-200 leading-relaxed font-medium">
          <div className="font-bold text-navy-950">Sanskrithi School of Engineering & Business</div>
          <div>Beedupalle, College Area, Bade Nayak Thanda,</div>
          <div>Puttaparthi, Andhra Pradesh 515134</div>
          <div className="text-[11px] text-slate-500 pt-1 font-normal">
            Duration: <strong>2 Hours</strong> • Reporting Time: <strong>8:00 AM</strong>
          </div>
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-3 bg-navy-950 hover:bg-navy-900 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
        >
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Open Location in Google Maps</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>
      </div>

      {/* Lightbox Modal */}
      {showPosterModal && (
        <div 
          onClick={() => setShowPosterModal(false)}
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn cursor-zoom-out"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden cursor-default max-h-[92vh] flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-3.5 bg-navy-950 border-b border-navy-900 text-white">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="text-xs sm:text-sm font-black text-amber-300">
                  Official 12th Sai Prudent Scholarship Announcement • RISE Austria & TU Wien
                </span>
              </div>
              <button
                onClick={() => setShowPosterModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-navy-900 transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-2 sm:p-4 overflow-auto flex-1 flex items-center justify-center bg-slate-100">
              <img 
                src="/images/rise_austria_banner.jpg" 
                alt="Sai Prudent Scholarship RISE Austria Banner"
                className="w-full h-auto max-h-[75vh] object-contain rounded-xl shadow-md border border-slate-200"
                onError={(e) => { e.target.src = 'images/rise_austria_banner.jpg'; }}
              />
            </div>

            <div className="px-5 py-3 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
              <div className="font-medium text-navy-950">
                Beedupalle, College Area, Bade Nayak Thanda, Puttaparthi, AP 515134
              </div>
              <button
                onClick={() => {
                  setShowPosterModal(false);
                  onNavigate && onNavigate('register');
                }}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl transition text-xs shadow-2xs cursor-pointer"
              >
                Apply for Sai Prudent Scholarship →
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
