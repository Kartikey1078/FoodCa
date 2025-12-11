import React from 'react'
import CheckoutCard from '../components/CheckoutCard'
import NutritionExpertsSection from '../components/NutritionExpertsSection'
import { useLocation } from "react-router-dom";
const Checkout = () => {
  const { state } = useLocation();
  console.log(state?.selectedPlan); // "nutrition-punch"
  console.log(state?.price);        // 66
  return (
    <div>
     <NutritionExpertsSection />
      <CheckoutCard />
    </div>
  )
}

export default Checkout
