import React from "react";
import TagAdmin from "../page/TagAdmin";
import {
  X,
  Upload,
  Image as ImageIcon,
  FileText,
  Tag,
  Calendar,
  CheckSquare,
  Plus,
  Save,
  Loader2,
  Info,
  ChefHat,
  Salad,
  Scale,
  Flame,
} from "lucide-react";

export default function CheckoutFormModal({
  show,
  editingId,
  formData,
  setFormData,
  imagePreview,
  imagePreview2,
  uploading,
  handleSubmit,
  handleMainImageUpload,
  handleNutritionImageUpload,
  onClose,
}) {
  if (!show) return null;

  const nutritionIcons = {
    Calories: <Flame className="w-4 h-4" />,
    Protein: <ChefHat className="w-4 h-4" />,
    Carbs: <Salad className="w-4 h-4" />,
    Fat: <Scale className="w-4 h-4" />,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        {/* HEADER - Premium Gradient */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                {editingId ? (
                  <FileText className="w-6 h-6 text-white" />
                ) : (
                  <Plus className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {editingId ? "Edit Meal" : "Create New Meal"}
                </h3>
                <p className="text-emerald-100 text-sm mt-1">
                  {editingId
                    ? "Update meal details and nutrition information"
                    : "Add a new meal to your menu with full details"}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* FORM CONTENT */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-8">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* IMAGE UPLOAD SECTION */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Main Image Upload */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <ImageIcon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <label className="block text-lg font-semibold text-gray-800">
                      Food Image
                    </label>
                    <p className="text-sm text-gray-500">
                      {editingId
                        ? "(Optional to update)"
                        : "Required • JPG or PNG"}
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200 hover:border-emerald-400">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 mb-3 text-gray-400 group-hover:text-emerald-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        JPG, PNG (Max 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={handleMainImageUpload}
                      required={!editingId}
                      className="hidden"
                    />
                  </label>

                  {imagePreview && (
                    <div className="absolute inset-0 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={imagePreview}
                        alt="Food preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}
                </div>
              </div>

              {/* Nutrition Image Upload */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <label className="block text-lg font-semibold text-gray-800">
                      Nutrition Label
                    </label>
                    <p className="text-sm text-gray-500">
                      Optional • Upload nutrition facts image
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200 hover:border-blue-400">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 mb-3 text-gray-400 group-hover:text-blue-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">
                          Upload nutrition label
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        Clear image of nutrition facts
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={handleNutritionImageUpload}
                      className="hidden"
                    />
                  </label>

                  {imagePreview2 && (
                    <div className="absolute inset-0 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={imagePreview2}
                        alt="Nutrition label preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* BASIC INFO - Modern Grid */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Info className="w-5 h-5 text-gray-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-800">
                  Basic Information
                </h4>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Meal Title *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all duration-200"
                    placeholder="e.g., Grilled Salmon with Asparagus"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Select Week *
                  </label>
                  <select
                    value={formData.weekNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        weekNumber: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all duration-200 appearance-none bg-white"
                    required
                  >
                    <option value="">Choose a week</option>
                    {[1, 2, 3, 4, 5, 6].map((week) => (
                      <option key={week} value={week}>
                        Week {week}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Subtitle / Description *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all duration-200"
                    placeholder="e.g., High-protein meal with seasonal vegetables"
                    value={formData.subtitle}
                    onChange={(e) =>
                      setFormData({ ...formData, subtitle: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Options (comma separated) *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all duration-200"
                    placeholder="e.g., Gluten-free, Dairy-free, Vegan option"
                    value={formData.options}
                    onChange={(e) =>
                      setFormData({ ...formData, options: e.target.value })
                    }
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Separate options with commas
                  </p>
                </div>
              </div>
            </div>

            {/* NUTRITION FACTS - Card Style */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Scale className="w-5 h-5 text-orange-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-800">
                  Nutrition Facts
                </h4>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                <div className="grid md:grid-cols-2 gap-4">
                  {formData.nutrition.map((nut, i) => (
                    <div
                      key={nut.label}
                      className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-center gap-3 min-w-[140px]">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          {nutritionIcons[nut.label] || (
                            <Scale className="w-4 h-4" />
                          )}
                        </div>
                        <span className="font-semibold text-gray-800">
                          {nut.label}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="relative">
                          <input
                            placeholder={`Enter ${nut.label.toLowerCase()}...`}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition-all duration-200 bg-gray-50"
                            value={nut.value}
                            onChange={(e) => {
                              const arr = [...formData.nutrition];
                              arr[i].value = e.target.value;
                              setFormData({ ...formData, nutrition: arr });
                            }}
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            {nut.label === "Calories" ? "kcal" : "g"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* TAGS SECTION */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Tag className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-800">
                  Tags & Categories
                </h4>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
                <div className="w-full">
                  <TagAdmin
                    selectedTags={formData.tags}
                    onTagsChange={(tags) => setFormData({ ...formData, tags })}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Tags help customers find meals based on dietary preferences
                  and categories
                </p>
              </div>
            </div>

            {/* OPTIONS - Real Checkbox */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="noSplit"
                    checked={formData.noSplit || false}
                    onChange={(e) =>
                      setFormData({ ...formData, noSplit: e.target.checked })
                    }
                    className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  />
                </div>
                <label htmlFor="noSplit" className="cursor-pointer">
                  <span className="font-medium text-gray-800">
                    Single Portion Only
                  </span>
                  <p className="text-sm text-gray-600">
                    This meal cannot be split into multiple portions
                  </p>
                </label>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-medium hover:from-emerald-700 hover:to-teal-600 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    {editingId ? (
                      <>
                        <Save className="w-5 h-5" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        Create Meal
                      </>
                    )}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
