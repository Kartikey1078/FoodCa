/* =========================
   IMPORTS
========================= */
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import multer from "multer";

/* =========================
   CONFIG
========================= */
dotenv.config();

/* =========================
   DB
========================= */
import connectDB from "./config/db.js";

/* =========================
   ROUTES
========================= */
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
import recipeRoutes from "./routes/recipeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

/* =========================
   WEBHOOK
========================= */
import clerkWebhook from "./api/webhooks/clerk.js";

/* =========================
   APP INIT
========================= */
const app = express();

/* =========================
   DB CONNECTION (SERVERLESS SAFE)
========================= */
let isConnected = false;

const ensureDB = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
    console.log("✅ MongoDB connected");
  }
};

/* =========================
   CORS CONFIG
========================= */
const allowedOrigins = [
  process.env.FRONTEND_ORIGIN,
  process.env.ADMIN_ORIGIN,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("❌ Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* =========================
   WEBHOOK (RAW BODY)
========================= */
app.post(
  "/api/webhooks/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhook
);

/* =========================
   BODY PARSERS
========================= */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

/* =========================
   DB MIDDLEWARE
========================= */
app.use(async (req, res, next) => {
  await ensureDB();
  next();
});

/* =========================
   BASE ROUTES
========================= */
app.get("/", (req, res) => {
  res.json({ message: "🚀 Backend running on Vercel" });
});

/* =========================
   API ROUTES
========================= */
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
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

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

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* =========================
   EXPORT (NO app.listen)
========================= */
export default app;
