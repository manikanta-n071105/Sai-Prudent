import React from 'react';
import { 
  Building2, 
  Briefcase, 
  Trophy, 
  HeartHandshake, 
  Crown, 
  Medal, 
  Award,
  ArrowRight,
  Sparkles,
  Laptop,
  Tablet,
  Box,
  Globe
} from 'lucide-react';

export default function BenefitsPrizesSection({ onNavigate }) {
  const benefits = [
    {
      icon: Globe,
      iconColor: 'text-amber-800 bg-amber-100',
      title: 'RISE Internship in Austria, Europe (₹2 Lakhs / Month)',
      desc: 'The top 5 students from Sai Prudent will be considered for an elite internship at RISE in Austria, Europe, with an extraordinary monthly stipend of ₹2 Lakhs.',
      tag: 'Global Selection • ₹2L/Mo'
    },
    {
      icon: Building2,
      iconColor: 'text-navy-900 bg-navy-50',
      title: '50% Scholarship on Hostel & Bus Transport',
      desc: 'Significant financial relief covering half of all hostel boarding, mess, and regional college bus transportation costs throughout the program.',
      tag: '50% Subsidy'
    },
    {
      icon: Briefcase,
      iconColor: 'text-amber-800 bg-amber-50',
      title: 'Industry Internships with Monthly Stipend',
      desc: 'Hands-on practical industry exposure from early semesters with guaranteed monthly stipends to ensure students earn while they learn.',
      tag: 'Paid Training'
    },
    {
      icon: Trophy,
      iconColor: 'text-amber-700 bg-amber-100/60',
      title: 'Special Honors for Top Performers',
      desc: 'Prestigious state-level recognition, trophies, commendation certificates, and direct mentorship from European and Indian technical leaders.',
      tag: 'Honor & Glory'
    }
  ];

  const topperPrizes = [
    {
      rank: 'Global Selection — Top 5 Scholars',
      prize: 'RISE Austria Internship (₹2L/Month) & TU Wien Pathway',
      prizeIcon: Globe,
      desc: 'The top 5 students from Sai Prudent will be considered for an internship at RISE in Austria, Europe with a monthly stipend of ₹2 Lakhs, alongside postgraduate pathways at TU Wien, Austria.',
      badgeText: 'International Glory',
      badgeClass: 'bg-emerald-400 text-slate-950 font-black',
      iconBadge: Sparkles,
      cardBorder: 'border-emerald-400/80 bg-emerald-950/20'
    },
    {
      rank: 'Rank 1 — State Topper',
      prize: 'Free High-Performance Laptop',
      prizeIcon: Laptop,
      desc: 'Equipped with the latest multi-core processor, dedicated graphics, 16GB RAM, and SSD for advanced coding, AI development, and engineering simulations.',
      badgeText: 'Gold Excellence Award',
      badgeClass: 'bg-amber-400 text-slate-950 font-black',
      iconBadge: Crown,
      cardBorder: 'border-amber-400/50 bg-white/10'
    },
    {
      rank: 'Rank 2 — Second Topper',
      prize: 'Free Samsung Galaxy Tablet',
      prizeIcon: Tablet,
      desc: 'High-resolution digital tablet with stylus support for digital note-taking, interactive engineering lectures, e-library access, and mobile coding.',
      badgeText: 'Silver Merit Award',
      badgeClass: 'bg-slate-200 text-slate-900 font-extrabold',
      iconBadge: Medal,
      cardBorder: 'border-slate-300/40 bg-white/10'
    }
  ];

  return (
    <section id="benefits" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
            Transformative Opportunities
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            Special Scholarship Benefits & Exciting Prizes
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Participating in the SAIPRUDENT Exam gives students an opportunity to earn life-changing 
            scholarships, industry stipends, and prestigious technology prizes.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {benefits.map((b, idx) => {
            const IconComponent = b.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200 hover:bg-white hover:shadow-xl hover:border-navy-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-2xl ${b.iconColor} flex items-center justify-center group-hover:scale-105 transition`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-navy-100 text-navy-900 px-2.5 py-0.5 rounded-full">
                      {b.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-navy-950 mb-2 leading-snug">
                    {b.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Exciting Prizes for Toppers Showcase */}
        <div className="bg-gradient-to-br from-navy-950 via-slate-900 to-navy-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl space-y-10 border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto space-y-2 relative z-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              Honoring Academic Excellence
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Exciting Prizes for Examination Toppers
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Awarded during the grand convocation at Sanskrithi Campus in the presence of international partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {topperPrizes.map((p, i) => {
              const BadgeIcon = p.iconBadge;
              const PrizeIcon = p.prizeIcon;
              return (
                <div
                  key={i}
                  className={`backdrop-blur-md rounded-3xl p-6 sm:p-7 border ${p.cardBorder} hover:border-amber-400 transition-all flex flex-col justify-between group shadow-xl`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] ${p.badgeClass} shadow-2xs`}>
                        <BadgeIcon className="w-3.5 h-3.5" />
                        <span>{p.badgeText}</span>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
                        <PrizeIcon className="w-4 h-4" />
                      </div>
                    </div>
                    <h4 className="text-xl font-black text-white mb-1 tracking-tight">
                      {p.prize}
                    </h4>
                    <div className="text-xs text-amber-200/90 font-mono font-semibold mb-3">
                      {p.rank}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Full Merit Certificate</span>
                    <span>•</span>
                    <span>Institutional Trophy</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Alumni Placements & Career Impact */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group z-10">
            <img 
              src="images/official_banner.jpg" 
              alt="Star Alumni Placed at Global Leaders" 
              className="w-full h-56 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => { e.target.src = '/images/official_banner.jpg'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-white">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/30">
                  Global Placements & Career Trajectory
                </span>
                <h4 className="text-base sm:text-lg font-black mt-1">
                  From Free Education to Global Engineering Careers
                </h4>
                <p className="text-xs text-slate-300 max-w-xl">
                  Scholars supported by Sai Prudent now excel at RISE (Austria), Google, Amazon, Deloitte, TCS, EY, and PayPal.
                </p>
              </div>
              <div className="text-[11px] font-semibold text-slate-300 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 shrink-0 self-start sm:self-auto">
                21+ Top Tier Brands
              </div>
            </div>
          </div>

          <div className="text-center pt-2 relative z-10">
            <button
              onClick={() => onNavigate('register')}
              className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl shadow-lg transition transform hover:-translate-y-0.5 text-sm inline-flex items-center gap-2"
            >
              <span>Register Now to Compete for Prizes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
