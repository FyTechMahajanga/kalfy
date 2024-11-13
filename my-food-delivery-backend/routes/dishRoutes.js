// my-food-delivery-backend/routes/dishRoutes.js
const express = require('express');
const { addDish, getDishes } = require('../controllers/dishController');
const router = express.Router();

router.post('/', addDish);
router.get('/', getDishes);

module.exports = router;