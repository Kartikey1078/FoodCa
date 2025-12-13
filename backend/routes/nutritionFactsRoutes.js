import express from "express";
import upload from "../config/multer.js";
import {
  createNutritionFact,
  getNutritionFacts,
  getNutritionFactById,
  updateNutritionFact,
  deleteNutritionFact,
  createTestData,
} from "../controllers/nutritionFactsController.js";

const router = express.Router();

// Test route - API info
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Nutrition Facts API is working!",
    endpoints: {
      "GET /api/nutrition-facts": "Get all nutrition facts",
      "GET /api/nutrition-facts/test": "Get API info (this endpoint)",
      "POST /api/nutrition-facts/test-data": "Create test data with sample entries",
      "GET /api/nutrition-facts/:id": "Get one nutrition fact",
      "POST /api/nutrition-facts": "Create nutrition fact (requires image)",
      "PUT /api/nutrition-facts/:id": "Update nutrition fact (image optional)",
      "DELETE /api/nutrition-facts/:id": "Delete nutrition fact",
    },
    sampleData: {
      title: "Sample Nutrition Fact",
      description: "This is a sample nutrition fact description",
      image: "https://via.placeholder.com/400x300",
      imagePublicId: "sample_public_id",
    },
  });
});

// Create test data endpoint
router.post("/test-data", createTestData);

// All routes use /api/nutrition-facts
router.post("/", upload.single("image"), createNutritionFact);         // Create with image
router.get("/", getNutritionFacts);                                     // Read all
router.get("/:id", getNutritionFactById);                               // Read one
router.put("/:id", upload.single("image"), updateNutritionFact);        // Update (image optional)
router.delete("/:id", deleteNutritionFact);                             // Delete

export default router;
