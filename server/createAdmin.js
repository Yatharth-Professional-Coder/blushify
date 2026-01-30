require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/blushify');

        const adminEmail = 'myat305055@gmail.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('Admin already exists. Updating role and resetting password...');
            existingAdmin.role = 'admin';
            const salt = await bcrypt.genSalt(10);
            existingAdmin.password = await bcrypt.hash('admin123', salt);
            await existingAdmin.save();
            console.log('Ensured user has admin role and password reset to: admin123');
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);

            const admin = new User({
                name: 'System Admin',
                email: adminEmail,
                password: hashedPassword,
                role: 'admin'
            });

            await admin.save();
            console.log('Admin created successfully');
            console.log(`Email: ${adminEmail}`);
            console.log('Password: admin123');
        }

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createAdmin();
