// routes/deliveryPersonRoutes.js
const express = require('express');
const { createDeliveryPerson, getDeliveryPersons } = require('../controllers/deliveryPersonController');
const router = express.Router();

router.post('/delivery-person', createDeliveryPerson);
router.get('/delivery-persons', getDeliveryPersons);

module.exports = router;