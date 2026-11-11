import React from 'react';

export default function ImpactStats({ stats }) {
  const statItems = [
    {
      value: '2015',
      label: 'Year Instituted',
      sub: '10+ Years of Noble Service',
      accent: 'text-navy-900',
      bg: 'bg-navy-50 border-navy-100'
    },
    {
      value: '100%',
      label: 'Tuition Fee Waiver',
      sub: 'Education Always Free of Cost',
      accent: 'text-emerald-700',
      bg: 'bg-emerald-50 border-emerald-100'
    },
    {
      value: '50%',
      label: 'Hostel & Transport',
      sub: 'Subsidized Living & Commute Aid',
      accent: 'text-amber-700',
      bg: 'bg-amber-50 border-amber-100'
    },
    {
      value: '2 Global',
      label: 'International Partners',
      sub: 'Germany (Anahata) & Austria (RISE)',
      accent: 'text-navy-900',
      bg: 'bg-navy-50 border-navy-100'
    },
    {
      value: 'Top 3',
      label: 'Free Laptops & Tablets',
      sub: 'Stipended Industry Internships',
      accent: 'text-indigo-700',
      bg: 'bg-indigo-50 border-indigo-100'
    }
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {statItems.map((item, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border ${item.bg} text-center flex flex-col justify-center transition-transform hover:-translate-y-1 shadow-xs`}
            >
              <div className={`text-2xl sm:text-3xl font-black ${item.accent} tracking-tight`}>
                {item.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                {item.label}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

