import React, { useEffect, useRef } from "react";

const NutritionExpertsPremium = () => {
  const scrollRef = useRef(null);

  // Auto-scroll slider
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1.2; // speed
      }
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const images = [
    "/images/fooda.jpg",
    "/images/foodb.jpg",
    "/images/foodc.jpg",
    "/images/foodd.jpg",
    "/images/foode.jpg",
    "/images/foodg.jpg",
  ];

  return (
    <div className="w-full mx-auto mt-10 px-4 z-0 bg-gradient-to-r from-[#f8fcfb] to-[#eef7f6]">

      {/* Outer Wrapper */}
      <div className="
        rounded-[40px] overflow-hidden relative 
        bg-gradient-to-br from-[#0d1b1e] via-[#0b332c] to-[#000]
        shadow-[0px_0px_40px_rgba(0,0,0,0.5)]
        p-10 z-0
      ">
        {/* Glow Effect */}
        <div className="z-0 absolute inset-0 bg-gradient-to-r from-[#00ffbf33] to-[#00a2ff33] blur-3xl opacity-40"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">

          {/* Left text area */}
          <div className="text-white lg:w-1/2 space-y-4 px-4">
            <h3 className="text-lg tracking-wide text-green-300">
              Recommended by
            </h3>

            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Top Nutrition Experts
            </h2>

            <p className="text-gray-300 text-lg max-w-md">
              Scientifically curated plans built with real chefs, certified dietitians, and sports nutrition experts.
            </p>

            <div className="mt-4">
              <button className="
                bg-green-400 text-black px-6 py-3 rounded-xl font-medium
                hover:bg-green-300 transition-all
                shadow-lg shadow-green-500/30
              ">
                Explore Plans
              </button>
            </div>
          </div>

          {/* Right big hero image */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src="/images/topimg.jpeg"
              className="rounded-3xl w-[90%] shadow-2xl object-cover"
              alt=""
            />
          </div>
        </div>

        {/* Carousel strip */}
        <div className="mt-10">
          <h3 className="text-white text-xl mb-3 font-semibold px-3">Our Meals</h3>
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-scroll no-scrollbar py-4 px-2"
          >
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                className="
                  w-56 h-36 rounded-2xl object-cover 
                  shadow-lg transition-transform duration-300 
                  hover:scale-[1.07]
                "
                alt="meal"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Title */}
      <div className="py-10 px-3">
        <h2 className="text-3xl font-bold text-black">
          Plan: <span className="text-green-600">Nutrition Punch</span>
        </h2>
      </div>
    </div>
  );
};

export default NutritionExpertsPremium;
