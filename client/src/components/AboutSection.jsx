import React from 'react';

export default function AboutSection({ onNavigate }) {
  const pillars = [
    {
      num: '01',
      title: 'Talent Discovery Test',
      desc: 'An open, merit-based offline examination designed to uncover authentic raw potential in Mathematics, Physics, and Chemistry, free of charge to any student regardless of background.'
    },
    {
      num: '02',
      title: '100% Free Tuition Commitment',
      desc: 'The education provided will always remain free of cost. Our philanthropic endowment ensures tuition barriers are completely eradicated for selected scholars.'
    },
    {
      num: '03',
      title: '50% Living & Commute Aid',
      desc: 'Beyond tuition, poverty manifests in daily expenses. We provide a 50% scholarship on hostel boarding and college bus transportation across the region.'
    },
    {
      num: '04',
      title: 'Stipend Internships & Careers',
      desc: 'Students gain real industry experience with guaranteed minimum monthly stipends, graduating as confident young professionals ready for global technology firms.'
    }
  ];

  const stories = [
    {
      name: 'Ramesh Babu',
      village: 'Bukkapatnam, Sri Sathya Sai Dist.',
      course: 'B.Tech CSE (Batch of 2021)',
      role: 'Software Engineer @ Cloud Systems',
      quote: 'My father is a daily wage weaver. Engineering was an impossible dream until the Sai Prudent Scholarship Test. Not only was my education completely free, but the 50% hostel subsidy and internship stipend allowed me to support my family.'
    },
    {
      name: 'Haritha K.',
      village: 'Dharmavaram Rural',
      course: 'B.Tech ECE (Batch of 2023)',
      role: 'Embedded Systems Specialist @ Automotive Tech',
      quote: 'Winning a Free Laptop in the Sai Prudent exam gave me my first digital window. The faculty and international partners from Germany and Austria mentored us with modern labs. It changed my life trajectory.'
    }
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 text-navy-900 border border-navy-200 text-xs font-bold uppercase tracking-wider">
            Our Story & Core Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            Bridging the Gap Between Rural Talent and Global Opportunity
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Inspired by grassroots educational philanthropy, the Sai Prudent Scholarship program 
            empowers students whose brilliance might otherwise be extinguished by economic poverty.
          </p>
        </div>

        {/* Narrative Grid: Origin Story + Philanthropic Alliance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            <h3 className="text-2xl font-bold text-navy-950">
              The Genesis: Instituted in 2015
            </h3>
            <p>
              The <strong>Sai Prudent Scholarship program (SPS)</strong> was instituted in 2015 in 
              tandem with the establishment of the <strong>Sanskrithi School of Engineering</strong> under 
              the aegis of the <strong>Sanskrithi Educational Society</strong> in Puttaparthi, Andhra Pradesh.
            </p>
            <p>
              The noble intention behind the initiative was straightforward yet profound: to identify 
              young minds who possess deep curiosity and academic aptitude, but whose aspirations 
              for higher technical education are stalled simply by a lack of financial means. 
              At Sanskrithi, our conviction is that <strong className="text-navy-950 font-bold">education provided to deserving talent will always be free of cost</strong>.
            </p>
            <p>
              The program focuses on incoming students pursuing Bachelor of Technology (B.Tech) 
              and Bachelor of Business Administration (BBA) degrees, enabling them to graduate 
              not burdened by debt, but empowered as capable, ethical young professionals.
            </p>

            {/* Authentic Campus Photo */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
              <img 
                src="images/exam_hall_3.jpg" 
                alt="Sanskrithi School of Engineering Main Campus Entrance" 
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.target.src = '/images/exam_hall_3.jpg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-3 right-3 text-white text-xs font-semibold flex justify-between items-center">
                <span>Sanskrithi School of Engineering Main Portico, Puttaparthi</span>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full">Estd. 2015</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => onNavigate('register')}
                className="px-5 py-2.5 bg-navy-900 text-white rounded-lg text-xs font-bold hover:bg-navy-800 transition shadow"
              >
                Register for Talent Test
              </button>
              <button
                onClick={() => onNavigate('talent-test')}
                className="px-5 py-2.5 text-navy-900 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold transition"
              >
                View Exam Format
              </button>
            </div>
          </div>

          {/* Right Column: Global Alliance Card */}
          <div className="bg-gradient-to-br from-navy-900 via-navy-950 to-slate-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl" />
            
            <div className="relative z-10 space-y-6">
              <div className="inline-block px-3 py-1 rounded bg-amber-400/20 text-amber-300 text-xs font-bold tracking-wider uppercase">
                International Support & Technical Partners
              </div>

              <h4 className="text-xl sm:text-2xl font-extrabold leading-snug">
                Powered by Global Philanthropic Solidarity
              </h4>

              <p className="text-slate-300 text-sm leading-relaxed">
                The Sai Prudent Scholarship Program is sustained through dedicated partnerships 
                with internationally recognized institutions that share our vision of educational equity:
              </p>

              <div className="space-y-4 pt-2">
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-amber-400 text-slate-950 font-black flex items-center justify-center shrink-0 text-sm">
                    DE
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">Anahata Stiftung (Germany)</h5>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Our international support partner based in Stuttgart, Germany. Anahata Stiftung provides philanthropic grant endowments that cover tuition waivers and living subsidies for economically disadvantaged scholars.
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-blue-400 text-slate-950 font-black flex items-center justify-center shrink-0 text-sm">
                    AT
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">RISE (Austria, Europe) & TU Wien</h5>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Our international partner from Vienna, Austria. Top 5 students from Sai Prudent will be considered for a 3-month internship at RISE in Austria with a monthly stipend of ₹2 Lakhs. This year, we have sent <strong>Pranavi Tummuru</strong> to pursue her MS in Business Informatics at <strong>TU Wien, Austria</strong>, and <strong>Ms. Karizma</strong> secured placement with RISE India with a package of <strong>₹6 Lakhs per annum</strong> after both completed their internships at RISE Austria.
                    </p>
                  </div>
                </div>

                {/* Scholars & Faculty Mentors Photo */}
                <div className="relative rounded-xl overflow-hidden border border-white/10 group mt-3">
                  <img 
                    src="images/award_stage_1.jpg" 
                    alt="Sanskrithi Engineering Scholars and Faculty Mentors with Sai Prudent Banner" 
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = '/images/award_stage_1.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 text-[11px] text-slate-200 font-medium flex justify-between items-center">
                    <span>Engineering Scholars & Faculty Mentors</span>
                    <span className="text-[9px] bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded font-bold text-amber-300">SPS Banner</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-slate-400">
                <span>Sanskrithi Educational Society</span>
                <span>Puttaparthi, Andhra Pradesh</span>
              </div>
            </div>
          </div>

        </div>

        {/* The 4 Pillars */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
              The Four Pillars of the Sai Prudent Program
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              A comprehensive lifecycle designed to take students from school desks to professional engineering careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 hover:bg-white hover:shadow-lg transition-all"
              >
                <div className="text-amber-600 font-mono font-black text-2xl mb-2">
                  {p.num}
                </div>
                <h4 className="font-bold text-navy-950 text-base mb-2">
                  {p.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Real-World Alumni Voices (Reference: Vadaanya Success Stories) */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-slate-50 rounded-2xl p-8 sm:p-12 border border-amber-300/40">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded">
              Impact in Action
            </span>
            <h3 className="text-2xl font-black text-navy-950 mt-2">
              Transforming Lives Across Rural Andhra Pradesh
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Read how students from humble backgrounds broke generational barriers through the Sai Prudent Scholarship program.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.map((st, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm space-y-4">
                <div className="text-amber-500 text-3xl font-serif">“</div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  {st.quote}
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-sm text-navy-950">{st.name}</h5>
                    <p className="text-[11px] text-slate-500">{st.village} • {st.course}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-1 rounded">
                    {st.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

