import React from "react";
import { Users } from "lucide-react";
import { useState,useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL

const ActiveCustomersDashboard = () => {
 const [users,setUsers]= useState (0);

    useEffect(()=>{
        const fetchUsersCount = async ()=>{
            try {
                const res = await fetch(`${API_BASE_URL}/users`)
                const data = await res.json();

                if (data.success) {
                    setUsers(data.pagination.totalUsers)
                }
            } catch (error) {
                console.error("Failed to fetch users count:", error);
            }
        }
        fetchUsersCount();
    },[])

  return (
    <div className="bg-purple-500 text-white rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium">Active Customers</h2>
        <Users />
      </div>

      <p className="text-3xl font-bold mt-4">{users}</p>
      <p className="text-sm mt-2 opacity-90">Currently subscribed</p>
    </div>
  );
};

export default ActiveCustomersDashboard;
