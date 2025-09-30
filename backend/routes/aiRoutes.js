const express = require('express');
const router = express.Router();
const { proxyToAi } = require('../controllers/aiController');
const auth = require('../middleware/authMiddleware');

// Protect AI route if you want only authenticated users to use it
router.post('/', auth, proxyToAi);

module.exports = router;
