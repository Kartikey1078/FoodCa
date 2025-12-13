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
  process.env.ADMIN_ORIGIN || 'http://localhost:5174',
  'http://localhost:5173',
  'http://localhost:5174'
];

console.log("Allowed Origins:", allowedOrigins);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔥 CORS Fix for Vercel + Local
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.log("Blocked Origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Backend Running on Vercel!' });
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


export default app;
