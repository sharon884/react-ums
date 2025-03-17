const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const {validateSignUp,validateLogin} = require("../middlewares/validationMiddilware");
const protect = require("../middlewares/authMiddileware");
const upload = require("../middlewares/uploadMiddileware");

router.get("/test", (req, res) => {
    res.send("User routes working!");
});

router.post("/signup", validateSignUp,  userController.registerUser);
router.post("/login", validateLogin, userController.loginUser);
router.post("/logout" , userController.logoutUser);
router.post("/profile/upload" , protect ,upload.single("profileImage"), userController.uploadImage)

router.get("/profile", protect, userController.getUserProfile);

router.put("/profile", protect,userController.updateUserProfile);//haiiiiiiii


module.exports = router;
