import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://food-ca-xa3o.vercel.app/api/nutrition-facts";

export default function NutritionFact() {
  const [facts, setFacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load nutrition facts
  const loadFacts = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data.success) {
        setFacts(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch nutrition facts:", err);
    }
  };

  useEffect(() => {
    loadFacts();
  }, []);

  // Open create form
  const openCreateForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setImage(null);
    setImagePreview(null);
    setShowForm(true);
  };

  // Open edit form
  const openEditForm = (fact) => {
    setEditingId(fact._id);
    setTitle(fact.title);
    setDescription(fact.description || "");
    setImage(null);
    setImagePreview(fact.image);
    setShowForm(true);
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Delete nutrition fact
  const handleDelete = async (id) => {
    if (window.confirm("Delete this nutrition fact?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        loadFacts();
      } catch (err) {
        console.error("Failed to delete:", err);
        alert("Failed to delete nutrition fact");
      }
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      
      if (image) {
        formData.append("image", image);
      }

      if (editingId) {
        // Update
        await axios.put(`${API_URL}/${editingId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Create
        await axios.post(API_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setShowForm(false);
      loadFacts();
    } catch (err) {
      console.error("Failed to save:", err);
      alert(err.response?.data?.message || "Failed to save nutrition fact");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Nutrition Facts Admin</h2>
        <button
          onClick={openCreateForm}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          + Add New Nutrition Fact
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {facts.map((fact) => (
              <tr key={fact._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">
                  {fact.image && (
                    <img
                      src={fact.image}
                      alt={fact.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                </td>
                <td className="p-3 font-medium">{fact.title}</td>
                <td className="p-3 text-gray-600 text-sm max-w-md truncate">
                  {fact.description || "—"}
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => openEditForm(fact)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(fact._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {facts.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-400">
                  No nutrition facts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Nutrition Fact" : "Create Nutrition Fact"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Title *</label>
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  className="border p-2 rounded w-full h-24 resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Image {editingId ? "(Leave empty to keep current)" : "*"}
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleImageChange}
                  className="border p-2 rounded w-full"
                  required={!editingId}
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded border"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
                >
                  {loading ? "Saving..." : editingId ? "Save Changes" : "Create"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
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
