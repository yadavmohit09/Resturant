const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Load models
const Category = require('./models/Category');
const MenuItem = require('./models/MenuItem');
const User = require('./models/User');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Read JSON files
const categories = JSON.parse(fs.readFileSync(`${__dirname}/data/categories.json`, 'utf-8'));
const menuItems = JSON.parse(fs.readFileSync(`${__dirname}/data/menuItems.json`, 'utf-8'));

// Import into DB
const importData = async () => {
  try {
    await Category.create(categories);
    await MenuItem.create(menuItems);

    console.log('Data Imported...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Category.deleteMany();
    await MenuItem.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
