import Subcategory from '../models/Subcategory.js';

export const createSubcategory = async (req, res) => {
  try {
    const sub = await Subcategory.create(req.body);
    res.json(sub);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getSubcategories = async (req, res) => {
  try {
    const subs = await Subcategory.find().populate('category');
    res.json(subs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
