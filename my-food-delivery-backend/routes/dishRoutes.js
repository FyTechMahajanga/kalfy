// my-food-delivery-backend/routes/dishRoutes.js
const express = require('express');
const { addDish, getDishes, getDishesByChef, publishDish } = require('../controllers/dishController');
const router = express.Router();

router.post('/', addDish);
router.get('/', getDishes);
router.get('/chef/:chefId', getDishesByChef);
router.patch('/:dishId/publish', publishDish);

module.exports = router;