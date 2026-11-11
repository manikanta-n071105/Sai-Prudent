import React, { useState } from 'react';
import { Bell, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function AnnouncementsFaqSection({ announcements, faqs }) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 text-navy-900 border border-navy-200 text-xs font-bold uppercase tracking-wider">
            Notice Board & Support
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            Important Announcements & Guidelines
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Stay updated with official notifications, candidate advisories, and frequently asked questions.
          </p>
        </div>

        {/* 2-Column Grid: Announcements vs FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Announcements (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-bold text-navy-950 flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-600" />
              <span>Official Circulars & Advisories</span>
            </h3>

            <div className="space-y-4">
              {announcements.map((a) => (
                <div
                  key={a.id || a.title}
                  className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-2 hover:border-amber-400 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80">
                      {a.badge}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {a.date}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-navy-950">
                    {a.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {a.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Candidate Helpline Card */}
            <div className="bg-gradient-to-br from-navy-950 to-slate-900 text-white rounded-3xl p-6 shadow-md space-y-3 border border-slate-800">
              <span className="text-amber-400 text-[10px] font-black uppercase tracking-widest block">
                Module 4 • Candidate Communication Desk
              </span>
              <h4 className="text-lg font-bold text-white">
                SMS & WhatsApp Automated Alerts
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Registered students receive automated confirmation SMS, venue Google Map links, and exam morning reminders directly on their registered mobile numbers.
              </p>
              <div className="pt-2 text-xs text-amber-300 font-mono font-semibold">
                SMS Sender ID: VM-SANENG / SPS-ADM
              </div>
            </div>
          </div>

          {/* Right Column: FAQ Accordion (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xl font-bold text-navy-950 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-navy-900" />
              <span>Frequently Asked Questions</span>
            </h3>

            <div className="space-y-3">
              {faqs.map((f, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm text-navy-950 hover:bg-slate-50 transition"
                    >
                      <span className="leading-snug">{f.q}</span>
                      <span className="text-slate-400 shrink-0">
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {f.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
