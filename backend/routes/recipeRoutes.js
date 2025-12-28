import express from "express";
import upload from "../config/multer.js";
import {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", getRecipes);
router.get("/:id", getRecipeById);

router.post("/", upload.single("image"), createRecipe);
router.put("/:id", upload.single("image"), updateRecipe);

router.delete("/:id", deleteRecipe);

export default router;
