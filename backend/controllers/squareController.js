import pkg from "square";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import Order from "../models/order.js";

dotenv.config();

const { Client, Environment } = pkg;

// Initialize Square client
const client = new Client({
  environment:
    process.env.SQUARE_ENVIRONMENT === "Production"
      ? Environment.Production
      : Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

export const handleSquarePayment = async (req, res) => {
  try {
    const { token, amount, orderData } = req.body;

    if (!token || !amount) {
      return res.status(400).json({
        success: false,
        message: "Token or amount missing",
      });
    }

    const paymentsApi = client.paymentsApi;

    const response = await paymentsApi.createPayment({
      sourceId: token,
      idempotencyKey: uuidv4(), 
      amountMoney: {
        amount,           // e.g., 12100 for USD 121.00 (amount is in cents)
        // IMPORTANT:
        // Your Square merchant account (even in sandbox) only supports USD,
        // and sending a different currency (like CAD) causes a 400 INVALID_VALUE error.
        // So we force USD here to match the merchant currency.
        currency: "CAD",
      },
      locationId: process.env.SQUARE_LOCATION_ID,
    });

    // Convert BigInt fields to string to avoid JSON errors
    const safePayment = JSON.parse(
      JSON.stringify(response.result.payment, (_, v) =>
        typeof v === "bigint" ? v.toString() : v
      )
    );

    // Save order to database if orderData is provided
    let savedOrder = null;
    if (orderData && response.result.payment.status === "COMPLETED") {
      try {
        // Map delivery instruction to match enum values
        const deliveryInstructionMap = {
          "Front Door": "FRONT DOOR FREE",
          "Back Door": "BACKDOOR FREE",
          "Lobby": "LOBBY FREE",
          "Apartment Doorstep": "DOORSTEP DELIVERY AT APARTMENT @$10",
        };

        const mappedDeliveryInstruction = 
          deliveryInstructionMap[orderData.deliveryInstruction] || 
          orderData.deliveryInstruction.toUpperCase() || 
          "FRONT DOOR FREE";

        // Map city to match enum values (convert to uppercase and handle variations)
        const cityMap = {
          "Delhi": "TORONTO",
          "Mumbai": "TORONTO",
          "Bengaluru": "TORONTO",
          "Hyderabad": "TORONTO",
          "Chennai": "TORONTO",
          "Pune": "TORONTO",
        };
        
        const mappedCity = cityMap[orderData.city] || 
          (orderData.city ? orderData.city.toUpperCase() : "TORONTO");

        // Calculate delivery fee
        let deliveryFee = 0;
        if (mappedDeliveryInstruction === "DOORSTEP DELIVERY AT APARTMENT @$10") {
          deliveryFee = 10;
        }

        // Prepare order data
        const orderPayload = {
          fullName: orderData.fullName || "",
          coupon: orderData.couponCode || "",
          addressLine1: orderData.addressLine1 || "",
          addressLine2: orderData.addressLine2 || "",
          city: mappedCity,
          postalCode: orderData.postalCode || "",
          phoneNumber: orderData.phoneNumber || "",
          deliveryInstructions: mappedDeliveryInstruction,
          cartItems: orderData.cartItems || [],
          planInfo: orderData.planInfo || {},
          totalMeals: orderData.totalMeals || 0,
          extraMeals: orderData.extraMeals || 0,
          extraMealCost: orderData.extraMealCost || 0,
          planPrice: orderData.planPrice || 0,
          deliveryFee,
          grandTotal: orderData.grandTotal || amount / 100,
          status: "pending",
        };

        savedOrder = await Order.create(orderPayload);
      } catch (orderError) {
        console.error("Error saving order:", orderError);
        // Don't fail the payment if order save fails, but log it
      }
    }

    res.json({
      success: true,
      message: "Payment Successful!",
      payment: safePayment,
      order: savedOrder,
    });
  } catch (err) {
    console.error("Square Error:", err);
    res.status(500).json({
      success: false,
      message: "Payment Failed",
      error: err.message,
    });
  }
};
