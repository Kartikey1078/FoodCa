import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tag: {
      type: String,
      default: null, // e.g., "POPULAR"
    },
    borderColor: {
      type: String,
      default: "border-gray-200",
    },
    features: [
      {
        type: String,
        required: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: true, 
    },
    numberOfMeals: {
      type: Number,
      required: true,
      min: 1
    },
    extraMealPrice: {
      type: Number,
      required: false, 
      default: 0,      
      min: 0,
    },
  },
  { timestamps: true }
);

const SelectPlan = mongoose.models.SelectPlan || mongoose.model("SelectPlan", planSchema);
export default SelectPlan;
