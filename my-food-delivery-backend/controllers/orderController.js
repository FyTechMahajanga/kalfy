// my-food-delivery-backend/controllers/orderController.js
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Dish = require('../models/Dish');

const placeOrder = async (req, res) => {
    try {
        const { customerData, items } = req.body;

        let customer = await Customer.findOne({ email: customerData.email });
        if (!customer) {
            customer = new Customer(customerData);
            await customer.save();
        }

        let totalAmount = 0;
        for (const item of items) {
            const dish = await Dish.findById(item.dishId);
            if (dish) {
                totalAmount += dish.price * item.quantity;
            } else {
                return res.status(400).json({ message: 'Dish not found', dishId: item.dishId });
            }
        }

        const order = new Order({
            customer: customer._id,
            items,
            totalAmount,
            paymentMethod: customerData.paymentMethod,
        });

        await order.save();
        customer.orders.push(order._id);
        await customer.save();

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Error placing order', error });
    }
};

module.exports = { placeOrder };