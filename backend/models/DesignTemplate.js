import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  size: { type: String, required: true },
  status: { type: String, default: 'Active' },
  lockGuides: { type: String, default: 'Bleed + Safe Zone' },
  canvasData: { type: Object }, // To store Fabric.js JSON state
}, { timestamps: true });

const DesignTemplate = mongoose.model('DesignTemplate', templateSchema);
export default DesignTemplate;
