import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <header>
      {/* Layer 1 */}
      <nav className="navbar navbar-light bg-primary py-1">
        <div className="container-fluid d-flex justify-content-between align-items-center" style={{ maxWidth: '1200px' }}>
          <div className="d-flex">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" // Replace with your flag image source
            alt="India's Flag"
            style={{ height: '20px' }}
          />
            <h6 style={{color:'white', marginLeft:'10px'}}>Government of India</h6>
          </div>
          <div>
            <button className="btn btn-outline-light btn-sm me-2">Translate</button>
            <button className="btn btn-outline-light btn-sm">Login</button>
          </div>
        </div>
      </nav>

      {/* Layer 2 */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-2">
        <div className="container-fluid" style={{ maxWidth: '1240px' }}>
          <div className="d-flex align-items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmCDenIuZJjddw9JDYpcGyYoyGsebe0apuQw&s" // Replace with your logo source
              alt="Logo"
              style={{ height: '60px', marginRight: '10px' }}
            />
            <span style={{ fontWeight: '500', fontSize: '1.25rem' }}>Interdepartmental Cooperation</span>
          </div>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </nav>

      {/* Layer 3 */}
      <nav className="navbar navbar-expand-lg bg-primary py-1 d-flex justify-content-center">
        <div style={{ maxWidth: '1230px' }}>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav d-flex justify-content-center">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">About us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Contact us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Services</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Urban Departments</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Interdepartment Projects</Link>
              </li>
              {/* Add more nav items as needed */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
