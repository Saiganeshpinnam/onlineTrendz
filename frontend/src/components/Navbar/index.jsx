import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'; // ✅ Import CSS

const Navbar = ({ cartCount }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">🛍️ OnlineTrendz</h1>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cart">Cart ({cartCount})</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
