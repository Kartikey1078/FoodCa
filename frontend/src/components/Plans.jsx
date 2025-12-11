import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { usePlan } from "../context/PlanContext";

const Plans = () => {
  const scrollContainerRef = useRef(null);
  const { setSelectedPlan } = usePlan();

  // STATIC PLANS
  const plans = [
    {
      id: 1,
      attributes: {
        plan_title: "Nutrition Punch",
        minimum_meal_count: 1,
      },
    },
    {
      id: 2,
      attributes: {
        plan_title: "Full Day Nutrition",
        minimum_meal_count: 2,
      },
    },
  ];

  const getNutritionDescription = (planTitle) => {
    if (planTitle === "Nutrition Punch") {
      return "Consuming 1 meal every day will complete 30%-45% of your nutrition intake";
    } else if (planTitle === "Full Day Nutrition") {
      return "Consuming 2 meals every day will complete 60%-90% of your nutrition intake";
    }
    return "";
  };

  return (
    <>
      {/* Wrapper */}
      <div className="w-full overflow-x-auto hide-scroll-bar flex justify-center">
        
        <div
          ref={scrollContainerRef}
          className="flex gap-4 lg:w-[900px] w-full justify-start lg:justify-center overflow-x-auto px-4 scrollbar-hide"
        >
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="rounded-xl shadow-lg mb-5 flex-shrink-0 sm:w-[300px] w-[80%] lg:w-[360px] bg-[#FFFAE9] border-white border-2"
            >
              {/* FIXED, NON-MOVING IMAGE WRAPPER */}
              <div className="w-full flex">
                <div className="w-40 h-40 lg:w-44 lg:h-44 flex justify-center items-center">
                  <img
                    src="/Home/nutrition-bowl 5.svg"
                    alt={plan.attributes.plan_title}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="px-4 text-center">
                <h3 className="text-lg sm:text-xl font-black tracking-wide font-redHatDisplay text-BM_Green mt-6">
                  {plan.attributes.plan_title}
                </h3>

                <p className="text-xs sm:text-base text-[#303030] font-semibold mt-1">
                  Choose minimum {plan.attributes.minimum_meal_count} Meals
                </p>

                {/* Circular Icon + Description */}
                <div className="flex items-center mt-4 w-full justify-center px-2">
                  <svg
                    className="w-10 h-10 sm:w-14 sm:h-14"
                    viewBox="0 0 36 36"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="18"
                      cy="18"
                      r="12"
                      strokeWidth="4"
                      fill="none"
                      stroke="#38754E"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="12"
                      strokeWidth="4"
                      fill="none"
                      stroke="#D9D9D9"
                      strokeDasharray="100, 100"
                      strokeDashoffset="50"
                      transform="rotate(-90 18 18)"
                    />
                  </svg>

                  <p className="ml-2 text-[11px] sm:text-sm text-[#555555] font-bold">
                    {getNutritionDescription(plan.attributes.plan_title)}
                  </p>
                </div>

                {/* Button */}
                <Link to="/plans">
                  <button
                  
                   className="mt-4 w-full bg-BM_Green text-white font-semibold py-2 rounded flex items-center justify-center my-8 p-4">
                    Select Meals
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14m0 0l-6-6m6 6l-6 6"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Scroll Buttons */}
      <div className="flex px-4 py-2 justify-center items-center space-x-2 mt-4 lg:hidden mb-0">
        <button
          onClick={() =>
            scrollContainerRef.current?.scrollBy({
              left: -320,
              behavior: "smooth",
            })
          }
          className="text-black border p-2 rounded-full"
        >
          <img src="/angle-left (3) 2.svg" alt="left-arrow" className="h-5 w-5" />
        </button>

        <button
          onClick={() =>
            scrollContainerRef.current?.scrollBy({
              left: 320,
              behavior: "smooth",
            })
          }
          className="text-black border p-2 rounded-full"
        >
          <img src="/angle-left (3) 3.svg" alt="right-arrow" className="h-5 w-5" />
        </button>
      </div>
    </>
  );
};

export default Plans;
