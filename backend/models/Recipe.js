  import mongoose from "mongoose";

  const recipeSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        required: true,
      },

      image: {
        type: String,
        required: true,
      },

      cookTime: {
        type: Number, // minutes
        required: true,
      },

      calories: {
        type: Number,
        required: true,
      },

      isVeg: {
        type: Boolean,
        default: true,
      },

      ingredients: {
        type: [String],
        required: true,
      },

      highlights: {
        type: [String], 
        default: [],
      },
      instructions: {
          type: [String],
          required: true, 
        },
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    { timestamps: true }
  );

  export default mongoose.model("Recipe", recipeSchema);
