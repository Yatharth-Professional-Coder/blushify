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
    origin: (origin, callback) => {
        const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:5173';
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Allow the specific CLIENT_URL
        if (origin === allowedOrigin) return callback(null, true);

        // Allow Vercel preview deployments (any subdomain of vercel.app)
        // Adjust this regex if you want to be more restrictive, e.g., /blushify-.*\.vercel\.app$/
        if (origin.endsWith('.vercel.app')) return callback(null, true);

        // Allow localhost for development
        if (origin.includes('localhost')) return callback(null, true);

        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
    },
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

app.get('/api', (req, res) => {
    res.send('Blushify API is running');
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*path', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
