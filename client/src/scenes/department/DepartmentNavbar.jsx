import React from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';

function DepartmentNavbar() {
  const {department} = useParams();

  return (
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark pb-1">
        <div class="container-fluid">
          <div class="d-flex justify-content-start">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="fab fa-facebook-f"></i>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="fab fa-twitter"></i>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="fab fa-google"></i>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="fab fa-youtube"></i>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Screen Reader
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Skip to Main Content
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Skip to Navigation
                </a>
              </li>
            </ul>
          </div>

          <div class="d-flex justify-content-end">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  हिन्दी
                </a>
              </li>
              <li class="nav-item">
                <button class="btn btn-sm btn-outline-light mx-1">A-</button>
              </li>
              <li class="nav-item">
                <button class="btn btn-sm btn-outline-light mx-1">A</button>
              </li>
              <li class="nav-item">
                <button class="btn btn-sm btn-outline-light mx-1">A+</button>
              </li>
              <li class="nav-item">
                <a href="#" class="btn btn-sm btn-light mx-1">
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
          <h5 className="ml-3">{department}</h5>
        </div>
        <form className="d-none d-md-flex gap-4">
          <input
            type="text"
            placeholder="Search"
            className="form-control mr-sm-2"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>

      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary px-4">
        <Link className="navbar-brand" to={`/${department}`} >
          {department}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mx-4" id="navbarNav">
          <ul className="navbar-nav gap-3">
            <li className="nav-item">
              <Link className="nav-link" to={`/${department}`}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/${department}`}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/${department}/projects`}>
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/${department}/resources`}>
                Resources
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/${department}`}>
                Documents
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/${department}`}>
                Contact
              </Link>
            </li>
           
          </ul>
          <form className="form-inline d-md-none">
           <FontAwesomeIcon icon={faBell} />
            <input
              type="text"
              placeholder="Search"
              className="form-control mr-sm-2"
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
}

export default DepartmentNavbar;
