// my-food-delivery-backend/controllers/dishController.js
const Dish = require('../models/Dish');

const addDish = async (req, res) => {
    try {
        const { name, price, description, imageUrl, chefId } = req.body;
        const dish = new Dish({ name, price, description, imageUrl, chefId });
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
        console.error("Error fetching dishes:", error);
        res.status(500).json({ message: 'Error fetching dishes' });
    }
};

const getDishesByChef = async (req, res) => {
    const { chefId } = req.params;

    try {
        const dishes = await Dish.find({ chefId });
        res.status(200).json(dishes);
    } catch (error) {
        console.error("Error fetching dishes:", error);
        res.status(500).json({ message: 'Error fetching dishes' });
    }
};

const publishDish = async (req, res) => {
    const { dishId } = req.params;

    try {
        const updatedDish = await Dish.findByIdAndUpdate(dishId, { published: true }, { new: true });
        if (!updatedDish) {
            return res.status(404).json({ message: 'Dish not found' });
        }
        res.status(200).json({ message: 'Dish published successfully', dish: updatedDish });
    } catch (error) {
        console.error("Error publishing dish:", error);
        res.status(500).json({ message: 'Error publishing dish' });
    }
};

module.exports = { addDish, getDishes, getDishesByChef, publishDish };