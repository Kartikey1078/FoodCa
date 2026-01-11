import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Users,
  Mail,
  Calendar,
  User,
  Filter,
  Loader2
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Customers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${API_URL}/users?search=${search}&page=${page}&limit=9`
      );
      
      setUsers(data.users);
      setPages(data.pagination.pages);
      setTotalUsers(data.pagination.total);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, page, fetchUsers]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Customer Management
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{totalUsers} total customers</span>
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-full">
                Page {page} of {pages}
              </span>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search customers by name, email..."
                className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all duration-200 shadow-sm"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {["all", "active", "new", "premium"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                    selectedFilter === filter
                      ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading customers...</p>
            </div>
          </div>
        )}

        {/* Users Grid */}
        {!loading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden relative"
                >
                  {/* Premium badge */}
                  {user.premium && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full shadow">
                        PREMIUM
                      </span>
                    </div>
                  )}

                  {/* Gradient accent */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-blue-500"></div>

                  <div className="flex items-start gap-5">
                    <div className="relative">
                      <img
                        src={user.image || "/avatar.png"}
                        alt={user.fullName}
                        className="w-16 h-16 rounded-xl object-cover ring-4 ring-white shadow-md"
                      />
                      {user.active && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-xl text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                        {user.fullName || "Unnamed Customer"}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <p className="text-sm truncate">{user.email}</p>
                      </div>
                      
                      {user.company && (
                        <p className="text-gray-500 text-sm mt-2">
                          {user.company}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          Joined {formatDate(user.createdAt)}
                        </span>
                      </div>
                      
                      {user.lastActive && (
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          Active today
                        </span>
                      )}
                    </div>
                  </div>

                  <button className="mt-6 w-full py-2.5 text-center text-indigo-600 font-medium rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200 group-hover:scale-[1.02]">
                    View Profile
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination - Enhanced */}
            {pages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-gray-200">
                <div className="text-gray-600 text-sm">
                  Showing page {page} of {pages} • {users.length} customers
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className={`p-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${
                      page === 1
                        ? "opacity-50 cursor-not-allowed bg-gray-100"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="hidden sm:inline font-medium">Previous</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {[...Array(Math.min(5, pages))].map((_, i) => {
                      const pageNumber = i + 1;
                      let displayNumber;
                      
                      if (pages <= 5) {
                        displayNumber = pageNumber;
                      } else if (page <= 3) {
                        displayNumber = pageNumber;
                      } else if (page >= pages - 2) {
                        displayNumber = pages - 4 + i;
                      } else {
                        displayNumber = page - 2 + i;
                      }

                      return displayNumber <= pages && displayNumber >= 1 ? (
                        <button
                          key={i}
                          onClick={() => setPage(displayNumber)}
                          className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                            page === displayNumber
                              ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md scale-105"
                              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                          }`}
                        >
                          {displayNumber}
                        </button>
                      ) : null;
                    })}
                  </div>

                  <button
                    onClick={() => setPage(Math.min(pages, page + 1))}
                    disabled={page === pages}
                    className={`p-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${
                      page === pages
                        ? "opacity-50 cursor-not-allowed bg-gray-100"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="hidden sm:inline font-medium">Next</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Empty State */}
            {users.length === 0 && !loading && (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-6">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  No customers found
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {search 
                    ? `No customers match "${search}". Try a different search.`
                    : "Your customer list is currently empty."}
                </p>
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="mt-4 px-6 py-2.5 text-indigo-600 font-medium rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Customers</p>
                <p className="text-3xl font-bold mt-2">{totalUsers}</p>
              </div>
              <Users className="w-10 h-10 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm">Active Today</p>
                <p className="text-3xl font-bold mt-2">
                  {Math.floor(totalUsers * 0.15)}
                </p>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Premium Users</p>
                <p className="text-3xl font-bold mt-2">
                  {Math.floor(totalUsers * 0.08)}
                </p>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold">★</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}