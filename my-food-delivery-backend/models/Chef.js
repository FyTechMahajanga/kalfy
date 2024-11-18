// my-food-delivery-backend/models/Chef.js
const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }],
});

module.exports = mongoose.model('Chef', chefSchema);