import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="custom-navbar">
      <div className="nav-logo">
        <Link to="/" className="nav-brand">
          <span className="brand-highlight">Azad</span> Blog
        </Link>
      </div>

      <div className={`nav-links-container ${menuOpen ? "open" : ""}`}>
        <ul className={`nav-links ${auth ? "nav-left" : "nav-right"}`}>
          {auth ? (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/add-blog">Add Blog</Link></li>
              <li><Link to="/my-post">My Post</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link onClick={logout} to="/login" className="logout">Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          )}
        </ul>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
