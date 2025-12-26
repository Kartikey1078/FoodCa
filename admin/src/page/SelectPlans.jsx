import React from "react";

const SelectPlans = ({ plans = [] }) => {
  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      {/* Header */}
      <h2 className="text-3xl font-bold text-center text-[#0a413a] mb-10">
        Choose Your Plan
      </h2>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className={`relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border-2 ${plan.borderColor}`}
          >
            {/* Tag Badge */}
            {plan.tag && (
              <div className="absolute top-4 right-4 bg-[#0a413a] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                {plan.tag}
              </div>
            )}

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800">{plan.title}</h3>

            {/* Price */}
            <p className="text-3xl font-bold text-[#0a413a] mt-3">
              ${plan.price}
              <span className="text-sm text-gray-500 font-medium"> / month</span>
            </p>

            {/* Meals */}
            <p className="mt-1 text-gray-600 text-sm">
              {plan.numberOfMeals} meals included
            </p>

            {/* Divider */}
            <div className="h-[1px] bg-gray-200 my-4"></div>

            {/* Features */}
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-[#0a413a]"></span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Button */}
            <button className="mt-6 w-full bg-[#0a413a] text-white py-2 rounded-full font-medium hover:bg-[#062d28] transition shadow-md">
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectPlans;
