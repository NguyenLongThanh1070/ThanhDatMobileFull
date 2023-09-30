const express = require('express');
const router = express.Router();

const { authenticateUser, authorizePermissions } = require('../middleware/authentication');

const checkOut = require('../controllers/billController');

router.post('/checkout', authenticateUser, checkOut);

module.exports = router;
