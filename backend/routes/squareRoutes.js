import express from "express";
import { handleSquarePayment } from "../controllers/squareController.js";

const router = express.Router();

router.post("/pay", handleSquarePayment);

export default router;
