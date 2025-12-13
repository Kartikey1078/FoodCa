import mongoose from "mongoose";

const checkOutSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  imagePublicId: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  nutrition: [
    {
      label: { type: String, required: true },
      value: { type: String, required: true },
      highlight: { type: Boolean, default: false },
    }
  ],
  options: {
    type: [String],
    required: true,   
    validate: {
      validator: function (arr) {
        return arr.length > 0;
      },
      message: "At least one option is required",
    },
  },
  tags: {
    type: [String],   
    default: [],
  },
}, {
  timestamps: true,
});

const checkout = mongoose.models.Checkout || mongoose.model("Checkout", checkOutSchema);
export default checkout;
