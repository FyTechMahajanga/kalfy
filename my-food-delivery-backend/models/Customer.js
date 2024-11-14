// my-food-delivery-backend/models/Customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    paymentMethod: { type: String, enum: ['mobile money', 'cash on delivery'], required: true },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

module.exports = mongoose.model('Customer', customerSchema);