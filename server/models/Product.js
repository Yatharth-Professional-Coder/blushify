const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    description: { type: String },
    category: { type: String, required: true },
    images: [{ type: String }],
    inStock: { type: Boolean, default: true },
    isDailyDeal: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
