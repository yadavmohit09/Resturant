const fs = require('fs');

const baseImages = {
  thali: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  curry: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80',
  dosa: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80',
  snack: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=600&q=80',
  rice: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
  dal: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
  dessert: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80'
};

const dishNames = [
  "Paneer Tikka", "Chole Bhature", "Masala Dosa", "Idli Sambar", "Pav Bhaji",
  "Dhokla", "Litti Chokha", "Veg Hyderabadi Biryani", "Dal Makhani", "Butter Naan",
  "Fresh Green Salad", "Gulab Jamun", "Rasgulla", "Mysore Pak", "Aloo Paratha",
  "Samosa", "Kachori", "Bhel Puri", "Pani Puri", "Aloo Tikki",
  "Papdi Chaat", "Dahi Vada", "Paneer Pakora", "Veg Cutlet", "Gobi Manchurian",
  "Spring Roll", "Chilli Paneer", "Paneer Butter Masala", "Kadai Paneer", "Shahi Paneer",
  "Mutter Paneer", "Palak Paneer", "Malai Kofta", "Navratan Korma", "Dum Aloo",
  "Aloo Gobi", "Bhindi Masala", "Baingan Bharta", "Chana Masala", "Rajma Masala",
  "Dal Tadka", "Tandoori Roti", "Garlic Naan", "Lachha Paratha", "Paneer Paratha",
  "Puri", "Bhatura", "Missi Roti", "Rumali Roti", "Steamed Rice",
  "Jeera Rice", "Veg Pulao"
];

const items = dishNames.map((name, idx) => {
  let img = baseImages.curry;
  if (name.toLowerCase().includes('dosa') || name.toLowerCase().includes('idli')) img = baseImages.dosa;
  else if (name.toLowerCase().includes('biryani') || name.toLowerCase().includes('rice') || name.toLowerCase().includes('pulao') || name.toLowerCase().includes('roti') || name.toLowerCase().includes('naan') || name.toLowerCase().includes('paratha')) img = baseImages.rice;
  else if (name.toLowerCase().includes('dal') || name.toLowerCase().includes('rajma') || name.toLowerCase().includes('chana')) img = baseImages.dal;
  else if (name.toLowerCase().includes('salad')) img = baseImages.salad;
  else if (name.toLowerCase().includes('jamun') || name.toLowerCase().includes('rasgulla') || name.toLowerCase().includes('pak')) img = baseImages.dessert;
  else if (name.toLowerCase().includes('samosa') || name.toLowerCase().includes('kachori') || name.toLowerCase().includes('puri') || name.toLowerCase().includes('chaat') || name.toLowerCase().includes('dhokla')) img = baseImages.snack;
  
  return {
    _id: (idx + 1).toString(),
    name: name,
    description: "Authentic and delicious " + name + " prepared with traditional Indian spices.",
    price: Math.floor(Math.random() * (400 - 149 + 1) + 149) + 0.0,
    image: img,
    isPopular: Math.random() > 0.5,
    rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1)
  };
});

// Update app.js
let appJs = fs.readFileSync('../client/js/app.js', 'utf8');
const startIndex = appJs.indexOf('getMockMenuData() {');
const endIndex = appJs.indexOf('  }\n}', startIndex);
if (startIndex !== -1 && endIndex !== -1) {
  const newFunction = `getMockMenuData() {\n    return ${JSON.stringify(items, null, 6)};\n`;
  appJs = appJs.slice(0, startIndex) + newFunction + appJs.slice(endIndex);
  fs.writeFileSync('../client/js/app.js', appJs);
}

// Update menuItems.json
const dbItems = items.map(item => ({
  name: item.name,
  description: item.description,
  price: item.price,
  image: item.image,
  category: "640000000000000000000001",
  isAvailable: true,
  isPopular: item.isPopular,
  rating: parseFloat(item.rating)
}));
fs.writeFileSync('data/menuItems.json', JSON.stringify(dbItems, null, 2));

console.log('Successfully generated 52 items!');
