const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/adminControllers");
const {validateLogin} = require("../middlewares/validationMiddilware");
const protect = require("../middlewares/authMiddileware");
const adminAuth = require("../middlewares/adminAuthMiddileware");

router.post( "/login", validateLogin,adminControllers.adminLogin);

router.get("/dashboard",protect,adminAuth,adminControllers.getAdminDashboard);
router.get("/users",protect,adminAuth, adminControllers.getUser);

router.put("/users/:id",protect, adminAuth , adminControllers.updateUser);
router.delete("/users/:id",protect,adminAuth,adminControllers.deleteUser);
router.post("/create-user", protect, adminAuth, adminControllers.createUser);

module.exports = router;