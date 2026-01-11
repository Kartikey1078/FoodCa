import Checkout from "../models/checkout.js";
// import cloudinary from "../config/cloudinary.js"; // agar delete karna ho

/* =======================
   COMMON ARRAY PARSER
======================= */
const parseArrayField = (field) => {
  if (!field) return [];

  if (Array.isArray(field)) return field;

  if (typeof field === "string") {
    try {
      const parsed = JSON.parse(field);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return field
        .split(",")
        .map(v => v.trim())
        .filter(Boolean);
    }
  }

  return [];
};

/* =======================
   CREATE
======================= */
export const createCheckout = async (req, res) => {
  try {
    const { title, subtitle, nutrition, options, tags, weekNumbers, noSplit } = req.body;

    const nutritionData = parseArrayField(nutrition);
    const optionsData = parseArrayField(options);
    const tagsData = parseArrayField(tags);
    const weekNumbersData = parseArrayField(weekNumbers);

    // Validate at least one week
    if (weekNumbersData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one week number is required",
      });
    }

    const itemData = {
      title,
      subtitle,
      nutrition: nutritionData,
      options: optionsData,
      tags: tagsData,
      weekNumbers: weekNumbersData,
      noSplit: Boolean(noSplit),
    };

    // ---------- Main image ----------
    if (req.files?.image?.[0]) {
      itemData.image = req.files.image[0].path;
      itemData.imagePublicId = req.files.image[0].filename;
    } else {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // ---------- Nutrition Value Image ----------
    if (req.files?.nutritionValueImage?.[0]) {
      itemData.nutritionValueImage =
        req.files.nutritionValueImage[0].path;
      itemData.nutritionValueImagePublicId =
        req.files.nutritionValueImage[0].filename;
    }

    const item = await Checkout.create(itemData);

    res.status(201).json({ success: true, data: item });
  } catch (error) {
    console.error("Create checkout error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

/* =======================
   READ ALL
======================= */
export const getCheckouts = async (req, res) => {
  try {
    const items = await Checkout.find().sort({ weekNumbers: 1 });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =======================
   READ BY ID
======================= */
export const getCheckoutById = async (req, res) => {
  try {
    const item = await Checkout.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =======================
   UPDATE
======================= */
export const updateCheckout = async (req, res) => {
  try {
    const { title, subtitle, nutrition, options, tags, weekNumbers,noSplit } = req.body;
    const updateData = {};
    if (title) updateData.title = title;
    if (subtitle) updateData.subtitle = subtitle;

    if (noSplit !== undefined) {
      updateData.noSplit = noSplit;
    }
    if (nutrition !== undefined) {
      updateData.nutrition = parseArrayField(nutrition);
    }

    if (options !== undefined) {
      updateData.options = parseArrayField(options);
    }

    if (tags !== undefined) {
      updateData.tags = parseArrayField(tags);
    }

    if (weekNumbers !== undefined) {
      updateData.weekNumbers = parseArrayField(weekNumbers);
    }

    const oldItem = await Checkout.findById(req.params.id);
    if (!oldItem) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    // ---------- Update main image ----------
    if (req.files?.image?.[0]) {
      // cloudinary.uploader.destroy(oldItem.imagePublicId);
      updateData.image = req.files.image[0].path;
      updateData.imagePublicId = req.files.image[0].filename;
    }

    // ---------- Update nutrition value image ----------
    if (req.files?.nutritionValueImage?.[0]) {
      // cloudinary.uploader.destroy(oldItem.nutritionValueImagePublicId);
      updateData.nutritionValueImage =
        req.files.nutritionValueImage[0].path;
      updateData.nutritionValueImagePublicId =
        req.files.nutritionValueImage[0].filename;
    }

    const updatedItem = await Checkout.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updatedItem });
  } catch (error) {
    console.error("Update checkout error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

/* =======================
   DELETE
======================= */
export const deleteCheckout = async (req, res) => {
  try {
    const item = await Checkout.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    // cloudinary.uploader.destroy(item.imagePublicId);
    // cloudinary.uploader.destroy(item.nutritionValueImagePublicId);

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =======================
   FILTER BY TAG
======================= */
export const getCheckoutsTags = async (req, res) => {
  try {
    const { tag, week } = req.query;

    const query = {};

    if (tag && tag !== "All") {
      query.tags = tag;
    }

    if (week) {
      query.weekNumbers = Number(week);
    }

    const items = await Checkout.find(query);

    res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


/* =======================
   GET BY WEEK 
======================= */
// export const getCheckoutsByWeek = async (req, res) => {
//   try {
//     // 1️⃣ Calculate current week from date
//     const today = new Date();
//     const dayOfMonth = today.getDate(); // 1–31

//     let currentWeek = Math.ceil(dayOfMonth / 7);
//     if (currentWeek > 4) currentWeek = 4;

//     let triedWeeks = new Set();
//     let items = [];

//     while (triedWeeks.size < 4) {
     
//       items = await Checkout.find({
//         weekNumbers: currentWeek, 
//       }).sort({ createdAt: -1 });

//       if (items.length > 0) break;

//       triedWeeks.add(currentWeek);
//       currentWeek = currentWeek === 4 ? 1 : currentWeek + 1;
//     }

//     res.status(200).json({
//       success: true,
//       activeWeek: currentWeek,
//       count: items.length,
//       data: items,
//     });
//   } catch (error) {
//     console.error("Auto rotating week error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch checkout items",
//     });
//   }
// };
export const getCheckoutsByWeek = async (req, res) => {
  try {
    const { week } = req.query;

    if (!week) {
      return res.status(400).json({
        success: false,
        message: "Week is required",
      });
    }

    const items = await Checkout.find({
      weekNumbers: Number(week),
    });

    res.json({
      success: true,
      week,
      data: items,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


