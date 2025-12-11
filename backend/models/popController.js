import mongoose from "mongoose";

const popupControlSchema = new mongoose.Schema({
  isEnabled: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "Extra Meals Selected",
  },
  message: {
    type: String,
    default: "You have selected {totalMeals} meals. Your plan allows {minMeals} meals.",
  },
  extraChargeMessage: {
    type: String,
    default: "Extra charges: ${extraMealPrice} per extra meal",
  },
  buttonText: {
    type: String,
    default: "Okay, Got it",
  },
}, {
  timestamps: true,
});

// Ensure only one document exists
popupControlSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

const PopupControl = mongoose.models.PopupControl || mongoose.model("PopupControl", popupControlSchema);
export default PopupControl;

