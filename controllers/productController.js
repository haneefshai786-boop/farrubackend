import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
  try {
    const p = await Product.create(req.body);
    res.json(p);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const p = await Product.find()
      .populate('vendor')
      .populate('category')
      .populate('subcategory');
    res.json(p);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
