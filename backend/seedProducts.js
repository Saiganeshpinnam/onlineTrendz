const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const dummyProducts = [
  {
    id: 1,
    name: 'Apple',
    category: 'Fruits',
    price: 1.5,
    imageUrl: 'https://i.pinimg.com/736x/f2/e6/06/f2e606f25bb5f8d4e0ad18d9afdd70fd.jpg',
  },
  {
    id: 2,
    name: 'Shirt',
    category: 'clothes',
    price: 15.0,
    imageUrl: 'https://i.pinimg.com/736x/bd/ea/1b/bdea1b40012fa4ccb77e10ca39944966.jpg',
  },
  {
    id: 3,
    name: 'Teddy Bear',
    category: 'toys',
    price: 12.0,
    imageUrl: 'https://i.pinimg.com/736x/93/b2/07/93b2076863f994b68d5bd268314b8887.jpg',
  },
  {
    id: 4,
    name: 'Beans',
    category: 'vegetables',
    price: 12.0,
    imageUrl: 'https://i.pinimg.com/736x/31/47/15/31471519885b0481e2eb627063b959f7.jpg',
  },
  {
    id: 5,
    name: 'Freak Shake',
    category: 'beverages',
    price: 12.0,
    imageUrl: 'https://i.pinimg.com/736x/58/f3/8d/58f38d94b629b6627cffb1ecf8993811.jpg',
  },
  {
    id: 6,
    name: 'chair',
    category: 'Home Needy',
    price: 12.0,
    imageUrl: 'https://i.pinimg.com/736x/db/51/95/db519529496b547c93d1ad8b230559b0.jpg',
  },
  {
    id: 7,
    name: 'Headphones',
    category: 'Electronics',
    price: 12.0,
    imageUrl: 'https://i.pinimg.com/736x/16/a1/2d/16a12dc16c0e955dcc737d0d894e6669.jpg',
  },
  {
    id: 8,
    name: 'earrings',
    category: 'Jewelry',
    price: 12.0,
    imageUrl: 'https://i.pinimg.com/736x/34/8f/ed/348fedbafdd6d82f5d48ec8557b96e36.jpg',
  },
  {
    id: 9,
    name: 'lipstick',
    category: 'Makeup',
    price: 12.0,
    imageUrl: 'https://i.pinimg.com/736x/ef/57/52/ef57526898535dc1b1e753d2d573f72e.jpg',
  },
  {
    id: 10,
    name: 'lunch-box',
    category: 'Kitchen',
    price: 12.0,
    imageUrl: 'https://i.pinimg.com/1200x/c6/d8/3c/c6d83c72090f1361bd8662e321ce518e.jpg',
  },
  {
    id: 11,
    name: 'Butter',
    category: 'Groceries',
    price: 12.0,
    imageUrl: 'https://i.pinimg.com/1200x/b4/23/2f/b4232f3271836e8ccf024296e16df204.jpg',
  },
  {
    id: 12,
    name: 'Marbles',
    category: 'Home Needy',
    price: 150.0,
    imageUrl: 'https://res.cloudinary.com/dgv10egbw/image/upload/v1757522659/61c05395d302acb922b4d64a72d259fc_lxgu8h.jpg',
  },
  {
    id: 13,
    name: 'Lamp',
    category: 'Home Needy',
    price: 450.0,
    imageUrl: 'https://res.cloudinary.com/dgv10egbw/image/upload/v1757522744/99c88410917786bedad8feeb49959045_c2dl8l.jpg',
  },
  {
    id: 14,
    name: 'Banana',
    category: 'Fruits',
    price: 80.0,
    imageUrl: 'https://res.cloudinary.com/dgv10egbw/image/upload/v1757685192/67ff0431ed4ecbf10ebed90c15eb6d0a_d3j812.jpg',
  },
  {
    id: 16,
    name: 'Grapes',
    category: 'Fruits',
    price: 50.0,
    imageUrl: 'https://res.cloudinary.com/dgv10egbw/image/upload/v1757685747/58ed80726566c2d9a8044c98f83f7e04_yl7ub6.jpg',
  },
  {
    id: 17,
    name: 'Strawberries',
    category: 'Fruits',
    price: 63.0,
    imageUrl: 'https://res.cloudinary.com/dgv10egbw/image/upload/v1757685900/f18690a3d6879716620d008792085e9b_cknk6j.jpg',
  },
  {
    id: 18,
    name: 'Strawberries',
    category: 'Fruits',
    price: 63.0,
    imageUrl: 'https://res.cloudinary.com/dgv10egbw/image/upload/v1757685900/f18690a3d6879716620d008792085e9b_cknk6j.jpg',
  },
];


const seedDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/onlineTrendz');
        console.log('Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Insert dummy products
        await Product.insertMany(dummyProducts);
        console.log('Added dummy products');

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
