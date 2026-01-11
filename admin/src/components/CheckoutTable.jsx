import React from "react";
import {
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Filter,
  Image as ImageIcon,
  Tag,
  Calendar,
  Package,
  CheckCircle,
  XCircle,
  ChevronRight
} from "lucide-react";

export default function CheckoutTable({
  items,
  loading,
  error,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading meals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Meal Inventory</h3>
            <p className="text-sm text-gray-600 mt-1">
              {items.length} meals • Use filters to find specific items
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-500 rounded-xl hover:from-emerald-700 hover:to-teal-600 transition-all duration-200">
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <th className="py-4 px-6 text-left">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  <ImageIcon className="w-4 h-4" />
                  Image
                </div>
              </th>
              <th className="py-4 px-6 text-left">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  <Package className="w-4 h-4" />
                  Meal Details
                </div>
              </th>
              <th className="py-4 px-6 text-left">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Options
                </div>
              </th>
              <th className="py-4 px-6 text-left">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  <Calendar className="w-4 h-4" />
                  Weeks
                </div>
              </th>
              <th className="py-4 px-6 text-left">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  <Tag className="w-4 h-4" />
                  Tags
                </div>
              </th>
              <th className="py-4 px-6 text-left">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </div>
              </th>
              <th className="py-4 px-6 text-left">
                <div className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr 
                key={item._id} 
                className="hover:bg-gradient-to-r hover:from-emerald-50/30 hover:to-teal-50/30 transition-all duration-200 group"
              >
                {/* Image */}
                <td className="py-4 px-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-200">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title || "Meal"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop&crop=center";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    {item.noSplit && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-xs font-bold text-white">1</span>
                      </div>
                    )}
                  </div>
                </td>

                {/* Meal Details */}
                <td className="py-4 px-6">
                  <div className="max-w-xs">
                    <h4 className="font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors">
                      {item.title || "Untitled Meal"}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {item.subtitle || "No description available"}
                    </p>
                    {item.nutrition?.length > 0 && (
                      <div className="flex items-center gap-3 mt-2">
                        {item.nutrition.slice(0, 2).map((nut) => (
                          <span 
                            key={nut.label} 
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                          >
                            {nut.label}: {nut.value}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </td>

                {/* Options */}
                <td className="py-4 px-6">
                  <div className="max-w-xs">
                    {Array.isArray(item.options) && item.options.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {item.options.slice(0, 3).map((opt, idx) => (
                          <span
                            key={idx}
                            className="inline-block px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full"
                          >
                            {opt}
                          </span>
                        ))}
                        {item.options.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 text-xs text-gray-500">
                            +{item.options.length - 3} more
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </div>
                </td>

                {/* Weeks */}
                <td className="py-4 px-6">
                  {Array.isArray(item.weekNumbers) && item.weekNumbers.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {item.weekNumbers.map((week) => (
                        <span
                          key={week}
                          className="inline-flex items-center px-3 py-1 text-xs font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full"
                        >
                          W{week}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>

                {/* Tags */}
                <td className="py-4 px-6">
                  {Array.isArray(item.tags) && item.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {item.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-3 py-1 text-xs font-medium bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-full border border-emerald-100"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 text-xs text-gray-500">
                          +{item.tags.length - 3}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">No tags</span>
                  )}
                </td>

                {/* Status */}
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    {item.noSplit ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        Single Portion
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        Splittable
                      </span>
                    )}
                  </div>
                </td>

                {/* Actions */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2.5 text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 hover:text-emerald-700 transition-colors duration-200 group/btn"
                      title="Edit meal"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete "${item.title || 'this meal'}"?`)) {
                          onDelete(item._id);
                        }
                      }}
                      className="p-2.5 text-red-600 bg-red-50 rounded-xl hover:bg-red-100 hover:text-red-700 transition-colors duration-200 group/btn"
                      title="Delete meal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <button className="p-2.5 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* Empty State */}
            {!error && items.length === 0 && (
              <tr>
                <td colSpan="7">
                  <div className="text-center py-16 px-6">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-6">
                      <Package className="w-12 h-12 text-gray-400" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-700 mb-2">
                      No meals found
                    </h4>
                    <p className="text-gray-500 max-w-md mx-auto mb-8">
                      Your meal inventory is currently empty. Start by adding your first meal to build your menu.
                    </p>
                    <div className="text-sm text-gray-400">
                      Tips: Use filters or search to find specific meals
                    </div>
                  </div>
                </td>
              </tr>
            )}

            {/* Error State */}
            {error && (
              <tr>
                <td colSpan="7">
                  <div className="text-center py-16 px-6">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mb-6">
                      <XCircle className="w-12 h-12 text-red-400" />
                    </div>
                    <h4 className="text-xl font-semibold text-red-700 mb-2">
                      Error Loading Meals
                    </h4>
                    <p className="text-gray-600 max-w-md mx-auto mb-4">
                      {error}
                    </p>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl hover:from-red-700 hover:to-orange-700 transition-all duration-200">
                      Retry Loading
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      {items.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold">{items.length}</span> meals
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Rows per page:</span>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50">
                  ←
                </button>
                <span className="text-sm text-gray-700">
                  Page <span className="font-semibold">1</span> of 1
                </span>
                <button className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}