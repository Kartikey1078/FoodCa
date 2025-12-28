import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import multer from "multer";

import connectDB from "./config/db.js";

import itemRoutes from "./routes/itemRoutes.js";
import SelectPlan from "./routes/select_plan.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";
import popRoutes from "./routes/popRoutes.js";
import DeliveryDetailsRoutes from "./routes/DeliveryDetailsRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import squareRoutes from "./routes/squareRoutes.js";
import nutritionFactsRoutes from "./routes/nutritionFactsRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

/* =========================
   ENV
========================= */
dotenv.config();

/* =========================
   DB CONNECT (Vercel-safe)
========================= */
let isDbConnected = false;
const connectOnce = async () => {
  if (!isDbConnected) {
    await connectDB();
    isDbConnected = true;
  }
};

/* =========================
   APP INIT
========================= */
const app = express();

/* =========================
   BODY PARSERS
========================= */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

/* =========================
   CORS CONFIG
========================= */
app.use(
  cors({
    origin: [
      "https://food-ca.vercel.app",
      "https://food-ca-hkw4.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

/* =========================
   DB MIDDLEWARE
========================= */
app.use(async (req, res, next) => {
  try {
    await connectOnce();
    next();
  } catch (err) {
    console.error("DB connection failed:", err);
    res.status(500).json({ message: "Database connection error" });
  }
});

/* =========================
   ROUTES
========================= */
app.get("/", (req, res) => {
  res.json({ message: "Backend running on Vercel 🚀" });
});

app.get("/api/cors-test", (req, res) => {
  res.json({
    success: true,
    origin: req.headers.origin,
  });
});

app.use("/api/items", itemRoutes);
app.use("/api/plans", SelectPlan);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/popup", popRoutes);
app.use("/api/deliverydetails", DeliveryDetailsRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/square", squareRoutes);
app.use("/api/nutrition-facts", nutritionFactsRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/recipes", recipeRoutes);


/* =========================
   ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  res.status(err?.status || 500).json({
    success: false,
    message: err?.message || "Internal Server Error",
  });
});

/* =========================
   EXPORT FOR VERCEL
========================= */
export default app;














