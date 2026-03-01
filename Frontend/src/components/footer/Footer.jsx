import "./Footer.css";
import { FaFacebookF,FaWhatsapp ,  FaInstagram,FaLinkedin,  FaTiktok  , FaYoutube, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import footerlogo from "../imgs/footerlogo.jpg"; // replace with your actual logo path
import { Link } from "react-router-dom";



const Footer = () => {


  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-left">

          <div className="footer-logo">
            <img src={footerlogo} alt="Logo" className="footer-img" />
         

          </div>
         
          <div className="contact-info">
            <p>
              <FaEnvelope className="footer-icon" /> digitalkohat@gmail.com
            </p>
            <p>
              <FaPhoneAlt className="footer-icon" /> 1800-3232-8686
            </p>
          </div>
        </div>

        {/* Middle Section */}
        <div className="footer-links">
          <div>
            <h4>Company</h4>
            <ul>
              <li>Features</li>
              <li>
  <Link to="/AboutUs">About Us</Link>
</li>

<li>
  <Link to="/ContactUs">Contact Us</Link>
</li>


            </ul>
          </div>
          <div>
            <h4>Help</h4>
            <ul>
              <li>
                <Link to="/Freq">FAQ</Link>
              </li>
              <li>
                <Link to="/ContactUs">Help Center</Link>
              </li>
              <li>
                <Link to="/ContactUs">Support</Link>
                </li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          <h4>Get In Touch!</h4>
          <div className="subscribe-box">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>

   <div className="social-icons">

  {/* Facebook */}
  <a 
    href="https://www.facebook.com/" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <FaFacebookF />
  </a>

  {/* Instagram */}
  <a 
    href="https://www.instagram.com/the.dsc.hub" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <FaInstagram />
  </a>

  {/* LinkedIn */}
  <a 
    href="https://www.linkedin.com/company/digital-smart-cities-hub/" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <FaLinkedin />
  </a>

  {/* YouTube */}
  <a 
    href="https://youtube.com/@digitalsmartcitiyshub?si=f8XwheNW9IL_PrXg" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <FaYoutube />
  </a>

  {/* TikTok (still using Facebook icon unless you want FaTiktok) */}
  <a 
    href="https://www.tiktok.com/@the.dsch" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <FaTiktok />
  </a>

  {/* WhatsApp */}
  <a 
    href="https://chat.whatsapp.com/Eo8fEtQPejrEV58pfnPhWK" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <FaWhatsapp />
  </a>

</div>


        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <p>© 2025 Digital Smart Cities Hub (SMC-PVT LTD). All Rights Reserved.</p>

        <div className="footer-terms">

        </div>
      </div>
    </footer>
  );
};

export default Footer;