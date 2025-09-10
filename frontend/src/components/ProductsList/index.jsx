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
  // ✅ Add as many products as you like here
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
            <div className="product-price">₹{price}</div>
          </div>
          <button className="add-to-cart-btn" onClick={() => onAdd({ id, name, price, category })}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
