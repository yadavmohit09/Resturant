const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('./models/MenuItem');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('MongoDB Connected...');
  
  await MenuItem.deleteMany();
  console.log('Old menu items destroyed...');
  
  const vegItems = [
    {
      name: "Paneer Tikka",
      description: "Cottage cheese marinated in spices and grilled in a tandoor.",
      price: 249.00,
      image: "https://images.unsplash.com/photo-1599487405712-3150bbe3e8ed?auto=format&fit=crop&w=600&q=80",
      category: new mongoose.Types.ObjectId(),
      isAvailable: true,
      isPopular: true,
      rating: 4.8
    },
    {
      name: "Veg Kadai",
      description: "Mixed vegetables cooked in a spicy tomato gravy with bell peppers.",
      price: 349.00,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
      category: new mongoose.Types.ObjectId(),
      isAvailable: true,
      isPopular: true,
      rating: 4.9
    },
    {
      name: "Veg Biryani",
      description: "Aromatic basmati rice cooked with mixed vegetables and Indian spices.",
      price: 349.00,
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
      category: new mongoose.Types.ObjectId(),
      isAvailable: true,
      isPopular: true,
      rating: 5.0
    },
    {
      name: "Tandoori Roti",
      description: "Traditional Indian flatbread baked in a clay oven.",
      price: 149.00,
      image: "https://images.unsplash.com/photo-1626200926724-42b781e9b2d3?auto=format&fit=crop&w=600&q=80",
      category: new mongoose.Types.ObjectId(),
      isAvailable: true,
      isPopular: false,
      rating: 4.9
    },
    {
      name: "Dal Tadka",
      description: "Yellow lentils tempered with cumin, garlic, and ghee.",
      price: 229.00,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
      category: new mongoose.Types.ObjectId(),
      isAvailable: true,
      isPopular: true,
      rating: 4.8
    },
    {
      name: "Fresh Green Salad",
      description: "Healthy mix of cucumbers, tomatoes, onions, and carrots with lemon dressing.",
      price: 199.00,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
      category: new mongoose.Types.ObjectId(),
      isAvailable: true,
      isPopular: false,
      rating: 4.7
    }
  ];
  
  await MenuItem.insertMany(vegItems);
  console.log('Vegetarian menu imported!');
  
  process.exit();
}).catch(err => {
  console.error(err);
  process.exit(1);
});
