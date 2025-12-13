    import Checkout from "../models/checkout.js";

    // CREATE
    export const createCheckout = async (req, res) => {
    try {
        const { title, subtitle, nutrition, options, tags } = req.body;
        
        // Parse nutrition if it's a string
        let nutritionData = nutrition;
        if (typeof nutrition === 'string') {
            try {
                nutritionData = JSON.parse(nutrition);
            } catch (e) {
                nutritionData = [];
            }
        }

        // Parse options if it's a string
        let optionsData = options;
        if (typeof options === 'string') {
            optionsData = options.split(',').map(opt => opt.trim()).filter(opt => opt);
        }

        // Parse tags if it's a string
        let tagsData = tags;
        if (typeof tags === 'string') {
            try {
                tagsData = JSON.parse(tags);
            } catch (e) {
                tagsData = Array.isArray(tags) ? tags : [];
            }
        }

        const itemData = {
            title,
            subtitle,
            nutrition: nutritionData,
            options: optionsData,
            tags: tagsData,
        };

        // If image file is uploaded, use Cloudinary URL
        if (req.file) {
            itemData.image = req.file.path;
            itemData.imagePublicId = req.file.filename;
        } else if (req.body.image && typeof req.body.image === 'string' && req.body.image.startsWith('http')) {
            // If image URL is provided directly (for existing images or direct URLs)
            itemData.image = req.body.image;
        } else {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        const item = await Checkout.create(itemData);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        console.error("Create checkout error:", error);
        res.status(400).json({ success: false, message: error.message });
    }
    };

    // READ ALL
    export const getCheckouts = async (req, res) => {
    try {
        const items = await Checkout.find();
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
    };

    // READ ONE BY ID
    export const getCheckoutById = async (req, res) => {
    try {
        const item = await Checkout.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: "Not found" });

        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
    };

    // UPDATE
    export const updateCheckout = async (req, res) => {
    try {
        const { title, subtitle, nutrition, options, tags } = req.body;
        const updateData = {};

        if (title) updateData.title = title;
        if (subtitle) updateData.subtitle = subtitle;

        // Parse nutrition if provided
        if (nutrition !== undefined) {
            if (typeof nutrition === 'string') {
                try {
                    updateData.nutrition = JSON.parse(nutrition);
                } catch (e) {
                    updateData.nutrition = [];
                }
            } else {
                updateData.nutrition = nutrition;
            }
        }

        // Parse options if provided
        if (options !== undefined) {
            if (typeof options === 'string') {
                updateData.options = options.split(',').map(opt => opt.trim()).filter(opt => opt);
            } else {
                updateData.options = options;
            }
        }

        // Parse tags if provided
        if (tags !== undefined) {
            if (typeof tags === 'string') {
                try {
                    updateData.tags = JSON.parse(tags);
                } catch (e) {
                    updateData.tags = Array.isArray(tags) ? tags : [];
                }
            } else {
                updateData.tags = tags;
            }
        }

        // If new image is uploaded, update image fields
        if (req.file) {
            // Get old item to potentially delete old image from Cloudinary
            const oldItem = await Checkout.findById(req.params.id);
            if (oldItem && oldItem.imagePublicId) {
                // Note: You might want to delete the old image from Cloudinary here
            }
            updateData.image = req.file.path;
            updateData.imagePublicId = req.file.filename;
        } else if (req.body.image && typeof req.body.image === 'string' && req.body.image.startsWith('http')) {
            // If image URL is provided directly (keep existing or update URL)
            updateData.image = req.body.image;
        }
        // If no image provided, keep existing image (don't update image field)

        const item = await Checkout.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!item) return res.status(404).json({ success: false, message: "Not found" });

        res.status(200).json({ success: true, data: item });
    } catch (error) {
        console.error("Update checkout error:", error);
        res.status(400).json({ success: false, message: error.message });
    }
    };

    // DELETE
    export const deleteCheckout = async (req, res) => {
    try {
        const item = await Checkout.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: "Not found" });

        res.status(200).json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
    };
    //

    export const getCheckoutsTags = async (req, res) => {
        try {
          const { tag } = req.query;
      
          let query = {};
          if (tag && tag !== "All") {
            // Filter items where tags array contains the selected tag
            query = { tags: tag };
          }
      
          const items = await Checkout.find(query);
          res.json({ success: true, data: items });
        } catch (err) {
          console.error(err);
          res.status(500).json({ success: false, message: "Server error" });
        }
      };
