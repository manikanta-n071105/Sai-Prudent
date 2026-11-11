import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Sparkles, X, ChevronRight, Award } from 'lucide-react';

export default function CampusGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: "Sai Prudent Talent Test Examination Hall",
      category: "Talent Examination",
      src: "images/exam_hall_1.jpg",
      badge: "10,000+ Evaluated",
      description: "Thousands of aspiring Class 12 and Degree students writing the offline Sai Prudent Scholarship test under strict, fair supervision."
    },
    {
      id: 2,
      title: "Free Laptop Award to State Toppers",
      category: "Scholarship & Prizes",
      src: "images/laptop_award_1.jpg",
      badge: "Rank 1 Merit Reward",
      description: "State rank holders honored on stage with brand-new high-performance laptops by trustees and European dignitaries."
    },
    {
      id: 3,
      title: "Sanskrithi School of Engineering Campus",
      category: "Infrastructure",
      src: "images/campus_building_1.jpg",
      badge: "Estd. 2015",
      description: "State-of-the-art academic block, modern computing and robotics laboratories situated in the peaceful environment of Puttaparthi."
    },
    {
      id: 4,
      title: "Annual Merit Felicitation Ceremony",
      category: "Convocation",
      src: "images/felicitation_3.jpg",
      badge: "Special Honors",
      description: "Recognizing outstanding young minds and awarding 100% tuition scholarships, merit certificates, and institutional medals."
    },
    {
      id: 5,
      title: "Main University Auditorium",
      category: "Campus Facilities",
      src: "images/auditorium_1.jpg",
      badge: "World-Class Facility",
      description: "Fully air-conditioned auditorium hosting international guest lectures, technical symposiums, and student orientation convocations."
    },
    {
      id: 6,
      title: "Scholars & Student Community",
      category: "Campus Life",
      src: "images/students_group_1.jpg",
      badge: "Empowering Youth",
      description: "A close-knit, supportive community of rural and semi-urban scholars breaking barriers and thriving as future engineering leaders."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-navy-100 text-navy-950 border border-navy-200 text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-navy-900" />
            <span>Campus & Examination Moments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            See the Impact in Action
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Real photos from our examination halls, student felicitations, state topper laptop distributions, 
            and world-class Sanskrithi campus in Puttaparthi.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-navy-300 transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-56 sm:h-60 overflow-hidden bg-slate-900">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                  onError={(e) => { e.target.src = '/' + item.src; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Top Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-navy-950/80 backdrop-blur-md text-white border border-white/20 px-2.5 py-1 rounded-full shadow-xs">
                    {item.category}
                  </span>
                </div>

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-3 right-3">
                  <span className="text-[10px] font-extrabold bg-amber-400 text-slate-950 px-2.5 py-1 rounded-full shadow-xs">
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-extrabold text-navy-950 text-base group-hover:text-amber-700 transition leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-navy-900 font-bold group-hover:text-amber-600 transition">
                  <span>Click to view full photo</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-700 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain"
                onError={(e) => { e.target.src = '/' + selectedImage.src; }}
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Details */}
            <div className="p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {selectedImage.category}
                </span>
                <h3 className="text-xl font-black text-navy-950 mt-1">
                  {selectedImage.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {selectedImage.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-navy-950 bg-navy-50 border border-navy-200 px-3 py-1.5 rounded-xl">
                  {selectedImage.badge}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

