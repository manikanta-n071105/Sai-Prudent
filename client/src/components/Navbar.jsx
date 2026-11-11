import React, { useState } from 'react';
import { Lock, ArrowRight, Menu, X, FileText, Ticket } from 'lucide-react';

export default function Navbar({ activeTab, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Streamlined primary student navigation items (clean single-line, zero admin clutter)
  const primaryNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'talent-test', label: 'Talent Test' },
    { id: 'benefits', label: 'Scholarships' },
    { id: 'results', label: 'Results & Merit' }
  ];

  // Full navigation items for mobile drawer
  const allNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'talent-test', label: 'Talent Test Pattern' },
    { id: 'benefits', label: 'Scholarships & Rewards' },
    { id: 'register', label: 'Candidate Registration / Sign In' },
    { id: 'hallticket', label: 'Download Admit Card' },
    { id: 'results', label: 'Results & Merit Ranks' }
  ];

  const handleNav = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Institution Branding */}
          <div 
            onClick={() => handleNav('home')} 
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none min-w-0"
          >
            <img 
              src="/logo.jpg" 
              alt="Sanskrithi Logo" 
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-cover shadow-md border border-slate-200/80 group-hover:scale-105 transition-all shrink-0" 
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-base sm:text-lg text-navy-950 tracking-tight whitespace-nowrap group-hover:text-amber-700 transition">
                  SAI PRUDENT
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200/80 px-2 py-0.5 rounded-full whitespace-nowrap">
                  Estd. 2015
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate max-w-[180px] xs:max-w-[240px] sm:max-w-none">
                Sanskrithi Educational Society • Puttaparthi
              </p>
              <p className="text-[10px] text-slate-400 hidden xl:block whitespace-nowrap">
                Supported by Anahata Stiftung (Germany) & RISE (Austria)
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links (Clean Single-Line with whitespace-nowrap) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
            {primaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`whitespace-nowrap px-4 py-2 text-xs xl:text-sm transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-100 text-navy-950 font-bold rounded-xl border-b-[3px] border-amber-500 shadow-2xs'
                      : 'text-slate-600 hover:text-navy-950 hover:bg-slate-50 font-semibold rounded-xl border-b-[3px] border-transparent'
                  } ${item.isSecure ? 'text-navy-900 font-bold' : ''}`}
                >
                  {item.isSecure && (
                    <Lock className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                  )}
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick CTA Actions (Admit Card + Apply Online) */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => handleNav('hallticket')}
              className={`whitespace-nowrap px-3.5 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-2xs border ${
                activeTab === 'hallticket'
                  ? 'bg-navy-950 text-white border-navy-950 shadow'
                  : 'text-navy-900 bg-white border-slate-300 hover:bg-slate-50'
              }`}
            >
              <FileText className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'hallticket' ? 'text-amber-400' : 'text-slate-500'}`} />
              <span className="whitespace-nowrap">Admit Card</span>
            </button>

            <button
              onClick={() => handleNav('register')}
              className={`whitespace-nowrap px-4 py-2 text-xs font-black rounded-xl shadow-xs hover:shadow-sm transition transform hover:-translate-y-0.5 flex items-center gap-1.5 ${
                activeTab === 'register'
                  ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400 ring-offset-2'
                  : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
              }`}
            >
              <span className="whitespace-nowrap">Apply Online</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-navy-950 hover:bg-slate-100 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1.5 shadow-xl animate-fadeIn">
          {allNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center justify-between ${
                activeTab === item.id
                  ? 'bg-navy-950 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2">
                {item.isSecure && <Lock className="w-4 h-4 opacity-70" />}
                {item.label}
              </span>
              <ArrowRight className="w-4 h-4 opacity-50" />
            </button>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => handleNav('register')}
              className="w-full py-2.5 text-center text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs transition"
            >
              Apply Online (Free of Cost)
            </button>
            <button
              onClick={() => handleNav('hallticket')}
              className="w-full py-2.5 text-center text-xs font-bold text-navy-950 border border-slate-300 hover:bg-slate-50 rounded-xl transition"
            >
              Download Hall Ticket
            </button>
            <button
              onClick={() => handleNav('admin')}
              className="w-full py-2 px-3 text-center text-xs font-bold text-slate-600 hover:text-navy-950 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition flex items-center justify-center gap-2 mt-1"
            >
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span>Staff Admin Examination Console</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

