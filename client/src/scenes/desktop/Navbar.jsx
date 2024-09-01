import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    // Navbar
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary px-4">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
           Departmental Cooperation
        </a>
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#projects-section" // Add href to scroll
                onClick={() => navigate('/home')}
              >
                Interdepartment Projects
              </a>
            </li>
          </ul>
          <div className="position-relative">
            <button
              className="btn p-0 text-white"
              onClick={handleToggleOptions}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                lineHeight: '1',
                cursor: 'pointer',
              }}
            >
                
              <FontAwesomeIcon icon={faAdd}/>
            </button>
            {showOptions && (
          <div
            className="position-absolute"
            style={{
              top: '100%',
              right: '0',
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '4px',
              zIndex: 1000,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease-in-out',
              transform: showOptions ? 'translateX(0)' : 'translateX(100%)',
              opacity: showOptions ? 1 : 0,
              width: '200px', // Adjust width as needed
            }}
          >
            <ul
              className="list-unstyled mb-0"
              style={{
                padding: '0',
                margin: '0',
              }}
            >
              <li
                className="py-2 px-3 border-bottom"
                style={{
                  cursor: 'pointer',
                  background: '#f8f9fa', // Light background for better readability
                  transition: 'background-color 0.3s ease',
                }}
                onClick={() => navigate('/register')}
              >
                Register Department
              </li>
              <li
                className="py-2 px-3"
                style={{
                  cursor: 'pointer',
                  background: '#f8f9fa', // Light background for better readability
                  transition: 'background-color 0.3s ease',
                }}
                onClick={() => alert('Option is still unknown')}
              >
                Unknown Option
              </li>
            </ul>
          </div>
          
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
