import React from 'react';
import { Phone, MessageSquare, MapPin, ArrowRight } from 'lucide-react';

export default function HelplineContactSection() {
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
          
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200 space-y-3 shadow-2xs hover:border-amber-300 transition">
            <div className="w-12 h-12 bg-amber-50 text-amber-800 rounded-2xl flex items-center justify-center border border-amber-200/80">
              <Phone className="w-6 h-6 text-amber-700" />
            </div>
            <h4 className="font-bold text-base text-navy-950">Telecalling & Helpline</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Immediate telephone support for online registration queries and hall ticket corrections.
            </p>
            <div className="pt-2 text-xs font-mono font-bold text-navy-950 space-y-1">
              <div>+91 91009 66777</div>
              <div>+91 91009 66778</div>
              <div>+91 91009 66779</div>
            </div>
          </div>

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
                href="https://wa.me/919100966777?text=Hi%20Sai%20Prudent%20Scholarship%20Helpdesk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition shadow-2xs"
              >
                <span>Chat on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200 space-y-3 shadow-2xs hover:border-navy-300 transition">
            <div className="w-12 h-12 bg-navy-50 text-navy-900 rounded-2xl flex items-center justify-center border border-navy-200/80">
              <MapPin className="w-6 h-6 text-navy-900" />
            </div>
            <h4 className="font-bold text-base text-navy-950">Examination Venue</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sanskrithi School of Business & School of Engineering Campus.
            </p>
            <div className="pt-2 text-xs text-slate-700 space-y-0.5">
              <div className="font-bold text-navy-950">Behind Sai Super Speciality Hospital</div>
              <div>Beedupalli Road, Prasanthi Gram</div>
              <div>Puttaparthi – 515134, Sri Sathya Sai Dist., AP</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
