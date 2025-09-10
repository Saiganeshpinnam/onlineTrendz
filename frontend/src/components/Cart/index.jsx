import React from 'react';
import './index.css'; // ✅ Ensure styles are updated as well

const Cart = ({ cartItems, onRemoveItem, onUpdateQuantity, onSaveForLater }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                
                <div className="cart-item-details">
                  <h4 className="item-name">{item.name}</h4>
                  <p className="item-price">Price: ₹{item.price * item.quantity}</p>
                  
                  {item.stock === 1 && (
                    <p className="stock-warning">⚠️ Order soon — 1 left in stock!</p>
                  )}
                  
                  <div className="quantity-controls">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>

                  <div className="item-actions">
                    <button className="remove-btn" onClick={() => onRemoveItem(item.id)}>
                      Remove
                    </button>
                    <button className="save-btn" onClick={() => onSaveForLater(item.id)}>
                      Save for Later
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="cart-total">Total: ₹{total}</h3>
        </>
      )}
    </div>
  );
};

export default Cart;
