import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="admin-header">
      <h1>Admin Interface</h1>
      <div className="admin-nav">
        <Link to="/instructions" className="nav-link info-link">
          <i className="fas fa-info-circle"></i> Instructions
        </Link>
        <Link to="/" className="nav-link">
          Back to Games
        </Link>
      </div>
    </div>
  );
};

export default Header;
