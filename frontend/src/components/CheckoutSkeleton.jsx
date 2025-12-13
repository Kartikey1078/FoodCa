import React from "react";

const CheckoutSkeleton = () => {
  return (
    <div className="relative flex flex-col w-full max-w-[330px] bg-white rounded-3xl shadow-xl overflow-hidden border border-white m-3 sm:max-w-[350px] md:h-[540px] lg:h-[560px] animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-40 sm:h-48 w-full bg-gray-300">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-400/50 to-transparent" />
      </div>

      {/* Content Skeleton */}
      <div className="relative px-4 pb-5 -mt-10 flex flex-col flex-1">
        <div className="flex-1 overflow-y-auto pr-1 space-y-2.5">
          {/* Title Section Skeleton */}
          <div className="bg-white rounded-2xl p-3 shadow-lg text-center">
            {/* Title */}
            <div className="h-6 bg-gray-300 rounded-lg w-3/4 mx-auto mb-2"></div>
            {/* Subtitle */}
            <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mt-2"></div>

            {/* Nutrition pills skeleton */}
            <div className="mt-3 flex items-center justify-between bg-gray-50 rounded-xl px-1 py-2 border divide-x">
              {[1, 2, 3].map((idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div className="h-4 bg-gray-300 rounded w-8 mb-1"></div>
                  <div className="h-2 bg-gray-200 rounded w-12"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Options Section Skeleton */}
          <div className="min-h-[80px]">
            <div className="flex justify-between mb-0.5">
              <div className="h-3 bg-gray-300 rounded w-20"></div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[1, 2].map((idx) => (
                <div
                  key={idx}
                  className="py-1.5 px-2 rounded-xl border border-gray-200 bg-gray-100"
                >
                  <div className="h-3 bg-gray-300 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price and Quantity Skeleton */}
        <div className="mt-3 flex items-end justify-between gap-3">
          <div className="h-6 bg-gray-300 rounded w-16"></div>
          <div className="flex flex-col items-end">
            <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
            <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 p-1 gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Add to cart button skeleton */}
        <div className="mt-4 mb-2 w-full py-3 rounded-2xl bg-gray-300"></div>
      </div>
    </div>
  );
};

// Component to show 9 skeleton cards
const CheckoutSkeletonGrid = () => {
  return (
    <div className="flex flex-wrap justify-center lg:justify-start w-full">
      {Array.from({ length: 9 }).map((_, idx) => (
        <CheckoutSkeleton key={idx} />
      ))}
    </div>
  );
};

export default CheckoutSkeletonGrid;




