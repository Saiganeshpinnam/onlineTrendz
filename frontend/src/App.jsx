import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import ProductList from './components/ProductsList';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import Watchlist from './components/Watchlist';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [watchlistItems, setWatchlistItems] = useState([]);

  const navigate = useNavigate();

  const addToCart = (product) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const saveForLater = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    if (!item) return;

    // Remove from cart
    removeFromCart(productId);

    // Avoid duplicates in watchlist
    if (watchlistItems.find((w) => w.id === productId)) return;

    setWatchlistItems((prev) => [...prev, { ...item, quantity: 1 }]);
    
    // Show notification — you can implement notification state here if needed
    alert(`✅ Added "${item.name}" to watchlist!`);
  };

  const handleAddToCartFromWatchlist = (product) => {
    addToCart(product);

    // Optional: Remove from watchlist when added to cart
    setWatchlistItems((prev) => prev.filter((item) => item.id !== product.id));
  };

  const handleBuyNow = (product) => {
    // Add to cart then navigate to /cart
    addToCart(product);
    navigate('/cart');
  };

  const removeFromWatchlist = (productId) => {
  setWatchlistItems((prev) => prev.filter((item) => item.id !== productId));
};


  const jwtToken = Cookies.get('jwt_token');

  if (!jwtToken) {
    return <LoginForm />;
  }

  return (
    <>
      <Navbar cartCount={cartItems.length} watchlistCount={watchlistItems.length} />
      <Routes>
        <Route path="/" element={<ProductList onAdd={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              onRemoveItem={removeFromCart}
              onUpdateQuantity={updateQuantity}
              onSaveForLater={saveForLater}
            />
          }
        />
        <Route
  path="/watchlist"
  element={
    <Watchlist
      watchlistItems={watchlistItems}
      onAddToCart={handleAddToCartFromWatchlist}
      onBuyNow={handleBuyNow}
      onRemoveFromWatchlist={removeFromWatchlist}
    />
  }
/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
