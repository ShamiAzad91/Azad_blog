import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="brand-highlight">Azad</span> Blog
          </Link>
          <p className="footer-tagline">Write. Read. Inspire.</p>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Azad Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
