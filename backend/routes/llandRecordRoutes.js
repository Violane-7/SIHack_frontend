const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createLandRecord,
  getAllLandRecords,
  getLandRecordById,
  updateLandRecord,
  deleteLandRecord,
} = require("../controllers/landRecordController");

// All routes behind auth
router.post("/", auth, createLandRecord);        // Create
router.get("/", auth, getAllLandRecords);        // Get all
router.get("/:id", auth, getLandRecordById);     // Get one
router.put("/:id", auth, updateLandRecord);      // Update
router.delete("/:id", auth, deleteLandRecord);   // Delete

module.exports = router;

