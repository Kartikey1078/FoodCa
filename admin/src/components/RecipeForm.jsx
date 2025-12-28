import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const emptyForm = {
  title: "",
  description: "",
  image: "",
  cookTime: "",
  calories: "",
  isVeg: true,
  ingredients: "",
  instructions: "",
  highlights: "",
};

const RecipeForm = ({ editingRecipe, onSuccess }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingRecipe) {
      setForm({
        ...editingRecipe,
        ingredients: editingRecipe.ingredients.join(", "),
        instructions: editingRecipe.instructions.join(", "),
        highlights: editingRecipe.highlights.join(", "),
      });
    }
  }, [editingRecipe]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("cookTime", form.cookTime);
    formData.append("calories", form.calories);
    formData.append("isVeg", form.isVeg);

    if (form.image) {
      formData.append("image", form.image);
    }

    formData.append(
      "ingredients",
      JSON.stringify(form.ingredients.split(",").map((i) => i.trim()))
    );
    formData.append(
      "instructions",
      JSON.stringify(form.instructions.split(",").map((i) => i.trim()))
    );
    formData.append(
      "highlights",
      JSON.stringify(
        form.highlights ? form.highlights.split(",").map((h) => h.trim()) : []
      )
    );

    if (editingRecipe) {
      await axios.put(`${API_BASE_URL}/recipes/${editingRecipe._id}`, formData);
    } else {
      await axios.post(`${API_BASE_URL}/recipes`, formData);
    }

    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        className="input"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        className="input"
      />

      <input
        name="cookTime"
        placeholder="Cook Time (mins)"
        type="number"
        value={form.cookTime}
        onChange={handleChange}
        required
        className="input"
      />

      <input
        name="calories"
        placeholder="Calories"
        type="number"
        value={form.calories}
        onChange={handleChange}
        required
        className="input"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        className="input col-span-full"
      />

      <textarea
        name="ingredients"
        placeholder="Ingredients (comma separated)"
        value={form.ingredients}
        onChange={handleChange}
        required
        className="input col-span-full"
      />

      <textarea
        name="instructions"
        placeholder="Instructions (comma separated)"
        value={form.instructions}
        onChange={handleChange}
        required
        className="input col-span-full"
      />

      <input
        name="highlights"
        placeholder="Highlights (optional)"
        value={form.highlights}
        onChange={handleChange}
        className="input col-span-full"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isVeg"
          checked={form.isVeg}
          onChange={handleChange}
        />
        Veg Recipe
      </label>

      <button
        type="submit"
        className="bg-green-600 text-white py-2 rounded col-span-full"
      >
        {editingRecipe ? "Update Recipe" : "Add Recipe"}
      </button>
    </form>
  );
};

export default RecipeForm;
