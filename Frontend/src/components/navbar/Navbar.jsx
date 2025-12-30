import { useState } from "react";
import "./Navbar.css";
import navlogo from "../imgs/navlogo.jpg";
import { useNavigate } from "react-router-dom";

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
                <div
                  className="dropdown-menu"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                   <a onClick={() => { navigate("/Edu"); closeMenu(); }}>Education</a>
                    <a  onClick={()=>{ navigate ("/food");closeMenu();}}>food</a>
                  <a href="#Hospital" onClick={closeMenu}>Hostpital</a>
                  <a href="#Business" onClick={closeMenu}>Business</a>
                  <a  onClick={()=>{ navigate ("/tech");closeMenu();}}>Technicians</a>
                  <a onClick={() => { navigate("/tourism"); closeMenu(); }}>Tourism</a>
                  <a href="#brands" onClick={closeMenu}>Our Brands</a>
                </div>
              )}
            </div>

            <a onClick={() => { navigate("/ContactUs"); closeMenu(); }}>Contact Us</a>

            <div className="nav-buttons">
              <button className="btn sign" onClick={() => { closeMenu(); navigate("/form"); }}>Sign Up</button>
              <button className="btn log" onClick={closeMenu}>Log in</button>
            </div>
          </div>

          {/* HAMBURGER */}
          <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>

      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
    </>
  );
};

export default Navbar;
