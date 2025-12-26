// src/pages/PlansPage.jsx
import React from "react";
import SelectPlans from "../page/SelectPlans";

const PlansPage = () => {
  // Dummy plans
  const plans = [
    {
      _id: "1",
      title: "Basic Plan",
      price: 29,
      tag: "POPULAR",
      borderColor: "border-[#0a413a]",
      numberOfMeals: 10,
      features: ["Healthy Meals", "Free Delivery", "Flexible Schedule"],
    },
    {
      _id: "2",
      title: "Premium Plan",
      price: 49,
      tag: null,
      borderColor: "border-[#0a413a]",
      numberOfMeals: 20,
      features: ["Extra Protein", "Priority Support", "Diet Customization"],
    },
    {
      _id: "3",
      title: "Gold Plan",
      price: 79,
      tag: "BEST VALUE",
      borderColor: "border-[#0a413a]",
      numberOfMeals: 30,
      features: ["Chef Prepared Meals", "Full Custom Diet", "Nutrition Expert"],
    },
  ];

  return <SelectPlans plans={plans} />;
};

export default PlansPage;
