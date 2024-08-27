import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(false);

    const departments = [
        'Road Construction',
        'Pipe Lining',
        'Electrical Maintenance',
        'Water Supply',
        'Waste Management',
    ];

    const handleNavigate = (department) => {
        const formattedName = department.toLowerCase().replace(/ /g, '-');
        navigate(`/${formattedName}`);
    };

    const handleToggleOptions = () => {
        setShowOptions(!showOptions);
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary px-4">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        Home
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
                                <a className="nav-link active" aria-current="page" href="#">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/home/projects">
                                    Interdepartment Projects
                                </Link>
                            </li>
                        </ul>
                        <div className="position-relative">
                            <button
                                className="btn p-0 text-white"
                                onClick={handleToggleOptions}
                                style={{
                                    background: "none",
                                    border: "none",
                                    fontSize: "24px",
                                    lineHeight: "1",
                                    cursor: "pointer",
                                }}
                            >
                                +
                            </button>
                            {showOptions && (
                                <div
                                    className="position-absolute"
                                    style={{
                                        top: "100%",
                                        right: "0",
                                        background: "white",
                                        border: "1px solid #ddd",
                                        borderRadius: "4px",
                                        zIndex: 1000,
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                        transition: "all 0.3s ease-in-out",
                                        transform: showOptions ? "translateX(0)" : "translateX(100%)",
                                        opacity: showOptions ? 1 : 0,
                                    }}
                                >
                                    <button
                                        className="btn btn-link text-start w-100 px-3 py-2"
                                        onClick={() => navigate('/register')}
                                    >
                                        Registration
                                    </button>
                                    <button
                                        className="btn btn-link text-start w-100 px-3 py-2"
                                        onClick={() => alert('Option is still unknown')}
                                    >
                                        Unknown Option
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mt-4">
                <div className="row">
                    {/* Department List */}
                    <div className="col-md-6">
                        <h5>Departments</h5>
                        <ul className="list-group">
                            {departments.map((department, index) => (
                                <li
                                    key={index}
                                    className="list-group-item d-flex justify-content-between align-items-center mb-2 border"
                                >
                                    {department}
                                    <span
                                        className="text-primary"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleNavigate(department)}
                                    >
                                        &gt;
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Map Section */}
                    <div className="col-md-6">
                        <h5>Map</h5>
                        <div className="embed-responsive embed-responsive-16by9">
                            <iframe
                                title="Indore City Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.5791422851824!2d75.85772557575592!3d22.719568829367725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962e30a52847e4b%3A0x6ff8486ecf1d2455!2sIndore%2C%20Madhya%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1614912295610!5m2!1sen!2sus"
                                width="100%"
                                height="400"
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
