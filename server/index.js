require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Database connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/blushify')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

app.get('/api', (req, res) => {
    res.send('Blushify API is running');
});

// Start Server - only if not imported
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
