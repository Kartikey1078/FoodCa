import DeliveryDetails from "../models/DeliveryDetails.js";

// CREATE
export const createDelivery = async (req, res) => {
  try {
    const data = await DeliveryDetails.create(req.body); // <-- await needed
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
