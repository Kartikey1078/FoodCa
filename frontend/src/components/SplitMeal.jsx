import React, { useEffect, useState } from "react";

const SplitMeal = ({ itemKey }) => {
  const [totalQty, setTotalQty] = useState(0);
  const [wedQty, setWedQty] = useState(0);
  const [sunQty, setSunQty] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("foodapp_cart")) || [];
    const item = cart.find(i => i.key === itemKey);
    if (!item) return;

    setTotalQty(item.quantity);

    if (!item.splitData) {
      setWedQty(item.quantity);
      setSunQty(0);
    } else {
      setWedQty(item.splitData.wed);
      setSunQty(item.splitData.sun);
    }
  }, [itemKey]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("foodapp_cart")) || [];
    const updatedCart = cart.map(item =>
      item.key !== itemKey
        ? item
        : { ...item, splitData: { wed: wedQty, sun: sunQty } }
    );
    localStorage.setItem("foodapp_cart", JSON.stringify(updatedCart));
  }, [wedQty, sunQty, itemKey]);

  const addToWed = () => {
    if (sunQty > 0) {
      setWedQty(w => w + 1);
      setSunQty(s => s - 1);
    }
  };

  const removeFromWed = () => {
    if (wedQty > 0) {
      setWedQty(w => w - 1);
      setSunQty(s => s + 1);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[9px] sm:text-[10px] md:text-[11px] font-medium text-gray-500">
          Split Meal
        </span>
        <span className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-400">
          Total {totalQty}
        </span>
      </div>

      {/* Controls */}
      <div className="flex gap-1 sm:gap-1.5 md:gap-2">
        {/* WED */}
        <div className="flex flex-1 items-center justify-between rounded-md bg-orange-400/90 px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-1 md:py-1.5 transition-all hover:bg-orange-400">
          <button
            onClick={removeFromWed}
            className="w-4 sm:w-5 md:w-5 text-white text-[10px] sm:text-xs md:text-sm font-medium hover:scale-110 active:scale-95 transition-transform touch-manipulation leading-none"
            aria-label="Remove from Wednesday"
          >
            −
          </button>

          <div className="text-center leading-tight flex-1">
            <div className="text-[7px] sm:text-[8px] md:text-[9px] text-white/80 uppercase tracking-wide">
              Wed
            </div>
            <div className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-white">
              {wedQty}
            </div>
          </div>

          <button
            onClick={addToWed}
            className="w-4 sm:w-5 md:w-5 text-white text-[10px] sm:text-xs md:text-sm font-medium hover:scale-110 active:scale-95 transition-transform touch-manipulation leading-none"
            aria-label="Add to Wednesday"
          >
            +
          </button>
        </div>

        {/* SUN */}
        <div className="flex flex-1 items-center justify-between rounded-md bg-emerald-500/75 px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-1 md:py-1.5">
          <button
            disabled
            className="w-4 sm:w-5 md:w-5 text-white text-[10px] sm:text-xs md:text-sm opacity-40 cursor-not-allowed leading-none"
            aria-label="Remove from Sunday (disabled)"
          >
            −
          </button>

          <div className="text-center leading-tight flex-1">
            <div className="text-[7px] sm:text-[8px] md:text-[9px] text-white/80 uppercase tracking-wide">
              Sun
            </div>
            <div className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-white">
              {sunQty}
            </div>
          </div>

          <button
            disabled
            className="w-4 sm:w-5 md:w-5 text-white text-[10px] sm:text-xs md:text-sm opacity-40 cursor-not-allowed leading-none"
            aria-label="Add to Sunday (disabled)"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplitMeal;
