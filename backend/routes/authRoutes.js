const express = require('express');
const router = express.Router();
const { signup, verifyOtpAndIssueToken, loginRequestOtp } = require('../controllers/authController');

// POST /api/auth/signup -> create user if not exists and send OTP
router.post('/signup', signup);

// POST /api/auth/login -> request OTP for login
router.post('/login', loginRequestOtp);

// POST /api/auth/verify -> verify otp and get JWT
router.post('/verify', verifyOtpAndIssueToken);

module.exports = router;