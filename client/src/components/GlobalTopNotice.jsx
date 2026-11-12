import React, { useState } from 'react';
import { Sparkles, Phone, MapPin, ZoomIn, X, ExternalLink } from 'lucide-react';

export default function GlobalTopNotice({ onNavigate }) {
  const [showPosterModal, setShowPosterModal] = useState(false);
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Beedupalle,+College+Area,+Bade+Nayak+Thanda,+Puttaparthi,+Andhra+Pradesh+515134";

  return (
    <>
      <div className="bg-gradient-to-r from-amber-500/10 via-white to-blue-500/10 border-b border-amber-300/40 py-2 px-3 sm:px-4 text-xs text-slate-800 print:hidden w-full select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5 sm:gap-2 text-center md:text-left">
          
          {/* Left: Global Opportunity Announcement */}
          <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start min-w-0">
            <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full tracking-wide shadow-2xs shrink-0 whitespace-nowrap">
              <Sparkles className="w-3 h-3 text-slate-950" />
              RISE Austria Selection
            </span>
            <span className="text-slate-800 text-[11px] sm:text-xs font-semibold">
              Top 5 students from Sai Prudent considered for RISE Internship in Austria, Europe • <strong className="text-emerald-800 font-bold">Monthly Stipend: ₹2 Lakhs</strong>
            </span>
          </div>

          {/* Right: Helplines, Location & Poster Modal Action */}
          <div className="flex items-center gap-2.5 sm:gap-3 text-slate-600 flex-wrap justify-center md:justify-end text-[11px] sm:text-xs shrink-0">
            <a
              href="tel:+919100974536"
              className="hover:text-navy-950 font-medium flex items-center gap-1 transition"
              title="Call Helpline: 91009 74536 / 74530 / 74543"
            >
              <Phone className="w-3 h-3 text-amber-600 shrink-0" />
              <span>Helpline: +91 91009 74536 / 74530 / 74543</span>
            </a>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-navy-950 font-medium flex items-center gap-1 transition hidden lg:flex"
            >
              <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
              <span>Puttaparthi Campus</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </a>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <button
              onClick={() => setShowPosterModal(true)}
              className="text-amber-800 hover:text-amber-900 font-bold hover:underline transition flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <ZoomIn className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>View Official Poster</span>
            </button>
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
            className="relative bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden cursor-default max-h-[94vh] flex flex-col"
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
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-navy-900 transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Poster Image Full-View */}
            <div className="p-2 sm:p-4 overflow-auto flex-1 flex items-center justify-center bg-slate-950">
              <img 
                src="/images/rise_austria_banner.jpg" 
                alt="Sai Prudent Scholarship RISE Austria Banner"
                className="w-full h-auto max-h-[78vh] object-contain rounded-xl shadow-lg"
                onError={(e) => { e.target.src = 'images/rise_austria_banner.jpg'; }}
              />
            </div>

            {/* Modal Footer Info */}
            <div className="px-5 py-3 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
              <div className="font-medium text-navy-950">
                Beedupalle, College Area, Bade Nayak Thanda, Puttaparthi, AP 515134 • Duration: 2 Hours (8:00 AM)
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
    </>
  );
}
