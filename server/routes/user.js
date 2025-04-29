const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middlewares/authMiddleware");
const { getUserInfo } = require("../controllers/userController");

// Route to get user info
router.get("/user/me", authenticateJWT, getUserInfo);

module.exports = router;
