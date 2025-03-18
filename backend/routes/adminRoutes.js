const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/adminControllers");
const {validateLogin} = require("../middlewares/validationMiddilware");
const protect = require("../middlewares/authMiddileware");
const adminAuth = require("../middlewares/adminAuthMiddileware");

router.post( "/login", validateLogin,adminControllers.adminLogin);

router.get("/dashboard",protect,adminAuth,adminControllers.getAdminDashboard);
router.get("/users", adminControllers.getUser);

module.exports = router;