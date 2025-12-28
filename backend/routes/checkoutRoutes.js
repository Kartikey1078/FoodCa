import express from "express";
import upload from "../config/multer.js";
import {
  createCheckout,
  getCheckouts,
  getCheckoutById,
  updateCheckout,
  deleteCheckout,
  getCheckoutsTags,
} from "../controllers/checkout.js";

const router = express.Router();

// Multiple images upload
const checkoutUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "nutritionValueImage", maxCount: 1 },
]);

router.post("/", checkoutUpload, createCheckout);
router.get("/tags", getCheckoutsTags);
router.get("/", getCheckouts);
router.get("/:id", getCheckoutById);
router.put("/:id", checkoutUpload, updateCheckout);
router.delete("/:id", deleteCheckout);

export default router;
