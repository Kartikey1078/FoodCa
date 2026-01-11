import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeForm from "../components/RecipeForm";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const AdminRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async () => {
    setLoading(true);
    const res = await axios.get(`${API_BASE_URL}/recipes`);
    setRecipes(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this recipe?")) return;
    await axios.delete(`${API_BASE_URL}/recipes/${id}`);
    fetchRecipes();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            🍽 Recipes Manager
          </h1>
          <p className="text-sm text-gray-500">
            Create, update and manage all recipes
          </p>
        </div>
      </div>

      {/* Form */}
      <RecipeForm
        editingRecipe={editingRecipe}
        onSuccess={() => {
          setEditingRecipe(null);
          fetchRecipes();
        }}
      />

      {/* List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          All Recipes ({recipes.length})
        </h2>

        {loading && (
          <div className="text-sm text-gray-500">Loading recipes...</div>
        )}

        {!loading && recipes.length === 0 && (
          <div className="bg-gray-50 border rounded-xl p-8 text-center text-gray-500">
            No recipes added yet 🍲
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-40 object-cover"
                />
                <span
                  className={`absolute top-3 right-3 text-xs font-medium px-3 py-1 rounded-full ${
                    recipe.isVeg
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {recipe.isVeg ? "Veg" : "Non-Veg"}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-gray-900 truncate">
                  {recipe.title}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2">
                  {recipe.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                  <span>{recipe.calories} kcal</span>
                  <span>{recipe.cookTime} mins</span>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t px-4 py-3 flex justify-end gap-2">
                <button
                  onClick={() => setEditingRecipe(recipe)}
                  className="px-3 py-1.5 text-sm rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="px-3 py-1.5 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminRecipes;
