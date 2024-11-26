// my-food-delivery-backend/routes/orderRoutes.js
const express = require('express');
const { placeOrder, getOrders, deleteOrder } = require('../controllers/orderController');
const router = express.Router();

router.post('/', placeOrder);
router.get('/', getOrders);
router.delete('/:id', deleteOrder);

module.exports = router;