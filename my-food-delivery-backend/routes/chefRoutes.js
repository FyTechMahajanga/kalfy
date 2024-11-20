// my-food-delivery-backend/routes/chefRoutes.js
const express = require('express');
const { registerChef, loginChef, getChefs } = require('../controllers/chefController');
const router = express.Router();

router.post('/register', registerChef);
router.post('/login', loginChef);
router.get('/', getChefs);

module.exports = router;