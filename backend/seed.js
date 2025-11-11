const mongoose = require('mongoose');
const Item = require('./models/Item');

const sampleProducts = [
  {
    name: 'Apple',
    description: 'Fresh red apple',
    price: 1.5,
    category: 'Fruits',
    stock: 100,
    imageUrl: 'https://i.pinimg.com/736x/f2/e6/06/f2e606f25bb5f8d4e0ad18d9afdd70fd.jpg'
  },
  {
    name: 'Shirt',
    description: 'Comfortable cotton shirt',
    price: 15.0,
    category: 'clothes',
    stock: 50,
    imageUrl: 'https://i.pinimg.com/736x/bd/ea/1b/bdea1b40012fa4ccb77e10ca39944966.jpg'
  },
  {
    name: 'Teddy Bear',
    description: 'Soft plush teddy bear',
    price: 12.0,
    category: 'toys',
    stock: 30,
    imageUrl: 'https://i.pinimg.com/736x/93/b2/07/93b2076863f994b68d5bd268314b8887.jpg'
  },
  {
    name: 'Beans',
    description: 'Fresh green beans',
    price: 12.0,
    category: 'vegetables',
    stock: 45,
    imageUrl: 'https://i.pinimg.com/736x/31/47/15/31471519885b0481e2eb627063b959f7.jpg'
  },
  {
    name: 'Freak Shake',
    description: 'Delicious milkshake',
    price: 12.0,
    category: 'beverages',
    stock: 20,
    imageUrl: 'https://i.pinimg.com/736x/58/f3/8d/58f38d94b629b6627cffb1ecf8993811.jpg'
  },
  {
    name: 'Chair',
    description: 'Comfortable chair',
    price: 12.0,
    category: 'Home Needy',
    stock: 15,
    imageUrl: 'https://i.pinimg.com/736x/db/51/95/db519529496b547c93d1ad8b230559b0.jpg'
  },
  {
    name: 'Headphones',
    description: 'High-quality headphones',
    price: 12.0,
    category: 'Electronics',
    stock: 25,
    imageUrl: 'https://i.pinimg.com/736x/16/a1/2d/16a12dc16c0e955dcc737d0d894e6669.jpg'
  },
  {
    name: 'Earrings',
    description: 'Beautiful earrings',
    price: 12.0,
    category: 'Jewelry',
    stock: 40,
    imageUrl: 'https://i.pinimg.com/736x/34/8f/ed/348fedbafdd6d82f5d48ec8557b96e36.jpg'
  },
  {
    name: 'Lipstick',
    description: 'Long-lasting lipstick',
    price: 12.0,
    category: 'Makeup',
    stock: 35,
    imageUrl: 'https://i.pinimg.com/736x/ef/57/52/ef57526898535dc1b1e753d2d573f72e.jpg'
  },
  {
    name: 'Lunch Box',
    description: 'Durable lunch box',
    price: 12.0,
    category: 'Kitchen',
    stock: 30,
    imageUrl: 'https://i.pinimg.com/1200x/c6/d8/3c/c6d83c72090f1361bd8662e321ce518e.jpg'
  },
  {
    name: 'Butter',
    description: 'Creamy butter',
    price: 12.0,
    category: 'Groceries',
    stock: 60,
    imageUrl: 'https://i.pinimg.com/1200x/b4/23/2f/b4232f3271836e8ccf024296e16df204.jpg'
  },
  {
    name: 'Marbles',
    description: 'Glass marbles set',
    price: 150.0,
    category: 'Home Needy',
    stock: 20,
    imageUrl: 'https://res.cloudinary.com/dgv10egbw/image/upload/v1757522659/61c05395d302acb922b4d64a72d259fc_lxgu8h.jpg'
  },
  {
    name: 'Lamp',
    description: 'Modern table lamp',
    price: 450.0,
    category: 'Home Needy',
    stock: 10,
    imageUrl: 'https://res.cloudinary.com/dgv10egbw/image/upload/v1757522744/99c88410917786bedad8feeb49959045_c2dl8l.jpg'
  },
  {
    name: 'Banana',
    description: 'Fresh bananas',
    price: 80.0,
    category: 'Fruits',
    stock: 90,
    imageUrl: 'https://res.cloudinary.com/dgv10egbw/image/upload/v1757685192/67ff0431ed4ecbf10ebed90c15eb6d0a_d3j812.jpg'
  },
  {
    name: 'Grapes',
    description: 'Sweet red grapes',
    price: 50.0,
    category: 'Fruits',
    stock: 40,
    imageUrl: 'https://res.cloudinary.com/dgv10egbw/image/upload/v1757685747/58ed80726566c2d9a8044c98f83f7e04_yl7ub6.jpg'
  },
  {
    name: 'Strawberries',
    description: 'Fresh strawberries',
    price: 63.0,
    category: 'Fruits',
    stock: 35,
    imageUrl: 'https://res.cloudinary.com/dgv10egbw/image/upload/v1757685900/f18690a3d6879716620d008792085e9b_cknk6j.jpg'
  }
];

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/onlineTrendz";

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    return Item.deleteMany({}); // Clear existing items
  })
  .then(() => Item.insertMany(sampleProducts))
  .then(() => {
    console.log('Database seeded successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error seeding database:', err);
    process.exit(1);
  });
