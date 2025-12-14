import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img
            src="/ForceShield-logo-latest-version-removebg.png"
            alt="ForceShield Logo"
            className="navbar-logo-img"
          />
          <span className="navbar-logo-text">ForceShield</span>
        </Link>

        <ul className="navbar-menu">
          <li>
            <Link to="/" className={`navbar-link ${isActive('/') ? 'active' : ''}`}>
              Дома
            </Link>
          </li>
          <li>
            <Link to="/chatbot" className={`navbar-link ${isActive('/chatbot') ? 'active' : ''}`}>
              Козмо
            </Link>
          </li>
          <li>
            <Link to="/auth" className="navbar-link navbar-link-cta">
              Започни
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
