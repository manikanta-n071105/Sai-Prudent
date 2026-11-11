import React, { useState } from 'react';
import { Camera, ChevronRight, X } from 'lucide-react';

export default function CampusGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: "Sai Prudent Talent Test in Progress",
      category: "Talent Examination",
      src: "images/exam_hall_1.jpg",
      badge: "Examination Hall",
      description: "Class 12 and Degree students writing the offline Sai Prudent Scholarship examination under faculty supervision at Sanskrithi Campus."
    },
    {
      id: 2,
      title: "Candidates with Official Examination Kits",
      category: "Examination Day",
      src: "images/exam_hall_2.jpg",
      badge: "SSE Main Entrance",
      description: "Candidates proudly holding their colorful examination kit folders under the Sanskrithi School of Engineering entrance."
    },
    {
      id: 3,
      title: "Advanced 3D Printing & Innovation Lab",
      category: "Hands-on Tech",
      src: "images/students_group_1.jpg",
      badge: "Modern Labs",
      description: "Engineering scholars collaborating at the interactive workbench in the campus 3D Printing and rapid prototyping laboratory."
    },
    {
      id: 4,
      title: "Star Alumni Placed at Global Firms",
      category: "Career Milestones",
      src: "images/official_banner.jpg",
      badge: "Global Placements",
      description: "Sanskrithi scholars breaking generational barriers with career placements at RISE (Austria), Google, Amazon, Deloitte, TCS, and PayPal."
    },
    {
      id: 5,
      title: "Interactive Business Seminar Presentations",
      category: "Management Training",
      src: "images/felicitation_1.jpg",
      badge: "SSB Seminar Hall",
      description: "Students delivering interactive case study presentations on digital screens in the Sanskrithi School of Business seminar hall."
    },
    {
      id: 6,
      title: "Graduating Scholars Cohort",
      category: "Campus Community",
      src: "images/sps_banner_2025.png",
      badge: "Empowering Talent",
      description: "Scholars in executive professional blazers standing on the lush green Sanskrithi campus grounds in Puttaparthi."
    }
  ];

  return (
    <section className="py-16 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-100 text-navy-950 border border-navy-200 text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-navy-900" />
            <span>Campus & Examination Moments</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
            Life at Sanskrithi & Examination Highlights
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Authentic moments from our talent tests, student laboratories, interactive seminars, and campus life in Puttaparthi.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-lg hover:border-navy-300 transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-900">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                  onError={(e) => { e.target.src = '/' + item.src; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Top Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-navy-950/80 backdrop-blur-md text-white border border-white/20 px-2.5 py-0.5 rounded-full shadow-xs">
                    {item.category}
                  </span>
                </div>

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-3 right-3">
                  <span className="text-[10px] font-extrabold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full shadow-xs">
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-extrabold text-navy-950 text-sm sm:text-base group-hover:text-amber-700 transition leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-navy-900 font-bold group-hover:text-amber-600 transition">
                  <span>View full photo</span>
                  <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
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
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-700 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative max-h-[65vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[65vh] object-contain"
                onError={(e) => { e.target.src = '/' + selectedImage.src; }}
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition border border-white/20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Details */}
            <div className="p-5 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {selectedImage.category}
                </span>
                <h3 className="text-base sm:text-lg font-black text-navy-950 mt-1">
                  {selectedImage.title}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  {selectedImage.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-navy-950 bg-navy-50 border border-navy-200 px-3 py-1 rounded-lg">
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
