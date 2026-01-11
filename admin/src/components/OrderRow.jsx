import React, { useState } from "react";
import { Eye, Package, Phone, MapPin, MoreVertical, Check } from "lucide-react";
import { statusColors, statusOptions } from "./constants";

const statusConfig = {
  pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: "⏳" },
  confirmed: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: "✓" },
  preparing: { color: "bg-purple-100 text-purple-800 border-purple-200", icon: "👨‍🍳" },
  out_for_delivery: { color: "bg-indigo-100 text-indigo-800 border-indigo-200", icon: "🚚" },
  delivered: { color: "bg-green-100 text-green-800 border-green-200", icon: "✅" },
  cancelled: { color: "bg-red-100 text-red-800 border-red-200", icon: "❌" },
};

export default function OrderRow({ order, onView, onStatusChange, isMobile }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentStatus = statusConfig[order.status] || statusConfig.pending;

  // Mobile Card View
  if (isMobile) {
    return (
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              {order._id.slice(-2).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900">#{order._id.slice(-8).toUpperCase()}</p>
              <p className="text-xs text-gray-500">{order.cartItems?.length || 0} items</p>
            </div>
          </div>
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${currentStatus.color}`}>
            <span>{currentStatus.icon}</span>
            {order.status.replace("_", " ").toUpperCase()}
          </span>
        </div>

        {/* Customer Info */}
        <div className="space-y-2 pl-13">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-900">{order.fullName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{order.city}</span>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <p className="text-lg font-bold text-gray-900">
            ${order.grandTotal?.toFixed(2)}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onView}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              View
            </button>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                    {statusOptions.map(status => (
                      <button
                        key={status}
                        onClick={() => {
                          onStatusChange(status);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${
                          order.status === status ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                        }`}
                      >
                        <span>{status.replace("_", " ").toUpperCase()}</span>
                        {order.status === status && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Table Row View
  return (
    <tr className="hover:bg-gray-50/50 transition-colors group">
      {/* Order ID */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm">
            {order._id.slice(-2).toUpperCase()}
          </div>
          <span className="font-mono font-semibold text-gray-900">
            #{order._id.slice(-8).toUpperCase()}
          </span>
        </div>
      </td>

      {/* Customer */}
      <td className="px-6 py-4">
        <div className="space-y-1">
          <div className="font-semibold text-gray-900">{order.fullName}</div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <Phone className="w-3.5 h-3.5" />
            {order.phoneNumber}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <MapPin className="w-3.5 h-3.5" />
            {order.city}
          </div>
        </div>
      </td>

      {/* Items */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-gray-400" />
          <span className="font-semibold text-gray-900">
            {order.cartItems?.length || 0}
          </span>
          <span className="text-sm text-gray-500">
            {order.cartItems?.length === 1 ? "item" : "items"}
          </span>
        </div>
      </td>

      {/* Total */}
      <td className="px-6 py-4">
        <div className="font-bold text-lg text-gray-900">
          ${order.grandTotal?.toFixed(2)}
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${currentStatus.color}`}>
          <span className="text-sm">{currentStatus.icon}</span>
          {order.status.replace("_", " ").toUpperCase()}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onView}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 hover:shadow-md transition-all opacity-0 group-hover:opacity-100"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
          
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Change status"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
            
            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-20 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Update Status
                    </p>
                  </div>
                  {statusOptions.map(status => {
                    const config = statusConfig[status] || statusConfig.pending;
                    return (
                      <button
                        key={status}
                        onClick={() => {
                          onStatusChange(status);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${
                          order.status === status ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{config.icon}</span>
                          {status.replace("_", " ").toUpperCase()}
                        </span>
                        {order.status === status && (
                          <Check className="w-4 h-4 text-blue-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}