import { useNavigate, useLocation } from "react-router-dom";
import {
  FaMapMarkerAlt, FaClock, FaHiking, FaHistory, FaShieldAlt,
  FaBus, FaCar, FaStar, FaLeaf, FaExternalLinkAlt, FaDollarSign,
  FaExclamationTriangle, FaCheckCircle, FaTimesCircle, FaWalking,
  FaCamera, FaShoppingBag, FaUsers, FaArrowLeft, FaSuitcase, FaMap
} from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../../utils/fixLeafletIcon";
import "./SingleLandingPage.css";

export const TourismLandingPage = ({ listing: propListing }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  // Accept listing from either props (Guide sidebar) or state (category cards)
  const listing = propListing || state?.listing;

  if (!listing) return <div className="no-data"><FaExclamationTriangle /> <h2>Data not found. Please browse from categories.</h2><button onClick={() => navigate("/tourism")}>Back to Tourism</button></div>;

  const info = listing.commonInfo || {};
  const {
    basicInfo: basic = {},
    locationNavigation: locationNav = {},
    visitingInfo: visit = {},
    educationalInfo: edu = {},
    safetyInfo: safety = {},
    budgetInfo: budget = {},
    dosAndDonts = {},
    nearbyAttractions = [],
    thingsToDo = [],
    facilities = [],
    media = {}
  } = info;

  return (
    <section className="S_main_Sec">
      {/* GLASSMORPHISM HERO */}
      <section className="GlassHeroBG" style={{ backgroundImage: `url(${listing.bgImage || listing.img})` }}>
        <div className="GlassHeroBG-content">
          <span className="category-badge">{basic.category || listing.type}</span>
          <h1>Explore <strong>{listing.name}</strong></h1>
          <p className="GlassHeroBG-sub">{listing.tagline}</p>
          <div className="hero-rating-meta">
            <FaStar className="star-icon" /> {listing.rating} ({listing.reviewsCount} Reviews)
          </div>
          <button className="GlassHeroBG-btn" onClick={() => { navigate(-1) }}> <FaArrowLeft /> Go Back</button>
        </div>
        <div className="blurShape s1"></div>
        <div className="blurShape s2"></div>
      </section>

      {/* ABOUT SECTION */}
      <section id="S_about" className="S_about">
        <div className="S_about-content">
          <h2 className="SP_Sec_hd">About Destination</h2>
          <p>{basic.shortIntroduction || listing.about}</p>
        </div>
        <img src={listing.aboutImage} alt={listing.name} />
      </section>

      {/* QUICK INFO DASHBOARD (Mapping 11 fields) */}
      <section className="QI-dashboard SP_Sec">
        <h2 className="dash-title SP_Sec_hd">Tourism Information Dashboard</h2>
        <div className="dash-grid">
          {/* 1. Basic Profile */}
          <div className="dash-card">
            <h2>📍 Basic Information</h2>
            <ul>
              <li><strong>Name:</strong> {listing.name}</li>
              <li><strong>City/Area:</strong> {basic.city}</li>
              <li><strong>Category:</strong> {basic.category || listing.type}</li>
            </ul>
          </div>

          {/* 2 & 3. Location & Timings */}
          <div className="dash-card">
            <h2>⏰ Visiting Info</h2>
            <ul>
              <li><strong>Timings:</strong> {visit.openingTime} - {visit.closingTime}</li>
              <li><strong>Best Time:</strong> {visit.bestTimeOfDay}</li>
              <li><strong>Best Season:</strong> {visit.bestSeason}</li>
            </ul>
          </div>

          {/* Fees Structure */}
          <div className="dash-card">
            <h2>🎫 Entry & Fees</h2>
            <ul>
              <li><strong>Entry Fee:</strong> {visit.entryFee}</li>
              <li><strong>Budget Trip:</strong> {budget.familyVisitEstimate}</li>
            </ul>
          </div>

          {/* Location Navigation */}
          <div className="dash-card">
            <h2>🚗 How To Reach</h2>
            <ul>
              <li><strong>By Car:</strong> {locationNav.howToReach?.byCar}</li>
              <li><strong>Public:</strong> {locationNav.howToReach?.byPublicTransport}</li>
              <li><strong>Distance:</strong> {locationNav.distanceFromCityCenter}</li>
            </ul>
          </div>

          {/* Facilities */}
          <div className="dash-card">
            <h2>🏨 Facilities</h2>
            <ul className="scrollable-list">
              {facilities.map((f, i) => <li key={i}>• {f}</li>)}
            </ul>
          </div>

          {/* Safety Information */}
          <div className="dash-card">
            <h2>🛡 Safety & Rules</h2>
            <ul className="scrollable-list">
              <li><strong>Swimming:</strong> {safety.swimmingAllowed}</li>
              <li><strong>Warnings:</strong> {safety.warnings}</li>
            </ul>
          </div>

          {/* Educational Information */}
          <div className="dash-card">
            <h2>📖 Educational</h2>
            <ul className="scrollable-list">
              <li><strong>History:</strong> {edu.historicalBackground}</li>
              <li><strong>Significance:</strong> {edu.whyItMatters}</li>
            </ul>
          </div>

          {/* Nearby Attractions */}
          <div className="dash-card">
            <h2>🗺 Nearby Spots</h2>
            <ul className="scrollable-list">
              {nearbyAttractions.map((att, i) => <li key={i}>{att.name} ({att.distance})</li>)}
            </ul>
          </div>

          {/* Dos & Don'ts */}
          <div className="dash-card">
            <h2>⭐ Visitor Feedback</h2>
            <blockquote className="scrollable-list">
              "One of the best places in Kohat. Highly recommended!"
            </blockquote>
          </div>
        </div>
      </section>

      {/* THINGS TO DO (EVENTS STYLE) */}
      <section className="S_events SP_Sec">
        <h2 className="SP_Sec_hd">Things To Do</h2>
        <div className="S_event-list">
          {thingsToDo.map((act, index) => (
            <div key={index} className="S_event-card">
              <FaWalking className="SP_Icon" />
              <h3>{act}</h3>
              <p>Enjoy {act.toLowerCase()} at {listing.name}.</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="S_gallery" className="S_gallery SP_Sec">
        <h2 className="SP_Sec_hd">Gallery</h2>
        <div className="S_gallery-flex">
          {listing.gallery?.map((img, index) => <img key={index} src={img} alt="" />)}
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="S_map_Sec SP_Sec">
        <h2 className="SP_Sec_hd">Discover in Kohat</h2>
        <div className="map-wrapper">
          <MapContainer center={[33.5889, 71.4429]} zoom={13} scrollWheelZoom={false} className="leaflet-container-landing">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[33.5889, 71.4429]}>
              <Popup>
                <strong>Kohat, Pakistan</strong> <br />
                Explore {listing.name} and surrounding areas.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>

      {/* REACH US */}
      <section className="S_reach-us SP_Sec">
        <h2 className="SP_Sec_hd">Connect With Us</h2>
        <div className="S_contact-cards">
          <div className="S_card">
            <i><FaMapMarkerAlt /></i>
            <h3>Exact Location</h3>
            <p>{locationNav.exactLocation}</p>
          </div>
          <div className="S_card">
            <i><FaExternalLinkAlt /></i>
            <h3>Navigation</h3>
            <a href={locationNav.googleMap} target="" rel="noreferrer">Open in Google Maps</a>
          </div>
          <div className="S_card">
            <i><FaUsers /></i>
            <h3>Official Site</h3>
            <p>visit-kohat.gov.pk</p>
          </div>
        </div>
      </section>
    </section>
  );
};
