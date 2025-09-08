import React from 'react';
// import './Cart.css';

const Cart = ({ cartItems, onRemoveItem, onUpdateQuantity }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="cart">
      <h2>🛒 Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map(item => (
              <li key={item.id} className="cart-item" style={{display: 'flex', marginBottom: '16px'}}>
                <img src={item.image} alt={item.name} style={{width: '60px', height: '60px', objectFit: 'cover', marginRight: '16px'}} />
                <div style={{flex: 1}}>
                  <h4>{item.name}</h4>
                  <p>Price: ₹{item.price}</p>
                  <div className="quantity-controls" style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => onRemoveItem(item.id)} style={{backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '6px 12px', cursor: 'pointer'}}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{total}</h3>
        </>
      )}
    </div>
  );
};

export default Cart;
