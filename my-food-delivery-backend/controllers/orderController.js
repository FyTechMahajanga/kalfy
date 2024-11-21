// my-food-delivery-backend/controllers/orderController.js
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Dish = require('../models/Dish');

const placeOrder = async (req, res) => {
    console.log("Received order data:", req.body); // Log the incoming data
    try {
        const { customerData, items } = req.body;

        // Check if customerData and items are defined
        if (!customerData || !items) {
            return res.status(400).json({ message: 'Invalid order data' });
        }

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
            deliveryAddress: customerData.address,
        });

        await order.save();
        customer.orders.push(order._id);
        await customer.save();

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.error("Error placing order:", error); // Log the error
        res.status(500).json({ message: 'Error placing order', error: error.message });
    }
};

module.exports = {placeOrder};