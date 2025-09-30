const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String },

  location: {
    type: {
      type: String,
      enum: ["Point", "Polygon", "MultiPolygon"], // allow multiple geometry types
      required: true,
    },
    coordinates: {
      type: Array, // works for Point [lng, lat] or Polygon/MultiPolygon [[[lng, lat], ...], ...]
      required: true,
    },
  },

  createdAt: { type: Date, default: Date.now },
});

// GeoJSON index for queries like $geoWithin, $near, etc.
locationSchema.index({ location: "2dsphere" });

function getLocationModel(conn) {
  try {
    return conn.model("Location");
  } catch (e) {
    return conn.model("Location", locationSchema);
  }
}

module.exports = getLocationModel;
