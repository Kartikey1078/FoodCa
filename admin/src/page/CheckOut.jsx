import React, { useEffect, useState } from "react";
import axios from "axios";
import CheckoutCard from "../components/CheckoutCard";
import CheckoutFormModal from "../components/CheckoutFormModal";
import CheckoutTable from "../components/CheckoutTable";
import { Grid, Table, Plus, Filter } from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_URL}/checkout`;

export default function CheckOut() {
  const DEFAULT_NUTRITION = [
    { label: "Calories", value: "" },
    { label: "Protein", value: "" },
    { label: "Fat", value: "" },
    { label: "Carbs", value: "" },
  ];

  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("cards");
  const [selectedWeek, setSelectedWeek] = useState("all");

  const [formData, setFormData] = useState({
    image: "",
    imageFile: null,
    title: "",
    subtitle: "",
    price: "",
    options: "",
    tags: [], // Added tags array
    nutrition: DEFAULT_NUTRITION, // Nutrition facts array
    nutritionValueImage: "",
    nutritionValueImageFile: null,
    weekNumber: "",
    noSplit: false, // ✅ Added here
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle image file selection
  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      alert("Only JPG, JPEG, PNG allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Max size 5MB");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      imageFile: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleNutritionImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      alert("Only JPG, JPEG, PNG allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Max size 5MB");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      nutritionValueImageFile: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview2(reader.result);
    reader.readAsDataURL(file);
  };

  // Load all items
  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(API_URL);

      if (res.data.success && Array.isArray(res.data.data)) {
        setItems(res.data.data);
      } else {
        console.error("Unexpected response structure:", res.data);
        setError("Unexpected response format from API");
        setItems([]);
      }
    } catch (err) {
      console.error("Failed to load items:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load checkout items"
      );
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  // Open create form - FIXED: Added noSplit
  const openCreateForm = () => {
    setEditingId(null);
    setFormData({
      image: "",
      imageFile: null,
      title: "",
      subtitle: "",
      price: "",
      options: "",
      tags: [],
      nutrition: DEFAULT_NUTRITION,
      nutritionValueImage: "",
      nutritionValueImageFile: null,
      weekNumber: "",
      noSplit: false, // ✅ Added here
    });
    setImagePreview(null);
    setImagePreview2(null);
    setShowForm(true);
  };

  // Open edit form
  const openEditForm = (item) => {
    console.log("Editing item:", item); // Debug log
    
    setEditingId(item._id);
    const nutritionApi = DEFAULT_NUTRITION.map((def) => {
      const found = item.nutrition?.find((n) => n.label === def.label);
      return {
        label: def.label,
        value: found?.value || "",
      };
    });
    
    setFormData({
      image: item.image,
      imageFile: null,
      nutritionValueImage: item.nutritionValueImage || "",
      nutritionValueImageFile: null,
      title: item.title,
      subtitle: item.subtitle,
      price: item.price || "",
      options: Array.isArray(item.options) ? item.options.join(", ") : item.options || "",
      tags: item.tags || [],
      nutrition: nutritionApi,
      weekNumber: Array.isArray(item.weekNumbers)
        ? item.weekNumbers[0]
        : item.weekNumbers || "",
      noSplit: item.noSplit ?? false, // ✅ Using nullish coalescing for safety
    });
    
    console.log("Form data set:", {
      noSplit: item.noSplit,
      converted: item.noSplit ?? false
    }); // Debug log
    
    setImagePreview(item.image);
    setImagePreview2(item.nutritionValueImage || null);
    setShowForm(true);
  };

  // Delete item
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this meal?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        loadItems();
      } catch (err) {
        console.error(err);
        alert("Failed to delete item");
      }
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData); // Debug log
    
    setUploading(true);

    try {
      const formDataToSend = new FormData();

      // Add image file if new image is selected
      if (formData.imageFile) {
        formDataToSend.append("image", formData.imageFile);
      }
      
      if (!formData.weekNumber) {
        alert("Please select at least one week");
        return;
      }
      
      if (formData.nutritionValueImageFile) {
        formDataToSend.append(
          "nutritionValueImage",
          formData.nutritionValueImageFile
        );
      } else if (!editingId) {
        // For new items, image file is required
        return alert("Please upload an image");
      }

      // Add other fields
      formDataToSend.append("title", formData.title);
      formDataToSend.append("subtitle", formData.subtitle);
      formDataToSend.append("tags", JSON.stringify(formData.tags));
      formDataToSend.append("noSplit", formData.noSplit.toString()); // ✅ Ensure boolean is stringified
      
      console.log("Sending noSplit value:", formData.noSplit); // Debug log
      
      formDataToSend.append(
        "weekNumbers",
        JSON.stringify([formData.weekNumber])
      );
      
      const optionsArray = formData.options
        .split(",")
        .map((opt) => opt.trim())
        .filter(Boolean);

      formDataToSend.append("options", optionsArray);

      // Filter out empty nutrition entries and add nutrition if it exists
      const validNutrition = formData.nutrition
        ? formData.nutrition.filter((nut) => nut.label && nut.value)
        : [];

      if (validNutrition.length > 0) {
        formDataToSend.append("nutrition", JSON.stringify(validNutrition));
      } else {
        formDataToSend.append("nutrition", JSON.stringify([]));
      }

      if (editingId) {
        console.log("Updating item:", editingId, formDataToSend);
        await axios.put(`${API_URL}/${editingId}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        console.log("Creating new item:", formDataToSend);
        await axios.post(API_URL, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setShowForm(false);
      setImagePreview(null);
      setImagePreview2(null);
      loadItems();
    } catch (err) {
      console.error("Submit error:", err.response?.data || err);

      if (err.response?.status === 413) {
        alert(
          "File is too large. Maximum size is 5MB. Please compress the image or choose a smaller file."
        );
      } else if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else if (err.message) {
        alert(err.message);
      } else {
        alert("Failed to save item. Please try again.");
      }
    } finally {
      setUploading(false);
    }
  };

  const filteredItems =
    selectedWeek === "all"
      ? items
      : items.filter((item) =>
          Array.isArray(item.weekNumbers)
            ? item.weekNumbers.includes(Number(selectedWeek))
            : item.weekNumbers === Number(selectedWeek)
        );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Meal Management
            </h1>
            <p className="text-gray-600">
              Manage your menu items, nutrition facts, and weekly planning
            </p>
          </div>
          
          <button
            onClick={openCreateForm}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-6 py-3 rounded-xl font-medium hover:from-emerald-700 hover:to-teal-600 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add New Meal
          </button>
        </div>

        {/* Error Message - Premium Design */}
        {error && (
          <div className="mb-6 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <span className="text-red-600 font-bold">!</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-red-800 mb-2">Error Loading Data</h3>
                <p className="text-red-700 mb-3">{error}</p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>API Endpoint: {API_URL}</p>
                  <p>Items loaded: {items.length}</p>
                </div>
                <button
                  onClick={loadItems}
                  className="mt-4 bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-200"
                >
                  Retry Loading
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-500" />
              <h3 className="font-semibold text-gray-700">Filter by Week</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {["all", 1, 2, 3, 4, 5, 6].map((week) => (
                <button
                  key={week}
                  onClick={() => setSelectedWeek(week)}
                  className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                    selectedWeek === week
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {week === "all" ? "All Weeks" : `Week ${week}`}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode("cards")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  viewMode === "cards"
                    ? "bg-white shadow text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Grid className="w-4 h-4" />
                Cards
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  viewMode === "table"
                    ? "bg-white shadow text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Table className="w-4 h-4" />
                Table
              </button>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90">Total Meals</p>
            <p className="text-3xl font-bold mt-2">{items.length}</p>
          </div>
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90">Current Week ({selectedWeek})</p>
            <p className="text-3xl font-bold mt-2">{filteredItems.length}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90">Single Portion</p>
            <p className="text-3xl font-bold mt-2">
              {items.filter(item => item.noSplit).length}
            </p>
          </div>
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90">With Nutrition</p>
            <p className="text-3xl font-bold mt-2">
              {items.filter(item => item.nutrition && item.nutrition.length > 0).length}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading meals...</p>
            </div>
          </div>
        )}

        {/* Content View */}
        {!loading && (
          <>
            {/* CARD VIEW */}
            {viewMode === "cards" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <CheckoutCard
                    key={item._id}
                    item={item}
                    onEdit={openEditForm}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}

            {/* TABLE VIEW */}
            {viewMode === "table" && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <CheckoutTable
                  items={filteredItems}
                  loading={loading}
                  error={error}
                  onEdit={openEditForm}
                  onDelete={handleDelete}
                />
              </div>
            )}

            {/* Empty State */}
            {filteredItems.length === 0 && !loading && (
              <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-6">
                  <span className="text-4xl">🍽️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  No meals found
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  {selectedWeek !== "all"
                    ? `No meals found for Week ${selectedWeek}. Try another week or add new meals.`
                    : "No meals added yet. Start by adding your first meal!"}
                </p>
                <button
                  onClick={openCreateForm}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-6 py-3 rounded-xl font-medium hover:from-emerald-700 hover:to-teal-600 transition-all duration-200"
                >
                  <Plus className="w-5 h-5" />
                  Add Your First Meal
                </button>
              </div>
            )}
          </>
        )}

        {/* FORM MODAL */}
        <CheckoutFormModal
          show={showForm}
          editingId={editingId}
          formData={formData}
          setFormData={setFormData}
          imagePreview={imagePreview}
          imagePreview2={imagePreview2}
          uploading={uploading}
          handleSubmit={handleSubmit}
          handleMainImageUpload={handleMainImageUpload}
          handleNutritionImageUpload={handleNutritionImageUpload}
          onClose={() => {
            setShowForm(false);
            setImagePreview(null);
            setImagePreview2(null);
          }}
        />
      </div>
    </div>
  );
}