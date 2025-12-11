import mongoose from "mongoose";

const deliveryDetailsSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    addressLine1: {
      type: String,
      required: true,
    },

    addressLine2: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      required: true,
      enum: ["Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Pune"],
    },

    postalCode: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    couponCode: {
      type: String,
      default: null,
    },

    couponDiscount: {
      type: Number,
      default: 0,
    },

    deliveryInstruction: {
      type: String,
      enum: ["Front Door", "Back Door", "Lobby", "Apartment Doorstep"],
      required: true,
    },

    // Delivery Fee (STATIC OR CONDITIONAL)
    deliveryFee: {
      type: Number,
      default: 0,
    },

    acceptTerms: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

// -----------------------------------------------------------
// APPLY DELIVERY FEE (WITHOUT SETTINGS)
// -----------------------------------------------------------
deliveryDetailsSchema.pre("save", function () {
  if (this.deliveryInstruction === "Apartment Doorstep") {
    this.deliveryFee = 10;
  } else {
    this.deliveryFee = 0;
  }
});

const DeliveryDetails = mongoose.model(
  "DeliveryDetails",
  deliveryDetailsSchema
);

export default DeliveryDetails;
