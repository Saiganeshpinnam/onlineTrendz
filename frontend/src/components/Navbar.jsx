// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';  // ✅ Use Link instead of Navigate
// import './Navbar.css';

const Navbar = ({ cartCount }) => {
  return (
    <nav className="navbar">
      <h1 className="logo">🛍️ OnlineTrendz</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cart">Cart ({cartCount})</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
