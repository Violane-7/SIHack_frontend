const express = require("express");
const router = express.Router();
const Village = require("../models/villageModel");

// Fetch by village name
router.get("/:name", async (req, res) => {
  try {
    const village = await Village.find({ village_name: req.params.name });
    res.json(village);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch by village ID
router.get("/id/:id", async (req, res) => {
  try {
    const village = await Village.findOne({ village_id: req.params.id });
    res.json(village);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch by location (point)
router.post("/location", async (req, res) => {
  try {
    const { lng, lat } = req.body;
    const village = await Village.findOne({
      geom: {
        $geoIntersects: {
          $geometry: { type: "Point", coordinates: [lng, lat] },
        },
      },
    });
    res.json(village);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
