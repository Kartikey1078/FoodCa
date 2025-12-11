import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import AddToCart from "./AddToCart";
import TagFilters from "./TagFilters";
import CheckoutSkeletonGrid from "./CheckoutSkeleton";

// --------------------------------------------------
// Icons
// --------------------------------------------------
const Icons = {
  Fire: () => (
    <svg
      className="w-3 h-3 text-orange-500"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
        clipRule="evenodd"
      />
    </svg>
  ),
  Minus: () => (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
    </svg>
  ),
  Plus: () => (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  ),
  Chef: () => (
    <svg
      className="w-4 h-4 text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 11a4 4 0 113.5-6 4 4 0 017 0A4 4 0 1122 11v2a2 2 0 01-2 2h-1.5l-.5 4a2 2 0 01-2 2H8a2 2 0 01-2-2l-.5-4H4a2 2 0 01-2-2v-2z"
      />
    </svg>
  ),
};

// --------------------------------------------------
// CheckoutCard Component
// --------------------------------------------------
const CheckoutCard = ({ meal }) => {
  const [quantity, setQuantity] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shake, setShake] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart, scrollToCart } = useCart();
  const [attemptedAdd, setAttemptedAdd] = useState(false);

  const { image, title, subtitle, nutrition, options, price } = meal;
  const hasOptions = Array.isArray(options) && options.length > 0;
  const canAddToCart = quantity > 0 && (!hasOptions || selectedOption);

  // Reset for each new card (title change)
  useEffect(() => {
    setSelectedOption(null);
    setQuantity(0);
  }, [title]);

  // Auto deselect base if quantity=0
  useEffect(() => {
    if (quantity === 0) setSelectedOption(null);
  }, [quantity]);

  const handleIncrement = () => {
    if (!hasOptions || selectedOption) {
      setQuantity((q) => q + 1);
    } else {
      // User tried to add without selecting option
      setAttemptedAdd(true);

      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  const handleOptionSelect = (opt) => {
    setSelectedOption(opt);
    setAttemptedAdd(false); // hide error
    if (quantity === 0) setQuantity(1);
  };

  const handleReset = () => {
    setQuantity(0);
    setSelectedOption(null);
  };

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 2000);
    return () => clearTimeout(timer);
  }, [added]);

  const handleAddToCart = () => {
    if (!canAddToCart) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    addToCart({
      mealId: meal.id ?? meal._id ?? title,
      title,
      subtitle,
      option: selectedOption,
      quantity,
      price,
      image,
    });

    setAdded(true);
    setQuantity(0);
    scrollToCart();
  };

  return (
    <div className="relative flex flex-col w-full max-w-[330px] bg-white rounded-3xl shadow-xl overflow-hidden border border-white m-3 sm:max-w-[350px] md:h-[540px] lg:h-[560px]">
      {/* Image */}
      <div className="relative h-40 sm:h-48 w-full">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="relative px-4 pb-5 -mt-10 flex flex-col flex-1">
        <div className="flex-1 overflow-y-auto pr-1 space-y-2.5">
          <div className="bg-white rounded-2xl p-3 shadow-lg text-center">
            <h2 className="text-xl font-extrabold text-gray-800">{title}</h2>
            <p className="text-gray-400 text-xs font-medium mt-1">{subtitle}</p>

            {/* Nutrition pills */}
            <div className="mt-3 flex items-center justify-between bg-gray-50 rounded-xl px-1 py-2 border divide-x">
              {nutrition.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div className="flex items-center gap-0.5">
                    {item.highlight && <Icons.Fire />}
                    <span
                      className={`text-[11px] font-bold ${
                        item.highlight ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {item.value}
                    </span>
                  </div>
                  <span className="text-[8px] uppercase tracking-wide text-gray-400">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="min-h-[80px]">
            {hasOptions ? (
              <>
                <div className="flex justify-between mb-0.5">
                  <span className="text-[11px] font-bold text-gray-700">
                    Select Base
                  </span>
                  {selectedOption && (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 rounded-md">
                      Saved
                    </span>
                  )}
                </div>

                <div
                  className={`grid grid-cols-2 gap-1.5 text-[11px] ${
                    shake ? "animate-shake" : ""
                  }`}
                >
                  {options.map((opt) => {
                    const active = selectedOption === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleOptionSelect(opt)}
                        className={`py-1.5 px-2 rounded-xl border font-semibold truncate transition-all
                          ${
                            active
                              ? "bg-gray-800 border-gray-800 text-white shadow-md"
                              : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                          }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center border bg-gradient-to-b from-gray-50 to-white px-3.5 py-3.5 rounded-2xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-full text-[11px] font-semibold">
                  <Icons.Chef /> Chef's preset base
                </span>
                <p className="text-[11px] text-gray-500 font-medium mt-2 text-center">
                  Base pairing already selected for this dish.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quantity */}
        <div className="mt-3 flex items-end justify-between gap-3">
          {/* <span className="text-lg font-bold text-gray-900">${price}</span> */}

          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-gray-700 mb-1">
              Quantity
            </span>
            <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 p-1 gap-2">
              <button
                onClick={() => setQuantity((q) => Math.max(0, q - 1))}
                disabled={quantity === 0}
                className="w-8 h-8 flex items-center justify-center bg-white border rounded-full text-gray-500 disabled:opacity-50"
              >
                <Icons.Minus />
              </button>
              <span className="w-4 text-center font-bold text-sm">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-white transition
                  ${
                    selectedOption || !hasOptions
                      ? "bg-gray-900"
                      : "bg-gray-300"
                  }`}
              >
                <Icons.Plus />
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!canAddToCart}
          className={`mt-4 mb-2 w-full py-3 rounded-2xl font-semibold text-white transition
            ${
              canAddToCart
                ? "bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-300"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
        >
          {added ? "Added to cart" : "Add to cart"}
        </button>

        {(quantity > 0 || selectedOption) && (
          <button
            type="button"
            onClick={handleReset}
            className="text-[12px] font-semibold text-gray-500 hover:text-gray-700 underline-offset-2 underline self-end"
          >
            Clear selection
          </button>
        )}

        {attemptedAdd && hasOptions && !selectedOption && (
          <p className="text-[11px] text-rose-500 font-semibold text-right mt-1">
            Select a base to continue
          </p>
        )}
      </div>

      {/* Shake animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

// --------------------------------------------------
// Main Page Component
// --------------------------------------------------
const MenuPage = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState("All");

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const url = selectedTag === "All" 
          ? "http://localhost:6001/api/checkout"
          : `http://localhost:6001/api/checkout/tags?tag=${encodeURIComponent(selectedTag)}`;
        
        const res = await fetch(url);
        const data = await res.json();

        if (data.success) {
          setMeals(data.data);
        }
      } catch (err) {
        console.error("Error fetching meals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [selectedTag]);

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <TagFilters onTagSelect={handleTagSelect} />
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          {/* Desktop layout: cards left + cart right */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            
            {/* Meals grid */}
            <div className="flex-1">
              {loading ? (
                <CheckoutSkeletonGrid />
              ) : (
                <div className="flex flex-wrap justify-center lg:justify-start w-full">
                  {meals.length > 0 ? (
                    meals.map((meal, idx) => <CheckoutCard key={idx} meal={meal} />)
                  ) : (
                    <p className="text-gray-600 text-sm">No meals available.</p>
                  )}
                </div>
              )}
            </div>

            {/* Cart Sidebar (moves to bottom on mobile) */}
            <div className="w-full lg:w-[350px] lg:sticky lg:top-6">
              <AddToCart />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
