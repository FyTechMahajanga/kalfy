// my-food-delivery-backend/routes/customerRoutes.js
const express = require('express');
const { registerCustomer } = require('../controllers/customerController');
const router = express.Router();

router.post('/', registerCustomer);

module.exports = router;