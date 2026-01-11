import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePlan } from "../context/PlanContext";
import PlansSkeleton from "./PlanCardSkeleton";
import { Check, Sparkles, TrendingUp, Crown, ArrowRight, Zap } from "lucide-react";

const PlansSection = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const { setSelectedPlan } = usePlan();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/plans`);
        const data = await res.json();
        setPlans(data);
      } catch (err) {
        console.error("Failed to fetch plans:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const activePlans = plans.filter((plan) => plan.isActive);

  if (loading) {
    return <PlansSkeleton />;
  }

  if (!activePlans.length) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-BM_Green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-redHatDisplay">Loading plans...</p>
        </div>
      </div>
    );
  }

  // Determine if plan is popular/featured
  const isPremiumPlan = (plan) => plan.tag && plan.tag.toLowerCase().includes('popular');

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-green-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-green-100/10 to-orange-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative px-5 py-16 mx-auto lg:px-20 max-w-7xl">
        {/* Header with Animation */}
        <div className="flex flex-col text-center w-full mb-20">
          <div className="inline-flex items-center justify-center gap-2 mx-auto mb-4 px-4 py-2 bg-gradient-to-r from-green-50 to-orange-50 rounded-full border border-green-200/50">
            <Sparkles className="w-4 h-4 text-BM_Orange" />
            <span className="text-sm font-redHatDisplay text-gray-700 font-medium">
              Transform Your Health Journey
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-blackHanSans text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-BM_Black to-gray-800 mb-4 leading-tight">
            Our Nutrition Plans
          </h1>
          
          <p className="text-lg md:text-xl font-redHatDisplay text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Smartly designed for your lifestyle & convenience
            <span className="block text-base text-gray-500 mt-2">
              Start your transformation today with personalized meal plans
            </span>
          </p>
        </div>

        {/* Plans Grid */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-10">
          {activePlans.map((plan, index) => {
            const isPopular = isPremiumPlan(plan);
            const isHovered = hoveredPlan === plan._id;

            return (
              <div
                key={plan._id}
                className="w-full md:w-[calc(50%-1.25rem)] max-w-[520px] group"
                onMouseEnter={() => setHoveredPlan(plan._id)}
                onMouseLeave={() => setHoveredPlan(null)}
                style={{ 
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` 
                }}
              >
                <div className="relative h-full">
                  {/* Glow Effect for Popular Plans */}
                  {isPopular && (
                    <div className="absolute -inset-1  rounded-[2rem] opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  )}

                  <div
                    className={`
                      relative h-full p-8 md:p-10 rounded-3xl border-2 
                      transition-all duration-500 backdrop-blur-xl
                      ${isPopular 
                        ? 'bg-gradient-to-br from-white via-orange-50/30 to-white border-BM_Orange shadow-2xl shadow-orange-200/50' 
                        : 'bg-white/95 border-BM_Green/30 shadow-xl hover:shadow-2xl'
                      }
                      ${isHovered ? 'scale-[1.02] -translate-y-2' : 'scale-100'}
                    `}
                  >
                    {/* Premium Badge */}
                    {plan.tag && (
                      <div className="absolute -right-3 -top-3 z-10">
                        <div className={`
                          relative px-5 py-2 rounded-2xl font-redHatDisplay font-bold text-sm
                          shadow-lg flex items-center gap-2
                          ${isPopular 
                            ? 'bg-gradient-to-r from-BM_Orange to-yellow-500 text-white' 
                            : 'bg-BM_Green text-white'
                          }
                        `}>
                          {isPopular && <Crown className="w-4 h-4" />}
                          {plan.tag}
                          {isPopular && <Sparkles className="w-3 h-3 animate-pulse" />}
                        </div>
                      </div>
                    )}

                    {/* Plan Header */}
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`
                          w-12 h-12 rounded-2xl flex items-center justify-center
                          ${isPopular 
                            ? 'bg-gradient-to-br from-BM_Orange to-yellow-500' 
                            : 'bg-gradient-to-br from-BM_Green to-green-600'
                          }
                          shadow-lg
                        `}>
                          {isPopular ? (
                            <TrendingUp className="w-6 h-6 text-white" />
                          ) : (
                            <Zap className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <h2 className="text-2xl font-redHatDisplay font-bold text-gray-800 uppercase tracking-wide">
                          {plan.title}
                        </h2>
                      </div>

                      {/* Price Display */}
                      <div className="relative">
                        <div className="flex items-end gap-2">
                          <span className="text-6xl md:text-7xl font-blackHanSans bg-gradient-to-br from-BM_Black to-gray-700 bg-clip-text text-transparent">
                            ${plan.price}
                          </span>
                          <span className="text-xl font-redHatDisplay text-gray-500 mb-3 font-medium">
                            /week
                          </span>
                        </div>
                        <div className="h-1 w-24 bg-gradient-to-r from-BM_Green to-BM_Orange rounded-full mt-4"></div>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4 group/feature"
                          style={{ 
                            animation: `slideInLeft 0.4s ease-out ${idx * 0.1}s both` 
                          }}
                        >
                          <div className={`
                            flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center
                            transition-all duration-300 group-hover/feature:scale-110
                            ${isPopular 
                              ? 'bg-gradient-to-br from-BM_Orange to-yellow-500 shadow-md shadow-orange-200' 
                              : 'bg-gradient-to-br from-BM_Green to-green-600 shadow-md shadow-green-200'
                            }
                          `}>
                            <Check className="w-4 h-4 text-white stroke-[3]" />
                          </div>
                          <p className="flex-1 text-gray-700 font-redHatDisplay leading-relaxed font-medium">
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Link to="/checkout" className="block mt-auto">
                      <button
                        onClick={() => {
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
                        className={`
                          relative w-full py-4 px-6 rounded-2xl font-redHatDisplay font-bold text-base
                          transition-all duration-300 overflow-hidden group/button
                          flex items-center justify-center gap-3
                          ${isPopular
                            ? 'bg-gradient-to-r from-BM_Orange to-yellow-500 text-white shadow-xl shadow-orange-300/50 hover:shadow-2xl hover:shadow-orange-400/50'
                            : 'bg-gradient-to-r from-BM_Green to-green-600 text-white shadow-xl shadow-green-300/50 hover:shadow-2xl hover:shadow-green-400/50'
                          }
                        `}
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          <Sparkles className="w-5 h-5" />
                          Select Meals
                          <ArrowRight className="w-5 h-5 transition-transform group-hover/button:translate-x-1" />
                        </span>
                        
                        {/* Button Shine Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover/button:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      </button>
                    </Link>

                    {/* Bottom Accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-BM_Green to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { icon: "🥗", label: "Fresh Ingredients", value: "100%" },
            { icon: "⭐", label: "Customer Rating", value: "4.9/5" },
            { icon: "📦", label: "Meals Delivered", value: "50K+" },
            { icon: "💚", label: "Health Score", value: "A+" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center group cursor-default">
              <div className="text-4xl mb-2 transform group-hover:scale-125 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-2xl font-blackHanSans text-BM_Black mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-redHatDisplay text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PlansSection;