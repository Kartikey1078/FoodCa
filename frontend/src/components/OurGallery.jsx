"use client";

import React, { useRef, useEffect, useState } from "react";

const OurGallery = () => {
  const scrollContainerRef = useRef(null);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const galleryItems = [
    { img: "/About/image1.svg", description: "Hawaiian Fruit Salad" },
    { img: "/About/image2.svg", description: "Our Crew Preparing Dishes" },
    { img: "/About/image3.svg", description: "Sizzling Octopus with Orange" },
    { img: "/About/image4.svg", description: "It is a long established fact" },
    { img: "/About/image1.svg", description: "Hawaiian Fruit Salad" },
    { img: "/About/image2.svg", description: "Our Crew Preparing Dishes" },
    { img: "/About/image3.svg", description: "Sizzling Octopus with Orange" },
    { img: "/About/image4.svg", description: "It is a long established fact" },
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const checkScrollPosition = () => {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        setIsAtEnd(Math.abs(scrollWidth - clientWidth - scrollLeft) < 1);
      };

      container.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();

      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const itemWidth = container.offsetWidth;
      const scrollPosition = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (direction === "right") {
        if (isAtEnd) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollTo({ left: scrollPosition + itemWidth, behavior: "smooth" });
        }
      } else {
        if (scrollPosition <= 0) {
          container.scrollTo({ left: maxScroll, behavior: "smooth" });
        } else {
          container.scrollTo({ left: scrollPosition - itemWidth, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <section className="w-full bg-[#FAFAFA]">
      <div className="max-w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center w-full">
            <h2 className="font-redHatDisplay font-black tracking-wide text-2xl sm:text-3xl lg:text-[40px] text-black">
              Our Gallery
            </h2>
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                className="p-2 sm:p-3 rounded-full bg-BM_Green/40 shadow-lg hover:bg-BM_Green/60 transition-colors"
                onClick={() => handleScroll("left")}
                aria-label="Scroll left"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#ffffff"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                className="p-2 sm:p-3 rounded-full bg-BM_Green/40 shadow-lg hover:bg-BM_Green/60 transition-colors"
                onClick={() => handleScroll("right")}
                aria-label="Scroll right"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#ffffff"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
          <p className="text-[#303030] text-sm sm:text-base max-w-[65vw] tracking-wide font-redHatDisplay">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </p>
        </div>

        {/* Gallery Scroll */}
        <div className="relative w-full mt-8">
          <div ref={scrollContainerRef} className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            {galleryItems.map((item, index) => (
              <div key={index} className="snap-start flex-none w-[280px]">
                <div className="bg-[#FAFAFA] transition-shadow h-full">
                  <div className="w-[248px] h-[248px]">
                    <img
                      src={item.img}
                      alt={item.description}
                      className="w-[266px] h-[266px] object-cover rounded-2xl"
                    />
                  </div>
                  <p className="mt-8 font-redHatDisplay text-[#303030] font-bold text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurGallery;
