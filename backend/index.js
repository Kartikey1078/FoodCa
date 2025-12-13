import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';

import itemRoutes from './routes/itemRoutes.js';
import connectDB from './config/db.js';
import SelectPlan from "./routes/select_plan.js";
import checkoutRoutes from './routes/checkoutRoutes.js';
import tagRoutes from "./routes/tagRoutes.js";
import popRoutes from "./routes/popRoutes.js";
import DeliveryDetailsRoutes from "./routes/DeliveryDetailsRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import squareRoutes from "./routes/squareRoutes.js";
import nutritionFactsRoutes from "./routes/nutritionFactsRoutes.js";

dotenv.config();
connectDB();

const app = express();

// 👌 Allowed Origins
const allowedOrigins = [
  process.env.FRONTEND_ORIGIN || 'https://food-ca.vercel.app',
  process.env.ADMIN_ORIGIN || 'https://food-ca-hkw4.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174',
  'https://food-ca-hkw4.vercel.app', // Without trailing slash
];

console.log("Allowed Origins:", allowedOrigins);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔥 CORS Fix for Vercel + Local
app.use(
  cors({
    origin(origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) {
        return callback(null, true);
      }

      // Normalize origin (remove trailing slash)
      const normalizedOrigin = origin.replace(/\/$/, '');
      
      // Check if origin is in allowed list (with or without trailing slash)
      const isAllowed = allowedOrigins.some(allowed => {
        const normalizedAllowed = allowed.replace(/\/$/, '');
        return normalizedOrigin === normalizedAllowed || origin === allowed;
      });

      if (isAllowed) {
        return callback(null, true);
      }

      console.log("Blocked Origin:", origin);
      console.log("Normalized Origin:", normalizedOrigin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Backend Running on Vercel!' });
});

// CORS test endpoint
app.get('/api/cors-test', (req, res) => {
  res.json({
    success: true,
    message: 'CORS is working!',
    origin: req.headers.origin,
    allowedOrigins: allowedOrigins,
  });
});

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/plans', SelectPlan);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/popup", popRoutes);
app.use("/api/deliverydetails", DeliveryDetailsRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/square", squareRoutes);
app.use("/api/nutrition-facts", nutritionFactsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "CORS Error: Origin not allowed",
      origin: req.headers.origin,
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
