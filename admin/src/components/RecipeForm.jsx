import React, { useEffect, useState } from "react";
import axios from "axios";
import BlockInput from "./BlockInput";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const emptyForm = {
  title: "",
  description: "",
  image: "",
  cookTime: "",
  calories: "",
  isVeg: true,
  ingredients: [],
  instructions: [],
  highlights: [],
};

const RecipeForm = ({ editingRecipe, onSuccess }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingRecipe) {
      setForm({
        ...editingRecipe,
        ingredients: editingRecipe.ingredients || [],
        instructions: editingRecipe.instructions || [],
        highlights: editingRecipe.highlights || [],
      });
    }
  }, [editingRecipe]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingRecipe && !form.image) {
      alert("Please upload a recipe image");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "image" && !value) return;
      if (["ingredients", "instructions", "highlights"].includes(key)) return;
      formData.append(key, value);
    });

    formData.append("ingredients", JSON.stringify(form.ingredients));
    formData.append("instructions", JSON.stringify(form.instructions));
    formData.append("highlights", JSON.stringify(form.highlights));

    if (editingRecipe) {
      await axios.put(`${API_BASE_URL}/recipes/${editingRecipe._id}`, formData);
    } else {
      await axios.post(`${API_BASE_URL}/recipes`, formData);
    }

    onSuccess();
    setForm(emptyForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border p-6 space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          {editingRecipe ? "Update Recipe" : "Add New Recipe"}
        </h2>
        <p className="text-sm text-gray-500">
          Fill in the details carefully to create a perfect recipe
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Title */}
        <div>
          <label className="label">Recipe Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="Paneer Butter Masala"
          />
        </div>

        {/* Image */}
        <div>
          <label className="label">Recipe Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            className="file-input"
          />
        </div>

        {/* Cook Time */}
        <div>
          <label className="label">Cook Time (mins)</label>
          <input
            name="cookTime"
            type="number"
            value={form.cookTime}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        {/* Calories */}
        <div>
          <label className="label">Calories</label>
          <input
            name="calories"
            type="number"
            value={form.calories}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="label">Description</label>
        <textarea
          name="description"
          rows={3}
          value={form.description}
          onChange={handleChange}
          required
          className="textarea-field"
          placeholder="A rich and creamy North Indian curry..."
        />
      </div>

      {/* Ingredients */}
      <BlockInput
        label="Ingredients"
        placeholder="e.g. Paneer, Butter, Tomato"
        values={form.ingredients}
        onAdd={(val) =>
          setForm({ ...form, ingredients: [...form.ingredients, val] })
        }
        onRemove={(idx) =>
          setForm({
            ...form,
            ingredients: form.ingredients.filter((_, i) => i !== idx),
          })
        }
      />

      {/* Instructions */}
      <BlockInput
        label="Instructions"
        placeholder="e.g. Heat butter in a pan"
        values={form.instructions}
        onAdd={(val) =>
          setForm({ ...form, instructions: [...form.instructions, val] })
        }
        onRemove={(idx) =>
          setForm({
            ...form,
            instructions: form.instructions.filter((_, i) => i !== idx),
          })
        }
      />

      {/* Highlights */}
      <BlockInput
        label="Highlights (optional)"
        placeholder="High Protein"
        values={form.highlights}
        onAdd={(val) =>
          setForm({ ...form, highlights: [...form.highlights, val] })
        }
        onRemove={(idx) =>
          setForm({
            ...form,
            highlights: form.highlights.filter((_, i) => i !== idx),
          })
        }
      />

      {/* Veg Toggle */}
      <div className="flex items-center justify-between bg-gray-50 border rounded-xl px-4 py-3">
        <span className="text-sm font-medium text-gray-700">Veg Recipe</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="isVeg"
            checked={form.isVeg}
            onChange={handleChange}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full" />
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl transition"
      >
        {editingRecipe ? "Update Recipe" : "Add Recipe"}
      </button>
    </form>
  );
};

export default RecipeForm;
