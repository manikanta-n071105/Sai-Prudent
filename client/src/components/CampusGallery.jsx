import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Maximize2, 
  X, 
  Sparkles, 
  Layers,
  MapPin,
  Award
} from 'lucide-react';

export default function CampusGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const scrollRailRef = useRef(null);

  const galleryItems = [
    {
      id: 1,
      title: "Official 12th Sai Prudent Scholarship Announcement",
      subtitle: "Global Opportunities with RISE Austria & TU Wien",
      category: "Global Opportunity",
      badge: "Austria • ₹2L/Mo",
      src: "images/rise_austria_banner.jpg",
      description: "Top 5 students considered for RISE Internship in Austria with ₹2 Lakhs/month stipend. Ms. Pranavi Tummuru pursuing MS at TU Wien, Austria; Ms. Karizma placed at ₹6 Lakhs per annum."
    },
    {
      id: 2,
      title: "Sanskrithi School of Engineering & Business Main Campus",
      subtitle: "Autonomous Institution • NAAC 'A' Grade (3.17/4)",
      category: "Campus Infrastructure",
      badge: "30-Acre Campus • Puttaparthi",
      src: "images/campus_building_1.jpg",
      description: "Lush green 30-acre campus in Puttaparthi featuring modern engineering laboratories, innovation centers, and 100% waste segregation sustainability model."
    },
    {
      id: 3,
      title: "Academic Topper Felicitated with Free Laptop",
      subtitle: "State Rank 1 Excellence Award Ceremony",
      category: "Merit Honors",
      badge: "Free Laptop Award",
      src: "images/laptop_award_1.jpg",
      description: "Merit topper receiving the Free Laptop on stage during the grand annual convocation in the presence of international partners and academic leadership."
    },
    {
      id: 4,
      title: "Sai Prudent Scholarship Examination in Progress",
      subtitle: "160 Questions • Offline Standardized Test",
      category: "Talent Examination",
      badge: "160 Questions • 2 Hours",
      src: "images/exam_hall_1.jpg",
      description: "Hundreds of ambitious Class 12 (MPC, Any Stream) and Degree Final Year students writing the scholarship test under faculty supervision at Puttaparthi."
    },
    {
      id: 5,
      title: "State Merit Rank Holders Convocation Ceremony",
      subtitle: "Celebrating Rural Brilliance & Academic Stature",
      category: "Felicitation Ceremony",
      badge: "State Rank Holders",
      src: "images/felicitation_1.jpg",
      description: "Honoring deserving young scholars who broke generational economic barriers through merit scholarships, industry stipends, and global admissions."
    },
    {
      id: 6,
      title: "Engineering Scholars & Faculty Mentors with SPS Banner",
      subtitle: "International Partnership with Anahata Stiftung & RISE",
      category: "Institutional Alliance",
      badge: "Philanthropic Solidarity",
      src: "images/award_stage_1.jpg",
      description: "Sanskrithi engineering scholars standing proudly with faculty mentors under the Sai Prudent banner, representing international educational equity."
    },
    {
      id: 7,
      title: "Candidates Assembled with Official Examination Folders",
      subtitle: "Standardized Examination Day at SSE Portico",
      category: "Examination Day",
      badge: "SSE Main Portico",
      src: "images/exam_hall_3.jpg",
      description: "Candidates proudly holding their official examination kits and hall tickets at the main entrance of Sanskrithi School of Engineering."
    },
    {
      id: 8,
      title: "Sanskrithi Student Scholars & Aspirants",
      subtitle: "Inclusive Higher Education • 60% Women Representation",
      category: "Student Community",
      badge: "60% Women Scholars",
      src: "images/students_group_1.jpg",
      description: "Empowered young scholars at the admissions desk, breaking generational barriers with zero dropouts due to financial constraints."
    },
    {
      id: 9,
      title: "Interactive Management & Engineering Seminar Presentations",
      subtitle: "RIT Program • Industry Integrated Learning",
      category: "Industry Integration",
      badge: "RIT Program",
      src: "images/felicitation_2.jpg",
      description: "Scholars delivering digital research presentations to industry resource pool experts, Professors of Practice, and visiting Austrian specialists."
    }
  ];

  // Auto-play slideshow timer (every 3.5 seconds)
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPlaying, galleryItems.length]);

  // Smooth auto-scroll the bottom thumbnail rail to keep active slide in view
  useEffect(() => {
    if (scrollRailRef.current) {
      const activeThumb = scrollRailRef.current.children[currentIndex];
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const currentItem = galleryItems[currentIndex];

  return (
    <section className="py-12 lg:py-16 bg-slate-100/70 border-b border-slate-200 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header with Live Playing Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-100 text-navy-950 border border-navy-200 text-xs font-bold uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5 text-navy-900" />
              <span>Live Campus & Examination Photo Reel</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-950 tracking-tight">
              Life at Sanskrithi & Examination Moments
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Auto-playing reel capturing authentic moments from the Sai Prudent talent tests, topper felicitation ceremonies, student laboratories, and campus life in Puttaparthi.
            </p>
          </div>

          {/* Interactive Player Controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Auto-Play Toggle */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border shadow-2xs cursor-pointer ${
                isPlaying 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100' 
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
              title={isPlaying ? "Pause auto-scroll" : "Play auto-scroll"}
            >
              {isPlaying ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <Pause className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Auto-Playing</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-slate-700" />
                  <span>Resume Scroll</span>
                </>
              )}
            </button>

            {/* Slide Counter */}
            <span className="text-xs font-mono font-bold text-slate-500 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs">
              {currentIndex + 1} / {galleryItems.length}
            </span>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-navy-950 flex items-center justify-center transition shadow-2xs cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-navy-950 flex items-center justify-center transition shadow-2xs cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Auto-Playing Cinematic Stage */}
        <div 
          className="relative bg-navy-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 group"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Main Photo Display */}
          <div className="relative h-[340px] sm:h-[440px] lg:h-[500px] w-full overflow-hidden bg-slate-950">
            <img
              key={currentItem.id}
              src={currentItem.src}
              alt={currentItem.title}
              className="w-full h-full object-cover sm:object-contain bg-slate-950/40 transition-all duration-700 animate-fadeIn"
              onError={(e) => { e.target.src = '/' + currentItem.src; }}
            />
            
            {/* Top and Bottom Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-navy-950/50 pointer-events-none" />

            {/* Top Info Bar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-navy-900/90 text-amber-300 border border-amber-400/40 px-3 py-1 rounded-full shadow-md backdrop-blur-md">
                  {currentItem.category}
                </span>
                <span className="text-[11px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-3 py-1 rounded-full shadow-md">
                  {currentItem.badge}
                </span>
              </div>

              <button
                onClick={() => setSelectedImage(currentItem)}
                className="px-3 py-1 rounded-full bg-navy-950/80 hover:bg-navy-900 text-white text-xs font-bold border border-white/20 backdrop-blur-md transition flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Enlarge</span>
              </button>
            </div>

            {/* Bottom Caption Container */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white z-10 space-y-1.5">
              <div className="text-xs sm:text-sm font-semibold text-amber-300 drop-shadow-sm">
                {currentItem.subtitle}
              </div>
              <h3 className="text-lg sm:text-2xl lg:text-3xl font-black tracking-tight text-white drop-shadow-md leading-snug">
                {currentItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 max-w-3xl leading-relaxed drop-shadow-sm font-normal">
                {currentItem.description}
              </p>
            </div>

            {/* Auto-Play Animated Progress Bar */}
            {isPlaying && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 overflow-hidden z-20">
                <div 
                  key={currentIndex}
                  className="h-full bg-amber-400 animate-[progress_3.5s_linear]" 
                  style={{ width: '100%' }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Continuous Horizontal Auto-Scrolling Thumbnail Track */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              <span>All 9 Featured Moments (Click to view or let auto-scroll)</span>
            </span>
            <span className="hidden sm:inline text-[11px] text-slate-400">Hover to pause reel</span>
          </div>

          <div 
            ref={scrollRailRef}
            className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-300"
          >
            {galleryItems.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`shrink-0 w-44 sm:w-56 rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer snap-start ${
                    isActive 
                      ? 'border-amber-400 shadow-lg scale-102 bg-white ring-2 ring-amber-400/30' 
                      : 'border-slate-200 hover:border-slate-300 bg-white/80 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="relative h-24 sm:h-28 overflow-hidden bg-slate-900">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      onError={(e) => { e.target.src = '/' + item.src; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute top-2 left-2">
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-navy-950/85 text-white border border-white/20">
                        #{idx + 1}
                      </span>
                    </div>

                    <div className="absolute bottom-1.5 left-2 right-2 text-white text-[10px] font-bold truncate">
                      {item.badge}
                    </div>
                  </div>

                  <div className="p-2.5">
                    <div className="font-extrabold text-navy-950 text-xs truncate">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">
                      {item.category}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* High-Resolution Fullscreen Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full border border-slate-700 shadow-2xl relative animate-scaleUp"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white flex items-center justify-center transition shadow-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="relative max-h-[65vh] overflow-hidden bg-slate-950 flex items-center justify-center">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-h-[65vh] w-full object-contain"
                  onError={(e) => { e.target.src = '/' + selectedImage.src; }}
                />
              </div>

              {/* Modal Caption */}
              <div className="p-6 sm:p-8 space-y-3 bg-white">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider bg-navy-950 text-amber-300 px-3 py-1 rounded-full">
                    {selectedImage.category}
                  </span>
                  <span className="text-xs font-bold bg-amber-400 text-slate-950 px-3 py-1 rounded-full">
                    {selectedImage.badge}
                  </span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight">
                  {selectedImage.title}
                </h3>
                
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {selectedImage.description}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
