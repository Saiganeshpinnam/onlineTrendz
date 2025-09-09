import React from 'react';
import './index.css';

const baseProducts = [
  { name: 'Apple', category: 'fruits', price: 1.5 },
  { name: 'Banana', category: 'fruits', price: 1.0 },
  { name: 'Carrot', category: 'vegetables', price: 0.75 },
  { name: 'Tomato', category: 'vegetables', price: 1.2 },
  { name: 'Shirt', category: 'clothes', price: 15.0 },
  { name: 'Jeans', category: 'clothes', price: 25.0 },
  { name: 'Toy Car', category: 'toys', price: 10.0 },
  { name: 'Teddy Bear', category: 'toys', price: 12.0 },
  { name: 'Orange Juice', category: 'beverages', price: 2.5 },
  { name: 'Lemonade', category: 'beverages', price: 2.0 },
];

// Generate 150 products by repeating baseProducts with unique ids
const products = [];
for (let i = 0; i < 15; i++) {
  baseProducts.forEach((prod, idx) => {
    products.push({
      id: i * baseProducts.length + idx + 1,
      name: `${prod.name} ${i + 1}`,
      category: prod.category,
      price: (prod.price + Math.random() * 5).toFixed(2), // vary price slightly
    });
  });
}

const ProductList = ({ onAdd }) => {
  return (
    <div className="product-grid">
      {products.map(({ id, name, category, price }) => {
        // Use Unsplash source API to get image by category
        const imageUrl = `https://source.unsplash.com/featured/150x150/?${encodeURIComponent(category)}`;

        return (
          <div key={id} className="product-card">
            <img
              src={imageUrl}
              alt={name}
              className="product-img"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150?text=No+Image';
              }}
            />
            <div className="product-info">
              <h3 className="product-name">{name}</h3>
              <div className="product-category">{category}</div>
              <div className="product-price">₹{price}</div>
            </div>
            <button className="add-to-cart-btn" onClick={() => onAdd({ id, name, price, category })}>
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
