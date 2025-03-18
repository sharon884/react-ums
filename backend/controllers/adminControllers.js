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
    res.status(STATUS_CODES.SUCCESS).json({
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

const getUser = async (req, res) => {
  try {
    const { search, page = 1, limit = 5 } = req.query || " ";
    let filter = {};
    if (search) {
      filter = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      };

      const user = await User.find(filter)
        .skip((page - 1) * limit) // Skip users from previous pages
        .limit(Number(limit));

      const totalUsers = await User.countDocuments(filter);

      res
        .status(STATUS_CODES.SUCCESS)
        .json({
          message: " user fetched successfully!",
          user,
          totalPages: Math.ceil(totalUsers / limit),
          currentPage: Number(page),
          totalUsers,
        });
    }
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: " something error!" });
  }
};

const updateUser = async ( req , res ) => {
  try {
    const {id} = req.params;
    const { name , email , role } = req.body;
    const user = await User.findById(id);
    if ( !user ) {
      return res.status(STATUS_CODES.NOT_FOUND).json( { message : " user not found !"});
    }
       if ( name ) user.name = name;
       if ( email ) user.email = email;
       if (role) user.role = role;
       await user.save();
       res.status(STATUS_CODES.SUCCESS).json( { message : "user updated successfully !",user})

  } catch ( error )  { 
    console.error(error);
    res.status(STATUS_CODES.SERVER_ERROR).json({ message : "something went wrong!" , error: error.message});
  }
}

const deleteUser = async ( req , res, ) => {
  try{
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(STATUS_CODES.NOT_FOUND).json({ message : "user not found!"});
    }
    res.status(STATUS_CODES.SUCCESS).json( { message : " user deleted succesfully!"});
  }catch ( error ) {
    res.status(STATUS_CODES.SERVER_ERROR).json( { message: "unknown error!"});
  }
}
module.exports = {
  adminLogin,
  getAdminDashboard,
  getUser,
  updateUser,
  deleteUser
};
