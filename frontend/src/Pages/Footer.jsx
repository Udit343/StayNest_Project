import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer 
      className="text-white mt-5 border-top" 
      style={{ backgroundColor: "#f0ecf5" }}
    >
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0 text-white">
            <h3 className="text-black mb-3">
              <i className="bi bi-house-heart-fill me-2"></i>
              stayNEST
            </h3>
            <p className="text-black-50">
              Your trusted partner for comfortable and memorable stays. 
              Finding your perfect home away from home.
            </p>
            <div className="social-links mt-3">
              <Link to="https://x.com/uditPandit46284" className="text-black me-3 fs-5">
                <i className="bi bi-twitter">twitter</i>
              </Link>
              <Link to="https://www.instagram.com/udit__2004/" className="text-black me-3 fs-5">
                <i className="bi bi-instagram">instagram</i>
              </Link>
              <Link to="https://www.linkedin.com/in/udit-narayan9b2a/" className="text-black fs-5">
                <i className="bi bi-linkedin">linkedin</i>
              </Link>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-black mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/Home" className="text-black-50 text-decoration-none">
                  <i className="bi bi-chevron-right me-2"></i>Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-black-50 text-decoration-none">
                  <i className="bi bi-chevron-right me-2"></i>About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-black-50 text-decoration-none">
                  <i className="bi bi-chevron-right me-2"></i>Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="col col-md-6">
            <h5 className="text-black mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2 text-black-50">
                <i className="bi bi-geo-alt-fill me-2"></i>
                Ghaziabad, UP, India
              </li>
              <li className="mb-2 text-black-50">
                <i className="bi bi-envelope-fill me-2"></i>
                info@staynest.com
              </li>
              <li className="mb-2 text-black-50">
                <i className="bi bi-telephone-fill me-2"></i>
                +91 896087XXXX
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary my-4" />
        
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0 text-black-50">
              © 2025 <strong>stayNEST Private Limited</strong>. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <Link to="/privacy" className="text-black-50 text-decoration-none me-3 hover-link">
              <i className="bi bi-shield-lock me-1"></i>Privacy Policy
            </Link>
            <Link to="/terms" className="text-black-50 text-decoration-none me-3 hover-link">
              <i className="bi bi-file-text me-1"></i>Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;