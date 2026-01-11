import React, { useState } from "react";
import { Search, Filter, MapPin, X, RefreshCw, Calendar } from "lucide-react";

const statusOptions = [
  { value: "", label: "All Status", icon: "📦" },
  { value: "pending", label: "Pending", icon: "⏳" },
  { value: "confirmed", label: "Confirmed", icon: "✓" },
  { value: "preparing", label: "Preparing", icon: "👨‍🍳" },
  { value: "out_for_delivery", label: "Out for Delivery", icon: "🚚" },
  { value: "delivered", label: "Delivered", icon: "✅" },
  { value: "cancelled", label: "Cancelled", icon: "❌" },
];

const cityOptions = [
  { value: "", label: "All Cities" },
  { value: "HAMILTON", label: "Hamilton" },
  { value: "TORONTO", label: "Toronto" },
  { value: "BURLINGTON", label: "Burlington" },
  { value: "OAKVILLE", label: "Oakville" },
];

export default function OrdersFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  cityFilter,
  setCityFilter,
  onSearch,
}) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState("");

  const hasActiveFilters = search || statusFilter || cityFilter || dateFilter;

  const handleClearAll = () => {
    setSearch("");
    setStatusFilter("");
    setCityFilter("");
    setDateFilter("");
    onSearch();
  };

  const handleSearch = () => {
    onSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Filter Orders</h3>
            <p className="text-sm text-gray-500">Search and filter your orders</p>
          </div>
        </div>

        {/* Active filters badge */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
              {[search, statusFilter, cityFilter, dateFilter].filter(Boolean).length} active
            </span>
            <button
              onClick={handleClearAll}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900"
              title="Clear all filters"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Main Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
        {/* Search Input */}
        <div className="md:col-span-5 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search by name, phone, coupon, plan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {/* Status Filter */}
        <div className="md:col-span-3 relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full appearance-none px-4 py-3 pr-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white cursor-pointer hover:border-gray-300 font-medium text-gray-700"
          >
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.icon} {status.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* City Filter */}
        <div className="md:col-span-3 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <MapPin className="w-4 h-4" />
          </div>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="w-full appearance-none pl-11 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white cursor-pointer hover:border-gray-300 font-medium text-gray-700"
          >
            {cityOptions.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Search Button */}
        <div className="md:col-span-1">
          <button
            onClick={handleSearch}
            className="w-full h-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
          >
            <Search className="w-5 h-5 mx-auto" />
          </button>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="border-t border-gray-200 pt-4">
        <button
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg
            className={`w-4 h-4 transition-transform ${isAdvancedOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          Advanced Filters
        </button>

        {/* Advanced Filters Content */}
        {isAdvancedOpen && (
          <div className="mt-4 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Date Filter */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Date
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Placeholder for future filters */}
              <div className="md:col-span-2 flex items-end">
                <div className="text-sm text-gray-500 italic">
                  More filters coming soon...
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Active Filters:
            </span>
            {search && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                <Search className="w-3 h-3" />
                Search: "{search}"
                <button
                  onClick={() => setSearch("")}
                  className="ml-1 hover:bg-blue-100 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {statusFilter && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
                {statusOptions.find(s => s.value === statusFilter)?.icon} 
                {statusOptions.find(s => s.value === statusFilter)?.label}
                <button
                  onClick={() => setStatusFilter("")}
                  className="ml-1 hover:bg-purple-100 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {cityFilter && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
                <MapPin className="w-3 h-3" />
                {cityOptions.find(c => c.value === cityFilter)?.label}
                <button
                  onClick={() => setCityFilter("")}
                  className="ml-1 hover:bg-green-100 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {dateFilter && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium">
                <Calendar className="w-3 h-3" />
                {new Date(dateFilter).toLocaleDateString()}
                <button
                  onClick={() => setDateFilter("")}
                  className="ml-1 hover:bg-orange-100 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}