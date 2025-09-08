import React, { useState } from 'react';
import Cookies from 'js-cookie';
import LoginForm from './components/LoginForm';
import ProductList from './components/ProductsList';
import Cart from './components/Cart';
import Navbar from './components/Navbar';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  console.log("App")
  // Add product to cart or increase quantity if already exists
  const addToCart = product => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Remove product from cart by id
  const removeFromCart = productId => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Update product quantity, but no less than 1
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Check if user is authenticated by presence of JWT token cookie
  const jwtToken = Cookies.get('jwt_token');

  // If not logged in, show login form
  if (!jwtToken) {
    return <LoginForm />;
  }

  // If logged in, show main app with navbar, product list, and cart
  return (
    <>
      <Navbar cartCount={cartItems.length} />
      <div style={{ display: 'flex', padding: '20px', gap: '40px' }}>
        <div style={{ flex: 3 }}>
          <ProductList onAdd={addToCart} />
        </div>
        <div style={{ flex: 1 }}>
          <Cart
            cartItems={cartItems}
            onRemoveItem={removeFromCart}
            onUpdateQuantity={updateQuantity}
          />
        </div>
      </div>
    </>
  );
};

export default App;
