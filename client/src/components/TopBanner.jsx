import React from 'react';
import { Phone, Sparkles, FileText } from 'lucide-react';

export default function TopBanner({ onNavigate }) {
  return (
    <div className="bg-gradient-to-r from-slate-950 via-navy-950 to-slate-950 text-amber-300 py-2 px-3 sm:px-4 text-xs font-medium border-b border-amber-500/20 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2.5 text-center sm:text-left">
        {/* Left: Official Notice Badge & Text */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-center sm:justify-start min-w-0 max-w-full">
          <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 text-[10px] uppercase font-black px-2 py-0.5 rounded-full tracking-wide shadow-2xs shrink-0 whitespace-nowrap">
            <Sparkles className="w-3 h-3 text-slate-950" />
            Official Notice
          </span>
          <span className="text-slate-200 text-[11px] sm:text-xs">
            SAIPRUDENT Scholarship Test 2025–26 • <strong className="text-amber-400 font-bold">100% Free of Cost</strong>
          </span>
          <span className="hidden xl:inline text-slate-500">•</span>
          <span className="hidden xl:inline text-slate-300 truncate">
            Exam Center: Sanskrithi Campus, Puttaparthi (Walk-ins with College ID permitted)
          </span>
        </div>

        {/* Right: Contact Helpline & Hall Ticket Quick Link */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 text-slate-300 flex-wrap justify-center sm:justify-end text-[11px] sm:text-xs shrink-0">
          <a
            href="tel:+919100966777"
            className="hover:text-amber-300 transition flex items-center gap-1 font-medium whitespace-nowrap"
          >
            <Phone className="w-3 h-3 text-amber-400 shrink-0" />
            <span>Helpline: +91 91009 66777</span>
          </a>
          <span className="text-slate-600 hidden xs:inline">•</span>
          <button
            onClick={() => onNavigate('hallticket')}
            className="text-amber-400 hover:text-amber-300 underline font-semibold transition flex items-center gap-1 whitespace-nowrap cursor-pointer"
          >
            <FileText className="w-3 h-3 shrink-0" />
            <span>Download Admit Card</span>
          </button>
        </div>
      </div>
    </div>
  );
}
