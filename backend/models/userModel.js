const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true }, // Required
  lastName: { type: String, required: true },  // Required
  role: { type: String, required: true },      // e.g. "admin", "user"
  designation: { type: String, default: "" },  // Optional
  phoneNumber: { type: String, required: true, unique: true }, // Contact
  address: { type: String, required: true },   // Required
  password: { type: String, required: true },  // Store hashed password
  state: { type: String, required: true },     // Required
  createdAt: { type: Date, default: Date.now }, // Auto timestamp
});

// Function to get User model for a given connection
function getUserModel(conn) {
  try {
    return conn.model("User");
  } catch (e) {
    return conn.model("User", userSchema);
  }
}

module.exports = getUserModel;
