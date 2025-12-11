import express from "express";
import {
  createCheckout,
  getCheckouts,
  getCheckoutById,
  updateCheckout,
  deleteCheckout,
  getCheckoutsTags,
} from "../controllers/checkout.js";

const router = express.Router();

router.post("/", createCheckout);         // Create
router.get("/tags", getCheckoutsTags);    // Filter by tag (must come before /:id)
router.get("/", getCheckouts);            // Read All
router.get("/:id", getCheckoutById);      // Read One
router.put("/:id", updateCheckout);       // Update
router.delete("/:id", deleteCheckout);    // Delete   
export default router;
