// my-food-delivery-backend/controllers/menuController.js
const Dish = require('../models/Dish');
const Chef = require('../models/Chef');

// Function to create a new dish
const createDish = async (req, res) => {
    const { name, price, description, imageUrl, chefId } = req.body;

    // Validate input
    if (!name || !price || !description || !imageUrl || !chefId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Create a new dish
        const dish = new Dish({ name, price, description, imageUrl });
        await dish.save();

        // Add the dish to the chef's menu
        await Chef.findByIdAndUpdate(chefId, { $push: { menu: dish._id } });

        res.status(201).json({ message: 'Dish created successfully', dish });
    } catch (error) {
        console.error("Error creating dish:", error);
        res.status(500).json({ message: 'Error creating dish', error: error.message });
    }
};

// Function to get a chef's menu
const getMenu = async (req, res) => {
    const { chefId } = req.params;

    try {
        // Find the chef and populate their menu
        const chef = await Chef.findById(chefId).populate('menu');
        if (!chef) {
            return res.status(404).json({ message: 'Chef not found' });
        }
        res.status(200).json(chef.menu);
    } catch (error) {
        console.error("Error fetching menu:", error);
        res.status(500).json({ message: 'Error fetching menu', error: error.message });
    }
};

module.exports = { createDish, getMenu };