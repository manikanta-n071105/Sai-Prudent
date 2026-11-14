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
  Calendar,
  CheckCircle2
} from 'lucide-react';

export default function ModuleHeaderBanner({ 
  badge, 
  title, 
  highlightText,
  description, 
  features = [],
  imageSrc,
  imageAlt,
  imageCaption,
  imageBadge,
  ctaText,
  ctaAction,
  onNavigate 
}) {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Beedupalle,+College+Area,+Bade+Nayak+Thanda,+Puttaparthi,+Andhra+Pradesh+515134";

  return (
    <div className="w-full bg-gradient-to-b from-navy-50/70 via-white to-slate-50 border-b border-slate-200/90 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column (7 cols): Module Info */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full text-left">
            <div className="space-y-4">
              {badge && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-navy-950 border border-slate-200/90 shadow-2xs text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>{badge}</span>
                </div>
              )}
              
              <h1 className="text-3xl sm:text-4xl lg:text-4xl font-black text-navy-950 tracking-tight leading-tight">
                {title}
                {highlightText && (
                  <span className="block text-amber-600">
                    {highlightText}
                  </span>
                )}
              </h1>

              {description && (
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl">
                  {description}
                </p>
              )}

              {/* Quick feature pills */}
              {features && features.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {features.map((f, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </span>
                  ))}
                </div>
              )}

              {ctaText && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={ctaAction}
                    className="w-full sm:w-auto justify-center px-6 py-3.5 bg-navy-950 hover:bg-navy-900 text-amber-400 font-black rounded-xl text-sm transition shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer group active:scale-98"
                  >
                    <span>{ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>

            {/* Authentic Module Photo - Perfectly aligned to bottom with right card */}
            {imageSrc && (
              <div className="pt-4 flex-1 flex flex-col min-h-0">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-md group flex-1 min-h-[220px] w-full">
                  <img
                    src={imageSrc}
                    alt={imageAlt || title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      if (!e.target.src.startsWith('/')) {
                        e.target.src = '/' + imageSrc;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/25 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-semibold flex items-center justify-between gap-2 z-10">
                    <span className="truncate drop-shadow-sm">{imageCaption || title}</span>
                    {imageBadge && (
                      <span className="shrink-0 text-[10px] bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded-full shadow-xs">
                        {imageBadge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (5 cols): RISE Austria Card with 4 Paragraphs */}
          <div className="lg:col-span-5 w-full h-full flex flex-col">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden h-full flex flex-col">
              {/* Card Top Accent Bar */}
              <div className="h-2 bg-gradient-to-r from-navy-950 via-amber-500 to-navy-950 shrink-0" />

              <div className="p-5 sm:p-6 space-y-3.5 flex-1 flex flex-col justify-between">
                {/* Card Title Bar */}
                <div className="flex items-center justify-between gap-2 flex-wrap border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 font-mono">
                        Global Opportunities
                      </span>
                    </div>
                    <h3 className="text-base font-black text-navy-950 tracking-tight mt-1">
                      RISE Austria & Europe Pathways
                    </h3>
                  </div>
                  <span className="text-[11px] font-black text-emerald-800 bg-emerald-100/90 border border-emerald-200 px-2 py-0.5 rounded">
                    ₹2 Lakhs / Mo
                  </span>
                </div>

                {/* The 4 Core Paragraphs */}
                <div className="space-y-2.5 text-xs">
                  {/* Para 1: Top 5 Selection & ₹2L Stipend */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 hover:bg-amber-50/40 transition-colors">
                    <div className="flex items-center justify-between gap-1 flex-wrap">
                      <span className="text-[10px] font-bold text-amber-900 uppercase font-mono">1. Austria Internship</span>
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Top 5 Students</span>
                    </div>
                    <p className="text-slate-700 leading-snug">
                      Top 5 students from Sai Prudent will be considered for an internship at <strong>RISE in Austria, Europe</strong> with a monthly stipend of <strong>₹2 Lakhs</strong>.
                    </p>
                  </div>

                  {/* Para 2: Pranavi TU Wien */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 hover:bg-blue-50/40 transition-colors">
                    <div className="flex items-center justify-between gap-1 flex-wrap">
                      <span className="text-[10px] font-bold text-blue-900 uppercase font-mono">2. TU Wien, Austria</span>
                      <span className="text-[10px] text-slate-500 font-semibold">World Top University</span>
                    </div>
                    <p className="text-slate-700 leading-snug">
                      <strong>Ms. Pranavi Tummuru</strong> sent to pursue her <strong>MS in Business Informatics at TU Wien, Austria</strong>, one of the top universities in the world.
                    </p>
                  </div>

                  {/* Para 3: Karizma Placement */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 hover:bg-emerald-50/40 transition-colors">
                    <div className="flex items-center justify-between gap-1 flex-wrap">
                      <span className="text-[10px] font-bold text-emerald-900 uppercase font-mono">3. RISE India Placement</span>
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">₹6 Lakhs / Annum</span>
                    </div>
                    <p className="text-slate-700 leading-snug">
                      <strong>Ms. Karizma</strong> placed with <strong>RISE, India</strong> with a package of <strong>₹6 Lakhs per annum</strong>.
                    </p>
                  </div>

                  {/* Para 4: Dual Internship */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 hover:bg-amber-50/30 transition-colors">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-navy-900 uppercase font-mono">4. European Internship</span>
                    </div>
                    <p className="text-slate-700 leading-snug">
                      Both <strong>Karizma and Pranavi completed a 3-month internship at RISE Austria</strong>.
                    </p>
                  </div>
                </div>

                {/* Helpline Numbers */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-navy-950 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-amber-600" />
                      Help Lines:
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">Official Admissions Desk</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { num: '9100974536', label: '91009 74536' },
                      { num: '9100974530', label: '91009 74530' },
                      { num: '9100974543', label: '91009 74543' }
                    ].map((item, idx) => (
                      <a
                        key={idx}
                        href={`tel:+91${item.num}`}
                        className="py-1 px-1 bg-slate-50 hover:bg-amber-50 text-navy-950 border border-slate-200 hover:border-amber-300 rounded-lg font-mono font-bold text-[10px] text-center transition shadow-2xs"
                        title={`Call ${item.label}`}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Venue & Timings */}
                <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/80 text-[11px] space-y-1">
                  <div className="flex items-center justify-between font-bold text-navy-950 text-[10px]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-600" />
                      Puttaparthi Campus
                    </span>
                    <span className="text-slate-500 font-mono">Duration: 2hrs • Report: 8:00 AM</span>
                  </div>
                  <p className="text-[10px] text-slate-600 leading-tight">
                    Beedupalle, College Area, Bade Nayak Thanda, Puttaparthi, AP 515134
                  </p>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 hover:text-amber-800"
                  >
                    <span>Open Location in Google Maps</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

