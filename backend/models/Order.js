import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerEmail: { type: String, required: true },
  deliveryOption: { type: String, required: true, enum: ['Pickup', 'Delivery'] },
  deliveryAddress: { type: String },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  status: { type: String, default: 'Order Received' },
  totalPrice: { type: Number, required: true },
  artworkFile: { type: String }, // Path or URL to the uploaded artwork
  isArtworkApproved: { type: Boolean, default: false }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
