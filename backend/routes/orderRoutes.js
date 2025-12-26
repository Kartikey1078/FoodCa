import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);              // Create order
router.get("/", getOrders);                 // Get all orders
router.get("/:id", getOrderById);           // Get order by ID
router.put("/:id/status", updateOrderStatus); // Update order status

export default router;

