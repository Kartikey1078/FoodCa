import React, { useEffect, useState } from "react";
import axios from "axios";
import TagAdmin from "./TagAdmin"; // Adjust path to your TagAdmin component

const API_URL = "https://food-ca-xa3o.vercel.app/api/checkout";

export default function CheckOut() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedTag, setSelectedTag] = useState("All");

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    subtitle: "",
    price: "",
    options: "",
    tags: [], // Added tags array
  });

  // Convert uploaded image to Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  // Load all items
  const loadItems = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data.data);
    } catch (err) {
      console.error("Failed to load items:", err);
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
      title: "",
      subtitle: "",
      price: "",
      options: "",
      tags: [],
    });
    setShowForm(true);
  };

  // Open edit form
  const openEditForm = (item) => {
    setEditingId(item._id);
    setFormData({
      image: item.image,
      title: item.title,
      subtitle: item.subtitle,
      price: item.price,
      options: item.options.join(", "),
      tags: item.tags || [],
    });
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

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      options: formData.options.split(",").map((o) => o.trim()),
    };

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, payload);
      } else {
        await axios.post(API_URL, payload);
      }
      setShowForm(false);
      loadItems();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Checkout Admin Panel</h2>

      <button
        onClick={openCreateForm}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow mb-4"
      >
        + Add New Item
      </button>

      {/* TABLE */}
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
            {items.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">
                  <img
                    className="w-14 h-14 object-cover rounded"
                    src={item.image}
                    alt=""
                  />
                </td>
                <td className="p-3">{item.title}</td>
                {/* <td className="p-3">${item.price}</td> */}
                <td className="p-3">{item.options.join(", ")}</td>
                <td className="p-3">{item.tags.join(", ")}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => openEditForm(item)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-400">
                  No items yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
                <label className="block font-medium mb-1">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="border p-2 rounded w-full bg-gray-50"
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="preview"
                    className="w-24 h-24 object-cover rounded mt-2"
                  />
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
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  {editingId ? "Save Changes" : "Create"}
                </button>
                <button
                  type="button"
                  className="bg-gray-600 text-white px-4 py-2 rounded"
                  onClick={() => setShowForm(false)}
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
