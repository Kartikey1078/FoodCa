import React from "react";
import {
  X,
  User,
  Phone,
  MapPin,
  Calendar,
  Package,
  Truck,
  CreditCard,
  FileText,
} from "lucide-react";

const statusConfig = {
  pending: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    badge: "bg-yellow-100 text-yellow-800",
    border: "border-yellow-200",
    icon: "⏳",
  },
  confirmed: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    badge: "bg-blue-100 text-blue-800",
    border: "border-blue-200",
    icon: "✓",
  },
  preparing: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    badge: "bg-purple-100 text-purple-800",
    border: "border-purple-200",
    icon: "👨‍🍳",
  },
  out_for_delivery: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    badge: "bg-indigo-100 text-indigo-800",
    border: "border-indigo-200",
    icon: "🚚",
  },
  delivered: {
    bg: "bg-green-50",
    text: "text-green-700",
    badge: "bg-green-100 text-green-800",
    border: "border-green-200",
    icon: "✅",
  },
  cancelled: {
    bg: "bg-red-50",
    text: "text-red-700",
    badge: "bg-red-100 text-red-800",
    border: "border-red-200",
    icon: "❌",
  },
};

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "preparing", label: "Preparing" },
  { value: "out_for_delivery", label: "Out for Delivery" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export default function OrderModal({
  order,
  onClose,
  onStatusChange,
  updatingStatus,
}) {
  if (!order) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const currentStatus = statusConfig[order.status] || statusConfig.pending;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header with Status Bar */}
        <div
          className={`${currentStatus.bg} ${currentStatus.border} border-b-2 px-6 py-5`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{currentStatus.icon}</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Order #{order._id?.slice(-8).toUpperCase()}
                </h2>
                <p className="text-sm text-gray-600 mt-0.5">
                  Placed on {formatDate(order.createdAt)}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/50 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="p-6 space-y-6">
            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${currentStatus.badge}`}
              >
                <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                {order.status?.replaceAll("_", " ").toUpperCase()}
              </span>

              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  ${(order.grandTotal || 0).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">Total Amount</p>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customer Information Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Customer Details
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Full Name
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {order.fullName || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Phone
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {order.phoneNumber || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Delivery Address
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {order.addressLine1 || "N/A"}
                        {order.city && `, ${order.city}`}
                        {order.postalCode && ` ${order.postalCode}`}
                      </p>
                    </div>
                  </div>
                  {order.deliveryInstructions && (
                    <div className="flex items-start gap-3 pt-2 border-t border-blue-200">
                      <FileText className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Delivery Notes
                        </p>
                        <p className="text-sm font-medium text-gray-900 italic">
                          "{order.deliveryInstructions}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary Card */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order Summary
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-purple-100">
                    <span className="text-sm text-gray-600">Meal Plan</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {order.planInfo?.title || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-purple-100">
                    <span className="text-sm text-gray-600">Total Meals</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {order.totalMeals || 0} meals
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-purple-100">
                    <span className="text-sm text-gray-600">Extra Meals</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {order.extraMeals || 0} meals
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-purple-100">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Truck className="w-3 h-3" /> Delivery Fee
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      ${(order.deliveryFee || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-purple-100 -mx-2 px-2 rounded-lg mt-2">
                    <span className="text-base font-semibold text-gray-900">
                      Grand Total
                    </span>
                    <span className="text-xl font-bold text-purple-700">
                      ${(order.grandTotal || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-gray-700" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Order Items
                </h3>
                <span className="ml-auto text-sm text-gray-500">
                  {order.cartItems?.length || 0} item(s)
                </span>
              </div>
              <div className="space-y-3">
                {order.cartItems?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 rounded-lg object-cover shadow-sm"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Quantity:{" "}
                        <span className="font-medium">{item.quantity}</span>
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        ${(item.price ?? 0).toFixed(2)} each
                      </p>
                    </div>
                    {/* <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                      ${((Number(item.price) || 0) * (Number(item.quantity) || 0)).toFixed(2)}
                      </p>
                    </div> */}
                  </div>
                ))}
              </div>
            </div>

            {/* Status Update Section */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
              <label className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-3">
                <Calendar className="w-5 h-5" />
                Update Order Status
              </label>
              <div className="relative">
                <select
                  value={order.status}
                  disabled={updatingStatus}
                  onChange={(e) => onStatusChange(order._id, e.target.value)}
                  className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg appearance-none bg-white font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer hover:border-gray-400"
                >
                  {statusOptions.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {updatingStatus && (
                <p className="text-sm text-blue-600 mt-2 flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                  Updating status...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
