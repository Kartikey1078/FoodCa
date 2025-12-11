import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FoodCarousel2 from "../components/FoodCarousel2";
import Plans from "../components/Plans";
import AboutSection from "../components/AboutSection";
import BalancedMealSection from "../components/BalancedMealSection";
import TestimonialSection from "../components/TestimonialSection";
import OurGallery from "../components/OurGallery";
import FAQs from "../components/FAQs";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const reviewRowStyles = {
  wrapper:
    "overflow-x-scroll scrollbar-hide flex space-x-2 lg:space-x-6 px-2 sm:px-4  items-center",
  card: "min-w-[280px] sm:min-w-[320px] lg:min-w-[500px] max-w-[90%] md:max-w-[300px] tracking-wide text-black rounded-lg shadow-lg px-4 sm:p-6  mb-4 sm:mb-6",
};

const ReviewsRow = ({ direction, reviews }) => (
  <div className={`${reviewRowStyles.wrapper} animate-scroll-${direction}`}>
    {reviews.map((review, index) => (
      <div key={index} className={reviewRowStyles.card}>
        <Testimonial
          profilePic={review.image}
          name={review.name}
          description={review.review}
          rating={review.rating || 5}
        />
      </div>
    ))}
  </div>
);

const HomePage = () => {
  const reviews = [
    {
      name: "Shashi Thakur",
      review:
        "It is a long established fact that a reader will be distracted by the readable content...",
      image: "/Ellipse 2.png",
      rating: 4,
    },
  ];

  const icons = [
    { image: "/Home/box-circle-check 1.svg", description: "$0 Delivery Fee" },
    { image: "/Home/review 1.svg", description: "Balanced Nutrition" },
    {
      image: "/Home/region-pin-alt 1.svg",
      description: "Chef-Approved Nutrition",
    },
    { image: "/Home/review 1.svg", description: "Fresh Ingredients" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const goToNext = () =>
    setCurrentIndex((prev) => (prev === icons.length - 1 ? 0 : prev + 1));
  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev === 0 ? icons.length - 1 : prev - 1));

  const items = [
    {
      title: "CARBOHYDRATES",
      imgSrc: "/Home/Grain.svg",
      percentage: "45% - 65%",
      description: "Carbohydrates are primary source of energy...",
      color: "text-BM_Orange",
    },
    {
      title: "PROTEIN",
      imgSrc: "/Home/meat.svg",
      percentage: "20% - 35%",
      description: "Protein is essential for muscle repair...",
      color: "text-BM_Green",
    },
    {
      title: "FATS",
      imgSrc: "/Home/cheese.svg",
      percentage: "25% - 35%",
      description: "Supports cell function and brain health.",
      color: "text-[#D2252E]",
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/nutrition-bowl 6.svg",
    "/nutrition-bowl 6.svg",
    "/nutrition-bowl 6.svg",
    "/nutrition-bowl 6.svg",
    "/nutrition-bowl 6.svg",
  ];

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentImageIndex((prev) => (prev + 1) % images.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    {
      image: "/Carousal/Carousal 1.svg",
      title: "Eggs Benedict",
      description:
        "Thyme biscuits, pork belly reminiscent of British colonial glory",
      nutrition: {
        kcal: "72.9 g",
        protein: "55.4 g",
        carbs: "555 g",
        fats: "9.7 g",
      },
    },
  ];

  const [currentCIndex, setCurrentCIndex] = useState(0);
  const handleCNext = () =>
    setCurrentCIndex((prev) => (prev + 1) % menuItems.length);
  const handleCPrevious = () =>
    setCurrentCIndex((prev) => (prev === 0 ? menuItems.length - 1 : prev - 1));

  const { image, title, description, nutrition } = menuItems[currentCIndex];

  return (
    <div>
      {/* <Navbar /> */}
      <div className="flex flex-col items-center space-y-10 bg-[#FAFAFA]">
        <div className="w-full bg-[#ffffff] px-4 py-4 md:py-20 md:px-20">
          <div className="text-center">
            <p className=" w-auto text-2xl sm:text-2xl text-[#303030] md:text-3xl lg:text-[40px] font-redHatDisplay font-black tracking-wide mb-4 mx-auto">
              Experience The Science Of Nutrition With{" "}
              <br className="hidden lg:inline-block" />
              <span className="text-BM_Green"> Balanced Meals </span> — Fuel
              Health, Satisfy Cravings.
            </p>

            <p className="text-sm sm:text-[18px] md:text-[18px] lg:text-body1 md:w-[900px] font-redHatDisplay tracking-wide font-normal mx-10 lg:mx-auto">
              Ready To Eat Better? Feel Better? Live Better? Balanced Meal
              delivers fresh nutritious meals.
            </p>
          </div>
          <FoodCarousel2 />

          {/* <FoodCarousel2 /> */}
          {/* <FoodCarousel /> */}
          {/* Nutrition Section Commented */}
        </div>

        {/* ICON GRID */}
        <div className="py-16">
          <div className="hidden mx-30 mt-20 lg:block md:block p-8 border-[4px] border-[#F5F5F5] rounded-[15px]">
            <div className="grid grid-cols-4 gap-20">
              {icons.map((icon, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-1"
                >
                  <img src={icon.image} alt="" className="w-6 h-6" />
                  <p className="text-center text-BM_Black font-redHatDisplay">
                    {icon.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* <SwiperComponent1 /> */}
        </div>

        {/* CTA Section */}
        <div className="py-5 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-[40px] w-full md:w-[580px] font-black mx-auto font-redHatDisplay">
            We Don’t Just Serve Food, We Serve{" "}
            <span className="text-BM_Green">Nutrition</span>
          </h2>

          <Link to="/plans" className="inline-block">
            <span className="text-sm tracking-wide lg:text-[16px] lg:my-4 bg-BM_Green text-white font-redHatDisplay py-4 px-6 rounded-[100px] inline-flex items-center justify-center">
              Browse our Plans
            </span>
          </Link>
        </div>

        <div className="bg-[#FAFAFA] w-full md:px-16 lg:px-32">
          {/* Header */}
          <div className="text-center mb-5 mt-[40px]">
            <h3 className="mb-4 lg:text-[20px] sm:text-sm text-sm uppercase tracking-widest text-BM_Black font-bold font-redHatDisplay">
              Our Plans
            </h3>

            <div className="md:mx-auto mx-8 lg:w-[750px] md:w-[622px] text-center flex flex-col items-center">
              <h2
                className="text-center lg:text-[40px] sm:text-[20px] text-[23px]
        leading-relaxed tracking-normal md:text-4xl mt-2 font-black font-redHatDisplay w-full"
              >
                Our <span className="text-BM_Orange">Balanced Meals</span> Are
                Designed To Complete Your{" "}
                <span className="text-BM_Green">Nutrition</span> Requirements
                And Satisfy
                <span className="text-BM_Orange"> Tastebuds</span>
              </h2>
            </div>
          </div>

          {/* Plans */}
          <Plans />
        </div>
    
       <AboutSection />

       <BalancedMealSection />

       <TestimonialSection />

       <OurGallery />

       <FAQs />

      </div>
      <ContactSection />
      <Footer />
    </div>
    
  );
};

export default HomePage;
