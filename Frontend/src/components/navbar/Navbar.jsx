import { useState } from "react";
import "./Navbar.css";
import navlogo from "../imgs/navlogo.jpg";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "../LanguageSwitcher";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("menu-open");
  };

  const closeMenu = () => {
    setIsOpen(false);
    setDropdownOpen(false);
    document.body.classList.remove("menu-open");
  };

  const handleDropdownEnter = () => setDropdownOpen(true);
  const handleDropdownLeave = () =>
    setTimeout(() => setDropdownOpen(false), 200);

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
            <img src={navlogo} alt="Logo" className="logo-img" />
            <h2>DIGITAL SMART CITIES HUB</h2>
          </div>

          {/* LINKS */}
          <div className={`nav-links ${isOpen ? "open" : ""}`}>
            <a onClick={() => { navigate("/"); closeMenu(); }}>Home</a>
            <a onClick={() => { navigate("/AboutUs"); closeMenu(); }}>About us</a>

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
                <div className="dropdown-menu">
                  <a onClick={() => { navigate("/edu"); closeMenu(); }}>Education</a>
                  <a onClick={() => { navigate("/food"); closeMenu(); }}>Food</a>
                  <a onClick={() => { navigate("/hospital"); closeMenu(); }}>Health</a>
                  <a onClick={() => { navigate("/business"); closeMenu(); }}>Business</a>
                  <a onClick={() => { navigate("/tech"); closeMenu(); }}>Technicians</a>
                  <a onClick={() => { navigate("/tourism"); closeMenu(); }}>Tourism</a>
                </div>
              )}
            </div>

            <a onClick={() => { navigate("/ContactUs"); closeMenu(); }}>
              Contact Us
            </a>

            {/* REGISTER + LANGUAGE */}
            <div className="nav-buttons">
              <button
                type="button"
                className="btn sign"
                onClick={() => navigate("/form")}
              >
                Register
              </button>

              <LanguageSwitcher />
            </div>
          </div>

          {/* HAMBURGER */}
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

      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
    </>
  );
};

export default Navbar;
