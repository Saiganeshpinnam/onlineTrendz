import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Cart = ({ cartItems = [], onRemoveItem, onUpdateQuantity, onSaveForLater, onOrderPlaced }) => {
  const [orderedItems, setOrderedItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderSummary, setOrderSummary] = useState([]);

  const navigate = useNavigate();

  const calculateTotal = () =>
    cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handleProceedToPay = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (!paymentMethod) {
      alert('⚠️ Please select a payment method');
      return;
    }

    const summary = cartItems.map(item => ({
      ...item,
      deliveryDays: Math.floor(Math.random() * 6) + 2, // 2–7 days
      orderPlaced: true,
    }));

    setOrderedItems(cartItems.map(i => i.pid || i._id));
    setOrderSummary(summary);
    setOrderSuccess(true);

    if (onOrderPlaced) {
      onOrderPlaced(summary);
    }
  };

  if ((!cartItems || cartItems.length === 0) && !orderSuccess) {
    return (
      <div className='empty-cart-container'>
        <p className="cart-empty">🛒 Your cart is empty</p> 
        <img 
          src="https://res.cloudinary.com/dgv10egbw/image/upload/v1757684630/Screenshot_2025-09-12_191334_duvbjy.png" 
          alt="Empty Cart" 
          className="empty-cart-image" 
        />
        <button 
          className="continue-shopping-btn"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </div>
    );
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
              <li key={item.pid || item._id || item.id || `${item.name}-${item.category}`}
                  className="order-item">
                <img src={item.imageUrl || item.image || 'https://via.placeholder.com/100'}
                     alt={item.name}
                     className="order-item-image" />
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
          <li key={item.pid || item._id} className="cart-item">
            <img 
              src={item.imageUrl || 'https://via.placeholder.com/100'} 
              alt={item.name} 
              className="cart-item-image" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/100';
              }}
            />
            <div className="cart-item-details">
              <h4>{item.name}</h4>
              <p className="category">{item.category}</p>
              <p className="price">${item.price.toFixed(2)} each</p>
              <div className="quantity-controls">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    onUpdateQuantity(item.pid || item._id, (item.quantity || 1) - 1);
                  }}
                  disabled={(item.quantity || 1) <= 1}
                >
                  -
                </button>
                <span>{item.quantity || 1}</span>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    onUpdateQuantity(item.pid || item._id, (item.quantity || 1) + 1);
                  }}
                >
                  +
                </button>
              </div>
              <p className="item-total">Total: ${(item.price * (item.quantity || 1)).toFixed(2)}</p>
              <div className="cart-item-actions">
                <button 
                  className="remove-btn" 
                  onClick={(e) => {
                    e.preventDefault();
                    onRemoveItem(item.pid || item._id);
                  }}
                >
                  Remove
                </button>
                {onSaveForLater && (
                  <button 
                    className="save-btn" 
                    onClick={(e) => {
                      e.preventDefault();
                      onSaveForLater(item.pid || item._id);
                    }}
                  >
                    Save for Later
                  </button>
                )}
              </div>
              {orderedItems.includes(item.pid || item._id) && (
                <p className="order-placed-label">✅ Order Placed</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <h3>Subtotal ({cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)} items): 
          <span className="total-amount">${calculateTotal().toFixed(2)}</span>
        </h3>
        <div className="checkout-actions">
          <button 
            className="continue-shopping"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
          <button 
            className="checkout-btn"
            onClick={handleProceedToPay}
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
        <div className="payment-method">
          <h4>Select Payment Method:</h4>
          <label>
            <input
              type="radio"
              name="payment"
              value="credit"
              checked={paymentMethod === 'credit'}
              onChange={() => setPaymentMethod('credit')}
            />
            Credit Card
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={() => setPaymentMethod('paypal')}
            />
            PayPal
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
            />
            Cash on Delivery
          </label>
        </div>
      </div>
    </div>
  );
};

export default Cart;
