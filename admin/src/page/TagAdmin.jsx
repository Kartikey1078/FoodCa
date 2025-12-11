import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:6001/api/tags";

export default function TagAdmin({ selectedTags = [], onTagsChange }) {
  const [tags, setTags] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [tagName, setTagName] = useState("");

  // Load tags
  const loadTags = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data.success) {
        setTags(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch tags:", err);
    }
  };

  useEffect(() => {
    loadTags();
  }, []);

  // Open create form
  const openCreateForm = () => {
    setEditingId(null);
    setTagName("");
    setShowForm(true);
  };

  // Open edit form
  const openEditForm = (tag) => {
    setEditingId(tag._id);
    setTagName(tag.name);
    setShowForm(true);
  };

  // Delete tag
  const handleDelete = async (id) => {
    if (window.confirm("Delete this tag?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        loadTags();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, { name: tagName });
      } else {
        await axios.post(API_URL, { name: tagName });
      }
      setShowForm(false);
      loadTags();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle selecting/unselecting tags
  const toggleTag = (tag) => {
    let newSelected;
    if (selectedTags.includes(tag)) {
      newSelected = selectedTags.filter((t) => t !== tag);
    } else {
      newSelected = [...selectedTags, tag];
    }
    onTagsChange && onTagsChange(newSelected);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Tag Admin Panel</h2>

      <button
        onClick={openCreateForm}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow mb-4"
      >
        + Add New Tag
      </button>

      {/* TAG SELECTION */}
      <div className="mb-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag._id}
            type="button"
            onClick={() => toggleTag(tag.name)}
            className={`px-3 py-1 rounded-full text-sm transition-all duration-200
              ${
                selectedTags.includes(tag.name)
                  ? "bg-green-600 text-white shadow"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }
            `}
          >
            {tag.name}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <tr key={tag._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{tag.name}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => openEditForm(tag)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tag._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {tags.length === 0 && (
              <tr>
                <td colSpan="2" className="p-4 text-center text-gray-400">
                  No tags yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Tag" : "Create Tag"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Tag Name</label>
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  required
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
                  onClick={() => setShowForm(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded"
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
