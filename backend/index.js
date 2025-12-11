import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import itemRoutes from './routes/itemRoutes.js';
import connectDB from './config/db.js';
import SelectPlan from "./routes/select_plan.js"
import checkoutRoutes from './routes/checkoutRoutes.js'
import tagRoutes from "./routes/tagRoutes.js";
import popRoutes from "./routes/popRoutes.js";
import DeliveryDetailsRoutes from "./routes/DeliveryDetailsRoutes.js"
import stripeRoutes from "./routes/stripeRoutes.js";
import squareRoutes from "./routes/squareRoutes.js";
import upload from "./config/multer.js";



dotenv.config();
connectDB();

const app = express();
console.log("Loaded Stripe Key:", process.env.STRIPE_SECRET_KEY);
const allowedOrigins = [
  process.env.FRONTEND_ORIGIN || 'https://food-ca.vercel.app/',
  process.env.ADMIN_ORIGIN || 'http://localhost:5174',
];

app.use(express.json());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  }),
);

// router.post("/upload", upload.single("image"), (req, res) => {
//   try {
//     return res.json({
//       success: true,
//       url: req.file.path,  // Cloudinary file URL
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/items', itemRoutes);
app.use('/api/plans', SelectPlan);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/popup", popRoutes);
app.use("/api/deliverydetails", DeliveryDetailsRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/square", squareRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


