import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePlan } from "../context/PlanContext";

const PlansSection = () => {
  const [plans, setPlans] = useState([]);
  const { setSelectedPlan } = usePlan();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/plans`);
        const data = await res.json();
        setPlans(data);
      } catch (err) {
        console.error("Failed to fetch plans:", err);
      }
    };

    fetchPlans();
  }, []);

  const activePlans = plans.filter((plan) => plan.isActive);

  if (!activePlans.length) {
    return <p className="text-center py-20">Loading plans...</p>;
  }

  return (
    <div className="container px-5 py-5 mx-auto lg:px-20 max-w-5xl text-left">
      {/* Header */}
      <div className="flex flex-col text-center w-full mb-16">
        <h1 className="text-heading1 font-blackHanSans text-BM_Black">
          Our Nutrition Plans
        </h1>
        <p className="text-body2 font-redHatDisplay text-gray-600">
          Smartly designed for your lifestyle & convenience
        </p>
      </div>

      {/* All Plans */}
      <div className="flex flex-wrap justify-center gap-10">
        {activePlans.map((plan) => (
          <div
            key={plan._id}
            className="w-full md:w-[calc(50%-1.5rem)] max-w-[500px]"
          >
            <div
              className={`
                h-full p-8 rounded-3xl border-2 shadow-md 
                transition-all duration-300 bg-white/90 backdrop-blur-md
                hover:shadow-xl hover:-translate-y-1
                ${plan.borderColor || "border-BM_Green"}
              `}
            >
              {/* Top Tag */}
              {plan.tag && (
                <span className="absolute right-0 top-0 bg-BM_Orange text-white px-4 py-1 text-xs rounded-bl-2xl tracking-wide font-redHatDisplay">
                  {plan.tag}
                </span>
              )}

              {/* Title */}
              <h2 className="text-subHeading font-redHatDisplay text-gray-700 uppercase mb-1">
                {plan.title}
              </h2>

              {/* Price */}
              <h1 className="text-5xl font-blackHanSans text-BM_Black mb-6 border-b pb-4">
                ${plan.price}
                <span className="text-lg font-redHatDisplay ml-1 text-gray-500">
                  /week
                </span>
              </h1>

              {/* Features */}
              <div className="mb-6">
                {plan.features.map((feature, idx) => (
                  <p
                    key={idx}
                    className="flex items-center text-BM_Black text-body2 font-redHatDisplay mb-3"
                  >
                    <span className="w-6 h-6 mr-3 bg-BM_Green text-white rounded-full flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                        className="w-3 h-3"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                    {feature}
                  </p>
                ))}
              </div>

              {/* Button */}
              <Link
                to="/checkout"
                className="block mt-auto"
              >
                <button
                  onClick={() => {
                    // Transform API data to match expected structure
                    const planData = {
                      id: plan._id,
                      attributes: {
                        plan_title: plan.title,
                        minimum_meal_count: plan.numberOfMeals || 1,
                        tag: plan.tag,
                        price: plan.price,
                        features: plan.features || [],
                        extraMealPrice: plan.extraMealPrice,
                        borderColor: plan.borderColor,
                        isActive: plan.isActive,
                      },
                      // Also keep original API data for reference
                      _id: plan._id,
                      title: plan.title,
                      price: plan.price,
                      tag: plan.tag,
                      borderColor: plan.borderColor,
                      features: plan.features,
                      numberOfMeals: plan.numberOfMeals,
                      extraMealPrice: plan.extraMealPrice,
                    };
                    setSelectedPlan(planData);
                  }}
                  className="w-full bg-BM_Green text-white py-3 rounded-xl hover:bg-green-700 transition flex items-center justify-center gap-2 font-redHatDisplay shadow-md"
                >
                  Select Meals
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlansSection;
