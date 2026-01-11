import User from "../models/User.js";

/**
 * GET USERS (CUSTOMERS)
 * Search + Pagination
 */
export const getUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const search = req.query.search || "";

    // 🔍 Search query (only apply when search exists)
    const query = search
      ? {
          $or: [
            { fullName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // 📊 Counts
    const totalUsers = await User.countDocuments();        // ALL users
    const filteredTotal = await User.countDocuments(query); // Search-based users

    // 📄 Paginated users
    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // ✅ Response
    res.json({
      success: true,
      users,
      pagination: {
        totalUsers,                    // total users in DB
        filteredTotal,                 // users after search
        page,
        pages: Math.ceil(filteredTotal / limit),
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
