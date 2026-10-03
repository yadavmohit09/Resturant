const fs = require('fs');
const path = require('path');

const menuItemsPath = path.join(__dirname, '../data/menuItems.json');
const categoriesPath = path.join(__dirname, '../data/categories.json');

exports.getMenuItems = async (req, res, next) => {
  try {
    const items = JSON.parse(fs.readFileSync(menuItemsPath, 'utf-8'));
    // Add fake IDs to items if they don't have one
    const processedItems = items.map((item, index) => ({
      ...item,
      _id: item._id || (index + 1).toString()
    }));
    
    res.status(200).json({
      success: true,
      count: processedItems.length,
      data: processedItems
    });
  } catch (err) {
    next(err);
  }
};

exports.getMenuItem = async (req, res, next) => {
  try {
    const items = JSON.parse(fs.readFileSync(menuItemsPath, 'utf-8'));
    // Use index+1 as ID for demo
    const item = items.find((i, idx) => (i._id || (idx+1).toString()) === req.params.id);
    
    if (!item) {
      return res.status(404).json({ success: false, error: 'Menu item not found' });
    }
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

exports.createMenuItem = async (req, res, next) => {
  try {
    const items = JSON.parse(fs.readFileSync(menuItemsPath, 'utf-8'));
    const newItem = { _id: Date.now().toString(), ...req.body };
    items.push(newItem);
    fs.writeFileSync(menuItemsPath, JSON.stringify(items, null, 2));
    
    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    next(err);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'));
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (err) {
    next(err);
  }
};
