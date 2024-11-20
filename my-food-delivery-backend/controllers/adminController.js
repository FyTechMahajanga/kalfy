// my-food-delivery-backend/controllers/adminController.js
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

const registerAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({ email, password: hashedPassword });
        await admin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error("Error registering admin:", error);
        res.status(500).json({ message: 'Error registering admin', error: error.message });
    }
};

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful', adminId: admin._id });
    } catch (error) {
        console.error("Error logging in admin:", error);
        res.status(500).json({ message: 'Error logging in admin', error });
    }
};

module.exports = { registerAdmin, loginAdmin };