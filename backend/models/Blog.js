import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String },
    content: { type: String, required: true },
    image: { type: String, required: true },
    imagePublicId: { type: String },
    category: { type: String },
    tags: [{ type: String }],
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
