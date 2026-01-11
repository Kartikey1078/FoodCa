import React from "react";

const PlanCardSkeleton = () => {
  return (
    <div className="w-full md:w-[calc(50%-1.5rem)] max-w-[500px]">
      <div className="relative h-full p-8 rounded-3xl border-2 border-gray-200 bg-white shadow-md animate-pulse">
        {/* Tag */}
        <div className="absolute right-0 top-0 w-20 h-6 bg-gray-300 rounded-bl-2xl" />

        {/* Title */}
        <div className="h-4 w-32 bg-gray-300 rounded mb-3" />

        {/* Price */}
        <div className="h-12 w-48 bg-gray-300 rounded mb-6" />

        {/* Divider */}
        <div className="h-px bg-gray-200 mb-6" />

        {/* Features */}
        <div className="space-y-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-300 rounded-full" />
              <div className="h-4 w-full bg-gray-300 rounded" />
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="h-12 w-full bg-gray-300 rounded-xl" />
      </div>
    </div>
  );
};

const PlansSkeleton = () => {
  return (
    <div className="container px-5 py-5 mx-auto lg:px-20 max-w-5xl">
      {/* Header Skeleton */}
      <div className="flex flex-col items-center w-full mb-16 animate-pulse">
        <div className="h-8 w-64 bg-gray-300 rounded mb-4" />
        <div className="h-4 w-80 bg-gray-300 rounded" />
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-10">
        <PlanCardSkeleton />
        <PlanCardSkeleton />
      </div>
    </div>
  );
};

export default PlansSkeleton;
