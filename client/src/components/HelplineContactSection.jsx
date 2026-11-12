import React from 'react';
import { Phone, MessageSquare, MapPin, ArrowRight, ExternalLink } from 'lucide-react';

export default function HelplineContactSection() {
  const googleMapsUrl = "https://maps.app.goo.gl/45cpjoJ8dMdT9gWRA";

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold uppercase tracking-wider">
            Candidate Helpline & Campus Venue
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            We Are Here to Guide Every Student
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Have questions about eligibility, test centers, bus transport, or walk-in arrangements? 
            Reach out to our student helpline team.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Helplines */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200 space-y-3 shadow-2xs hover:border-amber-300 transition">
            <div className="w-12 h-12 bg-amber-50 text-amber-800 rounded-2xl flex items-center justify-center border border-amber-200/80">
              <Phone className="w-6 h-6 text-amber-700" />
            </div>
            <h4 className="font-bold text-base text-navy-950">Official Helpline Numbers</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Telephone support for candidate registration, exam centers, and hall ticket assistance.
            </p>
            <div className="pt-2 text-xs font-mono font-bold text-navy-950 space-y-1.5">
              <div>
                <a href="tel:+919100974536" className="hover:text-amber-700 transition flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>+91 91009 74536</span>
                </a>
              </div>
              <div>
                <a href="tel:+919100974530" className="hover:text-amber-700 transition flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>+91 91009 74530</span>
                </a>
              </div>
              <div>
                <a href="tel:+919100974543" className="hover:text-amber-700 transition flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>+91 91009 74543</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: WhatsApp & Support */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200 space-y-3 shadow-2xs hover:border-emerald-300 transition">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-800 rounded-2xl flex items-center justify-center border border-emerald-200/80">
              <MessageSquare className="w-6 h-6 text-emerald-700" />
            </div>
            <h4 className="font-bold text-base text-navy-950">WhatsApp Assistance</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Get instant automated reminders, syllabus PDFs, and walk-in guidance via WhatsApp.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/919100974536?text=Hi%20Sai%20Prudent%20Scholarship%20Helpdesk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition shadow-2xs"
              >
                <span>Chat on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 3: Venue & Google Maps */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200 space-y-3 shadow-2xs hover:border-navy-300 transition">
            <div className="w-12 h-12 bg-navy-50 text-navy-900 rounded-2xl flex items-center justify-center border border-navy-200/80">
              <MapPin className="w-6 h-6 text-navy-900" />
            </div>
            <h4 className="font-bold text-base text-navy-950">Examination Venue</h4>
            <div className="text-xs text-slate-700 space-y-1 leading-relaxed">
              <div className="font-bold text-navy-950">Sanskrithi School of Engineering & Business</div>
              <div>Beedupalle, College Area, Bade Nayak Thanda,</div>
              <div>Puttaparthi, Andhra Pradesh 515134</div>
              <div className="text-[11px] text-slate-500 pt-0.5">
                Exam Duration: <strong>2 Hours</strong> • Reporting: <strong>8:00 AM</strong>
              </div>
            </div>
            <div className="pt-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-navy-950 text-white rounded-xl text-xs font-bold hover:bg-navy-900 transition shadow-2xs"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
