const { getUsersConnection } = require('../config/db');
const getUserModel = require('../models/userModel');
const { saveOtpFor, verifyOtp } = require('../utils/otpService');
const { sendEmail, sendSmsViaTwilio } = require('../utils/sender');
const jwt = require('jsonwebtoken');

// Signup: create user record and send OTP to phone/email
async function signup(req, res) {
  /* Expected body: { firstName, lastName, role?, address?, state, district, phoneNumber } */
  try {
    const { firstName, lastName, role, address, state, district, phoneNumber } = req.body;

    console.log(req.body) //to remove

    if (!firstName || !lastName || !phoneNumber)
      return res.status(400).json({ ok: false, message: 'firstName, lastName, and phoneNumber required' });

    const conn = getUsersConnection();
    const User = getUserModel(conn);

    // Check if user already exists
    let user = await User.findOne({ phoneNumber });
    if (!user) {
      user = await User.create({
        firstName,
        lastName,
        role: role || "user", // default role if missing
        address: address || "N/A",
        state,
        district,
        phoneNumber,
        password: "OTP_FLOW_PLACEHOLDER" // required but not used since OTP flow
      });
    }

    // Save OTP
    const { key, otp, expiresAt } = saveOtpFor(phoneNumber);

    // Send OTP
    await sendSmsViaTwilio(phoneNumber, `Your OTP is ${otp}`);

    return res.json({ ok: true, message: 'OTP sent', otpKey: key, expiresAt });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: 'server error' });
  }
}

// Verify OTP and issue JWT
async function verifyOtpAndIssueToken(req, res) {
  try {
    const { otpKey, otp, phoneNumber } = req.body;
    if (!otpKey || !otp || !phoneNumber)
      return res.status(400).json({ ok: false, message: 'otpKey, otp and phoneNumber required' });

    const ok = verifyOtp(otpKey, otp, phoneNumber);
    if (!ok.ok)
      return res.status(400).json({ ok: false, message: 'OTP invalid or expired', reason: ok.reason });

    const conn = getUsersConnection();
    const User = getUserModel(conn);
    const user = await User.findOne({ phoneNumber });
    if (!user) return res.status(404).json({ ok: false, message: 'User not found' });

    const token = jwt.sign(
      { id: user._id, phoneNumber: user.phoneNumber, firstName: user.firstName, lastName: user.lastName },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return res.json({
      ok: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: 'server error' });
  }
}

// Login route (resend OTP)
async function loginRequestOtp(req, res) {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) return res.status(400).json({ ok: false, message: 'phoneNumber required' });

    const conn = getUsersConnection();
    const User = getUserModel(conn);
    const user = await User.findOne({ phoneNumber });
    if (!user) return res.status(404).json({ ok: false, message: 'User not found' });

    const { key, otp, expiresAt } = saveOtpFor(phoneNumber);
    await sendSmsViaTwilio(phoneNumber, `Your login OTP is ${otp}`);
    return res.json({ ok: true, message: 'OTP sent', otpKey: key, expiresAt });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: 'server error' });
  }
}

module.exports = { signup, verifyOtpAndIssueToken, loginRequestOtp };
