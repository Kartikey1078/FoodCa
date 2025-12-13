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

router.post("/", upload.single("image"), createCheckout);         // Create with image
router.get("/tags", getCheckoutsTags);    // Filter by tag (must come before /:id)
router.get("/", getCheckouts);            // Read All
router.get("/:id", getCheckoutById);      // Read One
router.put("/:id", upload.single("image"), updateCheckout);       // Update (image optional)
router.delete("/:id", deleteCheckout);    // Delete   
export default router;
