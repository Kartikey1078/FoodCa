import Order from "../models/order.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    // Calculate delivery fee based on delivery instructions
    let deliveryFee = 0;
    if (req.body.deliveryInstructions === "DOORSTEP DELIVERY AT APARTMENT @$10") {
      deliveryFee = 10;
    }

    // Calculate grand total with delivery fee
    const grandTotal = (req.body.planPrice || 0) + (req.body.extraMealCost || 0) + deliveryFee;

    const orderData = {
      ...req.body,
      deliveryFee,
      grandTotal,
    };

    const order = await Order.create(orderData);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET ALL ORDERS WITH PAGINATION
export const getOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search?.trim() || "";
    const status = req.query.status;
    const city = req.query.city;

    // 🔍 Build query dynamically
    const query = {
      $and: [
        search
          ? {
              $or: [
                { fullName: { $regex: search, $options: "i" } },
                { phoneNumber: { $regex: search, $options: "i" } },
                { coupon: { $regex: search, $options: "i" } },
                { "planInfo.title": { $regex: search, $options: "i" } },
              ],
            }
          : {},
        status ? { status } : {},
        city ? { city } : {},
      ],
    };

    const [orders, total] = await Promise.all([
      Order.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Order.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ORDER BY ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// total orders count
export const getTotalOrdersCount = async (req,res) =>{
  try {
    const totalOrders = await Order.countDocuments();
    res.json({success:true,totalOrders});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// total revenue 
export const getTotalRevenue = async (req,res) =>{
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id:null,
          totalRevenue:{$sum:"$grandTotal"}
          
        }
      }
    ])
    res.json({
      success:true,
      totalRevenue: result[0]?.totalRevenue || 0
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}


// today order 
export const getTodayOrders = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const orders = await Order.find({
      createdAt: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,           // empty array if none
      count: orders.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


