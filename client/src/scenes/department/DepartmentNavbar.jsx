import React from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';

function DepartmentNavbar() {
  const { department } = useParams();

  const navItemStyle = {
    marginRight: '0.5rem', // Adjust the margin as needed
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark pb-1">
        <div className="container-fluid">
          <div className="d-flex justify-content-start">
            <ul className="navbar-nav">
              <li className="nav-item" style={navItemStyle}>
                <a className="nav-link" href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li className="nav-item" style={navItemStyle}>
                <a className="nav-link" href="#">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li className="nav-item" style={navItemStyle}>
                <a className="nav-link" href="#">
                  <i className="fab fa-google"></i>
                </a>
              </li>
              <li className="nav-item" style={navItemStyle}>
                <a className="nav-link" href="#">
                  <i className="fab fa-youtube"></i>
                </a>
              </li>
              <li className="nav-item" style={navItemStyle}>
                <a className="nav-link" href="#">
                  Screen Reader
                </a>
              </li>
              <li className="nav-item" style={navItemStyle}>
                <a className="nav-link" href="#">
                  Skip to Main Content
                </a>
              </li>
              <li className="nav-item" style={navItemStyle}>
                <a className="nav-link" href="#">
                  Skip to Navigation
                </a>
              </li>
            </ul>
          </div>

          <div className="d-flex justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item" style={navItemStyle}>
                <a className="nav-link" href="#">
                  हिन्दी
                </a>
              </li>
              <li className="nav-item" style={navItemStyle}>
                <button className="btn btn-sm btn-outline-light mx-1">A-</button>
              </li>
              <li className="nav-item" style={navItemStyle}>
                <button className="btn btn-sm btn-outline-light mx-1">A</button>
              </li>
              <li className="nav-item" style={navItemStyle}>
                <button className="btn btn-sm btn-outline-light mx-1">A+</button>
              </li>
              <li className="nav-item" style={navItemStyle}>
                <a href="#" className="btn btn-sm btn-light mx-1">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Top Logo and Search Section */}
      <div className="d-flex justify-content-between align-items-center px-5 bg-light">
        <div className="d-flex align-items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c6/Ashok_Emblem_svg.svg" // Replace with the path to your logo
            alt="Urban Development Logo"
            style={{ height: "90px" }}
          />
          <h4 className="ms-3">{department}</h4>
        </div>
        <form className="d-none d-md-flex gap-4">
          <input
            type="text"
            placeholder="Search"
            className="form-control"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>

      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary px-4">
        <Link className="navbar-brand" to={`/${department}`}>
          {department}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mx-4" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item" style={navItemStyle}>
              <Link className="nav-link" to={`/${department}`}>
                Home
              </Link>
            </li>
            <li className="nav-item" style={navItemStyle}>
              <Link className="nav-link" to={`/${department}`}>
                About
              </Link>
            </li>
            <li className="nav-item" style={navItemStyle}>
              <Link className="nav-link" to={`/${department}/projects`}>
                Projects
              </Link>
            </li>
            <li className="nav-item" style={navItemStyle}>
              <Link className="nav-link" to={`/${department}/resources`}>
                Resources
              </Link>
            </li>
            <li className="nav-item" style={navItemStyle}>
              <Link className="nav-link" to={`/${department}`}>
                Documents
              </Link>
            </li>
            <li className="nav-item" style={navItemStyle}>
              <Link className="nav-link" to={`/${department}/subdepartment`}>
                Sub-Department
              </Link>
            </li>
          </ul>
          <form className="form-inline d-md-none">
            {/* <FontAwesomeIcon icon={faBell} /> */}
            {/* <input
              type="text"
              placeholder="Search"
              className="form-control"
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button> */}
          </form>
        </div>
      </nav>
    </header>
  );
}

export default DepartmentNavbar;
