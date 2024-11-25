// controllers/deliveryPersonController.js
const DeliveryPerson = require('../models/DeliveryPerson');

exports.createDeliveryPerson = async (req, res) => {
    const { name, phone, email, address } = req.body;

    try {
        const newDeliveryPerson = new DeliveryPerson({ name, phone, email, address });
        await newDeliveryPerson.save();
        res.status(201).json({ message: 'Delivery person registered successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering delivery person.' });
    }
};

exports.getDeliveryPersons = async (req, res) => {
    try {
        const deliveryPersons = await DeliveryPerson.find(); // Fetch all delivery persons
        res.status(200).json(deliveryPersons);
    } catch (error) {
        console.error("Error fetching delivery persons:", error);
        res.status(500).json({ message: 'Error fetching delivery persons' });
    }
};