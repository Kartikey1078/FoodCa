import React from "react";
import { IndianRupee } from "lucide-react";
import { useState,useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const RevenueDashboard = () => {
 const [revenue, setRevenue] =  useState(0);

  useEffect(()=>{
    const calculateTotalRevenue = async ()=>{
        try {
            const res = await fetch(`${API_BASE_URL}/orders/revenue`)
            const data = await res.json();
            if (data.success) {
                setRevenue(data.totalRevenue)
            }
        } catch (error) {
            console.error("Failed to fetch total revenue:", error);
        }
    }
    calculateTotalRevenue()
  },[])

  return (
    <div className="bg-green-500 text-white rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium">Total Revenue</h2>
        <IndianRupee />
      </div>

      <p className="text-3xl font-bold mt-4">₹ {revenue.toLocaleString()}</p>
      {/* <p className="text-sm mt-2 opacity-90">+12% from last month</p> */}
    </div>
  );
};

export default RevenueDashboard;
