const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User'); // Optional: Seed a default user if needed

mongoose.connect('mongodb://localhost:27017/blushify')
    .then(() => console.log('MongoDB connected for seeding'))
    .catch(err => console.log(err));

const products = [
    {
        title: "Blushify Bridal Glow Combo",
        price: 49.99,
        salePrice: 39.99,
        description: "The perfect combo for your special day. Includes blush, highlighter, and setting spray.",
        category: "Bridal Bundle",
        images: ["https://blushify.infinityfree.me/wp-content/uploads/2023/07/product-1.jpg"],
        inStock: true
    },
    {
        title: "Velvet Matte Lipstick - Red",
        price: 15.00,
        description: "Long-lasting matte lipstick with a velvet finish.",
        category: "Lips",
        images: ["https://blushify.infinityfree.me/wp-content/uploads/2023/07/product-2.jpg"],
        inStock: true
    },
    {
        title: "Hydrating Face Serum",
        price: 25.00,
        salePrice: 20.00,
        description: "Deeply hydrating serum with hyaluronic acid.",
        category: "Skin Care",
        images: ["https://blushify.infinityfree.me/wp-content/uploads/2023/07/product-3.jpg"],
        inStock: true
    },
    {
        title: "Liquid Foundation",
        price: 30.00,
        description: "Full coverage liquid foundation available in multiple shades.",
        category: "Face",
        images: ["https://blushify.infinityfree.me/wp-content/uploads/2023/07/product-4.jpg"],
        inStock: true
    },
    {
        title: "Volumizing Mascara",
        price: 18.00,
        description: "Get dramatic lashes with our volumizing mascara.",
        category: "Eyes",
        images: ["https://blushify.infinityfree.me/wp-content/uploads/2023/07/product-5.jpg"],
        inStock: true
    },
    {
        title: "Daily Moisturizer",
        price: 22.00,
        description: "Lightweight moisturizer for daily use.",
        category: "Skin Care",
        images: ["https://blushify.infinityfree.me/wp-content/uploads/2023/07/product-6.jpg"],
        inStock: true
    }
];

const seedDB = async () => {
    try {
        await Product.deleteMany({});
        console.log('Products cleared');

        await Product.insertMany(products);
        console.log('Products seeded');

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        mongoose.connection.close();
    }
};

seedDB();
