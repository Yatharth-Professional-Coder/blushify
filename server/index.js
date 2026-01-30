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

// Serve static assets in production
const clientDistPath = path.join(__dirname, '../client/dist');
if (!require('fs').existsSync(clientDistPath)) {
    console.warn(`WARNING: Client dist path not found at ${clientDistPath}`);
}
app.use(express.static(clientDistPath));

app.get('/api', (req, res) => {
    res.send('Blushify API is running');
});

// SPA fallback - point all other routes to index.html
app.get('/{*path}', (req, res) => {
    if (!req.path.startsWith('/api')) {
        const indexPath = path.join(clientDistPath, 'index.html');
        if (require('fs').existsSync(indexPath)) {
            res.sendFile(indexPath);
        } else {
            res.status(404).send('Frontend build not found. Please ensure the client is built.');
        }
    }
});

// Start Server - only if not imported
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
