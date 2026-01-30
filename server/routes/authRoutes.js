const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' }
        );
        res.json({ token, userId: user._id, name: user.name, role: user.role });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' }
        );
        res.json({ token, userId: user._id, name: user.name, role: user.role });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PROMOTE ME (Safe way to get admin access on Vercel)
router.post('/promote-me', async (req, res) => {
    try {
        const { email, secret } = req.body;
        const promotionSecret = process.env.ADMIN_PROMOTION_SECRET || 'blushify_admin_2024';

        if (!secret || secret !== promotionSecret) {
            return res.status(401).json({ message: 'Invalid promotion secret' });
        }

        const user = await User.findOneAndUpdate(
            { email },
            { role: 'admin' },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found. Please register first.' });
        }

        console.log(`User ${email} promoted to admin via secret.`);
        res.json({ message: `Success! ${email} is now an Admin.`, user: { name: user.name, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
