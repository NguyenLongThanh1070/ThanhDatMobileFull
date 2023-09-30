const express = require('express');
const router = express.Router();

const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');

router.get('/get-cart', getCart);
router.post('/add-to-cart', addToCart);
router.delete('/remove-from-cart', removeFromCart);

module.exports = router;
