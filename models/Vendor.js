import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  name: String,
  description: String
});

export default mongoose.model('Vendor', vendorSchema);
