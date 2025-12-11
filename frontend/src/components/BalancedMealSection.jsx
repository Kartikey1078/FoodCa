import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import SwiperComponent2 from "./SwiperComponent2"; 
// import images from "../constants/images"; // COMMENTED: file not found
// import items from "../constants/items"; // COMMENTED: file not found

const BalancedMealSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="bg-[#FAFAFA] w-full p-4 md:p-16">
      <div className="bg-[#ffffff] rounded-3xl lg:h-[860px] w-auto sm:w-[90%] md:w-[85%] lg:w-auto mx-auto">
        {/* Heading Section */}
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="text-left md:text-left">
            <div className="mx-auto max-w-auto">
              {/* Desktop Heading */}
              <h2 className="text-[18px] sm:text-[20px] md:text-3xl lg:text-[48px] mt-16 sm:mt-20 md:mt-24 lg:mt-36 xl:ml-20 lg:pl-10 xl:pl-0 lg:w-[561px] font-extrabold font-redHatDisplay hidden lg:block leading-tight lg:leading-[1]">
                <span className="mb-5">How a</span>
                <br />
                <span className="text-BM_Green mb-1">Balanced Meal</span>
                <br />
                <span className="mb-1">Look Like</span>
              </h2>

              {/* Mobile Heading */}
              <div className="relative flex items-center sm:justify-start md:space-x-10 lg:hidden w-auto">
                <h2 className="pl-6 pt-14 text-2xl sm:text-[20px] md:text-2xl text-start font-black leading-7 font-redHatDisplay mt-8 sm:mt-12 md:mt-16 w-[200px] sm:w-auto">
                  How our{" "}
                  <p className="text-BM_Green text-nowrap">Balanced Meal</p>{" "}
                  <p className="text-nowrap">Diet Looks Like</p>
                </h2>
                <div className="absolute top-0 right-0">
                  {/* <img
                    src={images[currentImageIndex]}
                    alt="Diet Illustration"
                    className="w-40 sm:w-48 md:w-60 transition-transform duration-500 ease-in-out"
                  /> */}
                </div>
              </div>

              {/* Description */}
              <p className="xl:pl-20 lg:pl-8 px-6 sm:pl-6 my-6 h-[128px] text-[#808080] w-auto sm:w-[320px] md:w-[500px] lg:w-[542px] text-sm sm:text-sm lg:text-body2 font-normal font-redHatDisplay text-start">
                At Balanced Meal, we offer a variety of fresh and Fusion dishes
                designed as per your body need. Our recipes are meticulously
                crafted by experienced nutrition experts to strike a balance by
                minimizing excessive fat and carbs while incorporating
                additional protein and essential micronutrients. Each serving is
                precisely portioned to align with your individual calorie
                requirements.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="mt-6 md:mt-0 hidden lg:block">
            <img
              src="/Home/Ellipse 6.png"
              alt="Diet Illustration"
              className="w-60 sm:w-72 md:w-80"
            />
          </div>
        </div>

        {/* Nutrition Section */}
        <div className="mt-8 font-redHatDisplay md:px-8 px-4">
          {/* Grid layout for larger screens */}
          <div className="hidden xl:grid lg:grid grid-cols-1 lg:grid-cols-3 gap-6 md:hidden w-auto xl:pl-20 pt-11 pb-20">
            {/* COMMENTED: items mapping until the file exists
            {items.map((item, index) => (
              <div key={index} className="lg:w-[250px]">
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  className="text-orange-500 text-4xl mb-2"
                />
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className={`text-base ${item.color} font-bold mt-2`}>
                  {item.percentage}
                </p>
                <p className="text-[#555555] mt-2">{item.description}</p>
              </div>
            ))} */}
          </div>

          {/* Carousel for smaller screens */}
          <SwiperComponent2 />
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="text-center mx-auto w-[300px] lg:w-[585px] md:w-[400px] font-redHatDisplay mt-20">
        <h3 className="text-3xl lg:text-[32px] md:text-2xl font-black">
          Start Your <span className="text-BM_Orange">Balanced Diet</span> Today
          With <span className="text-BM_Green">Balanced Meal</span>
        </h3>
        <Link to="/plans/Plan">
          <button className="text-sm tracking-wide lg:text-[16px] my-8 bg-BM_Green text-BM_Bars font-redHatDisplay py-4 px-6 rounded-[100px]">
            Browse our Plans
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BalancedMealSection;
