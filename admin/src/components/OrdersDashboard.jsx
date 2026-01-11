import React, { useState, useEffect } from "react";
import { ShoppingCart, TrendingUp, Package, Loader2 } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const OrdersDashboard = () => {
  const [orders, setOrders] = useState(0);
  const [todayOrders, setTodayOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [ordersRes, todayRes] = await Promise.all([
          fetch(`${API_BASE_URL}/orders/count`),
          fetch(`${API_BASE_URL}/orders/today`)
        ]);

        const ordersData = await ordersRes.json();
        const todayData = await todayRes.json();

        if (ordersData.success) {
          setOrders(ordersData.totalOrders);
        }
        setTodayOrders(todayData.count);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate percentage of today's orders
  const todayPercentage = orders > 0 ? ((todayOrders / orders) * 100).toFixed(1) : 0;

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-xl border border-blue-400/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />
        
        <div className="relative z-10 flex items-center justify-center h-40">
          <Loader2 className="w-8 h-8 animate-spin opacity-70" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-500 via-red-600 to-rose-600 text-white rounded-2xl p-6 shadow-xl border border-red-400/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <p className="font-semibold">Error</p>
            <p className="text-sm opacity-90">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-400/20 relative overflow-hidden group">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12 group-hover:scale-110 transition-transform duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm font-medium opacity-90 uppercase tracking-wide">
              Total Orders
            </p>
            <p className="text-xs opacity-70 mt-1">All time</p>
          </div>
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
            <ShoppingCart className="w-7 h-7" />
          </div>
        </div>

        {/* Main metric */}
        <div className="mb-6">
          <p className="text-5xl font-bold tracking-tight mb-1 bg-clip-text">
            {orders.toLocaleString()}
          </p>
          <div className="h-1 w-20 bg-white/30 rounded-full mt-2" />
        </div>

        {/* Today's orders section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Today's Orders</span>
            </div>
            {todayOrders > 0 && (
              <div className="flex items-center gap-1 bg-green-400/20 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" />
                <span className="text-xs font-semibold">{todayPercentage}%</span>
              </div>
            )}
          </div>
          
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">
              {todayOrders.toLocaleString()}
            </span>
            <span className="text-sm opacity-75">
              {todayOrders === 1 ? "order" : "orders"}
            </span>
          </div>

          {/* Progress indicator */}
          {orders > 0 && (
            <div className="mt-3">
              <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-white h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.min(todayPercentage, 100)}%` }}
                />
              </div>
              <p className="text-xs opacity-70 mt-1.5">
                {todayPercentage}% of total orders
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shine" />
      </div>
    </div>
  );
};

export default OrdersDashboard;