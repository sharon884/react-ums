const User = require("../models/user");
const { comparePassword } = require("../utils/hashedPassword");
const genarateToken = require("../utils/genarateToken");
const STATUS_CODES = require("../constants/statusCode");

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "user is not found!" });
    }

    if (user.role !== "admin") {
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ message: "access denied ! only admin can log in !" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ message: "invalid credentiails!" });
    }
    genarateToken(res, user._id);
    res.status(STATUS_CODES.SUCCESS).json({
      message: "admin logged in successfully!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: "something went wrong !" });
  }
};

const getAdminDashboard = async (req, res) => {
  try {
    // Extract page and limit from query params (default: page 1, limit 10)
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    const adminCount = await User.countDocuments({ role: "admin" });
    // Fetch users with pagination
    const users = await User.find().skip(skip).limit(limit);
    res
      .status(STATUS_CODES.SUCCESS)
      .json({
        message: "admin Dashboard Data ! ",
        totalUsers,
        adminCount,
        users,
        currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = {
  adminLogin,
  getAdminDashboard,
};
