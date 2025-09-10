import React from 'react';
import './index.css';

const Watchlist = ({ watchlistItems, onAddToCart, onBuyNow, onRemoveFromWatchlist }) => {
  if (watchlistItems.length === 0) {
    return <p>Your watchlist is empty.</p>;
  }

  return (
    <div className="watchlist-container">
      <h2>⭐ Your Watchlist</h2>
      <ul className="watchlist-items">
        {watchlistItems.map(item => (
          <li key={item.id} className="watchlist-item">
            <img src={item.image} alt={item.name} className="watchlist-image" />
            <div className="watchlist-details">
              <h4>{item.name}</h4>
              <p>Price: ₹{item.price}</p>
              <div className="watchlist-actions">
                <button onClick={() => onAddToCart(item)}>Add to Cart</button>
                <button onClick={() => onBuyNow(item)}>Buy Now</button>
                <button
                  onClick={() => onRemoveFromWatchlist(item.id)}
                  style={{ backgroundColor: '#f44336', color: 'white' }}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
