import React from "react";
import { Package, Clock, TrendingUp, CheckCircle, AlertCircle } from "lucide-react";

export default function OrdersStats({ orders }) {
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const inProgressOrders = orders.filter(o =>
    ["confirmed", "preparing", "out_for_delivery"].includes(o.status)
  ).length;
  const deliveredOrders = orders.filter(o => o.status === "delivered").length;
  const cancelledOrders = orders.filter(o => o.status === "cancelled").length;

  // Calculate percentages
  const pendingPercentage = totalOrders > 0 ? (pendingOrders / totalOrders) * 100 : 0;
  const inProgressPercentage = totalOrders > 0 ? (inProgressOrders / totalOrders) * 100 : 0;
  const deliveredPercentage = totalOrders > 0 ? (deliveredOrders / totalOrders) * 100 : 0;

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: Package,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      percentage: 100,
      trend: null,
    },
    {
      title: "Pending",
      value: pendingOrders,
      icon: Clock,
      gradient: "from-yellow-500 to-orange-600",
      bgGradient: "from-yellow-50 to-orange-50",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      percentage: pendingPercentage,
      trend: pendingOrders > 0 ? "needs-attention" : null,
    },
    {
      title: "In Progress",
      value: inProgressOrders,
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      percentage: inProgressPercentage,
      trend: inProgressOrders > 0 ? "active" : null,
    },
    {
      title: "Delivered",
      value: deliveredOrders,
      icon: CheckCircle,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      percentage: deliveredPercentage,
      trend: deliveredOrders > 0 ? "success" : null,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
      {stats.map((stat, index) => (
        <Stat key={index} {...stat} />
      ))}
    </div>
  );
}

const Stat = ({ title, value, icon: Icon, gradient, bgGradient, iconBg, iconColor, percentage, trend }) => (
  <div className={`relative bg-gradient-to-br ${bgGradient} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer`}>
    {/* Background decoration */}
    <div className="absolute top-0 right-0 w-24 h-24 bg-white/30 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-500" />
    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/20 rounded-full -ml-8 -mb-8 group-hover:scale-125 transition-transform duration-500" />

    {/* Content */}
    <div className="relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={`${iconBg} w-12 h-12 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        
        {trend && (
          <div className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
            trend === "needs-attention" ? "bg-yellow-200 text-yellow-800" :
            trend === "active" ? "bg-purple-200 text-purple-800" :
            "bg-green-200 text-green-800"
          }`}>
            {trend === "needs-attention" ? "⚠️" : trend === "active" ? "📈" : "✓"}
          </div>
        )}
      </div>

      {/* Title */}
      <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-2">
        {title}
      </p>

      {/* Value */}
      <div className="flex items-baseline gap-2 mb-3">
        <p className={`text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
          {value.toLocaleString()}
        </p>
        {title !== "Total Orders" && (
          <span className="text-sm text-gray-500 font-medium">
            orders
          </span>
        )}
      </div>

      {/* Progress bar */}
      {title !== "Total Orders" && percentage > 0 && (
        <div className="space-y-1.5">
          <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden shadow-inner">
            <div
              className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-700 ease-out`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 font-medium">
            {percentage.toFixed(1)}% of total
          </p>
        </div>
      )}

      {/* Total orders - additional info */}
      {title === "Total Orders" && value > 0 && (
        <p className="text-sm text-gray-600 font-medium">
          All orders to date
        </p>
      )}
    </div>

    {/* Hover shine effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
    </div>
  </div>
);