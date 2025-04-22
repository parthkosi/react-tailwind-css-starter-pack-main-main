const express = require("express");
const { signup } = require("../controllers/signupController");
const { login } = require("../controllers/loginController");
const { forgotPassword } = require("../controllers/forgotPasswordController");
const { resetPassword } = require("../controllers/resetPasswordController");
const { verifyOtp } = require("../controllers/verifyOtpController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot_password", forgotPassword);
router.post("/reset_password", resetPassword);
router.post("/verify_otp", verifyOtp);

module.exports = router;
