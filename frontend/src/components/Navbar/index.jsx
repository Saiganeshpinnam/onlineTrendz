import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

const Navbar = ({ cartCount, watchlistCount, ordersCount }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('jwt_token');
    navigate(0);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">🛍️ OnlineTrendz</h1>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cart">Cart ({cartCount})</Link></li>
          <li><Link to="/watchlist">Watchlist ({watchlistCount})</Link></li>
          <li><Link to="/orders">Orders ({ordersCount})</Link></li>
          <li>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
