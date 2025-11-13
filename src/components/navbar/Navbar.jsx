import React, { useState } from "react";
import "./Navbar.css";
import dsk from "../imgs/dkslogo.jpg"; // replace with your actual logo path

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("menu-open");
  };

  const closeMenu = () => {
    setIsOpen(false);
    setDropdownOpen(false);
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
            <a href="#about" onClick={closeMenu}>About us</a>

            {/* ===== SERVICES WITH DROPDOWN ===== */}
            <div
              className="dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <a href="#services" className="dropdown-toggle" onClick={(e) => e.preventDefault()}>
                Services ▾
              </a>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <a href="#education" onClick={closeMenu}>Education</a>
                  <a href="#health" onClick={closeMenu}>Health</a>
                  <a href="#food" onClick={closeMenu}>Food</a>
                  <a href="#businesses" onClick={closeMenu}>Businesses</a>
                  <a href="#tourism" onClick={closeMenu}>Tourism</a>
                  <a href="#brands" onClick={closeMenu}>Our Brands</a>
                </div>
              )}
            </div>

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
