const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User'); // Optional: Seed a default user if needed

mongoose.connect('mongodb://localhost:27017/blushify')
    .then(() => console.log('MongoDB connected for seeding'))
    .catch(err => console.log(err));

const products = [
    // Daily Deals (First 4 items)
    {
        title: "Luminous Silk Foundation",
        price: 65.00,
        salePrice: 52.00,
        description: "Capture the glow of perfect skin with this luminous, award-winning foundation.",
        category: "Face",
        images: ["https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=500&h=500&fit=crop"],
        inStock: true,
        isDailyDeal: true
    },
    {
        title: "Advanced Night Repair Serum",
        price: 89.00,
        salePrice: 75.00,
        description: "Wake up to beautiful skin every day with our #1 serum. Fights key signs of aging.",
        category: "Skin Care",
        images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=500&fit=crop"],
        inStock: true,
        isDailyDeal: true
    },
    {
        title: "Matte Revolution Lipstick",
        price: 34.00,
        salePrice: 28.00,
        description: "The matte lipstick of the future! Enriched with orchid extracts for hydration.",
        category: "Lips",
        images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&h=500&fit=crop"],
        inStock: true,
        isDailyDeal: true
    },
    {
        title: "Volumizing Mascara",
        price: 28.00,
        salePrice: 22.00,
        description: "Instant lift, volume and length for your lashes. Clump-free formula.",
        category: "Eyes",
        images: ["https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=500&h=500&fit=crop"],
        inStock: true,
        isDailyDeal: true
    },
    // Other Products
    {
        title: "Blushify Bridal Glow Combo",
        price: 49.99,
        salePrice: 39.99,
        description: "The perfect combo for your special day. Includes blush, highlighter, and setting spray.",
        category: "Bridal Bundle",
        images: ["https://swissbeauty.in/cdn/shop/files/bridal_section_Thumbnail_1_1080x.jpg?v=1736341692"],
        inStock: true
    },
    {
        title: "Velvet Matte Lipstick - Red",
        price: 15.00,
        description: "Long-lasting matte lipstick with a velvet finish.",
        category: "Lips",
        images: ["https://swissbeauty.in/cdn/shop/files/3_1-LIPS_140x140.png?v=1747133814"],
        inStock: true
    },
    {
        title: "Hydrating Face Serum",
        price: 25.00,
        salePrice: 20.00,
        description: "Deeply hydrating serum with hyaluronic acid.",
        category: "Skin Care",
        images: ["https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500&h=500&fit=crop"],
        inStock: true
    },
    {
        title: "Daily Moisturizer",
        price: 22.00,
        description: "Lightweight moisturizer for daily use.",
        category: "Skin Care",
        images: ["https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=500&h=500&fit=crop"],
        inStock: true
    },
    {
        title: "Waterproof Gel Eyeliner",
        price: 20.00,
        description: "Precision gel eyeliner that stays put all day and night.",
        category: "Eyes",
        images: ["https://images.unsplash.com/photo-1625902830302-3f820c7419e8?w=500&h=500&fit=crop"],
        inStock: true
    },
    {
        title: "Vitamin C Brightening Mask",
        price: 35.00,
        salePrice: 29.00,
        description: "Revitalize your skin with our Vitamin C packed brightening mask.",
        category: "Skin Care",
        images: ["https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&h=500&fit=crop"],
        inStock: true
    },
    {
        title: "Liquid Gold Highlighter",
        price: 42.00,
        description: "Ultimate radiance in a bottle. Shimmer like a star.",
        category: "Face",
        images: ["https://images.unsplash.com/photo-1557204562-672522778eee?w=500&h=500&fit=crop"],
        inStock: true
    },
    {
        title: "Stay-All-Day Lip Liner",
        price: 18.00,
        description: "Define your lips with our creamy, smudge-proof liner.",
        category: "Lips",
        images: ["https://images.unsplash.com/photo-1616683693504-3ee7e14e644b?w=500&h=500&fit=crop"],
        inStock: true
    },
    {
        title: "Ultimate Bridal Palette",
        price: 75.00,
        salePrice: 60.00,
        description: "Every shade you need for a stunning bridal look in one luxury palette.",
        category: "Bridal Bundle",
        images: ["https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&h=500&fit=crop"],
        inStock: true
    },
    {
        title: "Rose Water Soothing Toner",
        price: 24.00,
        description: "Natural rose water to calm and refresh your complexion.",
        category: "Skin Care",
        images: ["https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500&h=500&fit=crop"],
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
