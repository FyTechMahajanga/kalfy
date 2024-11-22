// my-food-delivery-backend/controllers/customerController.js
const Customer = require('../models/Customer');

const registerCustomer = async (req, res) => {
    console.log(req.body);
    try {
        const { name, email, phone, paymentMethod, deliveryAddress } = req.body;
        const customer = new Customer({ name, email, phone, paymentMethod, deliveryAddress });
        await customer.save();
        res.status(201).json({ message: 'Customer registered successfully', customer });
    } catch (error) {
        res.status(500).json({ message: 'Error registering customer', error });
    }
};

module.exports = { registerCustomer };