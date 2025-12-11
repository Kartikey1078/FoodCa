import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const SwiperComponent2 = () => {
  const items = [
    {
      title: "CARBOHYDRATES",
      imgSrc: "/Home/Grain.svg",
      percentage: "45% - 65%",
      description:
        "Carbohydrates are primary source of energy for the body. The amount of carbohydrates varies depending on your body markers and goals",
      color: "text-BM_Orange",
    },
    {
      title: "PROTEIN",
      imgSrc: "/Home/meat.svg",
      percentage: "20% - 35%",
      description:
        "Protein is essential for muscle repair, growth, and immune function. Protein intake is adjusted based on activity level, muscle-building goals, and overall health.",
      color: "text-BM_Green",
    },
    {
      title: "FATS",
      imgSrc: "/Home/cheese.svg",
      percentage: "25% - 35%",
      description:
        "Supports cell function, brain health, and vitamin absorption. The amount of fat varies based on your energy requirements and overall health goals.",
      color: "text-[#D2252E]",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Attach refs after component mounts
  const [navigationReady, setNavigationReady] = useState(false);
  useEffect(() => {
    setNavigationReady(true);
  }, []);

  return (
    <div className="lg:hidden md:hidden relative flex flex-col justify-center items-center w-auto p-6 rounded-[15px]">
      <Swiper
        modules={[Navigation]}
        navigation={navigationReady ? { prevEl: prevRef.current, nextEl: nextRef.current } : false}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        spaceBetween={20}
        slidesPerView={1}
        className="w-full"
        loop={true}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="flex flex-col items-center text-center">
            <div className="w-auto text-center">
              <img
                src={item.imgSrc}
                alt={item.title}
                className="text-orange-500 bg-[#F2790F1F] bg-opacity-[12%] p-2 rounded-[12px] text-4xl mb-2 mx-auto"
              />
              <h3 className="text-lg font-bold tracking-[4px]">{item.title}</h3>
              <p className={`text-sm font-bold mt-1 ${item.color}`}>{item.percentage}</p>
              <p className="text-gray-700 mt-6 text-sm font-medium w-[250px] mx-auto">
                {item.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons and indicators */}
      <div className="flex justify-between items-center w-full space-x-8 px-4 py-5">
        <button
          ref={prevRef}
          className="text-gray-700 hover:text-black border-2 border-gray-300 rounded-full p-2"
        >
          <img src="/angle-left (3) 2.svg" alt="left-arrow" />
        </button>
        <div className="flex space-x-2 items-center">
          {items.map((_, index) => (
            <div
              key={index}
              className={`rounded-full ${
                index === currentIndex ? "bg-BM_Green w-2 h-2" : "bg-gray-400 w-1 h-1"
              }`}
            ></div>
          ))}
        </div>
        <button
          ref={nextRef}
          className="text-gray-700 hover:text-black border-2 border-gray-300 rounded-full p-2"
        >
          <img
            src="/angle-left (3) 2.svg"
            alt="right-arrow"
            className="rotate-180"
          />
        </button>
      </div>
    </div>
  );
};

export default SwiperComponent2;
