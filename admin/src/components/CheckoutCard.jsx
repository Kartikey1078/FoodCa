import React from "react";

// Icons component (same as your file)
const Icons = {
  Fire: () => (
    <svg
      className="w-3 h-3 text-orange-500"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03z"
        clipRule="evenodd"
      />
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

export default function CheckoutCard({ item, onEdit, onDelete }) {
  const hasOptions =
    item.options && Array.isArray(item.options) && item.options.length > 0;
  const isOddTotal = hasOptions && item.options.length % 2 === 1;

  return (
    <div className="relative flex flex-col w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-white group">
      {/* IMAGE */}
      <div className="relative h-32 sm:h-36 w-full">
        <img
          src={
            item.image || "https://via.placeholder.com/400x300?text=No+Image"
          }
          alt={item.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
          }}
        />
        {/* WEEK BADGE */}
        {item.weekNumbers && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[9px] font-bold px-2 py-1 rounded-full shadow">
            WEEK{" "}
            {Array.isArray(item.weekNumbers)
              ? item.weekNumbers.join(", ")
              : item.weekNumbers}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* ACTIONS */}
        <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={() => onEdit(item)}
            className="bg-green-600 text-white px-2 py-1 rounded text-[10px]"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="bg-red-600 text-white px-2 py-1 rounded text-[10px]"
          >
            Delete
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative px-3 pb-3 -mt-8 flex flex-col flex-1">
        <div className="bg-white rounded-xl p-2 shadow-lg text-center">
          <h2 className="text-sm font-extrabold text-gray-800 line-clamp-1">
            {item.title}
          </h2>
          <p className="text-gray-400 text-[10px] line-clamp-1">
            {item.subtitle}
          </p>

          {/* NUTRITION */}
          {item.nutrition?.length > 0 && (
            <div className="mt-2 flex justify-between bg-gray-50 rounded-lg px-1 py-1.5 border divide-x">
              {item.nutrition.map((nut, i) => (
                <div key={i} className="flex-1 text-center">
                  <div className="flex justify-center items-center gap-0.5">
                    {nut.highlight && <Icons.Fire />}
                    <span className="text-[9px] font-bold">{nut.value}</span>
                  </div>
                  <span className="text-[7px] uppercase text-gray-400">
                    {nut.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* OPTIONS */}
        <div className="mt-2 min-h-[60px]">
          {hasOptions ? (
            <div className="grid grid-cols-2 gap-1 text-[9px]">
              {item.options.map((opt, idx) => {
                const isLast = idx === item.options.length - 1;
                const center = isOddTotal && isLast;

                return (
                  <button
                    key={idx}
                    className={`py-1 px-1.5 rounded-lg border font-semibold truncate
                    ${center ? "col-span-2 mx-auto w-1/2" : "w-full"}
                    bg-white border-gray-200 text-gray-500`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center bg-gray-50 p-2 rounded-xl">
              <span className="flex items-center gap-1 text-[9px] font-semibold text-amber-700">
                <Icons.Chef /> Chef’s preset
              </span>
              <p className="text-[9px] text-gray-500 mt-1">
                Base pairing selected
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
