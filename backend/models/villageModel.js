const mongoose = require("mongoose");

const villageSchema = new mongoose.Schema({
  village_id: { type: String, required: true, unique: true },
  village_name: { type: String, required: true }, // keep unique if needed
  geom: {
    type: {
      type: String, // GeoJSON type (Point, Polygon, etc.)
      required: true,
    },
    coordinates: {
      type: Array,
      required: true,
    },
  },
});

// Geo index for spatial queries
villageSchema.index({ geom: "2dsphere" });

module.exports = mongoose.model("Village", villageSchema);
