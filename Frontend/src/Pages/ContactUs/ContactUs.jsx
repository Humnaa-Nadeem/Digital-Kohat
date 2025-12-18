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
  FaMobileAlt,
  FaLaptop,
} from "react-icons/fa";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const ContactUs = () => {
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
    <div className="contactus-wrapper">
      <Navbar />

      {/* HERO SECTION */}
      <section className="contact-hero fade-section">
        <div className="hero-left">
          <h1>Contact Us</h1>
          <p>Reach out anytime. We’re here to provide the best support and guidance.</p>
          <button className="hero-btn">Call Us Now</button>
        </div>
        <div className="hero-right">
          <div className="hero-phone">
            <FaMobileAlt />
          </div>
        </div>

        {/* 7 Floating Hero Icons */}
        <FaLaptop className="hero-icon icon1" />
        <FaEnvelope className="hero-icon icon2" />
        <FaMobileAlt className="hero-icon icon3" />
        <FaRegEnvelope className="hero-icon icon4" />
        <FaPenFancy className="hero-icon icon5" />
        <FaPhoneAlt className="hero-icon icon6" />
        <FaClock className="hero-icon icon7" />
      </section>

      {/* CONTACT FORM */}
      <section className="contact-form-wrapper fade-section">
        <h2>Send Us a Message</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-input">
              <FaUser />
              <input type="text" placeholder="First Name" required />
            </div>
            <div className="form-input">
              <FaUser />
              <input type="text" placeholder="Last Name" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-input">
              <FaRegEnvelope />
              <input type="email" placeholder="Email Address" required />
            </div>
            <div className="form-input">
              <FaPhoneAlt />
              <input type="text" placeholder="Contact Number" required />
            </div>
          </div>
          <div className="form-input full-width">
            <FaPenFancy />
            <input type="text" placeholder="Subject" required />
          </div>
          <div className="form-input full-width">
            <FaRegEnvelope />
            <textarea placeholder="Your Message" rows="5" required></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="contact-info-wrapper fade-section">
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
      </section>

      {/* MAP */}
      <section className="contact-map-wrapper fade-section">
        <h2>Our Location</h2>
        <div className="map-container">
          <iframe
            title="KUST Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.157596916694!2d71.44370301472682!3d33.523287952867086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d8ec241a467237%3A0xf7409abf0918f110!2sKohat%20University%20of%20Science%20%26%20Technology!5e0!3m2!1sen!2s!4v1468696336911!5m2!1sen!2s"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>
        {/* EXTRA ANIMATED SECTION */}
      <section className="contact-extra-wrapper fade-section">
        <h2>Get In Touch Today!</h2>
        <p>We are ready to assist you with any inquiries. Don’t hesitate to contact us.</p>
        <div className="extra-animation"></div>
      </section>

      {/* FAQ */}
      <section className="contact-faq-wrapper fade-section">
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
      </section>

      {/* SOCIAL */}
      <section className="contact-social-wrapper fade-section">
        <h2>Connect With Us</h2>
        <div className="social-icons">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaLinkedinIn /></a>
          <a href="#"><FaInstagram /></a>
        </div>
      </section>

    

      <Footer />
    </div>
  );
};

export default ContactUs;
