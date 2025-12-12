import Vendor from '../models/Vendor.js';

export const createVendor = async (req, res) => {
  try {
    const vendor = await Vendor.create(req.body);
    res.json(vendor);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
