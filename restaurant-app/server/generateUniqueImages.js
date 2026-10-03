const fs = require('fs');

const dishNames = [
  'Paneer Tikka', 'Chole Bhature', 'Masala Dosa', 'Idli Sambar', 'Pav Bhaji',
  'Dhokla', 'Litti Chokha', 'Veg Hyderabadi Biryani', 'Dal Makhani', 'Butter Naan',
  'Fresh Green Salad', 'Gulab Jamun', 'Rasgulla', 'Mysore Pak', 'Aloo Paratha',
  'Samosa', 'Kachori', 'Bhel Puri', 'Pani Puri', 'Aloo Tikki',
  'Papdi Chaat', 'Dahi Vada', 'Paneer Pakora', 'Veg Cutlet', 'Gobi Manchurian',
  'Spring Roll', 'Chilli Paneer', 'Paneer Butter Masala', 'Kadai Paneer', 'Shahi Paneer',
  'Mutter Paneer', 'Palak Paneer', 'Malai Kofta', 'Navratan Korma', 'Dum Aloo',
  'Aloo Gobi', 'Bhindi Masala', 'Baingan Bharta', 'Chana Masala', 'Rajma Masala',
  'Dal Tadka', 'Tandoori Roti', 'Garlic Naan', 'Lachha Paratha', 'Paneer Paratha',
  'Puri', 'Bhatura', 'Missi Roti', 'Rumali Roti', 'Steamed Rice',
  'Jeera Rice', 'Veg Pulao'
];

let counts = { samosa: 1, dosa: 1, idly: 1, biryani: 1, dessert: 1, rice: 1 };

const items = dishNames.map((name, idx) => {
  let img = '';
  const n = name.toLowerCase();
  
  if (n.includes('dosa')) { img = 'https://foodish-api.com/images/dosa/dosa' + (counts.dosa++) + '.jpg'; }
  else if (n.includes('idli') || n.includes('vada')) { img = 'https://foodish-api.com/images/idly/idly' + (counts.idly++) + '.jpg'; }
  else if (n.includes('biryani') || n.includes('pulao')) { img = 'https://foodish-api.com/images/biryani/biryani' + (counts.biryani++) + '.jpg'; }
  else if (n.includes('rice')) { img = 'https://foodish-api.com/images/rice/rice' + (counts.rice++) + '.jpg'; }
  else if (n.includes('samosa') || n.includes('kachori') || n.includes('puri') || n.includes('chaat') || n.includes('tikki') || n.includes('dhokla')) { img = 'https://foodish-api.com/images/samosa/samosa' + (counts.samosa++) + '.jpg'; }
  else if (n.includes('jamun') || n.includes('rasgulla') || n.includes('pak') || n.includes('halwa')) { img = 'https://foodish-api.com/images/dessert/dessert' + (counts.dessert++) + '.jpg'; }
  else {
    const cat = ['biryani', 'dosa', 'idly', 'rice'][idx % 4];
    img = 'https://foodish-api.com/images/' + cat + '/' + cat + (counts[cat]++) + '.jpg';
  }
  
  return {
    _id: (idx + 1).toString(),
    name: name,
    description: 'Authentic and delicious ' + name + ' prepared with traditional Indian spices.',
    price: Math.floor(Math.random() * (400 - 149 + 1) + 149) + 0.0,
    image: img,
    isPopular: Math.random() > 0.5,
    rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1)
  };
});

let appJs = fs.readFileSync('../client/js/app.js', 'utf8');
const startIndex = appJs.indexOf('getMockMenuData() {');
const endIndex = appJs.indexOf('  }\n}', startIndex);
if (startIndex !== -1 && endIndex !== -1) {
  const newFunction = 'getMockMenuData() {\n    return ' + JSON.stringify(items, null, 6) + ';\n';
  appJs = appJs.slice(0, startIndex) + newFunction + appJs.slice(endIndex);
  fs.writeFileSync('../client/js/app.js', appJs);
}

const dbItems = items.map(item => ({
  name: item.name,
  description: item.description,
  price: item.price,
  image: item.image,
  category: '640000000000000000000001',
  isAvailable: true,
  isPopular: item.isPopular,
  rating: parseFloat(item.rating)
}));
fs.writeFileSync('data/menuItems.json', JSON.stringify(dbItems, null, 2));
console.log('Fixed images with unique photos!');
