import mongoose, { Schema } from "mongoose";

const nutritionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  imagePublicId: {
    type: String,
  },
}, {
  timestamps: true,
});

const NutritionFact = mongoose.models.NutritionFact || mongoose.model("NutritionFact", nutritionSchema);
export default NutritionFact;