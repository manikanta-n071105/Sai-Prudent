import React from 'react';
import { 
  Globe, 
  GraduationCap, 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  MapPin, 
  ExternalLink,
  Clock,
  Calendar
} from 'lucide-react';

export default function RiseInfoSidebar({ onNavigate }) {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Beedupalle,+College+Area,+Bade+Nayak+Thanda,+Puttaparthi,+Andhra+Pradesh+515134";

  return (
    <aside className="print:hidden w-full select-none">
      {/* Clean Executive Card - Strictly Text & Contact Details (No Poster) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        
        {/* Top Decorative Gradient Accent */}
        <div className="h-1.5 bg-gradient-to-r from-navy-950 via-amber-500 to-navy-950" />

        <div className="p-5 sm:p-6 space-y-5">
          
          {/* Header */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-navy-950 border border-slate-200 text-[10px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Global Opportunities
              </span>
              <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Austria & TU Wien
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-navy-950 tracking-tight leading-snug">
              RISE Austria & Europe Pathways
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Strategic international collaboration with <strong>RISE (Vienna, Austria)</strong>, <strong>TU Wien</strong>, and <strong>Anahata Stiftung (Germany)</strong>.
            </p>
          </div>

          {/* The 4 Core Paragraphs */}
          <div className="space-y-3 pt-1">
            
            {/* Para 1: Top 5 Selection & ₹2 Lakhs Stipend */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 hover:bg-amber-50/50 transition-colors">
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
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                The top 5 students from Sai Prudent will be considered for an internship at <strong>RISE in Austria, Europe</strong>. A monthly stipend of <strong>₹2 Lakhs</strong> will be given to the interns.
              </p>
            </div>

            {/* Para 2: Pranavi Tummuru MS at TU Wien */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 hover:bg-blue-50/50 transition-colors">
              <div className="flex items-center justify-between gap-1 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-100/80 border border-blue-200 px-2 py-0.5 rounded-full font-mono">
                  TU Wien, Austria
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">World Top University</span>
              </div>
              <h4 className="font-bold text-navy-950 text-xs pt-0.5 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Ms. Pranavi Tummuru — MS in Business Informatics</span>
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Also, this year we have sent <strong>Pranavi Tummuru</strong> to undergo her <strong>MS in Business Informatics at TU Wien, Austria</strong>, one of the top universities in the world.
              </p>
            </div>

            {/* Para 3: Karizma Placement at ₹6 LPA */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 hover:bg-emerald-50/50 transition-colors">
              <div className="flex items-center justify-between gap-1 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100/80 border border-emerald-200 px-2 py-0.5 rounded-full font-mono">
                  RISE, India Placement
                </span>
                <span className="text-xs font-black text-emerald-800 bg-emerald-100/90 border border-emerald-200 px-2 py-0.5 rounded">
                  ₹6 Lakhs / Annum
                </span>
              </div>
              <h4 className="font-bold text-navy-950 text-xs pt-0.5 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Ms. Karizma Placed with RISE</span>
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                <strong>Ms. Karizma</strong> got placement with <strong>RISE, India</strong> with a package of <strong>₹6 Lakhs per annum</strong>.
              </p>
            </div>

            {/* Para 4: Both Karizma and Pranavi Austria Internship */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 hover:bg-amber-50/40 transition-colors">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-navy-900 bg-slate-200 px-2 py-0.5 rounded-full font-mono">
                  3-Month European Experience
                </span>
              </div>
              <h4 className="font-bold text-navy-950 text-xs pt-0.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Dual European Internships</span>
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Also, <strong>Karizma and Pranavi both underwent an internship at RISE Austria for three months</strong>.
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

          {/* Official Helpline Numbers */}
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

          {/* Examination Venue & Timings */}
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs space-y-1.5">
            <div className="flex items-center justify-between font-bold text-navy-950">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                Examination Venue
              </span>
              <span className="text-[10px] text-slate-500 font-mono font-medium">2 Hours • 8:00 AM</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Sanskrithi School of Engineering & Business, Beedupalle, College Area, Bade Nayak Thanda, Puttaparthi, Andhra Pradesh 515134
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
    </aside>
  );
}
