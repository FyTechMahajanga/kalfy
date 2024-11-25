// models/DeliveryPerson.js
const mongoose = require('mongoose');

const deliveryPersonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    // Add any other fields you need
}, { timestamps: true });

module.exports = mongoose.model('DeliveryPerson', deliveryPersonSchema);