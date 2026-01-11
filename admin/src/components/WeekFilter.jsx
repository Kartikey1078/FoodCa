import React from "react";

const weeks = [
  { label: "All Weeks", value: "all" },
  { label: "Week 1", value: 1 },
  { label: "Week 2", value: 2 },
  { label: "Week 3", value: 3 },
  { label: "Week 4", value: 4 },
  { label: "Week 5", value: 5 },
  { label: "Week 6", value: 6 },
];

export default function WeekFilter({ selectedWeeks, onChange }) {
  const handleClick = (value) => {
    // ALL selected → reset filter
    if (value === "all") {
      onChange([]);
      return;
    }

    // Toggle logic
    if (selectedWeeks.includes(value)) {
      onChange(selectedWeeks.filter((w) => w !== value));
    } else {
      onChange([...selectedWeeks, value]);
    }
  };

  const isAllActive = selectedWeeks.length === 0;

  return (
    <div className="flex gap-2 flex-wrap">
      {weeks.map((week) => {
        const isActive =
          week.value === "all"
            ? isAllActive
            : selectedWeeks.includes(week.value);

        return (
          <button
            key={week.value}
            onClick={() => handleClick(week.value)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition
              ${
                isActive
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {week.label}
          </button>
        );
      })}
    </div>
  );
}
