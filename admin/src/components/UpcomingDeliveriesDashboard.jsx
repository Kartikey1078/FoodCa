import React from "react";
import { Truck } from "lucide-react";

const UpcomingDeliveriesDashboard = () => {
  const deliveries = [
    { id: 1, name: "Rahul Sharma", time: "10:00 AM" },
    { id: 2, name: "Neha Verma", time: "12:30 PM" },
    { id: 3, name: "Amit Singh", time: "6:00 PM" },
  ];

  return (
    <div className="bg-orange-500 text-white rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-medium">Upcoming Deliveries</h2>
        <Truck />
      </div>

      <ul className="space-y-2 text-sm">
        {deliveries.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>{item.name}</span>
            <span className="opacity-90">{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingDeliveriesDashboard;
