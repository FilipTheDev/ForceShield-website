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
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z"
              fill="url(#shield-gradient)"
              stroke="white"
              strokeWidth="1.5"
            />
            <path
              d="M9 12L11 14L15 10"
              stroke="url(#check-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="shield-gradient" x1="3" y1="1" x2="21" y2="23">
                <stop offset="0%" stopColor="#c4b5fd" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="check-gradient" x1="9" y1="10" x2="15" y2="14">
                <stop offset="0%" stopColor="#1a0066" />
                <stop offset="100%" stopColor="#4a0e78" />
              </linearGradient>
            </defs>
          </svg>
          <span className="navbar-logo-text">🌌 ForceShield</span>
        </Link>

        <ul className="navbar-menu">
          <li>
            <Link to="/" className={`navbar-link ${isActive('/') ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/chatbot" className={`navbar-link ${isActive('/chatbot') ? 'active' : ''}`}>
              AI Assistant
            </Link>
          </li>
          <li>
            <Link to="/auth" className="navbar-link navbar-link-cta">
              Get Started
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
