// my-food-delivery-backend/models/Dish.js
const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    imageUrl: { type: String },
    chefId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chef', required: true },
    published: { type: Boolean, default: false },
});

module.exports = mongoose.model('Dish', dishSchema);