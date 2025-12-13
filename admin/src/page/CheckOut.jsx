import React, { useEffect, useState } from "react";
import axios from "axios";
import TagAdmin from "./TagAdmin"; // Adjust path to your TagAdmin component

// Icons component matching CheckoutCard
const Icons = {
  Fire: () => (
    <svg
      className="w-3 h-3 text-orange-500"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
        clipRule="evenodd"
      />
    </svg>
  ),
  Chef: () => (
    <svg
      className="w-4 h-4 text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 11a4 4 0 113.5-6 4 4 0 017 0A4 4 0 1122 11v2a2 2 0 01-2 2h-1.5l-.5 4a2 2 0 01-2 2H8a2 2 0 01-2-2l-.5-4H4a2 2 0 01-2-2v-2z"
      />
    </svg>
  ),
};

const API_URL = "https://food-ca-xa3o.vercel.app/api/checkout";

export default function CheckOut() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedTag, setSelectedTag] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("cards"); // "cards" or "table"

  const [formData, setFormData] = useState({
    image: "",
    imageFile: null,
    title: "",
    subtitle: "",
    price: "",
    options: "",
    tags: [], // Added tags array
    nutrition: [], // Nutrition facts array
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle image file selection
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert('Please select a JPEG, JPG, or PNG image file');
      e.target.value = ''; // Clear the input
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      alert('File size is too large. Maximum size is 5MB. Please compress the image or choose a smaller file.');
      e.target.value = ''; // Clear the input
      return;
    }

    // Store the file for upload
    setFormData((prev) => ({
      ...prev,
      imageFile: file,
    }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Load all items
  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(API_URL);
      console.log("API Response:", res.data); // Debug log
      
      if (res.data.success && Array.isArray(res.data.data)) {
        setItems(res.data.data);
      } else {
        console.error("Unexpected response structure:", res.data);
        setError("Unexpected response format from API");
        setItems([]);
      }
    } catch (err) {
      console.error("Failed to load items:", err);
      setError(err.response?.data?.message || err.message || "Failed to load checkout items");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  // Open create form
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
      nutrition: [],
    });
    setImagePreview(null);
    setShowForm(true);
  };

  // Open edit form
  const openEditForm = (item) => {
    setEditingId(item._id);
    setFormData({
      image: item.image,
      imageFile: null,
      title: item.title,
      subtitle: item.subtitle,
      price: item.price || "",
      options: item.options.join(", "),
      tags: item.tags || [],
      nutrition: item.nutrition || [],
    });
    setImagePreview(item.image);
    setShowForm(true);
  };

  // Delete item
  const handleDelete = async (id) => {
    if (window.confirm("Delete this item?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        loadItems();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const formDataToSend = new FormData();
      
      // Add image file if new image is selected
      if (formData.imageFile) {
        formDataToSend.append("image", formData.imageFile);
      } else if (!editingId) {
        // For new items, image file is required
        return alert("Please upload an image");
      }
      // For updates without new image, don't send image field (will keep existing)

      // Add other fields
      formDataToSend.append("title", formData.title);
      formDataToSend.append("subtitle", formData.subtitle);
      formDataToSend.append("options", formData.options);
      formDataToSend.append("tags", JSON.stringify(formData.tags));
      
      // Filter out empty nutrition entries and add nutrition if it exists
      const validNutrition = formData.nutrition
        ? formData.nutrition.filter(nut => nut.label && nut.value)
        : [];
      
      if (validNutrition.length > 0) {
        formDataToSend.append("nutrition", JSON.stringify(validNutrition));
      } else {
        // Send empty array if no valid nutrition
        formDataToSend.append("nutrition", JSON.stringify([]));
      }

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post(API_URL, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      
      setShowForm(false);
      setImagePreview(null);
      loadItems();
    } catch (err) {
      console.error("Submit error:", err);
      
      // Handle specific error cases
      if (err.response?.status === 413) {
        alert("File is too large. Maximum size is 5MB. Please compress the image or choose a smaller file.");
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

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Checkout Admin Panel</h2>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
          <div className="mt-2 text-sm">
            <p>API URL: {API_URL}</p>
            <p>Items loaded: {items.length}</p>
          </div>
          <button
            onClick={loadItems}
            className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={openCreateForm}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          + Add New Item
        </button>

        {/* View Toggle */}
        <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode("cards")}
            className={`px-4 py-2 rounded transition ${
              viewMode === "cards"
                ? "bg-white shadow text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Cards
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 rounded transition ${
              viewMode === "table"
                ? "bg-white shadow text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading checkout items...</p>
        </div>
      )}

      {/* CARD VIEW - Matching CheckoutCard.jsx design */}
      {!loading && viewMode === "cards" && (
        <div className="flex flex-wrap justify-center lg:justify-start w-full gap-4">
          {items.map((item) => {
            const hasOptions = item.options && Array.isArray(item.options) && item.options.length > 0;
            const isOddTotal = hasOptions && item.options.length % 2 === 1;
            
            return (
              <div
                key={item._id}
                className="relative flex flex-col w-full max-w-[330px] bg-white rounded-3xl shadow-xl overflow-hidden border border-white m-3 sm:max-w-[350px] md:h-[540px] lg:h-[560px] group"
              >
                {/* Image */}
                <div className="relative h-40 sm:h-48 w-full">
                  <img
                    src={item.image || "https://via.placeholder.com/400x300?text=No+Image"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-90" />
                  
                  {/* Admin Actions Overlay - Show on hover */}
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEditForm(item)}
                      className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-green-700 shadow-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-700 shadow-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="relative px-4 pb-5 -mt-10 flex flex-col flex-1">
                  <div className="flex-1 overflow-y-auto pr-1 space-y-2.5">
                    <div className="bg-white rounded-2xl p-3 shadow-lg text-center">
                      <h2 className="text-xl font-extrabold text-gray-800">{item.title}</h2>
                      <p className="text-gray-400 text-xs font-medium mt-1">{item.subtitle}</p>

                      {/* Nutrition pills */}
                      {item.nutrition && Array.isArray(item.nutrition) && item.nutrition.length > 0 && (
                        <div className="mt-3 flex items-center justify-between bg-gray-50 rounded-xl px-1 py-2 border divide-x">
                          {item.nutrition.map((nut, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center">
                              <div className="flex items-center gap-0.5">
                                {nut.highlight && <Icons.Fire />}
                                <span
                                  className={`text-[11px] font-bold ${
                                    nut.highlight ? "text-gray-900" : "text-gray-700"
                                  }`}
                                >
                                  {nut.value}
                                </span>
                              </div>
                              <span className="text-[8px] uppercase tracking-wide text-gray-400">
                                {nut.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Options */}
                    <div className="min-h-[80px]">
                      {hasOptions ? (
                        <>
                          <div className="flex justify-between mb-0.5">
                            <span className="text-[11px] font-bold text-gray-700">
                              Select Base
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                            {item.options.map((opt, idx) => {
                              const isLastItem = idx === item.options.length - 1;
                              const shouldCenter = isOddTotal && isLastItem;
                              
                              return (
                                <button
                                  key={idx}
                                  className={`py-1.5 px-2 rounded-xl border font-semibold truncate transition-all ${
                                    shouldCenter 
                                      ? "col-span-2 justify-self-center max-w-[calc(50%-0.1875rem)] w-[calc(50%-0.1875rem)]" 
                                      : "w-full"
                                  } bg-white border-gray-200 text-gray-500 hover:bg-gray-50`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center border bg-gradient-to-b from-gray-50 to-white px-3.5 py-3.5 rounded-2xl">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-full text-[11px] font-semibold">
                            <Icons.Chef /> Chef's preset base
                          </span>
                          <p className="text-[11px] text-gray-500 font-medium mt-2 text-center">
                            Base pairing already selected for this dish.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {items.length === 0 && (
            <div className="w-full text-center py-12 text-gray-400">
              No checkout items yet. Click "Add New Item" to create one.
            </div>
          )}
        </div>
      )}

      {/* TABLE VIEW */}
      {!loading && viewMode === "table" && (
        <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Title</th>
              {/* <th className="p-3 text-left">Price</th> */}
              <th className="p-3 text-left">Options</th>
              <th className="p-3 text-left">Tags</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && items.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">
                  {item.image && (
                    <img
                      className="w-14 h-14 object-cover rounded"
                      src={item.image}
                      alt={item.title || "Item"}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/56x56?text=No+Image";
                      }}
                    />
                  )}
                </td>
                <td className="p-3 font-medium">{item.title || "Untitled"}</td>
                {/* <td className="p-3">${item.price}</td> */}
                <td className="p-3">
                  {Array.isArray(item.options) 
                    ? item.options.join(", ") 
                    : item.options || "—"}
                </td>
                <td className="p-3">
                  {Array.isArray(item.tags) 
                    ? item.tags.length > 0 
                      ? item.tags.join(", ") 
                      : "No tags"
                    : "—"}
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => openEditForm(item)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {!loading && items.length === 0 && !error && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-400">
                  No checkout items yet. Click "Add New Item" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      )}

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Item" : "Create Item"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* IMAGE UPLOAD */}
              <div>
                <label className="block font-medium mb-1">
                  Upload Image {editingId ? "(Leave empty to keep current)" : "*"}
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleImageUpload}
                  className="border p-2 rounded w-full bg-gray-50"
                  required={!editingId}
                />
                {(imagePreview || formData.image) && (
                  <div className="mt-2">
                    <img
                      src={imagePreview || formData.image}
                      alt="preview"
                      className="w-32 h-32 object-cover rounded border"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1">Title</label>
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Subtitle</label>
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                  required
                />
              </div>

            

              <div>
                <label className="block font-medium mb-1">
                  Options (comma separated)
                </label>
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  value={formData.options}
                  onChange={(e) =>
                    setFormData({ ...formData, options: e.target.value })
                  }
                  required
                />
              </div>

              {/* NUTRITION FACTS */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block font-medium">Nutrition Facts</label>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        nutrition: [
                          ...formData.nutrition,
                          { label: "", value: "", highlight: false },
                        ],
                      });
                    }}
                    className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    + Add Nutrition
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto border rounded p-2">
                  {formData.nutrition.map((nut, index) => (
                    <div
                      key={index}
                      className="flex gap-2 items-start p-2 bg-gray-50 rounded border"
                    >
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          placeholder="Label (e.g., Calories)"
                          className="border p-2 rounded w-full text-sm"
                          value={nut.label}
                          onChange={(e) => {
                            const newNutrition = [...formData.nutrition];
                            newNutrition[index].label = e.target.value;
                            setFormData({ ...formData, nutrition: newNutrition });
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Value (e.g., 350 kcal)"
                          className="border p-2 rounded w-full text-sm"
                          value={nut.value}
                          onChange={(e) => {
                            const newNutrition = [...formData.nutrition];
                            newNutrition[index].value = e.target.value;
                            setFormData({ ...formData, nutrition: newNutrition });
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-1 text-xs">
                          <input
                            type="checkbox"
                            checked={nut.highlight || false}
                            onChange={(e) => {
                              const newNutrition = [...formData.nutrition];
                              newNutrition[index].highlight = e.target.checked;
                              setFormData({ ...formData, nutrition: newNutrition });
                            }}
                            className="w-4 h-4"
                          />
                          <span>Highlight</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const newNutrition = formData.nutrition.filter(
                              (_, i) => i !== index
                            );
                            setFormData({ ...formData, nutrition: newNutrition });
                          }}
                          className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  {formData.nutrition.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">
                      No nutrition facts added. Click "+ Add Nutrition" to add one.
                    </p>
                  )}
                </div>
              </div>

              {/* TAG SELECTION */}
              <div>
                <label className="block font-medium mb-1">Tags</label>
                <TagAdmin
                  selectedTags={formData.tags}
                  onTagsChange={(tags) => setFormData({ ...formData, tags })}
                />
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : editingId ? "Save Changes" : "Create"}
                </button>
                <button
                  type="button"
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  onClick={() => {
                    setShowForm(false);
                    setImagePreview(null);
                  }}
                  disabled={uploading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
