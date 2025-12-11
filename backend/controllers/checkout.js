    import Checkout from "../models/checkout.js";

    // CREATE
    export const createCheckout = async (req, res) => {
    try {
        const item = await Checkout.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
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
        const item = await Checkout.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        });

        if (!item) return res.status(404).json({ success: false, message: "Not found" });

        res.status(200).json({ success: true, data: item });
    } catch (error) {
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
