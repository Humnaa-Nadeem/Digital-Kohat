import { useEffect } from "react";
import "./Aboutus.css";
import { FaUsers, FaCity, FaClipboardCheck, FaLaptopCode, FaHandsHelping, FaShieldAlt } from "react-icons/fa";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

export const Aboutus = () => {

  // Intersection Observer for fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll(".fade-section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const valuesData = [
    { icon: <FaUsers />, title: "Citizen-Centric", desc: "We prioritize citizens' needs, ensuring transparency and easy access to all services, making information clear and available." },
    { icon: <FaCity />, title: "Smart City Governance", desc: "Our Digital Hub provides a platform for efficient governance, connecting city departments and streamlining processes." },
    { icon: <FaClipboardCheck />, title: "Accountability", desc: "We continuously monitor and evaluate services to ensure quality, transparency, and trust in public operations." },
    { icon: <FaLaptopCode />, title: "Technology Driven", desc: "We leverage cutting-edge technologies to innovate and provide citizens with a seamless and effective digital experience." },
    { icon: <FaHandsHelping />, title: "Collaboration", desc: "Working closely with local governments, we empower citizens with real-time data and access to services." },
    { icon: <FaShieldAlt />, title: "Safety & Privacy", desc: "Our platform is secure and reliable, ensuring citizens' data privacy while enhancing safety and convenience." }
  ];

  return (
    <div className="aboutus-section">
      <Navbar/>

      {/* ABOUT US */}
      <div className="section aboutus-intro fade-section">
        <div className="section-image">
          <img src="https://images.pexels.com/photos/6147357/pexels-photo-6147357.jpeg" loading="lazy" alt="About" />
        </div>
        <div className="section-text">
          <h2>ABOUT US</h2>
          <p>
            We are the architects of Digital Smart Cities hub, transforming developing cities from scattered data to easily accessible smart cities. 
            Our platform is the central Digital Smart City Hub. It solves the common problems of poor communication and scattered information. 
            We give citizens one reliable online place for all important services, such as travel, voter lists, school districts, and local contacts. 
            We want our work in cities to be efficient and prove that digital change is possible and effective everywhere. 
            We provide smart city life clear and simple for everyone.
          </p>
        </div>
      </div>
<br />
      {/* VISION */}
      <div className="section vision-section fade-section">
        <div className="section-text">
          <h2>VISION</h2>
          <p>
            We envision digitally connected cities where citizens enjoy seamless access to services, improved governance, and enhanced quality of life through innovation.
          </p>
        </div>
        <div className="section-image">
          <img src="https://images.pexels.com/photos/6147357/pexels-photo-6147357.jpeg" loading="lazy"  alt="Vision" />
        </div>
      </div>
<br />
      {/* MISSION */}
      <div className="section mission-section fade-section">
        <div className="section-image">
          <img src="https://images.pexels.com/photos/6147357/pexels-photo-6147357.jpeg" loading="lazy"  alt="Mission" />
        </div>
        <div className="section-text">
          <h2>MISSION</h2>
          <p>
            Our mission is to create the leading centralized Digital Information Gateway for each community we serve. 
            We achieve this through close collaboration with local governments in collecting, verifying, and presenting all important city data in one location. 
            This simple approach ensures transparency, empowers citizens, and enhances local governance efficiency. 
            We continuously innovate to make the platform the easiest and most accurate way to connect residents with city resources while improving quality of life.
          </p>
        </div>
      </div>

      {/* VALUES */}
      <div className="values-section fade-section">
        <h2>VALUES</h2>
        <div className="values-grid">
          {valuesData.map((value, index) => (
            <div className="value-card" key={index}>
              <div className="value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};
