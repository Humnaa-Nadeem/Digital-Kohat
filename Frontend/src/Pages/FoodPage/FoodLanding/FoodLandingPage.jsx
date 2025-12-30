import "./FoodLandingPage.css";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaEnvelope, FaGlobe, FaClock, FaStar, FaMapMarkerAlt } from "react-icons/fa";

export const FoodLandingPage = ({ id, Alldata }) => {
    const navigate = useNavigate();

    // Getting the specific data
    const item = Alldata.find(v => v.id === Number(id));

    if (!item) return <div className="error-msg">Information not found.</div>;

    return (
        <section className="FoodLanding">
            {/* HERO SECTION */}
            <div className="FoodHero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${item.img || item.aboutImage})` }}>
                <div className="HeroContent">
                    <span className="category-tag">{item.type}</span>
                    <h1>{item.name}</h1>
                    <p className="tagline">{item.tagline}</p>
                    <div className="hero-actions">
                        <button className="back-btn" onClick={() => navigate(-1)}>Back to List</button>
                    </div>
                </div>
            </div>

            <div className="FoodContainer">
                {/* ABOUT & QUICK INFO */}
                <div className="MainGrid">
                    <div className="InfoSection">
                        <h2 className="section-title">About Us</h2>
                        <p className="about-text">{item.about}</p>

                        <div className="QuickInfoGrid">
                            <div className="InfoCard">
                                <FaClock className="info-icon" />
                                <div>
                                    <h4>Timings</h4>
                                    <p>{item.quickInfo?.timings?.timing || "Contact for timings"}</p>
                                </div>
                            </div>
                            <div className="InfoCard">
                                <FaMapMarkerAlt className="info-icon" />
                                <div>
                                    <h4>Location</h4>
                                    <p>{item.quickInfo?.basicProfile?.location || "Kohat"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ContactSidebar">
                        <h3>Book a Table / Order</h3>
                        <div className="ContactLinks">
                            <a href={`tel:${item.contact?.phone}`} className="contact-item">
                                <FaPhone /> {item.contact?.phone}
                            </a>
                            <a href={`mailto:${item.contact?.email}`} className="contact-item">
                                <FaEnvelope /> {item.contact?.email}
                            </a>
                            <a
                                href={item.contact?.website || "#"}
                                onClick={(e) => { if (!item.contact?.website) e.preventDefault(); }}
                                target={item.contact?.website ? "_blank" : "_self"}
                                rel="noreferrer"
                                className="contact-item"
                                style={{ cursor: item.contact?.website ? "pointer" : "default", opacity: item.contact?.website ? 1 : 0.6 }}
                            >
                                <FaGlobe /> {item.contact?.website ? "Website" : "Website (Not Available)"}
                            </a>
                        </div>
                        <div className="rating-box">
                            <FaStar className="star-icon" />
                            <span>4.8 / 5.0</span>
                            <small>(Based on 150+ reviews)</small>
                        </div>
                    </div>
                </div>

                {/* MENU / SPECIALTIES SECTION */}
                <section className="MenuSection">
                    <h2 className="section-title">Specialties & Facilities</h2>
                    <div className="ChipsContainer">
                        {item.quickInfo?.facilities?.map((f, i) => (
                            <span key={i} className="facility-chip">{f}</span>
                        ))}
                        {item.quickInfo?.extraActivities?.map((a, i) => (
                            <span key={i} className="activity-chip">{a}</span>
                        ))}
                    </div>
                </section>

                {/* GALLERY SECTION */}
                <section className="GallerySection">
                    <h2 className="section-title">Photo Gallery</h2>
                    <div className="GalleryGrid">
                        {item.gallery?.map((img, i) => (
                            <div key={i} className="gallery-item">
                                <img src={img} alt={`${item.name} gallery ${i}`} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* STAFF SECTION */}
                {item.staff && item.staff.length > 0 && (
                    <section className="StaffSection">
                        <h2 className="section-title">Meet Our Team</h2>
                        <div className="StaffGrid">
                            {item.staff.map((member, i) => (
                                <div key={i} className="StaffCard">
                                    <img src={member.image} alt={member.name} />
                                    <div className="StaffInfo">
                                        <h4>{member.name}</h4>
                                        <p>{member.subject || member.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* REVIEWS SECTION */}
                <section className="ReviewsSection">
                    <h2 className="section-title">Customer Reviews</h2>
                    <div className="ReviewsGrid">
                        {item.quickInfo?.parentReviews?.map((rev, i) => (
                            <div key={i} className="ReviewCard">
                                <p>"{rev}"</p>
                                <div className="stars">
                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    );
};
