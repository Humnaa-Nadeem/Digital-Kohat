import React, { useState } from "react";
import "./Navbar.css";
import dsk from "../imgs/dkslogo.jpg"; // replace with your actual logo path

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("menu-open");
  };

  // optional: close when overlay clicked
  const closeMenu = () => {
    setIsOpen(false);
    document.body.classList.remove("menu-open");
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          {/* ===== LOGO ===== */}
          <div className="nav-logo">
            <img src={dsk} alt="Logo" className="logo-img" />
            <h2>DIGITAL SMART CITIES HUB</h2>
          </div>

          {/* ===== NAV LINKS ===== */}
          <div className={`nav-links ${isOpen ? "open" : ""}`}>
            <a href="/" onClick={closeMenu}>Home</a>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#about" onClick={closeMenu}>About us</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
            <div className="nav-buttons">
              <button className="btn sign" onClick={closeMenu}>Sign in</button>
              <button className="btn log" onClick={closeMenu}>Log in</button>
            </div>
          </div>

          {/* ===== HAMBURGER ICON ===== */}
          <div
            className={`hamburger ${isOpen ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* ===== OVERLAY ===== */}
      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
    </>
  );
};

export default Navbar;
