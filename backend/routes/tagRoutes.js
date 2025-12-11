import express from "express";
import {
  createTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag,
} from "../controllers/tagController.js";

const router = express.Router();

router.post("/", createTag);         // Create
router.get("/", getTags);            // Read all
router.get("/:id", getTagById);      // Read one
router.put("/:id", updateTag);       // Update
router.delete("/:id", deleteTag);    // Delete

export default router;
