// my-food-delivery-backend/controllers/chefController.js
const Chef = require('../models/Chef');
const bcrypt = require('bcrypt');

const registerChef = async (req, res) => {
    const { name, email, phone, password } = req.body;

    // Validate input
    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if chef already exists
        const existingChef = await Chef.findOne({ email });
        if (existingChef) {
            return res.status(400).json({ message: 'Chef already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new chef
        const chef = new Chef({ name, email, phone, password: hashedPassword });
        await chef.save();

        res.status(201).json({ message: 'Chef registered successfully', chef });
    } catch (error) {
        console.error("Error registering chef:", error); // Log the error
        res.status(500).json({ message: 'Error registering chef', error: error.message });
    }
};

const loginChef = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const chef = await Chef.findOne({ email });
        if (!chef) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, chef.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Return chef ID or token
        res.status(200).json({ message: 'Login successful', chefId: chef._id });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in chef', error });
    }
};

module.exports = { registerChef, loginChef };