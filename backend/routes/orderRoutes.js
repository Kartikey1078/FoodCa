import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getTotalOrdersCount,
  getTotalRevenue,
  getTodayOrders
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);              // Create order
router.get("/", getOrders);                 // Get all orders
router.get("/count", getTotalOrdersCount);  // total order count
router.get("/today", getTodayOrders); // today order count
router.get("/revenue", getTotalRevenue);    // total revenue
router.get("/:id", getOrderById);           // Get order by ID
router.put("/:id/status", updateOrderStatus); // Update order status

export default router;

