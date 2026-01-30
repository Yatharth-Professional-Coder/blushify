require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const checkUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/blushify');
        const email = 'myat305055@gmail.com';
        const user = await User.findOne({ email });

        if (user) {
            console.log(`User Found: ${user.email}`);
            console.log(`Role: ${user.role}`);
            if (user.role !== 'admin') {
                console.log('Promoting to admin now...');
                user.role = 'admin';
                await user.save();
                console.log('Promotion complete.');
            }
        } else {
            console.log(`User ${email} NOT FOUND in database.`);
        }

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkUser();
