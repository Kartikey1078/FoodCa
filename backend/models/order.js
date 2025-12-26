import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  // Customer Information
  fullName: {
    type: String,
    default: "",
  },
  coupon: {
    type: String,
    default: "",
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
    enum: [
      "HAMILTON",
      "TORONTO",
      "BURLINGTON",
      "OAKVILLE",
      "MISSISSAUGA",
      "BRAMPTON",
      "EAST YORK",
      "NORTH YORK",
      "SCARBOROUGH",
      "ETOBICOKE",
      "MILTON",
    ],
  },
  postalCode: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  deliveryInstructions: {
    type: String,
    required: true,
    enum: [
      "FRONT DOOR FREE",
      "BACKDOOR FREE",
      "LOBBY FREE",
      "DOORSTEP DELIVERY AT APARTMENT @$10",
    ],
  },

  // Order Details
  cartItems: [
    {
      key: String,
      title: String,
      subtitle: String,
      image: String,
      price: Number,
      quantity: Number,
      option: String,
    },
  ],
  planInfo: {
    title: String,
    minMeals: Number,
    price: Number,
    extraMealPrice: Number,
  },
  totalMeals: Number,
  extraMeals: Number,
  extraMealCost: Number,
  planPrice: Number,
  deliveryFee: {
    type: Number,
    default: 0,
  },
  grandTotal: Number,

  // Order Status
  status: {
    type: String,
    enum: ["pending", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"],
    default: "pending",
  },
}, {
  timestamps: true,
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;

