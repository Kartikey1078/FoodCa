import Recipe from "../models/Recipe.js";
import cloudinary from "../config/cloudinaryConfig.js";

/* ----------------------------------------------------
   CREATE RECIPE
---------------------------------------------------- */
export const createRecipe = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const recipe = await Recipe.create({
      title: req.body.title,
      description: req.body.description,
      image: req.file.path, // ✅ USE THIS
      cookTime: Number(req.body.cookTime),
      calories: Number(req.body.calories),
      isVeg: req.body.isVeg === "true" || req.body.isVeg === true,
      ingredients: JSON.parse(req.body.ingredients || "[]"),
      instructions: JSON.parse(req.body.instructions || "[]"),
      highlights: JSON.parse(req.body.highlights || "[]"),
    });

    res.status(201).json(recipe);
  } catch (error) {
    console.error("CREATE RECIPE ERROR:", error);
    res.status(400).json({ message: error.message });
  }
};


/* ----------------------------------------------------
   GET ALL RECIPES
---------------------------------------------------- */
export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ isActive: true }).sort({
      createdAt: -1,
    });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ----------------------------------------------------
   GET SINGLE RECIPE
---------------------------------------------------- */
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe || !recipe.isActive) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ----------------------------------------------------
   UPDATE RECIPE
---------------------------------------------------- */
export const updateRecipe = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      cookTime: Number(req.body.cookTime),
      calories: Number(req.body.calories),
      isVeg: req.body.isVeg === "true" || req.body.isVeg === true,
      ingredients: JSON.parse(req.body.ingredients || "[]"),
      instructions: JSON.parse(req.body.instructions || "[]"),
      highlights: JSON.parse(req.body.highlights || "[]"),
    };

    if (req.file) {
      updateData.image = req.file.path; // ✅ USE THIS
    }

    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error("UPDATE RECIPE ERROR:", error);
    res.status(400).json({ message: error.message });
  }
};


/* ----------------------------------------------------
   DELETE RECIPE (SOFT DELETE)
---------------------------------------------------- */
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
