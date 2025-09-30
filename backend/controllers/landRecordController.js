const LandRecord = require("../models/landRecordModel");

// Create new record
const createLandRecord = async (req, res) => {
  try {
    const record = await LandRecord.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all records
const getAllLandRecords = async (req, res) => {
  try {
    const records = await LandRecord.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one record by ID
const getLandRecordById = async (req, res) => {
  try {
    const record = await LandRecord.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update record
const updateLandRecord = async (req, res) => {
  try {
    const record = await LandRecord.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.status(200).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete record
const deleteLandRecord = async (req, res) => {
  try {
    const record = await LandRecord.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createLandRecord,
  getAllLandRecords,
  getLandRecordById,
  updateLandRecord,
  deleteLandRecord,
};
