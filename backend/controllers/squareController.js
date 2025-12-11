import pkg from "square";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

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
    const { token, amount } = req.body;

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

    res.json({
      success: true,
      message: "Payment Successful!",
      payment: safePayment,
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
