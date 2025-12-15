import React, { useEffect } from "react";
import "./ContactUs.css";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaUser,
  FaRegEnvelope,
  FaPenFancy,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

export const Contactus = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );
    document.querySelectorAll(".fade-section").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent successfully!");
  };

  return (
    <div className="contactus-section">
      <Navbar/>

      {/* HERO */}
      <div className="contact-hero fade-section">
        <h1>Contact Us</h1>
        <p>Reach out to us anytime. We’re here to help and provide the best support.</p>
      </div>

      {/* FORM */}
      <div className="contact-form-section fade-section">
        <h2>Send Us a Message</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-icon">
              <FaUser />
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="input-icon">
              <FaRegEnvelope />
              <input type="email" placeholder="Your Email" required />
            </div>
          </div>

          <div className="input-icon full-width">
            <FaPenFancy />
            <input type="text" placeholder="Subject" required />
          </div>

          <div className="input-icon full-width">
            <FaRegEnvelope />
            <textarea placeholder="Your Message" rows="5" required></textarea>
          </div>

          <button type="submit" className="submit-btn">
            <span className="btn-text">Send Message</span>
            <span className="btn-anim"></span>
          </button>
        </form>
      </div>

      {/* CONTACT INFO CARDS */}
      <div className="contact-info-section fade-section">
        <h2>Contact Info</h2>
        <div className="info-cards">
          <div className="info-card">
            <FaMapMarkerAlt className="info-icon" />
            <h3>Address</h3>
            <p>Bannu Rd, Kohat University of Science & Technology, KPK, Pakistan</p>
          </div>
          <div className="info-card">
            <FaPhoneAlt className="info-icon" />
            <h3>Phone</h3>
            <p>+92 922 554 578</p>
          </div>
          <div className="info-card">
            <FaEnvelope className="info-icon" />
            <h3>Email</h3>
            <p>info@kust.edu.pk</p>
          </div>
          <div className="info-card">
            <FaClock className="info-icon" />
            <h3>Hours</h3>
            <p>Mon-Fri: 9:00 AM - 5:00 PM</p>
          </div>
        </div>
      </div>

      {/* MAP */}
      <div className="contact-map-section fade-section">
        <h2>Our Location</h2>
        <div className="map-container">
          <iframe
            title="KUST Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.157596916694!2d71.44370301472682!3d33.523287952867086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d8ec241a467237%3A0xf7409abf0918f110!2sKohat%20University%20of%20Science%20%26%20Technology!5e0!3m2!1sen!2s!4v1468696336911!5m2!1sen!2s"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* FAQ / QUICK LINKS */}
      <div className="contact-faq-section fade-section">
        <h2>Quick Help</h2>
        <div className="faq-cards">
          <div className="faq-card">
            <h3>Admissions</h3>
            <p>Need help with admission procedures? Contact our admission office directly.</p>
          </div>
          <div className="faq-card">
            <h3>Departments</h3>
            <p>Want to reach a department? Check our directory for direct contact info.</p>
          </div>
          <div className="faq-card">
            <h3>Support</h3>
            <p>Facing technical issues? Our IT support team is here to help.</p>
          </div>
        </div>
      </div>

      {/* SOCIAL MEDIA / CONNECT */}
      <div className="contact-social-section fade-section">
        <h2>Connect With Us</h2>
        <div className="social-icons">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaLinkedinIn /></a>
          <a href="#"><FaInstagram /></a>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Contactus;
