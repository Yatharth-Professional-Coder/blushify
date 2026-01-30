const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const adminMiddleware = require('../middleware/adminMiddleware');

// GET all products
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        const query = category ? { category } : {};
        const products = await Product.find(query);
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET daily deals
router.get('/deals', async (req, res) => {
    try {
        const products = await Product.find({ isDailyDeal: true });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ADMIN ROUTES

// Create product
router.post('/', adminMiddleware, async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update product (Price, Stock, Deals, etc.)
router.put('/:id', adminMiddleware, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete product
router.delete('/:id', adminMiddleware, async (req, res) => {
    console.log(`DELETE request for product ID: ${req.params.id}`);
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            console.log('Product not found in DB');
            return res.status(404).json({ message: 'Product not found' });
        }
        console.log('Product deleted successfully');
        res.json({ message: 'Product deleted' });
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
