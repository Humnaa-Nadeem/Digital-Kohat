import { useState } from "react";
import "./Navbar.css";
import dsk from "../imgs/dkslogo.jpg"; // replace with your actual logo path
import { useNavigate } from "react-router-dom";

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

  // Navigation
  const navigate = useNavigate();
  // Handles both hover and click toggle
  const handleDropdownEnter = () => setDropdownOpen(true);
  const handleDropdownLeave = () => setTimeout(() => setDropdownOpen(false), 200);
  const toggleDropdownClick = (e) => {
    e.preventDefault();
    setDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          {/* LOGO */}
          <div className="nav-logo">
            <img src={dsk} alt="Logo" className="logo-img" />
            <h2>DIGITAL SMART CITIES HUB</h2>
          </div>

          {/* LINKS */}
          <div className={`nav-links ${isOpen ? "open" : ""}`}>
            <a href="/" onClick={closeMenu}>Home</a>
            {/* <a onClick={() => {navigate("/"); closeMenu()}}>Home</a> */}
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#about" onClick={closeMenu}>About us</a>

            {/* SERVICES DROPDOWN */}
            <div
              className="dropdown"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <a
                href="#services"
                className="dropdown-toggle"
                onClick={toggleDropdownClick}
              >
                Services ▾
              </a>

              {dropdownOpen && (
                <div
                  className="dropdown-menu"
                  onMouseEnter={() => setDropdownOpen(true)} // keep open when inside
                  onMouseLeave={() => setDropdownOpen(false)} // close when leaving
                >
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

          {/* HAMBURGER */}
          <div
            className={`hamburger ${isOpen ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>

      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
    </>
  );
};

export default Navbar;
