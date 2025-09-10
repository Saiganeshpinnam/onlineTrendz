import React from 'react';
import './index.css';

const products = [
  {
    id: 1,
    name: 'Apple',
    category: 'fruits',
    price: 1.5,
    imageUrl: 'https://i.pinimg.com/736x/f2/e6/06/f2e606f25bb5f8d4e0ad18d9afdd70fd.jpg', // example
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
    imageUrl: 'https://i.pinimg.com/736x/db/51/95/db519529496b547c93d1ad8b230559b0.jpg'
  },
  {
    id: 7,
    name: 'Headphones',
    category: 'Electronics',
    price: 12.0,
    imageUrl: 'https://i.pinimg.com/736x/16/a1/2d/16a12dc16c0e955dcc737d0d894e6669.jpg'
  },
  {
    id: 8,
    name: 'earrings',
    category: 'Jewelry',
    price: 12.0,
    imageUrl: 'https://i.pinimg.com/736x/34/8f/ed/348fedbafdd6d82f5d48ec8557b96e36.jpg'
  },
  {
    id: 9,
    name: 'lipstick',
    category: 'Makeup',
    price: 12.0,
    imageUrl: 'https://i.pinimg.com/736x/ef/57/52/ef57526898535dc1b1e753d2d573f72e.jpg'
  },
  {
    id: 10,
    name: 'lunch-box',
    category: 'Kitchen',
    price: 12.0,
    imageUrl: 'https://i.pinimg.com/1200x/c6/d8/3c/c6d83c72090f1361bd8662e321ce518e.jpg'
  },
  {
    id: 11,
    name: 'Butter',
    category: 'Groceries',
    price: 12.0,
    imageUrl: 'https://i.pinimg.com/1200x/b4/23/2f/b4232f3271836e8ccf024296e16df204.jpg'
  },
  {
    id: 12,
    name: 'Marbles',
    category: 'Home Needy',
    price: 'Rs.150',
    imageUrl: 'https://res.cloudinary.com/dgv10egbw/image/upload/v1757522659/61c05395d302acb922b4d64a72d259fc_lxgu8h.jpg'
  },
  {
    id: 13,
    name: 'Lamp',
    category: 'Home Needy',
    price: 'Rs.450',
    imageUrl: 'https://res.cloudinary.com/dgv10egbw/image/upload/v1757522744/99c88410917786bedad8feeb49959045_c2dl8l.jpg'
  },
];

const ProductList = ({ onAdd }) => {
  return (
    <div className="product-grid">
      {products.map(({ id, name, category, price, imageUrl }) => (
        <div key={id} className="product-card">
          <img
            src={imageUrl}
            alt={name}
            className="product-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/150?text=No+Image';
            }}
          />
          <div className="product-info">
            <h3 className="product-name">{name}</h3>
            <div className="product-category">{category}</div>
            <div className="product-price">₹ {price}/-</div>
          </div>
          <button
            className="add-to-cart-btn"
            onClick={() => onAdd({ id, name, price, category, image: imageUrl })}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};


export default ProductList;


// 1. Food & Beverages

// Fruits

// Vegetables

// Meat & Seafood

// Dairy & Eggs

// Bakery & Bread

// Snacks & Sweets

// Beverages (Juices, Soft Drinks, Water)

// Frozen Foods

// Organic Foods

// Ready-to-Eat Meals

// Sauces & Condiments

// 2. Clothing & Accessories

// Men’s Clothing

// Women’s Clothing

// Kids’ Clothing

// Shoes

// Accessories (Bags, Belts, Jewelry)

// Sportswear

// Innerwear & Lingerie

// 3. Toys & Kids

// Toys & Games

// Educational Toys

// Baby Products

// Kids’ Apparel

// 4. Electronics & Gadgets

// Mobile Phones

// Computers & Accessories

// Audio & Headphones

// Cameras

// Wearables (Smartwatches)

// 5. Home & Living

// Furniture

// Home Decor

// Kitchen & Dining

// Bed & Bath

// Cleaning Supplies

// 6. Health & Beauty

// Personal Care

// Skincare & Cosmetics

// Hair Care

// Vitamins & Supplements

// Medical Supplies

// 7. Groceries

// Staples (Rice, Flour, Pulses)

// Cooking Oils & Spices

// Packaged Foods

// Breakfast Cereals

// Organic & Health Foods

// 8. Beverages

// Alcoholic Beverages (Beer, Wine, Spirits)

// Non-Alcoholic Beverages

// Coffee & Tea

// 9. Pet Supplies

// Pet Food

// Pet Toys & Accessories

// Grooming Products

// 10. Books & Stationery

// Books

// Office Supplies

// School Supplies