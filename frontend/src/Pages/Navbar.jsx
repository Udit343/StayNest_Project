import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

function Navbar() {
  const [selectedArea, setSelectedArea] = useState('');
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const areaOptions = [
    'Hotel',
    'Restaurant',
    'Farm',
    'Temple',
    'Room',
    'Castle',
    'Mountain',
    'Beach',
    'Park'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedArea) {
      navigate(`/Home?category=${selectedArea}`);
    }
  };

  const handleExplore = () => {
    setSelectedArea('');
    navigate('/Home');
  };

  const handleLogout = async () => {
    await logout();
    alert("Logged out successfully!");
    navigate("/Home");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom fixed-top" style={{ backgroundColor: "#ffffff" }}>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-2 mb-lg-2 mt-lg-2">
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/Home" onClick={handleExplore}>
                <img
                  src="/logo.png"
                  alt="Staynest Logo"
                  style={{
                    width: "30px",
                    height: "30px",
                    objectFit: "contain",
                    borderRadius: "100%",
                  }}
                  className="me-2"
                />
                EXPLORE
              </Link>
            </li>
          </ul>

          <form
            className="d-flex mx-auto align-items-center"
            role="search"
            style={{ width: "40%" }}
            onSubmit={handleSearch}
          >
            <select 
              className="form-select" 
              value={selectedArea} 
              onChange={(e) => setSelectedArea(e.target.value)}
            >
              <option value="">Select Area Type</option>
              {areaOptions.map((area, index) => (
                <option key={index} value={area.toLowerCase()}>
                  {area}
                </option>
              ))}
            </select>
            <button className="btn btn-danger mx-2" type="submit">
              SEARCH
            </button>
          </form>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-2 mt-lg-2">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/New">
                    <button type="button" className="btn btn-outline-primary">NEWPLACE</button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/About">
                    <button type="button" className="btn btn-outline-primary">ABOUT</button>
                  </Link>
                </li>
                
                <li className="nav-item">
                  <button 
                    type="button" 
                    className="btn btn-outline-danger mt-2"
                    onClick={handleLogout}
                  >
                    LOGOUT
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/About">
                    <button type="button" className="btn btn-outline-primary">ABOUT</button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Signin">
                    <button type="button" className="btn btn-outline-danger">SIGNIN</button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Signup">
                    <button type="button" className="btn btn-outline-success">SIGNUP</button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;