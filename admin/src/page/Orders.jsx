import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/orders`;


const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  preparing: "bg-purple-100 text-purple-800",
  out_for_delivery: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusOptions = [
  "pending",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

export default function Orders() {
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("");
const [cityFilter, setCityFilter] = useState("");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  // Load all orders
  const loadOrders = async (pageNumber = page) => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL, {
        params: {
          page: pageNumber,
          limit,
          search,
          status: statusFilter,
          city: cityFilter,
        },
      });
  
      if (res.data.success) {
        setOrders(res.data.data);
        setPage(res.data.pagination.page);
        setTotalPages(res.data.pagination.totalPages);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };
  
  

  useEffect(() => {
    loadOrders(page);
  }, [page]);

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdatingStatus(true);
      const res = await axios.put(`${API_URL}/${orderId}/status`, {
        status: newStatus,
      });

      if (res.data.success) {
        // Update the order in the list
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      }
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert("Failed to update order status: " + (err.response?.data?.message || err.message));
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate total items in order
  const getTotalItems = (order) => {
    if (!order.cartItems || !Array.isArray(order.cartItems)) return 0;
    return order.cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading orders...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error: {error}</p>
          <button
            onClick={loadOrders}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="flex flex-col md:flex-row gap-4 mb-6">
  <input
    type="text"
    placeholder="Search by name, phone, coupon, plan..."
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setPage(1);
    }}
    className="w-full md:w-1/3 px-4 py-2 border rounded-lg"
  />

  <select
    value={statusFilter}
    onChange={(e) => {
      setStatusFilter(e.target.value);
      setPage(1);
    }}
    className="px-4 py-2 border rounded-lg"
  >
    <option value="">All Status</option>
    {statusOptions.map((s) => (
      <option key={s} value={s}>
        {s.replace("_", " ").toUpperCase()}
      </option>
    ))}
  </select>

  <select
    value={cityFilter}
    onChange={(e) => {
      setCityFilter(e.target.value);
      setPage(1);
    }}
    className="px-4 py-2 border rounded-lg"
  >
    <option value="">All Cities</option>
    {[
      "HAMILTON","TORONTO","BURLINGTON","OAKVILLE","MISSISSAUGA",
      "BRAMPTON","EAST YORK","NORTH YORK","SCARBOROUGH","ETOBICOKE","MILTON"
    ].map((city) => (
      <option key={city} value={city}>
        {city}
      </option>
    ))}
  </select>

  <button
    onClick={() => loadOrders(1)}
    className="px-4 py-2 bg-gray-900 text-white rounded-lg"
  >
    Search
  </button>
</div>

    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track all customer orders
          </p>
        </div>
        <button
          onClick={loadOrders}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
        >
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Total Orders</div>
          <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">
            {orders.filter((o) => o.status === "pending").length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">In Progress</div>
          <div className="text-2xl font-bold text-blue-600">
            {orders.filter((o) =>
              ["confirmed", "preparing", "out_for_delivery"].includes(o.status)
            ).length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Delivered</div>
          <div className="text-2xl font-bold text-green-600">
            {orders.filter((o) => o.status === "delivered").length}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        #{order._id.slice(-8)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {order.fullName || "N/A"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.phoneNumber || ""}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.city || ""}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {getTotalItems(order)} items
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${(order.grandTotal || 0).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-1.5 py-0.5 text-[10px] font-medium rounded-full ${
                          statusColors[order.status] || statusColors.pending
                        }`}
                      >
                        {order.status?.replace("_", " ").toUpperCase() || "PENDING"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        View
                      </button>
                      <select
                        value={order.status || "pending"}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        disabled={updatingStatus}
                        className="w-[120px] text-[10px] border border-gray-300 rounded px-1.5 py-0.5 truncate"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status.replace("_", " ").toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Order Details #{selectedOrder._id?.slice(-8)}
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Customer Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Full Name:</span>{" "}
                      {selectedOrder.fullName || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span>{" "}
                      {selectedOrder.phoneNumber || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Address Line 1:</span>{" "}
                      {selectedOrder.addressLine1 || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Address Line 2:</span>{" "}
                      {selectedOrder.addressLine2 || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">City:</span>{" "}
                      {selectedOrder.city || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Postal Code:</span>{" "}
                      {selectedOrder.postalCode || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Delivery Instructions:</span>{" "}
                      {selectedOrder.deliveryInstructions || "N/A"}
                    </div>
                    {selectedOrder.coupon && (
                      <div>
                        <span className="font-medium">Coupon:</span>{" "}
                        {selectedOrder.coupon}
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Summary */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Order Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Plan:</span>{" "}
                      {selectedOrder.planInfo?.title || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Total Meals:</span>{" "}
                      {selectedOrder.totalMeals || 0}
                    </div>
                    <div>
                      <span className="font-medium">Extra Meals:</span>{" "}
                      {selectedOrder.extraMeals || 0}
                    </div>
                    <div>
                      <span className="font-medium">Plan Price:</span> $
                      {(selectedOrder.planPrice || 0).toFixed(2)}
                    </div>
                    <div>
                      <span className="font-medium">Extra Meal Cost:</span> $
                      {(selectedOrder.extraMealCost || 0).toFixed(2)}
                    </div>
                    <div>
                      <span className="font-medium">Delivery Fee:</span> $
                      {(selectedOrder.deliveryFee || 0).toFixed(2)}
                    </div>
                    <div className="pt-2 border-t">
                      <span className="font-bold text-lg">Grand Total:</span> $
                      {(selectedOrder.grandTotal || 0).toFixed(2)}
                    </div>
                    <div className="pt-2">
                      <span className="font-medium">Status:</span>{" "}
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          statusColors[selectedOrder.status] || statusColors.pending
                        }`}
                      >
                        {selectedOrder.status?.replace("_", " ").toUpperCase() || "PENDING"}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Order Date:</span>{" "}
                      {formatDate(selectedOrder.createdAt)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cart Items */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Cart Items
                </h3>
                <div className="space-y-3">
                  {selectedOrder.cartItems && selectedOrder.cartItems.length > 0 ? (
                    selectedOrder.cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">
                            {item.title || "N/A"}
                          </div>
                          {item.subtitle && (
                            <div className="text-sm text-gray-500">
                              {item.subtitle}
                            </div>
                          )}
                          {item.option && (
                            <div className="text-sm text-gray-500">
                              Base: {item.option}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">
                            Qty: {item.quantity || 0}
                          </div>
                          <div className="text-sm text-gray-500">
                            ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">No items in this order</div>
                  )}
                </div>
              </div>

              {/* Update Status */}
              <div className="mt-6 pt-6 border-t">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Status
                </label>
                <select
                  value={selectedOrder.status || "pending"}
                  onChange={(e) => updateOrderStatus(selectedOrder._id, e.target.value)}
                  disabled={updatingStatus}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.replace("_", " ").toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <div className="flex items-center justify-between mt-6">
  <div className="text-sm text-gray-600">
    Page {page} of {totalPages}
  </div>

  <div className="flex gap-2">
    <button
      disabled={page === 1}
      onClick={() => setPage((p) => p - 1)}
      className="px-4 py-2 border rounded disabled:opacity-50"
    >
      Previous
    </button>

    <button
      disabled={page === totalPages}
      onClick={() => setPage((p) => p + 1)}
      className="px-4 py-2 border rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>

  <div className="flex gap-2 mt-4">
  {[...Array(totalPages)].map((_, i) => (
    <button
      key={i}
      onClick={() => setPage(i + 1)}
      className={`px-3 py-1 rounded ${
        page === i + 1
          ? "bg-gray-900 text-white"
          : "border"
      }`}
    >
      {i + 1}
    </button>
  ))}
</div>

</div>

    </>
    
  );
}

