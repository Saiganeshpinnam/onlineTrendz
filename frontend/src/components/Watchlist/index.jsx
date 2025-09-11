import React from 'react';
import './index.css';

const Watchlist = ({ watchlistItems, onAddToCart, onBuyNow, onRemoveFromWatchlist }) => {
  if (watchlistItems.length === 0) {
    return (
      <div className="watchlist-container empty">
        <p>⭐ Your Watchlist is empty.</p>
      </div>
    );
  }

  return (
    <div className="watchlist-container">
      <h2 className="watchlist-title">⭐ Your Watchlist</h2>
      <ul className="watchlist-items">
        {watchlistItems.map(item => (
          <li key={item.id} className="watchlist-item">
            <img src={item.image} alt={item.name} className="watchlist-image" />
            <div className="watchlist-details">
              <h4 className="watchlist-name">{item.name}</h4>
              <p className="watchlist-price">₹ {item.price}</p>
              <div className="watchlist-actions">
                <button className="add-btn" onClick={() => onAddToCart(item)}>Add to Cart</button>
                <button className="buy-btn" onClick={() => onBuyNow(item)}>Buy Now</button>
                <button
                  className="remove-btn"
                  onClick={() => onRemoveFromWatchlist(item.id)}
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
