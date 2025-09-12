import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import ProductList from './components/ProductsList';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import Watchlist from './components/Watchlist';
import Orders from './components/Orders';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // Add these two lines:
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const jwtToken = Cookies.get('jwt_token');

  // Add to Cart
  const addToCart = (product) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  // Update quantity
  const updateCartQuantity = (id, newQty) => {
    if (newQty < 1) {
      removeFromCart(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Remove from Cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Save for Later (move to Watchlist)
  const saveForLater = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      setWatchlistItems((prev) => [...prev, item]);
      removeFromCart(id);
    }
  };

  // Remove from Watchlist
  const removeFromWatchlist = (id) => {
    setWatchlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Buy Now (from Watchlist)
  const buyNow = (item) => {
    const randomDays = Math.floor(Math.random() * 6) + 2;
    const orderItem = {
      ...item,
      quantity: 1,
      deliveryDays: randomDays,
      orderPlaced: true,
    };
    setOrders((prev) => [...prev, orderItem]);
    removeFromWatchlist(item.id);
    navigate('/orders');
  };

  // Place Order (from Cart)
  const onOrderPlaced = (orderSummary) => {
    setOrders((prev) => [...prev, ...orderSummary]);
    setCartItems([]); // clear cart after order placed
  };

  // Add from Watchlist to Cart
  const addFromWatchlistToCart = (item) => {
    addToCart(item);
    removeFromWatchlist(item.id);
  };

  if (!jwtToken) {
    return <LoginForm />;
  }

  return (
    <>
      <Navbar
        cartCount={cartItems.length}
        watchlistCount={watchlistItems.length}
        ordersCount={orders.length}
        onSearch={setSearchTerm}  // Pass setter to Navbar for search input
      />

      <Routes>
        <Route
          path="/"
          element={<ProductList onAdd={addToCart} searchTerm={searchTerm} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              onRemoveItem={removeFromCart}
              onUpdateQuantity={updateCartQuantity}
              onSaveForLater={saveForLater}
              onOrderPlaced={onOrderPlaced}
            />
          }
        />
        <Route
          path="/watchlist"
          element={
            <Watchlist
              watchlistItems={watchlistItems}
              onAddToCart={addFromWatchlistToCart}
              onBuyNow={buyNow}
              onRemoveFromWatchlist={removeFromWatchlist}
            />
          }
        />
        <Route path="/orders" element={<Orders orders={orders} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
