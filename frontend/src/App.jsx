import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CartProvider, useCart } from "./contexts/CartContext";
import LoginForm from "./components/LoginForm";
import ProductList from "./components/ProductsList";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Watchlist from "./components/Watchlist";
import Orders from "./components/Orders";
import Chatbot from "./components/Chatbot";

const AppContent = () => {
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { cart, removeFromCart, updateQuantity, addToCart, cartCount } = useCart();
  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwt_token");

  // Save for Later (move to Watchlist)
  const saveForLater = (id) => {
    const item = cart.find((item) => item._id === id);
    if (item) {
      setWatchlistItems((prev) => [...prev, { ...item }]);
      removeFromCart(id);
    }
  };

  // Remove from Watchlist
  const removeFromWatchlist = (id) => {
    setWatchlistItems((prev) => prev.filter((item) => item._id !== id));
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
    removeFromWatchlist(item._id);
    navigate("/orders");
  };

  // Place Order (from Cart)
  const handleOrderPlaced = (orderSummary) => {
    setOrders((prev) => [...prev, ...orderSummary]);
  };

  // Add from Watchlist to Cart
  const addFromWatchlistToCart = (item) => {
    addToCart(item);
    removeFromWatchlist(item._id);
  };

  // --- Authentication Check ---
  if (!jwtToken) {
    return <LoginForm />;
  }

  return (
    <div className="app">
      <Navbar
        watchlistCount={watchlistItems.length}
        ordersCount={orders.length}
        cartCount={cartCount}
        onSearch={setSearchTerm}
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
              cartItems={cart}
              onSaveForLater={saveForLater}
              onRemoveItem={removeFromCart}
              onUpdateQuantity={updateQuantity}
              onOrderPlaced={handleOrderPlaced}
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

      {/* 👇 Floating AI Chatbot */}
      <Chatbot />
    </div>
  );
};

const App = () => (
  <CartProvider>
    <AppContent />
  </CartProvider>
);

export default App;
