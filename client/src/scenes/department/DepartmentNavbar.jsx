import React from "react";

function DepartmentNavbar() {
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
          <h5 className="ml-3">Urban Infrastructure & Development</h5>
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
        <a className="navbar-brand" href="/">
          Urban Infrastructure
        </a>
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
              <a className="nav-link" href="#home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#home">
                About
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown1"
                role="button"
                aria-expanded="false"
              >
                Resources
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <a className="dropdown-item" href="#action/3.1">
                  Human Resources
                </a>
                <a className="dropdown-item" href="#action/3.2">
                  Machinery Resources
                </a>
                <a className="dropdown-item" href="#action/3.3">
                  Technical Resources
                </a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown2"
                role="button"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown2">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown3"
                role="button"
                aria-expanded="false"
              >
                Projects
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown3">
                <a className="dropdown-item" href="#action/3.1">
                  Ongoing
                </a>
                <a className="dropdown-item" href="#action/3.2">
                  Upcoming
                </a>
                <a className="dropdown-item" href="#action/3.3">
                  Completed
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#link">
                Contact
              </a>
            </li>
          </ul>
          <form className="form-inline d-md-none">
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
