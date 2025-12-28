import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeForm from "../components/RecipeForm";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const AdminRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);

  const fetchRecipes = async () => {
    const res = await axios.get(`${API_BASE_URL}/recipes`);
    setRecipes(res.data);
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
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🍽 Admin – Recipes</h1>

      <RecipeForm
        editingRecipe={editingRecipe}
        onSuccess={() => {
          setEditingRecipe(null);
          fetchRecipes();
        }}
      />

      <div className="mt-8 grid gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="flex justify-between items-center border rounded-lg p-4"
          >
            
            <div className="flex gap-4.5 items-center">
            <img
              src={recipe.image}
              className="w-16 h-16 object-cover rounded"
            />
              <h2 className="font-semibold">{recipe.title}</h2>
              <p className="text-sm text-gray-500">
                {recipe.calories} kcal • {recipe.cookTime} mins
              </p>
            </div>
            

            <div className="flex gap-2">
              <button
                onClick={() => setEditingRecipe(recipe)}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(recipe._id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRecipes;
