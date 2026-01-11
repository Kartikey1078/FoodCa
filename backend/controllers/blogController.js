import Blog from "../models/Blog.js";
import cloudinary from "../config/cloudinaryConfig.js"; // your cloudinary config

// ===================== CREATE BLOG =====================
export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, category, tags } = req.body;

    if (!req.files?.image?.[0]) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.files.image[0].path, {
      folder: "blogs",
    });

    const blog = await Blog.create({
      title,
      excerpt,
      content,
      category,
      tags: typeof tags === "string" ? JSON.parse(tags) : tags || [],
      image: result.secure_url,
      imagePublicId: result.public_id,
    });

    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    console.error("Create blog error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// ===================== GET ALL BLOGS WITH PAGINATION =====================
export const getBlogs = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // default to page 1
      const limit = 6; // 7 blogs per page
      const skip = (page - 1) * limit;
  
      const blogs = await Blog.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
  
      // Optional: total count to know if more blogs exist
      const totalBlogs = await Blog.countDocuments();
  
      res.status(200).json({ 
        success: true, 
        data: blogs,
        total: totalBlogs,
        page,
        hasMore: skip + blogs.length < totalBlogs
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  

// ===================== GET BLOG BY ID =====================
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===================== UPDATE BLOG =====================
export const updateBlog = async (req, res) => {
  try {
    const { title, excerpt, content, category, tags } = req.body;
    const updateData = { title, excerpt, content, category };

    if (tags !== undefined) {
      updateData.tags = typeof tags === "string" ? JSON.parse(tags) : tags;
    }

    const oldBlog = await Blog.findById(req.params.id);
    if (!oldBlog) return res.status(404).json({ success: false, message: "Not found" });

    // Update image if provided
    if (req.files?.image?.[0]) {
      // Delete old image from Cloudinary
      if (oldBlog.imagePublicId) await cloudinary.uploader.destroy(oldBlog.imagePublicId);

      const result = await cloudinary.uploader.upload(req.files.image[0].path, {
        folder: "blogs",
      });

      updateData.image = result.secure_url;
      updateData.imagePublicId = result.public_id;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    console.error("Update blog error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// ===================== DELETE BLOG =====================
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Not found" });

    // Delete image from Cloudinary
    if (blog.imagePublicId) await cloudinary.uploader.destroy(blog.imagePublicId);

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===================== FILTER BY TAG =====================
export const getBlogsByTag = async (req, res) => {
  try {
    const { tag } = req.query;
    const query = tag && tag !== "All" ? { tags: tag } : {};
    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
