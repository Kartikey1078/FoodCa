import React, { useEffect, useRef, useState } from "react";

const NutritionExpertsPremium = () => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Auto-scroll slider with infinite loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        if (scrollRef.current.scrollLeft >= maxScroll - 1) {
          scrollRef.current.scrollLeft = 0;
        } else {
          scrollRef.current.scrollLeft += 1;
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        const progress = (scrollRef.current.scrollLeft / maxScroll) * 100;
        setScrollProgress(progress);
      }
    };

    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll);
      return () => ref.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const images = [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop",
  ];

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 py-8 px-4">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Main Compact Card */}
        <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 shadow-2xl">
          
          {/* Gradient glow */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/20 rounded-full filter blur-[100px]"></div>
          </div>

          <div className="relative z-10 p-6 sm:p-10">
            
            {/* Compact Hero Section */}
            <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
              
              {/* Left Content - More Compact */}
              <div className="lg:w-[55%] space-y-4">
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-emerald-400/30">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-emerald-300 text-xs font-semibold tracking-wide">RECOMMENDED BY EXPERTS</span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                  Top Nutrition
                  <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    Experts
                  </span>
                </h1>

                <p className="text-slate-300 leading-relaxed">
                  Scientifically curated plans built with real chefs, certified dietitians, and sports nutrition experts.
                </p>

                {/* Inline Stats */}
                <div className="flex gap-4 pt-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">50+</div>
                    <div className="text-xs text-emerald-300">Chefs</div>
                  </div>
                  <div className="w-px bg-white/20"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">200+</div>
                    <div className="text-xs text-emerald-300">Plans</div>
                  </div>
                  <div className="w-px bg-white/20"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">10k+</div>
                    <div className="text-xs text-emerald-300">Clients</div>
                  </div>
                </div>

                <button className="group relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl font-bold text-white shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70 transition-all duration-300 hover:scale-105">
                  <span className="relative z-10">Explore Plans</span>
                </button>
              </div>

              {/* Right Hero Image - Smaller */}
              <div className="lg:w-[45%] flex justify-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <img
                    src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=400&fit=crop"
                    className="relative rounded-3xl w-full max-w-sm shadow-2xl object-cover aspect-[5/4] border border-white/10 group-hover:scale-[1.02] transition-transform duration-500"
                    alt="Healthy food"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl px-4 py-2 shadow-xl border border-white/20">
                    <div className="text-white font-black text-lg">4.9★</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compact Carousel */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Our Meals</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => scrollRef.current.scrollLeft -= 300}
                    className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all text-sm"
                  >
                    ←
                  </button>
                  <button 
                    onClick={() => scrollRef.current.scrollLeft += 300}
                    className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all text-sm"
                  >
                    →
                  </button>
                </div>
              </div>
              
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-scroll no-scrollbar pb-2 scroll-smooth"
                style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
              >
                {[...images, ...images].map((img, i) => (
                  <div 
                    key={i}
                    className="relative flex-shrink-0 group cursor-pointer"
                  >
                    <img
                      src={img}
                      className="w-56 h-36 rounded-2xl object-cover shadow-lg border border-white/10 group-hover:scale-105 transition-transform duration-300"
                      alt="meal"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <div className="text-white text-sm font-semibold">Gourmet Bowl</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini progress bar */}
              <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
                  style={{width: `${scrollProgress}%`}}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Bottom Title */}
        <div className="py-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Plan: <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Nutrition Punch</span>
          </h2>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default NutritionExpertsPremium;