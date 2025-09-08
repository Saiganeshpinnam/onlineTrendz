import React from 'react';
import './index.css';

// Sample product categories and dynamic image URLs
const productImages = {
  fruits: 'https://picsum.photos/seed/fruits/80/80',
  vegetables: 'https://picsum.photos/seed/vegetables/80/80',
  beverages: 'https://picsum.photos/seed/beverages/80/80',
  clothes: 'https://picsum.photos/seed/clothes/80/80',
  toys: 'https://picsum.photos/seed/toys/80/80',
};


// Sample products with category reference
const products = [
  { id: 1, name: 'Apple', price: 1.5, category: 'fruits' },
  { id: 2, name: 'Banana', price: 1.0, category: 'fruits' },
  { id: 3, name: 'Carrot', price: 0.75, category: 'vegetables' },
  { id: 4, name: 'Tomato', price: 1.2, category: 'vegetables' },
  { id: 5, name: 'Shirt', price: 15.0, category: 'clothes' },
  { id: 6, name: 'Jeans', price: 25.0, category: 'clothes' },
  { id: 7, name: 'Toy Car', price: 10.0, category: 'toys' },
  { id: 8, name: 'Teddy Bear', price: 12.0, category: 'toys' },
  { id: 9, name: 'Orange Juice', price: 2.5, category: 'beverages' },
  { id: 10, name: 'Lemonade', price: 2.0, category: 'beverages' },
];

const ProductList = ({ onAdd }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '20px',
        padding: '20px',
      }}
    >
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          <img
            src={productImages[product.category] + `&sig=${product.id}`} // force unique image per product
            alt={product.name}
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'cover',
              marginBottom: '12px',
              borderRadius: '6px',
            }}
          />
          <h3 style={{ margin: '0 0 8px 0' }}>{product.name}</h3>
          <p style={{ margin: '0 0 12px 0', fontWeight: 'bold' }}>₹{product.price.toFixed(2)}</p>
          <button
            onClick={() => onAdd(product)}
            style={{
              padding: '8px 12px',
              border: 'none',
              backgroundColor: '#007bff',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
