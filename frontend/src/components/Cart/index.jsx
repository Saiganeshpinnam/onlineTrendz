import React, { useState } from 'react';
import './index.css';

const Cart = ({ cartItems, onRemoveItem, onUpdateQuantity, onSaveForLater, onOrderPlaced }) => {
  const [orderedItems, setOrderedItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderSummary, setOrderSummary] = useState([]);

  const calculateTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleProceedToPay = () => {
    if (!paymentMethod) {
      alert('⚠️ Please select a payment method');
      return;
    }

    const summary = cartItems.map(item => {
      const randomDays = Math.floor(Math.random() * 6) + 2; // 2–7 days
      return {
        ...item,
        deliveryDays: randomDays,
        orderPlaced: true,
      };
    });

    setOrderedItems(summary.map(i => i.id));
    setOrderSummary(summary);
    setOrderSuccess(true);

    if (typeof onOrderPlaced === 'function') {
      onOrderPlaced(summary);
    }
  };

  if (cartItems.length === 0 && !orderSuccess) {
    return <p className="cart-empty">🛒 Your cart is empty</p>;
  }

  if (orderSuccess) {
    return (
      <div className="success-screen">
        <div className="order-success">✅ Order placed successfully!</div>
        <p className="thank-you">😊 Thanks for shopping with us!</p>
        <div className="order-summary">
          <h3>📦 Order Summary</h3>
          <ul>
            {orderSummary.map(item => (
              <li key={item.id} className="order-item">
                <img src={item.image} alt={item.name} className="order-item-image" />
                <div>
                  <p className="order-item-name">{item.name}</p>
                  <p>Qty: {item.quantity}</p>
                  <p className="delivery-info">Estimated Delivery: {item.deliveryDays} days</p>
                  <p className="order-status">✅ Order Placed</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Cart</h2>
      <ul className="cart-items">
        {cartItems.map(item => (
          <li key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h4>{item.name}</h4>
              <p>Price: ₹{item.price}</p>
              <div className="quantity-controls">
                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <div className="cart-item-actions">
                <button className="remove-btn" onClick={() => onRemoveItem(item.id)}>Remove</button>
                <button className="save-btn" onClick={() => onSaveForLater(item.id)}>Save for Later</button>
              </div>
              {orderedItems.includes(item.id) && (
                <p className="order-placed-label">✅ Order Placed</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <h3>Total: ₹{calculateTotal()}</h3>
        <div className="payment-method">
          <label>
            <input
              type="radio"
              name="payment"
              value="cod"
              onChange={e => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="upi"
              onChange={e => setPaymentMethod(e.target.value)}
            />
            UPI
          </label>
        </div>
        <button className="proceed-btn" onClick={handleProceedToPay}>
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default Cart;
