import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      {/* Layer 1: Government of India Banner */}
      <nav className="navbar navbar-light bg-white py-1">
        <div className="container" style={{ maxWidth: "1200px" }}>
          <div className="d-flex align-items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
              alt="India's Flag"
              style={{ height: "20px" }}
            />
            <h6 className="mb-0 ms-2" style={{ color: "black" }}>
              Government of India
            </h6>
          </div>
        </div>
      </nav>

      {/* Layer 2: Interdepartmental Cooperation Title */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-2">
        <div className="container-fluid" style={{ maxWidth: "1400px" }}>
          <div className="d-flex align-items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmCDenIuZJjddw9JDYpcGyYoyGsebe0apuQw&s"
              alt="Logo"
              style={{ height: "60px", marginRight: "10px" }}
            />
            <span style={{ fontWeight: "500", fontSize: "1.25rem" }}>
              Interdepartmental Cooperation
            </span>
          </div>
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-dark btn-sm me-2">Translate</button>
            <button className="btn btn-outline-dark btn-sm">Login</button>
            <button
              className="navbar-toggler"
              type="button"
              onClick={handleMenuToggle}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </nav>

      {/* Layer 3: Navbar with Links */}
      <nav
        className="navbar navbar-expand-lg py-1"
        style={{ backgroundColor: "orange" }}
      >
        <div className="container-fluid" style={{ maxWidth: "1230px" }}>
          <div
            className={`collapse navbar-collapse justify-content-center ${
              menuOpen ? "show" : ""
            }`}
            id="navbarNav"
          >
            <ul
              className="navbar-nav d-flex justify-content-center"
              style={{ gap: "20px" }}
            >
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleMenuToggle}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleMenuToggle}>
                  About us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleMenuToggle}>
                  Contact us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleMenuToggle}>
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleMenuToggle}>
                  Urban Departments
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleMenuToggle}>
                  Interdepartment Projects
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Inline styles for mobile */}
      <style>
        {`
          @media (max-width: 768px) {
            .navbar-nav {
              gap: 0px !important; /* Smaller gap for mobile */
              padding-left: 15px !important; /* Small padding on the left for mobile */
            }
          }
        `}
      </style>
    </header>
  );
}
