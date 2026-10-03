const fs = require('fs');

const basePaneer = ['Butter Masala', 'Kadai', 'Palak', 'Tikka Masala', 'Makhani'];
const paneerDishes = basePaneer.map(b => 'Paneer ' + b);

const baseDal = ['Makhani', 'Tadka', 'Fry', 'Palak', 'Panchratna', 'Bukhara', 'Lahsuni', 'Dhaba Style', 'Jeera', 'Tomato', 'Gujarati', 'Maharashtrian', 'Hyderabadi', 'Kashmiri', 'Amritsari', 'Punjabi', 'Sindhi', 'Pahari', 'Khatti', 'Meethi'];
const dalDishes = baseDal.map(b => 'Dal ' + b).concat(['Chana Masala', 'Rajma Masala', 'Lobia Masala', 'Kala Chana', 'Pindi Chole', 'Amritsari Chole']);

const baseDosa = ['Masala', 'Plain', 'Onion', 'Rava', 'Onion Rava', 'Mysore Masala', 'Paneer', 'Cheese', 'Cheese Burst', 'Ghee Roast', 'Paper', 'Family', 'Spring', 'Schezwan', 'Jini', 'Set', 'Neer', 'Pesarattu', 'Adai'];
const dosaDishes = baseDosa.map(b => b + ' Dosa').concat(['Idli Sambar', 'Mini Idli', 'Rava Idli', 'Thatte Idli', 'Kanchipuram Idli', 'Fried Idli', 'Chilli Idli', 'Medu Vada', 'Dal Vada', 'Rasa Vada', 'Curd Vada', 'Plain Uttapam', 'Onion Uttapam', 'Tomato Uttapam', 'Mixed Veg Uttapam', 'Upma', 'Ven Pongal']);

const baseRice = ['Veg Biryani', 'Paneer Biryani', 'Mushroom Biryani', 'Hyderabadi Biryani', 'Lucknowi Biryani', 'Kolkata Veg Biryani', 'Sindhi Biryani', 'Awadhi Biryani', 'Jeera Rice', 'Steamed Rice', 'Ghee Rice', 'Lemon Rice', 'Tomato Rice', 'Curd Rice', 'Tamarind Rice', 'Coconut Rice', 'Mango Rice', 'Bisi Bele Bath', 'Vangi Bath', 'Pudina Rice', 'Coriander Rice', 'Schezwan Fried Rice', 'Veg Fried Rice', 'Paneer Fried Rice', 'Mushroom Fried Rice', 'Veg Pulao', 'Kashmiri Pulao', 'Navratan Pulao', 'Mutter Pulao', 'Tawa Pulao'];

const baseSnacks = ['Punjabi Samosa', 'Mini Samosa', 'Cheese Samosa', 'Paneer Samosa', 'Chinese Samosa', 'Onion Kachori', 'Dal Kachori', 'Moong Dal Kachori', 'Raj Kachori', 'Aloo Tikki', 'Aloo Tikki Chaat', 'Bhel Puri', 'Pani Puri', 'Sev Puri', 'Dahi Puri', 'Papdi Chaat', 'Dahi Vada', 'Dahi Bhalla', 'Aloo Chaat', 'Samosa Chaat', 'Kachori Chaat', 'Basket Chaat', 'Palak Patta Chaat', 'Shakarkandi Chaat', 'Chana Chaat', 'Matar Chaat', 'Ragda Pattice', 'Khandvi', 'Dhokla', 'Nylon Khaman', 'Fafda', 'Jalebi', 'Vada Pav', 'Misal Pav', 'Pav Bhaji', 'Cheese Pav Bhaji', 'Paneer Pav Bhaji', 'Dabeli', 'Mirchi Vada', 'Kothimbir Vadi'];

const baseBreads = ['Plain Naan', 'Butter Naan', 'Garlic Naan', 'Cheese Naan', 'Chilli Garlic Naan', 'Paneer Naan', 'Kashmiri Naan', 'Tandoori Roti', 'Butter Roti', 'Missi Roti', 'Rumali Roti', 'Khasta Roti', 'Lachha Paratha', 'Pudina Paratha', 'Methi Paratha', 'Aloo Paratha', 'Gobi Paratha', 'Mooli Paratha', 'Paneer Paratha', 'Mixed Veg Paratha', 'Onion Paratha', 'Puri', 'Bhatura', 'Amritsari Kulcha', 'Onion Kulcha', 'Paneer Kulcha', 'Aloo Kulcha', 'Bhakri', 'Thepla', 'Puran Poli'];

const baseDesserts = ['Gulab Jamun', 'Kala Jamun', 'Rasgulla', 'Rajbhog', 'Rasmalai', 'Cham Cham', 'Kaju Katli', 'Badam Katli', 'Pista Barfi', 'Besan Barfi', 'Coconut Barfi', 'Milk Cake', 'Kalakand', 'Doda Barfi', 'Moong Dal Halwa', 'Gajar Halwa', 'Sooji Halwa', 'Badam Halwa', 'Atte Ka Halwa', 'Kheer', 'Phirni', 'Rabri', 'Basundi', 'Shrikhand', 'Amrakhand', 'Jalebi', 'Imarti', 'Malpua', 'Ghevar', 'Mysore Pak', 'Sandesh', 'Mishti Doi', 'Peda', 'Mathura Peda', 'Dharwad Peda', 'Modak'];

const baseVeg = ['Mix Veg', 'Veg Jalfrezi', 'Veg Kadai', 'Veg Kolhapuri', 'Veg Makhanwala', 'Veg Handi', 'Veg Diwani Handi', 'Veg Maratha', 'Veg Kofta', 'Malai Kofta', 'Shaam Savera', 'Aloo Gobi', 'Aloo Jeera', 'Aloo Mutter', 'Dum Aloo', 'Kashmiri Dum Aloo', 'Bhindi Masala', 'Bhindi Fry', 'Kurkuri Bhindi', 'Baingan Bharta', 'Bagara Baingan', 'Gobi Manchurian', 'Veg Manchurian', 'Mushroom Masala', 'Mushroom Mutter', 'Mushroom Kadai', 'Navratan Korma'];

let allDishes = [...paneerDishes, ...dalDishes, ...dosaDishes, ...baseRice, ...baseSnacks, ...baseBreads, ...baseDesserts, ...baseVeg];
allDishes = allDishes.slice(0, 252); // Ensure we have a large number around 250.

let counts = { samosa: 1, dosa: 1, idly: 1, biryani: 1, dessert: 1, rice: 1 };

const items = allDishes.map((name, idx) => {
  let img = '';
  const n = name.toLowerCase();
  
  if (n.includes('dosa') || n.includes('uttapam') || n.includes('adai') || n.includes('pesarattu')) { 
    img = 'https://foodish-api.com/images/dosa/dosa' + (counts.dosa % 83 + 1) + '.jpg'; counts.dosa++; 
  }
  else if (n.includes('idli') || n.includes('vada')) { 
    img = 'https://foodish-api.com/images/idly/idly' + (counts.idly % 76 + 1) + '.jpg'; counts.idly++; 
  }
  else if (n.includes('biryani') || n.includes('pulao') || n.includes('bath') || n.includes('roti') || n.includes('naan') || n.includes('paratha') || n.includes('kulcha')) { 
    img = 'https://foodish-api.com/images/biryani/biryani' + (counts.biryani % 80 + 1) + '.jpg'; counts.biryani++; 
  }
  else if (n.includes('rice') || n.includes('pongal')) { 
    img = 'https://foodish-api.com/images/rice/rice' + (counts.rice % 35 + 1) + '.jpg'; counts.rice++; 
  }
  else if (n.includes('samosa') || n.includes('kachori') || n.includes('puri') || n.includes('chaat') || n.includes('tikki') || n.includes('dhokla') || n.includes('pav') || n.includes('khaman') || n.includes('vadi')) { 
    img = 'https://foodish-api.com/images/samosa/samosa' + (counts.samosa % 22 + 1) + '.jpg'; counts.samosa++; 
  }
  else if (n.includes('jamun') || n.includes('rasgulla') || n.includes('pak') || n.includes('halwa') || n.includes('barfi') || n.includes('katli') || n.includes('kheer') || n.includes('phirni') || n.includes('rabri') || n.includes('malpua') || n.includes('shrikhand') || n.includes('sandesh') || n.includes('peda') || n.includes('modak') || n.includes('jalebi') || n.includes('imarti') || n.includes('cake')) { 
    img = 'https://foodish-api.com/images/dessert/dessert' + (counts.dessert % 36 + 1) + '.jpg'; counts.dessert++; 
  }
  else {
    const cats = ['biryani', 'dosa', 'idly', 'rice'];
    const cat = cats[idx % 4];
    const max = cat === 'biryani' ? 80 : cat === 'dosa' ? 83 : cat === 'idly' ? 76 : 35;
    img = 'https://foodish-api.com/images/' + cat + '/' + cat + (counts[cat] % max + 1) + '.jpg';
    counts[cat]++;
  }
  
  return {
    _id: (idx + 1).toString(),
    name: name,
    description: 'Authentic 100% pure veg ' + name + ' prepared fresh in our hygienic kitchens.',
    price: Math.floor(Math.random() * (450 - 100 + 1) + 100) + 0.0,
    image: img,
    isPopular: Math.random() > 0.8, // Only ~20% are marked popular
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

console.log('Successfully generated ' + items.length + ' dishes!');
