require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Admin credentials
    const adminData = {
      username: 'admin',
      password: 'admin123'
    };

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ username: adminData.username });

    if (existingAdmin) {
      // Update existing admin's password
      existingAdmin.password = adminData.password;
      await existingAdmin.save();
      console.log('Admin password updated successfully');
    } else {
      // Create new admin
      await Admin.create(adminData);
      console.log('Admin created successfully');
    }

    console.log('Admin credentials:');
    console.log('Username:', adminData.username);
    console.log('Password:', adminData.password);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

createAdmin(); 