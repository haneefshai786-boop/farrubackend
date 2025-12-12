import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
  price: Number,
  description: String
});

export default mongoose.model('Product', productSchema);
