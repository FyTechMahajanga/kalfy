// my-food-delivery-backend/routes/orderRoutes.js
const express = require('express');
const { placeOrder } = require('../controllers/orderController');
const router = express.Router();

router.post('/', placeOrder);

module.exports = router;