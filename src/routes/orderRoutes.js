const express = require('express');
const { placeOrder, getOrderDetails } = require('../controllers/orderController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, placeOrder);
router.get('/:orderId', auth, getOrderDetails);

module.exports = router;
