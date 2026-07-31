import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  status: { type: String, default: 'Active' },
  description: { type: String },
  // Dimensions
  dimensions: {
    width: Number,
    height: Number,
    unit: { type: String, default: 'mm' },
    bleed: { type: String, default: '5mm' },
    safeMargin: { type: String, default: '8mm' },
    minimumDpi: { type: String, default: '300dpi' },
    colourMode: { type: String, default: 'CMYK' },
    acceptedFiles: { type: String, default: 'PDF, AI, EPS, SVG, PNG, JPG' },
    exportStandard: { type: String, default: 'PDF/X-4' }
  },
  // Pricing
  pricing: {
    basePrice: Number,
    gst: { type: Number, default: 10 },
    minimumQuantity: { type: Number, default: 1 }
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
