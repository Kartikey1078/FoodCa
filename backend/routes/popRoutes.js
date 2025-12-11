import express from "express";
import {
  getPopupSettings,
  updatePopupSettings,
} from "../controllers/popController.js";

const router = express.Router();

router.get("/", getPopupSettings);           // Get settings
router.put("/", updatePopupSettings);        // Update settings

export default router;

