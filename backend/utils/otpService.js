// Simple in-memory OTP store. For production use Redis or DB with TTL.
const { v4: uuidv4 } = require("uuid");

const otpStore = new Map(); // key -> { otp, phoneOrEmail, expiresAt }

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function saveOtpFor(identifier) {
  const otp = generateOTP();
  const key = uuidv4();
  const ttlMs = 5 * 60 * 1000; // 5 minutes
  const expiresAt = Date.now() + ttlMs;
  otpStore.set(key, { otp, identifier, expiresAt });
  // Return key and otp (in production you never return otp; only send it via SMS/email)
  return { key, otp, expiresAt };
}

function verifyOtp(key, otp, identifier) {
  const record = otpStore.get(key);
  if (!record) return { ok: false, reason: "invalid_key" };
  if (record.identifier !== identifier)
    return { ok: false, reason: "identifier_mismatch" };
  if (Date.now() > record.expiresAt) {
    otpStore.delete(key);
    return { ok: false, reason: "expired" };
  }
  if (record.otp !== otp) return { ok: false, reason: "wrong_otp" };
  otpStore.delete(key);
  return { ok: true };
}

module.exports = { saveOtpFor, verifyOtp };
