import Tag from "../models/tag.js";

// GET ALL TAGS
export const getTags = async (req, res) => {
  try {
    const tags = await Tag.find(); res.status(200).json({ success: true, data: tags });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// GET ONE TAG
export const getTagById = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ success: false, message: "Tag not found" });
    res.status(200).json({ success: true, data: tag });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE TAG
export const createTag = async (req, res) => {
  try {
    const newTag = await Tag.create({ name: req.body.name });
    res.status(201).json({ success: true, data: newTag });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE TAG
export const updateTag = async (req, res) => {
  try {
    const updatedTag = await Tag.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true, runValidators: true }
    );
    if (!updatedTag) return res.status(404).json({ success: false, message: "Tag not found" });
    res.status(200).json({ success: true, data: updatedTag });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE TAG
export const deleteTag = async (req, res) => {
  try {
    const deletedTag = await Tag.findByIdAndDelete(req.params.id);
    if (!deletedTag) return res.status(404).json({ success: false, message: "Tag not found" });
    res.status(200).json({ success: true, message: "Tag deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
