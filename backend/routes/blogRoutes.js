import express from "express";
import multer from "multer";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlogsByTag,
} from "../controllers/blogController.js";

const router = express.Router();

// ---------- Multer setup ----------
const storage = multer.diskStorage({});
const upload = multer({ storage });

// ---------- Routes ----------
router.post("/", upload.fields([{ name: "image", maxCount: 1 }]), createBlog);
router.get("/", getBlogs);
router.get("/tag", getBlogsByTag);
router.get("/:id", getBlogById);
router.put("/:id", upload.fields([{ name: "image", maxCount: 1 }]), updateBlog);
router.delete("/:id", deleteBlog);

export default router;
