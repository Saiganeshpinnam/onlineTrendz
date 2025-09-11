import React from 'react';
//import './index.css';

const Orders = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <div className="orders-container">
        <h2>📦 Your Orders</h2>
        <p>No orders placed yet.</p>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2>📦 Your Orders</h2>
      <ul className="orders-list">
        {orders.map(order => (
          <li key={order.id} className="order-item">
            <img src={order.image} alt={order.name} className="order-item-image" />
            <div className="order-item-details">
              <h4>{order.name}</h4>
              <p>Quantity: {order.quantity}</p>
              <p>Status: ✅ Order Placed</p>
              <p>Estimated Delivery: {order.deliveryDays} days</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
