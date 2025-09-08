import React from 'react';

const products = [
  { id: 1, name: 'Apple', price: 1.5, image: 'https://source.unsplash.com/50x50/?apple,fruit' },
  { id: 2, name: 'Banana', price: 1.0, image: 'https://source.unsplash.com/50x50/?banana,fruit' },
  { id: 3, name: 'Carrot', price: 0.75, image: 'https://source.unsplash.com/50x50/?carrot,vegetable' },
  { id: 4, name: 'Tomato', price: 1.2, image: 'https://source.unsplash.com/50x50/?tomato,vegetable' },
  { id: 5, name: 'Potato', price: 0.9, image: 'https://source.unsplash.com/50x50/?potato,vegetable' },
  { id: 6, name: 'Orange', price: 1.4, image: 'https://source.unsplash.com/50x50/?orange,fruit' },
  { id: 7, name: 'Grapes', price: 2.0, image: 'https://source.unsplash.com/50x50/?grapes,fruit' },
  { id: 8, name: 'Lemon', price: 0.8, image: 'https://source.unsplash.com/50x50/?lemon,fruit' },
  { id: 9, name: 'Strawberry', price: 2.5, image: 'https://source.unsplash.com/50x50/?strawberry,fruit' },
  { id: 10, name: 'Watermelon', price: 3.0, image: 'https://source.unsplash.com/50x50/?watermelon,fruit' },
  { id: 11, name: 'Pineapple', price: 2.8, image: 'https://source.unsplash.com/50x50/?pineapple,fruit' },
  { id: 12, name: 'Cucumber', price: 1.1, image: 'https://source.unsplash.com/50x50/?cucumber,vegetable' },
  { id: 13, name: 'Broccoli', price: 1.7, image: 'https://source.unsplash.com/50x50/?broccoli,vegetable' },
  { id: 14, name: 'Cauliflower', price: 1.9, image: 'https://source.unsplash.com/50x50/?cauliflower,vegetable' },
  { id: 15, name: 'Onion', price: 1.0, image: 'https://source.unsplash.com/50x50/?onion,vegetable' },
  { id: 16, name: 'Garlic', price: 1.3, image: 'https://source.unsplash.com/50x50/?garlic,vegetable' },
  { id: 17, name: 'Mango', price: 2.7, image: 'https://source.unsplash.com/50x50/?mango,fruit' },
  { id: 18, name: 'Blueberry', price: 3.5, image: 'https://source.unsplash.com/50x50/?blueberry,fruit' },
  { id: 19, name: 'Peach', price: 2.2, image: 'https://source.unsplash.com/50x50/?peach,fruit' },
  { id: 20, name: 'Pear', price: 1.8, image: 'https://source.unsplash.com/50x50/?pear,fruit' },
  { id: 21, name: 'Spinach', price: 1.5, image: 'https://source.unsplash.com/50x50/?spinach,vegetable' },
  { id: 22, name: 'Kale', price: 1.6, image: 'https://source.unsplash.com/50x50/?kale,vegetable' },
  { id: 23, name: 'Zucchini', price: 1.2, image: 'https://source.unsplash.com/50x50/?zucchini,vegetable' },
  { id: 24, name: 'Pumpkin', price: 2.4, image: 'https://source.unsplash.com/50x50/?pumpkin,vegetable' },
  { id: 25, name: 'Chili', price: 1.9, image: 'https://source.unsplash.com/50x50/?chili,vegetable' },
  { id: 26, name: 'Cabbage', price: 1.3, image: 'https://source.unsplash.com/50x50/?cabbage,vegetable' },
  { id: 27, name: 'Celery', price: 1.1, image: 'https://source.unsplash.com/50x50/?celery,vegetable' },
  { id: 28, name: 'Corn', price: 1.4, image: 'https://source.unsplash.com/50x50/?corn,vegetable' },
  { id: 29, name: 'Green beans', price: 1.5, image: 'https://source.unsplash.com/50x50/?greenbeans,vegetable' },
  { id: 30, name: 'Lettuce', price: 1.2, image: 'https://source.unsplash.com/50x50/?lettuce,vegetable' },
  { id: 31, name: 'Mushroom', price: 2.1, image: 'https://source.unsplash.com/50x50/?mushroom,vegetable' },
  { id: 32, name: 'Olives', price: 2.3, image: 'https://source.unsplash.com/50x50/?olives,fruit' },
  { id: 33, name: 'Peas', price: 1.4, image: 'https://source.unsplash.com/50x50/?peas,vegetable' },
  { id: 34, name: 'Radish', price: 1.1, image: 'https://source.unsplash.com/50x50/?radish,vegetable' },
  { id: 35, name: 'Sweet potato', price: 1.8, image: 'https://source.unsplash.com/50x50/?sweetpotato,vegetable' },
  { id: 36, name: 'Turnip', price: 1.3, image: 'https://source.unsplash.com/50x50/?turnip,vegetable' },
  { id: 37, name: 'Avocado', price: 2.5, image: 'https://source.unsplash.com/50x50/?avocado,fruit' },
  { id: 38, name: 'Blackberry', price: 3.0, image: 'https://source.unsplash.com/50x50/?blackberry,fruit' },
  { id: 39, name: 'Cantaloupe', price: 2.7, image: 'https://source.unsplash.com/50x50/?cantaloupe,fruit' },
  { id: 40, name: 'Cherry', price: 3.2, image: 'https://source.unsplash.com/50x50/?cherry,fruit' },
  { id: 41, name: 'Fig', price: 2.9, image: 'https://source.unsplash.com/50x50/?fig,fruit' },
  { id: 42, name: 'Ginger', price: 1.6, image: 'https://source.unsplash.com/50x50/?ginger,vegetable' },
  { id: 43, name: 'Honeydew', price: 2.8, image: 'https://source.unsplash.com/50x50/?honeydew,fruit' },
  { id: 44, name: 'Jackfruit', price: 3.1, image: 'https://source.unsplash.com/50x50/?jackfruit,fruit' },
  { id: 45, name: 'Kiwi', price: 2.4, image: 'https://source.unsplash.com/50x50/?kiwi,fruit' },
  { id: 46, name: 'Nectarine', price: 2.2, image: 'https://source.unsplash.com/50x50/?nectarine,fruit' },
  { id: 47, name: 'Papaya', price: 2.7, image: 'https://source.unsplash.com/50x50/?papaya,fruit' },
  { id: 48, name: 'Passionfruit', price: 3.3, image: 'https://source.unsplash.com/50x50/?passionfruit,fruit' },
  { id: 49, name: 'Pomegranate', price: 3.0, image: 'https://source.unsplash.com/50x50/?pomegranate,fruit' },
  { id: 50, name: 'Raspberry', price: 3.4, image: 'https://source.unsplash.com/50x50/?raspberry,fruit' },
];

const ProductList = ({ onAdd }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))',
        gap: '20px',
      }}
    >
      {products.map(product => (
        <div
          key={product.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '80px', height: '80px', objectFit: 'cover', marginBottom: '12px' }}
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


