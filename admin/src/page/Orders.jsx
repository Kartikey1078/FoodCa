import React, { useEffect, useState } from "react";
import axios from "axios";
import OrdersFilters from "../components/OrdersFilters";
import OrdersStats from "../components/OrdersStats";
import OrdersTable from "../components/OrdersTable";
import Pagination from "../components/Pagination";
import OrderModal from "../components/OrderModal";

const API_URL = `${import.meta.env.VITE_API_URL}/orders`;

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
    loadOrders(1);
  }, [search, statusFilter, cityFilter]);

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
      alert(
        "Failed to update order status: " +
          (err.response?.data?.message || err.message)
      );
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
      <OrdersFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        cityFilter={cityFilter}
        setCityFilter={setCityFilter}
        onSearch={() => loadOrders(1)}
      />

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
        <OrdersStats orders={orders} />

        {/* Orders Table */}
        <OrdersTable
          orders={orders}
          onView={setSelectedOrder}
          onStatusChange={updateOrderStatus}
          loading={updatingStatus}
        />

        {/* Order Detail Modal */}
        {selectedOrder && (
          <OrderModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            onStatusChange={updateOrderStatus}
            updatingStatus={updatingStatus}
          />
        )}
      </div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </>
  );
}
