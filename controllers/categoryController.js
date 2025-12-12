import Category from '../models/Category.js';

export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
