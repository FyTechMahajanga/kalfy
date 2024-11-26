// my-food-delivery-backend/controllers/orderController.js
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Dish = require('../models/Dish');

const placeOrder = async (req, res) => {
    console.log("Received order data:", req.body); // Log the incoming data
    try {
        const { customerData, items, deliveryDate } = req.body; // Include deliveryDate

        // Check if the customer already exists
        let customer = await Customer.findOne({ email: customerData.email }); // Check by email
        if (!customer) {
            // Create a new customer if not found
            customer = new Customer({
                name: customerData.name,
                phone: customerData.phone,
                email: customerData.email, // Include email
                paymentMethod: customerData.paymentMethod,
                deliveryAddress: customerData.address,
            });
            await customer.save();
            console.log("New customer saved:", customer);
        } else {
            console.log("Existing customer found:", customer);
        }

        // Calculate total amount
        let totalAmount = 0;
        for (const item of items) {
            const dish = await Dish.findById(item.dishId);
            if (dish) {
                totalAmount += dish.price * item.quantity;
            } else {
                return res.status(400).json({ message: 'Dish not found', dishId: item.dishId });
            }
        }

        // Create the order
        const order = new Order({
            customer: customer._id, // Use the existing or new customer's ID
            items,
            totalAmount,
            paymentMethod: customerData.paymentMethod,
            deliveryAddress: customerData.address,
            deliveryDate: new Date(deliveryDate), // Save the delivery date
        });

        await order.save();
        customer.orders.push(order._id); // Link the order to the customer
        await customer.save(); // Save the updated customer

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: 'Error placing order', error: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('customer') // Populate customer details
            .populate('items.dishId') // Populate dish details
            .exec();
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id; // Get the order ID from the request parameters
        const deletedOrder = await Order.findByIdAndDelete(orderId); // Delete the order

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: 'An error occurred while deleting the order' });
    }
};

module.exports = {placeOrder, getOrders, deleteOrder};