// my-food-delivery-backend/models/Dish.js
const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    imageUrl: { type: String }
});

module.exports = mongoose.model('Dish', dishSchema);