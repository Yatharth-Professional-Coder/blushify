require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const setupAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/blushify');

        const email = 'admin@blushify.com';
        const password = 'admin123';

        let user = await User.findOne({ email });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (user) {
            user.role = 'admin';
            user.password = hashedPassword;
            user.name = 'Blushify Admin';
            await user.save();
            console.log('Existing user updated to Admin.');
        } else {
            user = new User({
                name: 'Blushify Admin',
                email,
                password: hashedPassword,
                role: 'admin'
            });
            await user.save();
            console.log('New Admin user created.');
        }

        console.log(`\nAdmin Credentials Created:`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        mongoose.connection.close();
    }
};

setupAdmin();
