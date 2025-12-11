import { useState, useEffect, useCallback } from "react";

export default function FoodCarousel2() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timer, setTimer] = useState(null);

  const items = [
    {
      image: "/About/fresh-cabbage.png",
      title: "Fresh cabbage salad",
      description:
        "Sourdough toast topped with smashed avocado and cherry tomatoes",
      nutrition: {
        kcal: "95.2 g",
        protein: "21.5 g",
        carbs: "210 g",
        fats: "15.3 g",
      },
    },

    {
      image: "/About/green.png",
      title: "Greenery",
      description: "Fluffy pancakes with maple syrup and fresh berries",
      nutrition: {
        kcal: "150 g",
        protein: "10.2 g",
        carbs: "310 g",
        fats: "8.1 g",
      },
    },
    {
      image: "/About/green-fresh-salad.png",
      title: "Green salad",
      description: "Fluffy pancakes with maple syrup and fresh berries",
      nutrition: {
        kcal: "170 g",
        protein: "10 g",
        carbs: "360 g",
        fats: "9.1 g",
      },
    },
    {
      image: "/About/avocado-salad.png",
      title: "Avocado salad",
      description: "Fluffy pancakes with maple syrup and fresh berries",
      nutrition: {
        kcal: "190 g",
        protein: "10.2 g",
        carbs: "410 g",
        fats: "9.1 g",
      },
    },
  ];

  // Auto Slide
  useEffect(() => {
    const initialTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % items.length);
    }, 4000);

    setTimer(initialTimer);

    return () => clearInterval(initialTimer);
  }, [items.length]);

  // Manual Slide
  const handleScroll = useCallback(
    (direction) => {
      setCurrentSlide((prev) =>
        direction === "left"
          ? (prev - 1 + items.length) % items.length
          : (prev + 1) % items.length
      );

      if (timer) clearInterval(timer);

      const newTimer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % items.length);
      }, 5000);

      setTimer(newTimer);
    },
    [timer, items.length]
  );

  return (
    <div className="relative w-full lg:min-h-[20vh] flex flex-col items-center justify-center overflow-hidden mt-5 lg:mt-0 px-4 sm:px-6 lg:px-6">
      {/* Image Section */}
      <div className="relative w-full max-w-5xl mx-auto aspect-[16/10]">
        <div className="absolute w-full h-full">
          {items.map((item, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-500 ${
                index === currentSlide
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Nutrition Card */}
      <div className="bg-white rounded-lg sm:p-8 md:p-6 mb-6 w-full max-w-md ">
        <h2 className="font-black text-xl text-center font-redHatDisplay mb-5">
          {items[currentSlide].title}
        </h2>

        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {Object.entries(items[currentSlide].nutrition).map(([key, value]) => (
            <div key={key} className="flex flex-col items-center">
              <img
                src={`/About/n${
                  key === "kcal"
                    ? "1"
                    : key === "protein"
                    ? "2"
                    : key === "carbs"
                    ? "3"
                    : "4"
                }.svg`}
                alt={key}
                className="w-6 h-6 sm:w-10 sm:h-10 mb-1"
              />

              <div className="text-sm sm:text-xs text-gray-600 capitalize">
                {key}
              </div>

              <div
                className={`w-12 h-[1px] my-2 ${
                  key === "kcal"
                    ? "bg-[#CE3C3C]"
                    : key === "protein"
                    ? "bg-[#D57A34]"
                    : key === "carbs"
                    ? "bg-[#F2790F]"
                    : "bg-[#D0B114]"
                }`}
              ></div>

              <div className="text-xs sm:text-sm font-bold">{value}</div>
            </div>
          ))}
        </div>
      </div>

    {/* Buttons */}
<div className="flex justify-center items-center w-full p-4">
  <div className="flex items-center gap-2 sm:gap-3 w-full max-w-md lg:max-w-2xl">

    {/* Left Arrow Button */}
    <button
      onClick={() => handleScroll("left")}
      className="p-0 sm:p-2 rounded-full bg-[#ADADAD1F] hover:bg-[#ADADAD3F] transition-colors flex-shrink-0"
    >
      ◀
    </button>

    {/* Browse Menu Button */}
    <button
      className="flex-1 flex items-center justify-center h-7 sm:h-10
                 px-0 sm:px-4 text-white text-xs sm:text-sm font-redHatDisplay 
                 rounded-full border border-[#38754E] bg-[#38754E] 
                 hover:bg-[#2C6340] transition-colors"
    >
      <span className="text-center font-redHatDisplay truncate">
        Browse Menu
      </span>
    </button>

    {/* Ingredients Button */}
    <button
      className="flex-1 flex items-center justify-center h-7 sm:h-10 
                 px-0 sm:px-4 text-[#38754E] text-xs sm:text-sm 
                 font-redHatDisplay rounded-full border border-[#38754E] 
                 bg-[#E7EEEA] hover:bg-[#D0DED5] transition-colors"
    >
      <span className="text-center font-redHatDisplay truncate">
        Ingredients
      </span>
    </button>

    {/* Right Arrow Button */}
    <button
      onClick={() => handleScroll("right")}
      className="p-0 sm:p-2 rounded-full bg-[#ADADAD1F] hover:bg-[#ADADAD3F] transition-colors flex-shrink-0"
    >
      ▶
    </button>
  </div>
</div>

    </div>
  );
}
