const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const usersController = require('../controllers/usersController');

// Public listing
router.get('/', usersController.listUsers);
router.get('/:id', usersController.getUser);

// Protected admin-style routes
router.post('/', auth, usersController.createUser);
router.put('/:id', auth, usersController.updateUser);
router.delete('/:id', auth, usersController.deleteUser);

module.exports = router;