const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const locationsController = require('../controllers/locationsController');

router.get('/', locationsController.listLocations);
router.get('/nearby', locationsController.findNearby);
router.get('/:id', locationsController.getLocation);

// Protected create/update/delete
router.post('/', auth, locationsController.createLocation);
router.put('/:id', auth, locationsController.updateLocation);
router.delete('/:id', auth, locationsController.deleteLocation);

module.exports = router;