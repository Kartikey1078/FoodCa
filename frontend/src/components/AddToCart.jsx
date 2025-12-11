import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { usePlan } from "../context/PlanContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";


const AddToCart = () => {
  const [minMealError, setMinMealError] = useState("");
  const [isMinMealModalOpen, setIsMinMealModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();

  const goToDeliveryForm = () => {
    navigate("/delivery-form");
  };
  const { items, clearCart, cartSectionRef, removeFromCart, updateQuantity } = useCart();
  const { selectedPlan } = usePlan();

  const hasItems = items.length > 0;

  // ---- EXTRACT PLAN INFO ----
  const getPlanInfo = (plan) => {
    if (!plan) return {};

    return {
      title: plan.attributes?.plan_title || plan.title || "Plan Title Not Found",
      minMeals:
        Number(plan.attributes?.minimum_meal_count) ||
        Number(plan.numberOfMeals) ||
        0,
      price: Number(plan.attributes?.price) || Number(plan.price) || 0,
      extraMealPrice:
        Number(plan.attributes?.extra_meal_price) ||
        Number(plan.extraMealPrice) ||
        0,
    };
  };

  const planInfo = getPlanInfo(selectedPlan);

  // ---- TOTAL MEALS ----
  const totalMeals = items.reduce(
    (sum, item) => sum + Number(item.quantity),
    0
  );

  // ---- EFFECTIVE EXTRA MEAL PRICE ----
  const effectiveExtraMealPrice =
    totalMeals >= 10 ? 11.9 : planInfo.extraMealPrice;

  // ---- CALCULATE EXTRA MEALS ----
  const extraMeals =
    totalMeals > planInfo.minMeals
      ? totalMeals - planInfo.minMeals
      : 0;

  const extraMealCost = extraMeals * effectiveExtraMealPrice;

  // ---- CHECK MINIMUM MEALS CONDITION ----
  const meetsMinimumMeals =
    planInfo.minMeals > 0 ? totalMeals >= planInfo.minMeals : true;

  // ---- NEW GRAND TOTAL (Plan Price + extra meal charges) ----
  const grandTotal = planInfo.price + extraMealCost;

  // ---- HANDLE PROCEED ----
  const handleProceedToCheckout = () => {
    // If user is not authenticated, send them to sign-in first
    if (!isLoaded || !user) {
      navigate("/sign-in");
      return;
    }

    // If there is a selected plan and minimum meals is not met, prevent navigation
    if (selectedPlan && !meetsMinimumMeals) {
      const remaining = Math.max(planInfo.minMeals - totalMeals, 0);
      const message =
        remaining > 0
          ? `Please add at least ${remaining} more meal${
              remaining > 1 ? "s" : ""
            } to reach the minimum of ${planInfo.minMeals} meals.`
          : `Please meet the minimum of ${planInfo.minMeals} meals before proceeding.`;

      setMinMealError(message);
      // Open custom modal so the user cannot miss it
      setIsMinMealModalOpen(true);
      return;
    }

    // Persist checkout data for payment step
    try {
      // Save selected cart items and total so DeliveryForm / SquarePayment can use them
      localStorage.setItem("checkout_cart", JSON.stringify(items));
      localStorage.setItem("checkout_total", String(grandTotal));
    } catch (err) {
      console.warn("Failed to persist checkout data:", err);
    }

    // Clear any previous error and proceed
    setMinMealError("");
    setIsMinMealModalOpen(false);
    goToDeliveryForm();
  };

  return (
    <section
      ref={cartSectionRef}
      id="cart-section"
      className="bg-white rounded-3xl shadow-xl border-2 border-[#ff7733]/60 p-6 relativebg-white rounded-3xl shadow-xl border-2 border-[#ff7733] p-6 relative ring-2 ring-[#ff7733]/30 mb-35"
    >
      {/* -------------------- MINIMUM MEAL MODAL -------------------- */}
      {isMinMealModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-[90%] p-5 relative">
            <button
              onClick={() => setIsMinMealModalOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              ×
            </button>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                !
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Minimum meals not reached
                </h3>
                <p className="mt-2 text-xs text-gray-600">
                  {minMealError ||
                    `You must select at least ${planInfo.minMeals} meals before you can continue to checkout.`}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsMinMealModalOpen(false)}
              className="mt-4 w-full rounded-xl bg-gray-900 py-2 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Got it, I will add more meals
            </button>
          </div>
        </div>
      )}
      {/* -------------------- PLAN DETAILS -------------------- */}
      {selectedPlan && (
        <div className="p-4 border-b border-gray-200 mb-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-bold mb-3 text-gray-900">
            Selected Plan
          </h2>

          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold">Plan: </span>
              {planInfo.title}
            </p>

            <p>
              <span className="font-semibold">Minimum Meals: </span>
              {planInfo.minMeals}
            </p>

            {/* PLAN PRICE */}
            <p>
              <span className="font-semibold">Plan Price: </span>$
              {planInfo.price}{" "}
              <span className="text-xs text-gray-500">
                (includes minimum {planInfo.minMeals} meals)
              </span>
            </p>

            <p>
              <span className="font-semibold">Meals Added: </span>
              {totalMeals}
            </p>

            {/* EXTRA MEAL PRICE ALWAYS SHOWN */}
            <p>
              <span className="font-semibold">Extra Meal Price: </span>$
              {effectiveExtraMealPrice.toFixed(2)}
              {totalMeals >= 10 && (
                <span className="text-xs text-gray-500 ml-1">
                  (Bulk discount applied)
                </span>
              )}
            </p>

            {/* SHOW EXTRA MEAL CHARGES ONLY IF EXTRA MEALS EXIST */}
            {extraMeals > 0 && (
              <p className="text-emerald-600 font-medium">
                Extra Meals: {extraMeals} × $
                {effectiveExtraMealPrice.toFixed(2)} = $
                {extraMealCost.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      )}

      {/* -------------------- CART HEADER -------------------- */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Your order</h3>
          <p className="text-xs text-gray-500">Review items before checkout</p>
        </div>
        {hasItems && (
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600"
          >
            Clear all
          </button>
        )}
      </div>

      {/* -------------------- IF CART EMPTY -------------------- */}
      {!hasItems ? (
        <p className="text-sm text-gray-500 bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-4 text-center">
          Cart is empty. Add meals to see them here.
        </p>
      ) : (
        <>
          {/* -------------------- CART ITEMS -------------------- */}
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.key}
                className="flex items-start gap-3 border border-gray-100 rounded-2xl p-3"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 rounded-xl object-cover border border-gray-100"
                  />
                )}

                <div className="flex-1">
                  <div className="flex justify-between gap-3">
                    <div>
                      <span className="text-sm font-semibold text-gray-900">
                        {item.title}
                      </span>
                      {item.subtitle && (
                        <p className="text-[11px] text-gray-400">
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.key)}
                      className="text-[11px] font-semibold text-rose-500 hover:text-rose-600"
                    >
                      Clear
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex flex-wrap gap-2 items-center">
                      {item.option && (
                        <span className="text-emerald-600 font-semibold text-[12px]">
                          Base: {item.option}
                        </span>
                      )}
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 border border-gray-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity - 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                      <span className="px-3 py-1 text-sm font-semibold text-gray-900 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                        aria-label="Increase quantity"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* -------------------- TOTAL SECTION -------------------- */}
          <div className="border-t border-dashed pt-4 mt-4 text-sm">
            <div className="flex justify-between">
              <span>Plan Price</span>
              <span>${planInfo.price.toFixed(2)}</span>
            </div>

            {extraMeals > 0 && (
              <div className="flex justify-between mt-2 text-emerald-600">
                <span>Extra Meal Charges</span>
                <span>${extraMealCost.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-base font-bold mt-4">
              <span>Grand Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            {/* MINIMUM MEAL WARNING */}
            {selectedPlan && !meetsMinimumMeals && (
              <p className="mt-2 text-xs text-rose-500">
                You must select at least {planInfo.minMeals} meals to proceed.
              </p>
            )}

            <button
              onClick={handleProceedToCheckout}
              className={`mt-4 w-full py-3 rounded-2xl font-semibold transition ${
                selectedPlan && !meetsMinimumMeals
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              Proceed to checkout
            </button>

          </div>
        </>
      )}
    </section>
  );
};

export default AddToCart;
