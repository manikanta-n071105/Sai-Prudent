import React from 'react';
import { 
  Award, 
  Globe, 
  GraduationCap, 
  Users, 
  ShieldCheck, 
  Leaf, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  HeartHandshake, 
  Building2, 
  Compass, 
  Quote,
  Target
} from 'lucide-react';

export default function FounderProfileSection() {
  return (
    <section className="space-y-12 w-full pt-4">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-950 border border-amber-300/80 text-xs font-bold uppercase tracking-wider shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Visionary Leadership & Institutional Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
          Leadership & Founder Profile
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Building a high-impact rural higher education ecosystem integrated with international industry networks and global academic pathways.
        </p>
      </div>

      {/* Main Leader Hero Card */}
      <div className="bg-gradient-to-br from-navy-950 via-slate-900 to-navy-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column (4 cols): Chairman Portrait */}
          <div className="lg:col-span-4 w-full">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/60 shadow-2xl group bg-slate-900">
              <img
                src="/images/chairman_vijay_reddy.jpg"
                alt="Sri B. Vijay Reddy - Chairman, Sanskrithi Group of Institutions"
                className="w-full h-80 sm:h-96 lg:h-[440px] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.target.src = 'images/chairman_vijay_reddy.jpg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent pointer-events-none" />
              
              {/* Badges on Portrait */}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md">
                  Founder & Chairman
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white z-10 space-y-0.5 bg-navy-950/85 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                <h4 className="text-base sm:text-lg font-black tracking-tight text-white drop-shadow-sm">
                  Sri B. Vijay Reddy
                </h4>
                <p className="text-[11px] text-amber-300 font-semibold leading-tight">
                  Chairman, Sanskrithi Group of Institutions
                </p>
                <p className="text-[10px] text-slate-300 leading-tight">
                  Director – Global Operations, RISE-World (Austria)
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (8 cols): Leader Persona, Biography, Stats & Citation */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider">
                  Visionary Leadership
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-amber-300 font-mono text-xs font-bold border border-white/15">
                  RISE-World (Austria) Director • 16+ Countries
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Sri B. Vijay Reddy
              </h3>
              <p className="text-amber-300/95 font-semibold text-sm sm:text-base leading-snug">
                Chairman, Sanskrithi Group of Institutions, Puttaparthi <br className="hidden sm:inline" />
                <span className="text-slate-300 font-normal">Director – Global Operations, RISE-World (Austria), operating across 16+ countries</span>
              </p>
            </div>

            <div className="space-y-3.5 text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                <strong>Sri B. Vijay Reddy</strong> is a distinguished education leader and global academic strategist 
                who has built a high-impact, rural higher education ecosystem integrated with international industry networks. 
                In addition to leading the Sanskrithi Group of Institutions, he serves as 
                <strong> Director – Global Operations of RISE-World, Austria</strong>, strengthening academic collaborations across 
                more than sixteen countries and enabling global pathways for rural students in India.
              </p>
              <p>
                He founded the <strong>Sanskrithi School of Business (2010)</strong> and the <strong>Sanskrithi School of Engineering (2015)</strong>, 
                transforming them into inclusive, innovation-driven institutions serving over <strong>2,500 students</strong>. 
                His leadership model combines access, academic rigor, employability, sustainability, and governance excellence.
              </p>
            </div>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center sm:text-left">
                <div className="text-amber-400 font-black text-lg">2,500+</div>
                <div className="text-[11px] text-slate-400 font-medium">Students Enrolled</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center sm:text-left">
                <div className="text-emerald-400 font-black text-lg">16+</div>
                <div className="text-[11px] text-slate-400 font-medium">Global Countries (RISE)</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center sm:text-left">
                <div className="text-amber-400 font-black text-lg">NAAC 'A'</div>
                <div className="text-[11px] text-slate-400 font-medium">3.17 / 4.0 Grade</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center sm:text-left">
                <div className="text-emerald-400 font-black text-lg">₹30L+</div>
                <div className="text-[11px] text-slate-400 font-medium">Annual Scholarships</div>
              </div>
            </div>

            {/* Stage Citation Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-2 shadow-xl">
              <div className="flex items-center gap-2 text-amber-400">
                <Quote className="w-5 h-5 shrink-0" />
                <span className="text-xs font-black uppercase tracking-wider">Stage Citation for Institutional Transformation</span>
              </div>
              <blockquote className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                "Sri B. Vijay Reddy has transformed rural higher education through global integration and measurable impact. 
                Under his leadership, Sanskrithi institutions serve over 2,500 students with 60% girl representation and zero financial dropouts, 
                supported by scholarships exceeding ₹30 lakhs annually."
              </blockquote>
            </div>
          </div>

        </div>
      </div>

      {/* 4 Pillars of Leadership Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: Inclusive Access and Social Mobility */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                Social Mobility
              </span>
              <h4 className="text-xl font-black text-navy-950 tracking-tight">
                Inclusive Access & Scholarship Framework
              </h4>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            To eliminate financial barriers, Sri B. Vijay Reddy institutionalized structured scholarship support 
            <strong> exceeding ₹30 lakhs annually</strong>, along with free hostel accommodation and transportation for rural and girl students.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
              <div className="text-2xl font-black text-navy-950">60%</div>
              <div className="text-xs font-bold text-emerald-800">Girl Student Representation</div>
              <div className="text-[11px] text-slate-500">Gender parity in tech education</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
              <div className="text-2xl font-black text-navy-950">35–40%</div>
              <div className="text-xs font-bold text-navy-900">First-Generation Learners</div>
              <div className="text-[11px] text-slate-500">Transforming rural family trajectories</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
              <div className="text-2xl font-black text-navy-950">90%</div>
              <div className="text-xs font-bold text-navy-900">Annual Retention Rate</div>
              <div className="text-[11px] text-slate-500">Consistent academic completion</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
              <div className="text-2xl font-black text-emerald-700">Zero</div>
              <div className="text-xs font-bold text-emerald-800">Financial Dropouts</div>
              <div className="text-[11px] text-slate-500">100% economic safety net</div>
            </div>
          </div>
        </div>

        {/* Card 2: Global Innovation and Industry Integration – RIT Program */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                RISE Austria Alliance
              </span>
              <h4 className="text-xl font-black text-navy-950 tracking-tight">
                RIT Program & Global Innovation Center
              </h4>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Conceptualized and launched the <strong>RIT (RISE Institute of Higher Technologies) Program</strong> in collaboration with RISE Austria. 
            In 2025, established a dedicated <strong>Research & Innovation Center</strong> backed by 60 national/international industry experts.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
              <div className="text-2xl font-black text-blue-900">100%</div>
              <div className="text-xs font-bold text-navy-900">Placement for RIT Students</div>
              <div className="text-[11px] text-slate-500">Guaranteed tech career tracks</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
              <div className="text-2xl font-black text-emerald-700">₹2L / Mo</div>
              <div className="text-xs font-bold text-emerald-800">Austria Internships</div>
              <div className="text-[11px] text-slate-500">Global stipend opportunities</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
              <div className="text-2xl font-black text-navy-950">60 Experts</div>
              <div className="text-xs font-bold text-navy-900">Industry Resource Pool</div>
              <div className="text-[11px] text-slate-500">MNC Professors of Practice</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
              <div className="text-2xl font-black text-navy-950">5–6 / Year</div>
              <div className="text-xs font-bold text-navy-900">Austrian Specialists</div>
              <div className="text-[11px] text-slate-500">Direct on-campus mentoring</div>
            </div>
          </div>
        </div>

        {/* Card 3: Academic Quality and Governance */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                Autonomous & NAAC
              </span>
              <h4 className="text-xl font-black text-navy-950 tracking-tight">
                Academic Quality & Transparent Governance
              </h4>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Institutionalized <strong>Outcome-Based Education (OBE)</strong>, technology-enabled learning systems, 
            and transparent governance mechanisms ensuring benchmark academic rigor.
          </p>

          <div className="space-y-2.5 pt-1 text-xs text-slate-700">
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>NAAC 'A' Grade (3.17/4.0)</strong> achieved in the first accreditation cycle</span>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>100% Domain Certifications</strong> completed by full teaching faculty</span>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Full Digitization</strong> of all academic and administrative evaluation processes</span>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Zero regulatory non-compliance</strong> & 100% timely grievance redressal</span>
            </div>
          </div>
        </div>

        {/* Card 4: Sustainability and Community Impact */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                Green Campus & SDGs
              </span>
              <h4 className="text-xl font-black text-navy-950 tracking-tight">
                Sustainability & Rural Outreach
              </h4>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Sustainability-driven campus model aligned with UN Sustainable Development Goals 
            (SDGs 4, 5, 8, 9, 12, 13, and 17), actively empowering local village ecosystems.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
              <div className="text-2xl font-black text-emerald-700">7,000+</div>
              <div className="text-xs font-bold text-navy-900">Trees Planted</div>
              <div className="text-[11px] text-slate-500">Across 30-acre campus</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
              <div className="text-2xl font-black text-navy-950">40%</div>
              <div className="text-xs font-bold text-navy-900">Freshwater Reduction</div>
              <div className="text-[11px] text-slate-500">Rainwater harvesting</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
              <div className="text-2xl font-black text-navy-950">70–80%</div>
              <div className="text-xs font-bold text-navy-900">Food Waste Reduction</div>
              <div className="text-[11px] text-slate-500">100% waste segregation</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
              <div className="text-2xl font-black text-emerald-700">20+</div>
              <div className="text-xs font-bold text-emerald-800">Villages Impacted</div>
              <div className="text-[11px] text-slate-500">100+ rural households supported</div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}

