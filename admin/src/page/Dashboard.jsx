import React from "react";
import RevenueDashboard from "../components/RevenueDashboard";
import OrdersDashboard from "../components/OrdersDashboard";
import ActiveCustomersDashboard from "../components/ActiveCustomersDashboard";
import UpcomingDeliveriesDashboard from "../components/UpcomingDeliveriesDashboard";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <RevenueDashboard />
        <OrdersDashboard />
        <ActiveCustomersDashboard />
        <UpcomingDeliveriesDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
