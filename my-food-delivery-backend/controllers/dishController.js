// my-food-delivery-backend/controllers/dishController.js
const Dish = require('../models/Dish');

const addDish = async (req, res) => {
    try {
        const { name, price, description, imageUrl } = req.body;
        const dish = new Dish({ name, price, description, imageUrl });
        await dish.save();
        res.status(201).json({ message: 'Dish added successfully', dish });
    } catch (error) {
        res.status(500).json({ message: 'Error adding dish', error });
    }
};

const getDishes = async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.status(200).json(dishes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dishes', error });
    }
};

module.exports = { addDish, getDishes };