const express = require('express');
const { createDish, getMenu } = require('../controllers/menuController');
const router = express.Router();
router.post('/', createDish);
router.get('/:chefId', getMenu);
module.exports = router;