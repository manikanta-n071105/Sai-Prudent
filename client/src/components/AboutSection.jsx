import React from 'react';
import { 
  BookOpen, 
  Globe, 
  Layers, 
  HeartHandshake, 
  Sparkles, 
  ArrowRight, 
  Building2,
  CheckCircle2,
  Phone,
  MapPin,
  ExternalLink,
  Award,
  Users
} from 'lucide-react';
import FounderProfileSection from './FounderProfileSection';

export default function AboutSection({ onNavigate, showHeader = true }) {
  const scrollToAnchor = (anchorId) => {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    { id: 'about-founder', label: 'Visionary Leadership', badge: 'Chairman Profile', icon: Award },
    { id: 'about-partners', label: 'Global Partners', badge: 'Europe Alliance', icon: Globe },
    { id: 'about-genesis', label: 'Genesis & Mission', badge: 'Estd. 2015', icon: BookOpen },
    { id: 'about-pillars', label: 'Four Pillars', badge: 'Student Aid', icon: Layers },
    { id: 'about-stories', label: 'Scholar Journeys', badge: 'Real Impact', icon: HeartHandshake },
  ];

  const pillars = [
    {
      num: '01',
      title: '100% Free Merit Talent Test',
      benefit: 'Zero Entry Cost',
      desc: 'Transparent statewide examination with zero application or hall ticket charges, ensuring every rural student has an equal starting line.',
    },
    {
      num: '02',
      title: 'Free Laptops & Tablets',
      benefit: 'Digital Equity',
      desc: 'Top state rankers are awarded brand-new laptops and tablets on merit felicitation day to bridge the digital divide immediately.',
    },
    {
      num: '03',
      title: '50% Hostel & Free Bus Transport',
      benefit: 'Zero Commute Barrier',
      desc: 'Substantial boarding mess subsidies and free college bus routes connecting 20+ surrounding mandals and villages directly to campus.',
    },
    {
      num: '04',
      title: 'European Pathways & Placements',
      benefit: 'Global Career Bridge',
      desc: 'Strategic collaboration with RISE (Austria) and TU Wien offering Vienna research internships with ₹2 Lakhs/month stipends and international placements.',
    },
  ];

  const stories = [
    {
      name: 'Ramesh Babu',
      village: 'Bukkapatnam',
      course: 'B.Tech Computer Science & Engineering',
      role: 'Software Engineer',
      quote:
        'Coming from a family of daily wage weavers, even college bus fees were a hurdle. The Sai Prudent Scholarship did not just cover my tuition—it gave me access to high-end programming labs, mock interview coaching, and the courage to compete nationally.',
    },
    {
      name: 'Haritha K.',
      village: 'Dharmavaram',
      course: 'B.Tech Electronics & Communication',
      role: 'IoT Embedded Developer',
      quote:
        'Being awarded Rank 1 in the Sai Prudent Talent Test gave me a brand-new free laptop and 100% tuition waiver. For a girl from a farming hamlet, this was nothing short of miraculous.',
    },
    {
      name: 'Pranavi Tummuru',
      village: 'Sanskrithi Scholar',
      course: 'MS in Business Informatics',
      role: 'TU Wien, Austria (Europe)',
      quote:
        'After completing my 3-month research internship at RISE in Vienna with a ₹2 Lakhs/month stipend, I received admission for my Master of Science at TU Wien. Sai Prudent turned a rural dream into a European career.',
    },
    {
      name: 'Ms. Karizma',
      village: 'Sanskrithi Scholar',
      course: 'B.Tech Graduate',
      role: 'RISE India (₹6 LPA Package)',
      quote:
        'Following my 3-month European research internship at RISE Austria, I secured a direct full-time industry placement with RISE India with an annual package of ₹6 Lakhs. Sai Prudent bridged our education straight to world industry.',
    },
  ];

  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Beedupalle,+College+Area,+Bade+Nayak+Thanda,+Puttaparthi,+Andhra+Pradesh+515134";

  return (
    <div id="about" className="space-y-12 sm:space-y-16 w-full text-slate-800">
      
      {/* Top Title Header */}
      {showHeader && (
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 text-navy-900 border border-navy-200 text-xs font-bold uppercase tracking-wider">
            Our Story & Core Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight leading-tight">
            Bridging the Gap Between Rural Talent and Global Opportunity
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Inspired by grassroots educational philanthropy, the Sai Prudent Scholarship program 
            empowers students whose brilliance might otherwise be extinguished by economic poverty.
          </p>
        </div>
      )}

      {/* Quick Jump Anchor Bar */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          <span className="hidden lg:flex items-center gap-1.5 text-xs font-black text-navy-950 px-2 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Storyline:</span>
          </span>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToAnchor(item.id)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap bg-slate-50 hover:bg-navy-950 text-slate-700 hover:text-white border border-slate-200 hover:border-navy-950 transition-all duration-200 flex items-center gap-2 cursor-pointer shrink-0 shadow-2xs group"
              >
                <Icon className="w-3.5 h-3.5 text-amber-600 group-hover:text-amber-300 transition-colors" />
                <span>{item.label}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200/80 group-hover:bg-white/20 text-slate-600 group-hover:text-amber-200">
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 1: VISIONARY LEADERSHIP & FOUNDER PROFILE */}
      <section id="about-founder" className="scroll-mt-36">
        <FounderProfileSection />
      </section>

      {/* SECTION 2: INTERNATIONAL PHILANTHROPIC PARTNERS & HELPLINE */}
      <section id="about-partners" className="scroll-mt-36">
        <div className="bg-gradient-to-br from-navy-950 via-slate-900 to-navy-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden space-y-8">
          <div className="relative z-10 space-y-3 max-w-2xl">
            <div className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold tracking-wider uppercase border border-amber-400/30">
              International Support & Technical Partners
            </div>
            <h4 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-snug">
              Powered by Global Philanthropic Solidarity
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              The Sai Prudent Scholarship Program is sustained through dedicated partnerships 
              with internationally recognized institutions that share our vision of educational equity:
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Anahata Stiftung */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-sm">
                    DE
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-white/15 px-2 py-0.5 rounded text-amber-300">
                    Stuttgart, Germany
                  </span>
                </div>
                <h5 className="font-black text-white text-lg">Anahata Stiftung (Germany)</h5>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Our international support partner based in Stuttgart, Germany. Anahata Stiftung provides philanthropic grant endowments that cover educational scholarships and living subsidies for economically disadvantaged scholars.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 text-xs text-amber-300 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Philanthropic Endowments & Living Subsidies</span>
              </div>
            </div>

            {/* RISE Austria & TU Wien */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-sm">
                    AT
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-white/15 px-2 py-0.5 rounded text-emerald-300">
                    Vienna, Austria
                  </span>
                </div>
                <h5 className="font-black text-white text-lg">RISE (Austria, Europe) & TU Wien</h5>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Our international partner from Vienna, Austria. Top 5 students from Sai Prudent are considered for a 3-month research internship at RISE in Austria with a monthly stipend of ₹2 Lakhs, with pathways to master's degrees at TU Wien.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 text-xs text-emerald-300 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>₹2 Lakhs/Mo Stipend • TU Wien MS Admissions</span>
              </div>
            </div>
          </div>

          {/* Help Desk & Location Information */}
          <div className="relative z-10 pt-6 border-t border-white/15 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
              <div className="text-xs text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>Official Admissions & Examination Helpline</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm font-black text-white">
                <a href="tel:9100974536" className="hover:text-amber-300 transition">91009 74536</a>
                <span className="text-white/30">•</span>
                <a href="tel:9100974530" className="hover:text-amber-300 transition">91009 74530</a>
                <span className="text-white/30">•</span>
                <a href="tel:9100974543" className="hover:text-amber-300 transition">91009 74543</a>
              </div>
            </div>

            <div className="flex flex-wrap md:justify-end items-center gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition flex items-center gap-2 border border-white/15"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Puttaparthi Campus Map</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
              <button
                onClick={() => onNavigate('register')}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs sm:text-sm transition shadow-lg cursor-pointer flex items-center gap-1.5"
              >
                <span>Apply for Scholarship</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE GENESIS & FOUNDING CONVICTION */}
      <section id="about-genesis" className="scroll-mt-36">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-wider">
              Origin Story • Established 2015
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-950 tracking-tight">
              The Genesis: Instituted in 2015
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              The noble intention behind the Sai Prudent initiative was straightforward yet profound: 
              to identify young minds who possess deep curiosity and academic aptitude, but whose aspirations 
              for higher technical education are stalled simply by a lack of financial means.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              <p>
                The <strong>Sai Prudent Scholarship program (SPS)</strong> was instituted in 2015 in 
                tandem with the establishment of the <strong>Sanskrithi School of Engineering</strong> under 
                the aegis of the <strong>Sanskrithi Educational Society</strong> in Puttaparthi, Andhra Pradesh.
              </p>
              <p>
                At Sanskrithi, our conviction is that <strong className="text-navy-950 font-bold">financial constraints must never hinder deserving talent</strong>. 
                The program focuses on incoming students pursuing Bachelor of Technology (B.Tech) 
                and Bachelor of Business Administration (BBA) degrees, enabling them to graduate 
                not burdened by debt, but empowered as capable, ethical young professionals.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('register')}
                  className="px-5 py-2.5 bg-navy-950 text-amber-400 rounded-xl text-xs sm:text-sm font-black hover:bg-navy-900 transition shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <span>Register for Talent Test</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('talent-test')}
                  className="px-5 py-2.5 text-navy-950 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer"
                >
                  View Exam Format
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md group">
                <img 
                  src="images/exam_hall_3.jpg" 
                  alt="Sanskrithi School of Engineering Main Campus, Puttaparthi" 
                  className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = '/images/exam_hall_3.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold flex justify-between items-center z-10">
                  <span className="truncate">Sanskrithi Campus, Puttaparthi</span>
                  <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full shrink-0">Estd. 2015</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE FOUR TRANSFORMATION PILLARS */}
      <section id="about-pillars" className="scroll-mt-36">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 text-navy-900 border border-navy-200 text-xs font-bold uppercase tracking-wider">
              Student Aid Lifecycle
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-950 tracking-tight">
              The Four Pillars of Sai Prudent
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              A comprehensive lifecycle designed to support students from examination day through graduation and global engineering careers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:bg-white hover:shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-amber-600 font-mono font-black text-3xl">
                      {p.num}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                      {p.benefit}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-navy-950 text-base mb-2 group-hover:text-amber-700 transition">
                    {p.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-200/60 text-[11px] font-bold text-navy-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Guaranteed Support</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: AUTHENTIC SCHOLAR SUCCESS STORIES */}
      <section id="about-stories" className="scroll-mt-36">
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-slate-50 rounded-3xl p-6 sm:p-10 border border-amber-300/40 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Impact in Action
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-950 tracking-tight">
              Transforming Lives Across Rural Andhra Pradesh
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Read how students from humble backgrounds broke generational barriers through the Sai Prudent Scholarship program.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.map((st, i) => (
              <div key={i} className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-md space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-amber-500 text-4xl font-serif leading-none">“</div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    {st.quote}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h5 className="font-black text-sm text-navy-950">{st.name}</h5>
                    <p className="text-[11px] text-slate-500">{st.village} • {st.course}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {st.role}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Scholars Felicitation Stage Photo */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md group">
            <img 
              src="images/award_stage_1.jpg" 
              alt="Sanskrithi Engineering Scholars and Faculty Mentors with Sai Prudent Banner" 
              className="w-full h-56 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { e.target.src = '/images/award_stage_1.jpg'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4 right-4 text-xs text-slate-200 font-semibold flex justify-between items-center z-10">
              <span className="font-bold">Sanskrithi Engineering Scholars & Faculty Mentors</span>
              <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded-full">Annual Convocation & Felicitations</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
