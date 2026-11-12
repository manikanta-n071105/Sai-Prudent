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
  Calendar,
  Clock
} from 'lucide-react';

export default function RiseSidebarWidget({ onNavigate }) {
  const [showPosterModal, setShowPosterModal] = useState(false);

  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Beedupalle,+College+Area,+Bade+Nayak+Thanda,+Puttaparthi,+Andhra+Pradesh+515134";

  return (
    <aside className="print:hidden w-full select-none">
      {/* Unified Executive RISE Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        
        {/* Top Decorative Gradient Accent */}
        <div className="h-1.5 bg-gradient-to-r from-navy-950 via-amber-500 to-navy-950" />

        <div className="p-5 sm:p-6 space-y-5">
          {/* Header Badges & Institutional Identity */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-navy-950 border border-slate-200 text-[10px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Global Pathways • Europe
              </span>
              <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                12th SPS Edition
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-navy-950 tracking-tight leading-snug">
              RISE Austria & TU Wien Pathways
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Strategic collaboration with <strong>RISE (Vienna, Austria)</strong>, <strong>TU Wien</strong>, and <strong>Anahata Stiftung (Germany)</strong>.
            </p>
          </div>

          {/* Full Un-cropped Poster Frame (Exact 3:2 Aspect Ratio) */}
          <div 
            onClick={() => setShowPosterModal(true)}
            className="group relative rounded-xl overflow-hidden aspect-[3/2] bg-slate-950 border border-slate-200 shadow-xs cursor-pointer"
            title="Click to view full official poster"
          >
            <img 
              src="/images/rise_austria_banner.jpg" 
              alt="Sai Prudent Scholarship - RISE Austria Announcement Poster"
              className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
              onError={(e) => { e.target.src = 'images/rise_austria_banner.jpg'; }}
            />
            
            {/* Top Hover Pill */}
            <div className="absolute top-2.5 right-2.5 z-10 bg-navy-950/85 backdrop-blur-md text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-amber-400/40 shadow-xs flex items-center gap-1 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
              <ZoomIn className="w-3 h-3" />
              <span>Enlarge Poster</span>
            </div>

            {/* Bottom Status Overlay */}
            <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px] bg-slate-950/75 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/10">
              <span className="font-semibold text-slate-200 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-amber-400" />
                Dec 06, 2026
              </span>
              <span className="font-mono text-amber-300 font-bold flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" />
                2 Hours
              </span>
            </div>
          </div>

          {/* 3 Core Global Highlights */}
          <div className="space-y-2.5">
            
            {/* Highlight 1: Top 5 Interns ₹2 Lakhs */}
            <div className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50/60 border border-slate-200/80 transition-colors space-y-1">
              <div className="flex items-center justify-between gap-1 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100/80 border border-amber-300 px-2 py-0.5 rounded-full font-mono">
                  Top 5 Students Selection
                </span>
                <span className="text-xs font-black text-emerald-800 bg-emerald-100/90 border border-emerald-200 px-2 py-0.5 rounded">
                  ₹2 Lakhs / Month
                </span>
              </div>
              <h4 className="font-bold text-navy-950 text-xs pt-0.5 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>RISE Internship in Austria, Europe</span>
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Top 5 students from Sai Prudent will be considered for an internship at <strong>RISE in Austria, Europe</strong> with a monthly stipend of <strong>₹2 Lakhs</strong>.
              </p>
            </div>

            {/* Highlight 2: Ms. Pranavi Tummuru */}
            <div className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 transition-colors space-y-1">
              <div className="flex items-center justify-between gap-1 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-100/80 border border-blue-200 px-2 py-0.5 rounded-full font-mono">
                  TU Wien, Austria
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">World Top University</span>
              </div>
              <h4 className="font-bold text-navy-950 text-xs pt-0.5 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Ms. Pranavi Tummuru — MS Informatics</span>
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Sent to undergo her <strong>MS in Business Informatics at TU Wien, Austria</strong>, after completing an internship at RISE Austria for three months.
              </p>
            </div>

            {/* Highlight 3: Ms. Karizma */}
            <div className="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 transition-colors space-y-1">
              <div className="flex items-center justify-between gap-1 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100/80 border border-emerald-200 px-2 py-0.5 rounded-full font-mono">
                  RISE, India Placement
                </span>
                <span className="text-xs font-black text-emerald-800 bg-emerald-100/90 border border-emerald-200 px-2 py-0.5 rounded">
                  ₹6 LPA Package
                </span>
              </div>
              <h4 className="font-bold text-navy-950 text-xs pt-0.5 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Ms. Karizma Placed with RISE</span>
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Ms. Karizma secured placement with <strong>RISE, India</strong> with a package of <strong>₹6 Lakhs/annum</strong>. Both Karizma and Pranavi completed internships at RISE Austria for 3 months.
              </p>
            </div>

          </div>

          {/* Quick Apply CTA Button */}
          <button
            onClick={() => onNavigate && onNavigate('register')}
            className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-xs hover:shadow-md transition flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>Apply for Sai Prudent Scholarship</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Official Helpline Numbers (Compact Pills) */}
          <div className="pt-4 border-t border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-navy-950 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                Official Helpline Numbers
              </span>
              <span className="text-[10px] text-slate-500 font-medium">Admissions Desk</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
              {[
                { num: '9100974536', label: '91009 74536' },
                { num: '9100974530', label: '91009 74530' },
                { num: '9100974543', label: '91009 74543' }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={`tel:+91${item.num}`}
                  className="px-2 py-1.5 bg-slate-50 hover:bg-amber-50 text-navy-950 hover:text-amber-900 border border-slate-200 hover:border-amber-300 rounded-lg font-mono font-bold text-[11px] text-center transition shadow-2xs block"
                  title={`Call ${item.label}`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Examination Venue & Timings (Integrated) */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs space-y-1.5">
            <div className="flex items-center justify-between font-bold text-navy-950">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                Examination Venue
              </span>
              <span className="text-[10px] text-slate-500 font-mono font-medium">2 Hours • 8:00 AM</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Sanskrithi School of Engineering & Business, Beedupalle, College Area, Bade Nayak Thanda, Puttaparthi, AP 515134
            </p>
            <div className="pt-0.5">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:text-amber-800 transition cursor-pointer"
              >
                <span>Open Location in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* High-Resolution Poster Lightbox Modal */}
      {showPosterModal && (
        <div 
          onClick={() => setShowPosterModal(false)}
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn cursor-zoom-out"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden cursor-default max-h-[94vh] flex flex-col"
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

            <div className="p-2 sm:p-4 overflow-auto flex-1 flex items-center justify-center bg-slate-950">
              <img 
                src="/images/rise_austria_banner.jpg" 
                alt="Sai Prudent Scholarship RISE Austria Banner"
                className="w-full h-auto max-h-[78vh] object-contain rounded-xl shadow-lg"
                onError={(e) => { e.target.src = 'images/rise_austria_banner.jpg'; }}
              />
            </div>

            <div className="px-5 py-3 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
              <div className="font-medium text-navy-950">
                Beedupalle, College Area, Bade Nayak Thanda, Puttaparthi, AP 515134 • Duration: 2 Hours
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
