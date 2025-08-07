import React from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';



const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left-group">
        <div className="navbar-left">
          <h4 className="nav-title">Departmental Projects</h4>
        </div>

        <div className="navbar-center">
          <NavLink to="/">Map</NavLink>
          <NavLink to="/list">List</NavLink>
          {/* Add more links if needed */}
        </div>
      </div>

      <div className="navbar-right">
        <button className="create-btn">create</button>
        <div className="circle-icon"></div>
      </div>
    </nav>
  );
};

export default Navbar;
