const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const adminMiddleware = require('../middleware/adminMiddleware');
const jwt = require('jsonwebtoken');

// Create order (Public/User)
router.post('/', async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        let userId = null;

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
                userId = decoded.userId;
            } catch (err) {
                console.log('Invalid token, proceeding as guest');
            }
        }

        const newOrder = new Order({
            ...req.body,
            user: userId || req.body.userId || null,
            guestInfo: userId ? null : req.body.guestInfo
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ADMIN: Get all orders
router.get('/', adminMiddleware, async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email').populate('products.product', 'title');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ADMIN: Update order status
router.put('/:id', adminMiddleware, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
