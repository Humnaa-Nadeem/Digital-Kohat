import "./SingleLandingPage.css";
import "react-icons";
import { MdScience } from "react-icons/md";
import { FaArtstation, } from "react-icons/fa";
import { FaBaseball, } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
export const SingleLandingPage = ({ id, Alldata }) => {

    // Getting the specfic data
    let [fltrdData] = Alldata.filter((v, i) => v.id === Number(id));

    // Navigation
    const navigate = useNavigate();

    return (
        <section className="S_main_Sec">
            {/* GLASSMORPHISM HERO */}
            <section className="GlassHeroBG">
                <div className="GlassHeroBG-content">
                    <h1>Welcome to <strong>{fltrdData.name}</strong></h1>
                    <p className="GlassHeroBG-sub">{fltrdData.tagline}</p>
                    <button className="GlassHeroBG-btn" onClick={() => { navigate(-1) }}>Go Back</button>
                </div>
                <div className="blurShape s1"></div>
                <div className="blurShape s2"></div>
            </section>
            {/* ABOUT SECTION */}
            <section id="S_about" className="S_about">
                <div className="S_about-content">
                    <h2 className="SP_Sec_hd">About Us</h2>
                    <p>{fltrdData.about}</p></div>
                <img src={fltrdData.aboutImage} alt="About Us" />
            </section>

            {/* STAFF SECTION */}
            <section id="S_staff" className="S_staff SP_Sec">
                <h2 className="SP_Sec_hd">Our Staff</h2>
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

            {/* EVENTS SECTION */}
            <section className="S_events SP_Sec">
                <h2 className="SP_Sec_hd">Upcoming Events</h2>
                <div className="S_event-list">
                    {fltrdData.events.map((event, index) => {
                        const Icon = event.icon === "MdScience" ? MdScience : event.icon === "FaArtstation" ? FaArtstation : FaBaseball;
                        return (
                            <div key={index} className="S_event-card">
                                <Icon className="SP_Icon" />
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* QUICK INFO DASHBOARD */}
            <section className="QI-dashboard SP_Sec">
                <h2 className="dash-title SP_Sec_hd">Quick Info Dashboard</h2>
                <div className="dash-grid">
                    <div className="dash-card">
                        <h2>🏫 Basic Profile</h2>
                        <ul>
                            <li><strong>{fltrdData.type} Name:</strong> {fltrdData.quickInfo.basicProfile.name}</li>
                            <li><strong>Location:</strong> {fltrdData.quickInfo.basicProfile.location}</li>
                            <li><strong>Type:</strong> {fltrdData.quickInfo.basicProfile.type}</li>
                        </ul>
                    </div>
                    <div className="dash-card">
                        <h2>📋 Administration Info</h2>
                        <ul>
                            <li>Principal: {fltrdData.quickInfo.administration.principal}</li>
                            <li>Admin Office: {fltrdData.quickInfo.administration.adminOffice}</li>
                            <li>Phone: {fltrdData.quickInfo.administration.phone}</li>
                            <li>Email: {fltrdData.quickInfo.administration.email}</li>
                            <li>Website: {fltrdData.quickInfo.administration.website}</li>
                        </ul>
                    </div>
                    <div className="dash-card">
                        <h2>👨‍🎓 Students & Staff</h2>
                        <ul>
                            <li>Total Students: {fltrdData.quickInfo.studentsStaff.totalStudents}</li>
                            <li>Total Teachers: {fltrdData.quickInfo.studentsStaff.totalTeachers}</li>
                            <li>Qualification: {fltrdData.quickInfo.studentsStaff.qualification}</li>
                            <li>Ratio: {fltrdData.quickInfo.studentsStaff.ratio}</li>
                            <li>Medium: {fltrdData.quickInfo.studentsStaff.medium}</li>
                        </ul>
                    </div>
                    <div className="dash-card">
                        <h2>🏫 Facilities</h2>
                        <ul>{fltrdData.quickInfo.facilities.map((f, i) => <li key={i}>{f}</li>)}</ul>
                    </div>
                    <div className="dash-card">
                        <h2>💰 Fees Structure</h2>
                        <ul>
                            <li>Monthly Fee: {fltrdData.quickInfo.fees.monthlyFee}</li>
                            <li>Admission Fee: {fltrdData.quickInfo.fees.admissionFee}</li>
                            <li>Annual Charges: {fltrdData.quickInfo.fees.annualCharges}</li>
                        </ul>
                    </div>
                    <div className="dash-card">
                        <h2>📈 Results & Performance</h2>
                        <ul>
                            <li>Pass Percentage: {fltrdData.quickInfo.resultsPerformance.passPercentage}</li>
                            <li>Top Achievers: {fltrdData.quickInfo.resultsPerformance.topAchievers}</li>
                            <li>Board Results: {fltrdData.quickInfo.resultsPerformance.boardResults}</li>
                        </ul>
                    </div>
                    <div className="dash-card">
                        <h2>⏰ {fltrdData.type} Timings</h2>
                        <ul>
                            <li>{fltrdData.type} Timing : {fltrdData.quickInfo.timings.timing}</li>
                            <li>Break: {fltrdData.quickInfo.timings.break}</li>
                            <li>{fltrdData.quickInfo.timings.seasonalSchedules ? "Seasonal Schedules" : ""}</li>
                        </ul>
                    </div>
                    <div className="dash-card">
                        <h2>⚽ Extra Activities</h2>
                        <ul>{fltrdData.quickInfo.extraActivities.map((act, i) => <li key={i}>{act}</li>)}</ul>
                    </div>
                    <div className="dash-card">
                        <h2>⭐ Parent Reviews</h2>
                        {fltrdData.quickInfo.parentReviews.map((rev, i) => <blockquote key={i}>{rev}</blockquote>)}
                    </div>
                </div>
            </section>

            {/* GALLERY */}
            <section id="S_gallery" className="S_gallery SP_Sec">
                <h2 className="SP_Sec_hd">Gallery</h2>
                <div className="S_gallery-flex">
                    {fltrdData.gallery.map((img, index) => <img key={index} src={img} alt="" />)}
                </div>
            </section>

            {/* REACH US */}
            <section className="S_reach-us SP_Sec">
                <h2 className="SP_Sec_hd">Reach Us</h2>
                <p>We’re here to help! Connect with us through any of the following channels:</p>
                <div className="S_contact-cards">
                    <div className="S_card">
                        <i>✉</i>
                        <h3>Email</h3>
                        <p><a href={`mailto:${fltrdData.contact.email}`}>{fltrdData.contact.email}</a></p>
                    </div>
                    <div className="S_card">
                        <i>📞</i>
                        <h3>Phone</h3>
                        <p><a href={`tel:${fltrdData.contact.phone}`}>{fltrdData.contact.phone}</a></p>
                    </div>
                    <div className="S_card">
                        <i>🌐</i>
                        <h3>Website</h3>
                        <p><a href={fltrdData.contact.website} target="_blank" rel="noopener noreferrer">{fltrdData.contact.website}</a></p>
                    </div>
                </div>
            </section>
        </section>
    )
};