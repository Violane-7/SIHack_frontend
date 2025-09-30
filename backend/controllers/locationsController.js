const { getLocationsConnection } = require('../config/db');
const getLocationModel = require('../models/locationModel');

async function createLocation(req, res) {
try {
const conn = getLocationsConnection();
const Location = getLocationModel(conn);
const { name, phoneNumber, location } = req.body;
// location should be { type: 'Point', coordinates: [lon, lat] }
const doc = await Location.create({ name, phoneNumber, location });
return res.json({ ok: true, location: doc });
} catch (err) {
console.error(err);
return res.status(500).json({ ok: false, message: 'server error', error: err.message });
}
}

async function listLocations(req, res) {
try {
const conn = getLocationsConnection();
const Location = getLocationModel(conn);
const docs = await Location.find().limit(100);
return res.json({ ok: true, locations: docs });
} catch (err) {
console.error(err);
return res.status(500).json({ ok: false, message: 'server error' });
}
}

async function getLocation(req, res) {
try {
const conn = getLocationsConnection();
const Location = getLocationModel(conn);
const doc = await Location.findById(req.params.id) || await Location.findOne({ _id: req.params.id });
if (!doc) return res.status(404).json({ ok: false, message: 'Not found' });
return res.json({ ok: true, location: doc });
} catch (err) {
console.error(err);
return res.status(500).json({ ok: false, message: 'server error' });
}
}
async function updateLocation(req, res) {
try {
const conn = getLocationsConnection();
const Location = getLocationModel(conn);
const updates = req.body;
const updated = await Location.findByIdAndUpdate(req.params.id, updates, { new: true }) || await Location.findOneAndUpdate({ _id: req.params.id }, updates, { new: true });
if (!updated) return res.status(404).json({ ok: false, message: 'Not found' });
return res.json({ ok: true, location: updated });
} catch (err) {
console.error(err);
return res.status(500).json({ ok: false, message: 'server error' });
}
}

async function deleteLocation(req, res) {
try {
const conn = getLocationsConnection();
const Location = getLocationModel(conn);
const removed = await Location.findByIdAndDelete(req.params.id);
if (!removed) return res.status(404).json({ ok: false, message: 'Not found' });
return res.json({ ok: true, message: 'Deleted' });
} catch (err) {
console.error(err);
return res.status(500).json({ ok: false, message: 'server error' });
}
}
// Example of a geo query: find nearby points
async function findNearby(req, res) {
try {
const { lon, lat, maxDistanceMeters = 5000 } = req.query;
if (!lon || !lat) return res.status(400).json({ ok: false, message: 'lon and lat required' });
const conn = getLocationsConnection();
const Location = getLocationModel(conn);
const docs = await Location.find({
location: {
$nearSphere: {
$geometry: { type: 'Point', coordinates: [Number(lon), Number(lat)] },
$maxDistance: Number(maxDistanceMeters),
},
},
}).limit(100);
return res.json({ ok: true, results: docs });
} catch (err) {
console.error(err);
return res.status(500).json({ ok: false, message: 'server error' });
}
}

module.exports = { createLocation, listLocations, getLocation, updateLocation, deleteLocation, findNearby };