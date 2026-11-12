import React from 'react';
import { ExternalLink, Phone, MapPin, Globe, Lock } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: Branding & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.jpg" 
                alt="Sanskrithi Logo" 
                className="w-10 h-10 rounded-xl object-cover shadow-sm shrink-0" 
              />
              <div>
                <span className="font-extrabold text-base text-white tracking-tight">
                  SAI PRUDENT SCHOLARSHIP
                </span>
                <p className="text-[11px] text-slate-500">
                  Instituted in 2015 • Sanskrithi Educational Society
                </p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              The Sai Prudent Scholarship Program provides prestigious merit scholarships, 50% hostel/bus subsidies, 
              and stipended industry internships for talented students from humble economic backgrounds 
              to pursue B.Tech and BBA degrees at Puttaparthi.
            </p>

            <div className="pt-2 text-[11px] text-slate-500 space-y-1">
              <div><strong>International Partners:</strong></div>
              <div>• Anahata Stiftung (Stuttgart, Germany)</div>
              <div>• RISE (Vienna, Austria)</div>
            </div>
          </div>

          {/* Col 3: Quick Portals */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition">
                  About & Mission Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('talent-test')} className="hover:text-amber-400 transition">
                  Test Pattern & Syllabus
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('benefits')} className="hover:text-amber-400 transition">
                  Scholarships & Laptops
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('register')} className="hover:text-amber-400 transition">
                  Apply Online (Channel 1)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Examination Desks */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm">Student Portals</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('hallticket')} className="hover:text-amber-400 transition">
                  Download Hall Ticket
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('results')} className="hover:text-amber-400 transition">
                  Check Exam Results & Rank
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('results')} className="hover:text-amber-400 transition">
                  Print Merit Certificate
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('attendance')} className="hover:text-amber-400 transition">
                  Coordinator Desk & Rooms
                </button>
              </li>
              <li>
                <a
                  href="https://forms.gle/Aoamr5bMkqMK99Hw7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>Official Google Form</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => onNavigate('admin')}
                  className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5 transition"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Admin Examination Console</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Campus Address */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm">Campus Center</h4>
            <p className="text-slate-400 leading-relaxed text-xs">
              Sanskrithi School of Engineering & Business<br />
              Beedupalle, College Area, Bade Nayak Thanda,<br />
              Puttaparthi, Andhra Pradesh 515134
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Beedupalle,+College+Area,+Bade+Nayak+Thanda,+Puttaparthi,+Andhra+Pradesh+515134"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline flex items-center gap-1 text-[11px] pt-0.5"
            >
              <MapPin className="w-3 h-3" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <div className="pt-2 text-[11px] text-amber-400 font-mono font-medium space-y-0.5">
              <div>+91 91009 74536</div>
              <div>+91 91009 74530</div>
              <div>+91 91009 74543</div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Sai Prudent Scholarship Program (SPS). All rights reserved.
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
            <button
              onClick={() => onNavigate('admin')}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition flex items-center gap-1.5 font-semibold text-xs shadow-2xs"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Examination Console</span>
            </button>
            <span className="hidden sm:inline">•</span>
            <span>Free Education For Deserving Talent</span>
            <span className="hidden sm:inline">•</span>
            <span>Sanskrithi Educational Society</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

