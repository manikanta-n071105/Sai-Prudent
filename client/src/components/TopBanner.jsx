import React from 'react';
import { Phone, Sparkles, FileText, Lock } from 'lucide-react';

export default function TopBanner({ onNavigate }) {
  return (
    <div className="bg-gradient-to-r from-slate-950 via-navy-950 to-slate-950 text-amber-300 py-2 px-4 text-xs font-medium border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
        {/* Left: Official Notice Badge & Text */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-center sm:justify-start min-w-0">
          <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full tracking-wide shadow-2xs shrink-0 whitespace-nowrap">
            <Sparkles className="w-3 h-3 text-slate-950" />
            Official Notice
          </span>
          <span className="text-slate-200 truncate">
            SAIPRUDENT Scholarship Test 2025–26 Registration is Open. <strong className="text-amber-400 font-bold">100% Free of Cost.</strong>
          </span>
          <span className="hidden xl:inline text-slate-500">•</span>
          <span className="hidden xl:inline text-slate-300 truncate">
            Exam Center: Sanskrithi Campus, Puttaparthi (Walk-ins with College ID permitted)
          </span>
        </div>

        {/* Right: Contact Helpline, Hall Ticket Quick Link, and Staff Admin Access */}
        <div className="flex items-center gap-3.5 text-slate-300 shrink-0 whitespace-nowrap">
          <a
            href="tel:+919100966777"
            className="hover:text-amber-300 transition flex items-center gap-1.5 font-medium whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="whitespace-nowrap">Helpline: +91 91009 66777</span>
          </a>
          <button
            onClick={() => onNavigate('hallticket')}
            className="text-amber-400 hover:text-amber-300 underline font-semibold transition flex items-center gap-1 whitespace-nowrap"
          >
            <FileText className="w-3 h-3 shrink-0" />
            <span className="whitespace-nowrap">Download Hall Ticket</span>
          </button>
          <button
            onClick={() => onNavigate('admin')}
            className="text-slate-400 hover:text-amber-300 transition flex items-center gap-1 text-[11px] font-semibold whitespace-nowrap px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800 hover:border-amber-400/40"
            title="Authorized Examination Cell Only"
          >
            <Lock className="w-3 h-3 text-amber-400 shrink-0" />
            <span>Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
}

