const express = require('express');
const { createCart, addToCart, removeFromCart, getCartContents } = require('../controllers/cartController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createCart);
router.post('/add', auth, addToCart);
router.post('/remove', auth, removeFromCart);
router.get('/:cartId', auth, getCartContents);

module.exports = router;
