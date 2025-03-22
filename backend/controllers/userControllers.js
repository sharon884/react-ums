const User = require("../models/user");
const STATUS_CODES = require("../constants/statusCode");
const { hashPassword, comparePassword } = require("../utils/hashedPassword");
const genarateToken = require("../utils/genarateToken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //checking the email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "user alredy exists" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ name, email, password: hashedPassword, role });

    await newUser.save();

    genarateToken(res, newUser._id);

     return res
      .status(STATUS_CODES.CREATED)
      .json({ message: "user registered successfully", user: newUser });
  } catch (error) {
   return res.status(STATUS_CODES.SERVER_ERROR).json({
      message: "Internal server error  ",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ message: " email or password  is incorrect!" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ message: " pssword is incorrect!" });
    }

    genarateToken(res, user._id);
    res.status(STATUS_CODES.SUCCESS).json({
      message: "Login succesfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: " profile page fetched succesfully!", user: req.user });
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: " internal server error!", error: error.message });
  }
};

const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(STATUS_CODES.SUCCESS).json({ message: "Log out successfully" });
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "user not found!" });
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = await hashPassword(req.body.password);
    }

    const updateUser = await user.save();

    res.status(STATUS_CODES.CREATED).json({
      message: "user updated succefully!",
      user: {
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        role: updateUser.role,
      },
    });
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: "something went wrong!" });
  }
};

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: " no file uploaded !" });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: " user not found!" });
    }
    const imagePath = req.file.path.replace(/\\/g, "/");
    user.profileImage = imagePath;
    await user.save();

    res
      .status(STATUS_CODES.CREATED)
      .json({
        message: " file uploaded successfully!",
       user
      });
  } catch (error) {
    console.error(error);
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: "something went wrong !" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
  updateUserProfile,
  uploadImage,
};
