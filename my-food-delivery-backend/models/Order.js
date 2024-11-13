// my-food-delivery-backend/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    items: [{
        dishId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
        quantity: { type: Number, required: true, min: 1 }
    }],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['mobile money', 'cash on delivery'], required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'delivered', 'canceled'], default: 'pending' }
});

module.exports = mongoose.model('Order', orderSchema);