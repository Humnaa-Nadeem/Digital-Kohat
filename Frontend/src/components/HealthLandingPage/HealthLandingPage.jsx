import "./HealthLandingPage.css";
import "react-icons";
import { MdLocalHospital, MdOutlineHealthAndSafety, MdMedicalServices } from "react-icons/md";
import { FaUserMd, FaNotesMedical, FaHeartbeat } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const HealthLandingPage = ({ id, Alldata }) => {

    // Getting the specfic data
    let [fltrdData] = Alldata.filter((v, i) => v.id === Number(id));

    // Navigation
    const navigate = useNavigate();

    if (!fltrdData) return <div>Loading...</div>;

    return (
        <section className="S_main_Sec">
            {/* GLASSMORPHISM HERO */}
            <section className="GlassHeroBG">
                <div className="GlassHeroBG-content">
                    <h1>Welcome to <strong>{fltrdData.name}</strong></h1>
                    <p className="GlassHeroBG-sub">{fltrdData.about}</p>
                    <button className="GlassHeroBG-btn" onClick={() => { navigate(-1) }}>Go Back</button>
                </div>
                <div className="blurShape s1"></div>
                <div className="blurShape s2"></div>
            </section>

            {/* ABOUT SECTION */}
            <section id="S_about" className="S_about">
                <div className="S_about-content">
                    <h2 className="SP_Sec_hd">About Us</h2>
                    <p>{fltrdData.description || fltrdData.about}</p>
                </div>
                <img src={fltrdData.aboutImage} alt="About Us" />
            </section>

            {/* SERVICES SECTION */}
            {fltrdData.services && (
                <section className="S_events SP_Sec">
                    <h2 className="SP_Sec_hd">Our Services</h2>
                    <div className="S_event-list">
                        {fltrdData.services.map((service, index) => {
                            // Dynamic icon choice (basic fallback logic)
                            const Icon = index % 3 === 0 ? MdLocalHospital : index % 3 === 1 ? MdMedicalServices : FaHeartbeat;
                            return (
                                <div key={index} className="S_event-card">
                                    <Icon className="SP_Icon" />
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* QUICK INFO DASHBOARD */}
            <section className="QI-dashboard SP_Sec">
                <h2 className="dash-title SP_Sec_hd">Quick Info Dashboard</h2>
                <div className="dash-grid">
                    <div className="dash-card">
                        <h2>🏥 Basic Profile</h2>
                        <ul>
                            <li><strong>Name:</strong> {fltrdData.name}</li>
                            <li><strong>Type:</strong> {fltrdData.type}</li>
                            <li><strong>Location:</strong> {fltrdData.location}</li>
                        </ul>
                    </div>

                    {fltrdData.openingHours && (
                        <div className="dash-card">
                            <h2>⏰ Opening Hours</h2>
                            <ul>
                                <li><strong>Weekdays:</strong> {fltrdData.openingHours.weekdays}</li>
                                <li><strong>Weekends:</strong> {fltrdData.openingHours.weekends}</li>
                                <li><strong>Emergency:</strong> {fltrdData.openingHours.emergency}</li>
                            </ul>
                        </div>
                    )}

                    {fltrdData.contact && (
                        <div className="dash-card">
                            <h2>📞 Contact Info</h2>
                            <ul>
                                <li><strong>Phone:</strong> {fltrdData.contact.phone}</li>
                                <li><strong>Email:</strong> {fltrdData.contact.email}</li>
                                <li><strong>Website:</strong> {fltrdData.contact.website}</li>
                            </ul>
                        </div>
                    )}

                    {fltrdData.facilities && (
                        <div className="dash-card">
                            <h2>🏥 Facilities</h2>
                            <ul>
                                {fltrdData.facilities.map((f, i) => <li key={i}>{f}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            </section>

            {/* STAFF SECTION (Opt.) */}
            {fltrdData.staff && fltrdData.staff.length > 0 && (
                <section id="S_staff" className="S_staff SP_Sec">
                    <h2 className="SP_Sec_hd">Our Specialists</h2>
                    <div className="staff-crd-cont">
                        {fltrdData.staff.map((staff, index) => (
                            <div key={index} className="staff-card">
                                <img src={staff.image} alt={staff.name} />
                                <h3>{staff.name}</h3>
                                <p>{staff.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* GALLERY */}
            {fltrdData.gallery && (
                <section id="S_gallery" className="S_gallery SP_Sec">
                    <h2 className="SP_Sec_hd">Gallery</h2>
                    <div className="S_gallery-flex">
                        {fltrdData.gallery.map((img, index) => <img key={index} src={img} alt="" />)}
                    </div>
                </section>
            )}

            {/* REACH US */}
            <section className="S_reach-us SP_Sec">
                <h2 className="SP_Sec_hd">Reach Us</h2>
                <p>We’re here to help! Connect with us through any of the following channels:</p>
                <div className="S_contact-cards">
                    <div className="S_card">
                        <i>✉</i>
                        <h3>Email</h3>
                        <p><a href={`mailto:${fltrdData.contact?.email}`}>{fltrdData.contact?.email || "N/A"}</a></p>
                    </div>
                    <div className="S_card">
                        <i>📞</i>
                        <h3>Phone</h3>
                        <p><a href={`tel:${fltrdData.contact?.phone}`}>{fltrdData.contact?.phone || "N/A"}</a></p>
                    </div>
                    <div className="S_card">
                        <i>🌐</i>
                        <h3>Website</h3>
                        <p><a href={fltrdData.contact?.website} target="_blank" rel="noopener noreferrer">{fltrdData.contact?.website || "N/A"}</a></p>
                    </div>
                </div>
            </section>
        </section>
    )
};
