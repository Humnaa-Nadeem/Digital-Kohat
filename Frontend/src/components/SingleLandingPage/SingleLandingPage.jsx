import "./SingleLandingPage.css";
import "react-icons";
import { MdScience } from "react-icons/md";
import { FaArtstation, } from "react-icons/fa";
import { FaBaseball, } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RatingSection } from "../RatingSection/RatingSection";
import { GetTheSchlData } from "../../ApiCalls/ApiCalls";
import { ToastContainer } from "react-toastify";
export const SingleLandingPage = ({ id, Alldata }) => {

    // Getting the specfic data
    let [fltrdData, setFltedData] = useState(undefined);
    let [DataOf, setDataOf] = useState("StoreFolder");
    useEffect(() => {
        if (id.length > 10) {
            GetTheSchlData(id, setFltedData, setDataOf)
        } else {
            setDataOf("StoreFolder")
            setFltedData(Alldata.filter((v, i) => v.id === Number(id)));
        }
    }, []);

    // Navigation
    const navigate = useNavigate();

    return (
        <>
            {
                (fltrdData && DataOf === "StoreFolder")
                    ?
                    <section className="S_main_Sec">
                        {/* GLASSMORPHISM HERO */}
                        <section className="GlassHeroBG">
                            <div className="GlassHeroBG-content">
                                <h1>Welcome to <strong>{fltrdData[0].name}</strong></h1>
                                <p className="GlassHeroBG-sub">{fltrdData[0].tagline}</p>
                                <button className="GlassHeroBG-btn" onClick={() => { navigate(-1) }}>Go Back</button>
                            </div>
                            <div className="blurShape s1"></div>
                            <div className="blurShape s2"></div>
                        </section>
                        {/* ABOUT SECTION */}
                        <section id="S_about" className="S_about">
                            <div className="S_about-content">
                                <h2 className="SP_Sec_hd">About Us</h2>
                                <p>{fltrdData[0].about}</p></div>
                            <img src={fltrdData[0].aboutImage} alt="About Us" />
                        </section>

                        {/* STAFF SECTION */}
                        <section id="S_staff" className="S_staff SP_Sec">
                            <h2 className="SP_Sec_hd">Our Staff</h2>
                            <div className="staff-crd-cont">
                                {fltrdData[0].staff.map((staff, index) => (
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
                                {fltrdData[0].events.map((event, index) => {
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
                                        <li><strong>{fltrdData.type} Name:</strong> {fltrdData[0].quickInfo.basicProfile.name}</li>
                                        <li><strong>Location:</strong> {fltrdData[0].quickInfo.basicProfile.location}</li>
                                        <li><strong>Type:</strong> {fltrdData[0].quickInfo.basicProfile.type}</li>
                                    </ul>
                                </div>
                                <div className="dash-card">
                                    <h2>📋 Administration Info</h2>
                                    <ul>
                                        <li>Principal: {fltrdData[0].quickInfo.administration.principal}</li>
                                        <li>Admin Office: {fltrdData[0].quickInfo.administration.adminOffice}</li>
                                        <li>Phone: {fltrdData[0].quickInfo.administration.phone}</li>
                                        <li>Email: {fltrdData[0].quickInfo.administration.email}</li>
                                        <li>Website: {fltrdData[0].quickInfo.administration.website}</li>
                                    </ul>
                                </div>
                                <div className="dash-card">
                                    <h2>👨‍🎓 Students & Staff</h2>
                                    <ul>
                                        <li>Total Students: {fltrdData[0].quickInfo.studentsStaff.totalStudents}</li>
                                        <li>Total Teachers: {fltrdData[0].quickInfo.studentsStaff.totalTeachers}</li>
                                        <li>Qualification: {fltrdData[0].quickInfo.studentsStaff.qualification}</li>
                                        <li>Ratio: {fltrdData[0].quickInfo.studentsStaff.ratio}</li>
                                        <li>Medium: {fltrdData[0].quickInfo.studentsStaff.medium}</li>
                                    </ul>
                                </div>
                                <div className="dash-card">
                                    <h2>🏫 Facilities</h2>
                                    <ul>{fltrdData[0].quickInfo.facilities.map((f, i) => <li key={i}>{f}</li>)}</ul>
                                </div>
                                <div className="dash-card">
                                    <h2>💰 Fees Structure</h2>
                                    <ul>
                                        <li>Monthly Fee: {fltrdData[0].quickInfo.fees.monthlyFee}</li>
                                        <li>Admission Fee: {fltrdData[0].quickInfo.fees.admissionFee}</li>
                                        <li>Annual Charges: {fltrdData[0].quickInfo.fees.annualCharges}</li>
                                    </ul>
                                </div>
                                <div className="dash-card">
                                    <h2>📈 Results & Performance</h2>
                                    <ul>
                                        <li>Pass Percentage: {fltrdData[0].quickInfo.resultsPerformance.passPercentage}</li>
                                        <li>Top Achievers: {fltrdData[0].quickInfo.resultsPerformance.topAchievers}</li>
                                        <li>Board Results: {fltrdData[0].quickInfo.resultsPerformance.boardResults}</li>
                                    </ul>
                                </div>
                                <div className="dash-card">
                                    <h2>⏰ {fltrdData.type} Timings</h2>
                                    <ul>
                                        <li>{fltrdData.type} Timing : {fltrdData[0].quickInfo.timings.timing}</li>
                                        <li>Break: {fltrdData[0].quickInfo.timings.break}</li>
                                        <li>{fltrdData[0].quickInfo.timings.seasonalSchedules ? "Seasonal Schedules" : ""}</li>
                                    </ul>
                                </div>
                                <div className="dash-card">
                                    <h2>⚽ Extra Activities</h2>
                                    <ul>{fltrdData[0].quickInfo.extraActivities.map((act, i) => <li key={i}>{act}</li>)}</ul>
                                </div>
                                <div className="dash-card">
                                    <h2>⭐ Parent Reviews</h2>
                                    {fltrdData[0].quickInfo.parentReviews.map((rev, i) => <blockquote key={i}>{rev}</blockquote>)}
                                </div>
                            </div>
                        </section>

                        {/* GALLERY */}
                        <section id="S_gallery" className="S_gallery SP_Sec">
                            <h2 className="SP_Sec_hd">Gallery</h2>
                            <div className="S_gallery-flex">
                                {fltrdData[0].gallery.map((img, index) => <img key={index} src={img} alt="" />)}
                            </div>
                        </section>

                        {/* RATE US */}
                        <RatingSection ratingData={fltrdData.ratingData} />
                    </section>
                    :
                    <>
                        {
                            (DataOf === "Db")
                                ?
                                <section className="S_main_Sec">
                                    <ToastContainer />
                                    {/* GLASSMORPHISM HERO */}
                                    <section className="GlassHeroBG" style={{ background: `linear-gradient(135deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.35)), url("${fltrdData.bannerUrl}")`, }}>
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
                                                return (
                                                    <div className="event-card" key={index}>
                                                        <div className="event-header">
                                                            <span className="event-category">{event.catagory}</span>
                                                            <h2 className="event-title">{event.title}</h2>
                                                        </div>
                                                        <div className="event-body">
                                                            <div className="event-row">
                                                                <span className="SPlabel">Location</span>
                                                                <span className="value">{event.location}</span>
                                                            </div>
                                                            <div className="event-row">
                                                                <span className="SPlabel">Date</span>
                                                                <span className="value">{event.time}</span>
                                                            </div>
                                                            <div className="event-row">
                                                                <span className="SPlabel">Audience</span>
                                                                <span className="value badge">{event.Audience}</span>
                                                            </div>

                                                        </div>
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
                                                    {
                                                        Object.entries(fltrdData.quickInfo.administration).map(([key, value]) => (
                                                            <li key={key}>
                                                                {key.replace(/_/g, " ")} : {String(value)}
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                            <div className="dash-card">
                                                <h2>👨‍🎓 Students & Staff</h2>
                                                <ul>
                                                    {
                                                        Object.entries(fltrdData.quickInfo.studentsStaff).map(([key, value]) => (
                                                            <li key={key}>
                                                                {key.replace(/_/g, " ")} : {String(value)}
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                            <div className="dash-card">
                                                <h2>🏫 Facilities</h2>
                                                <ul>
                                                    {fltrdData.quickInfo.facilities.map((f, i) => <li key={i}>{f.replace(/_/g, " ")}</li>)}
                                                </ul>
                                            </div>
                                            <div className="dash-card">
                                                <h2>📈 Results & Performance</h2>
                                                <ul>
                                                    {
                                                        Object.entries(fltrdData.quickInfo.resultsPerformance).map(([key, value]) => (
                                                            <li key={key}>
                                                                {key.replace(/_/g, " ")} : {String(value)}
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                            <div className="dash-card">
                                                <h2>⏰ {fltrdData.type} Timings</h2>
                                                <ul>
                                                    {
                                                        Object.entries(fltrdData.quickInfo.timings).map(([key, value]) => (
                                                            <li key={key}>
                                                                {key} : {String(value)}
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                            <div className="dash-card">
                                                <h2>⚽ Extra Activities</h2>
                                                <ul>
                                                    {fltrdData.quickInfo.extraActivities.map((act, i) => <li key={i}>{act.replace(/_/g, " ")}</li>)}
                                                </ul>
                                            </div>
                                            <div className="dash-card">
                                                <h2>⭐ Parent Reviews</h2>
                                                {fltrdData.quickInfo.parentReviews.map((rev, i) => <blockquote key={i}>{rev}</blockquote>)}
                                            </div>
                                        </div>
                                    </section>

                                    {/* Fee Structure */}
                                    <section id="S_gallery" className="S_gallery SP_Sec">
                                        <h2 className="SP_Sec_hd">Fee Structure</h2>
                                        <table className="feeTable">
                                            <thead>
                                                <tr>
                                                    <th>Class</th>
                                                    <th>Monthly Fee</th>
                                                    <th>Annual Fee</th>
                                                    <th>Admission Fee</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(fltrdData.fee)
                                                    ?
                                                    fltrdData.fee.map((v, i) =>
                                                        <tr key={i}>
                                                            <td>{v.Class}</td>
                                                            <td>{v.MonthlyFee}</td>
                                                            <td>{v.AnnualFee}</td>
                                                            <td>{v.AdmissionFee}</td>
                                                        </tr>
                                                    )
                                                    :
                                                    <></>
                                                }
                                            </tbody>
                                        </table>
                                    </section>

                                    {/* GALLERY */}
                                    <section id="S_gallery" className="S_gallery SP_Sec">
                                        <h2 className="SP_Sec_hd">Gallery</h2>
                                        <div className="S_gallery-flex">
                                            {fltrdData.gallery.map((img, index) => <img key={index} src={img} alt="" />)}
                                        </div>
                                    </section>

                                    {/* RATE US */}
                                    <RatingSection ratingData={fltrdData.ratingData} id={id} />
                                </section>
                                :
                                // PENDING INSTITUTE PAGE :
                                <section className="PdInstWrapper">
                                    <ToastContainer />

                                    <div className="PdInstCard">
                                        <div className="PdInstIcon">⏳</div>

                                        <h2 className="PdInstTitle">
                                            Institute is Under Processing
                                        </h2>

                                        <p className="PdInstDesc">
                                            After completion of the verification process, this institute
                                            will become visible to the public.
                                        </p>

                                        <button
                                            className="PdInstBtn"
                                            onClick={() => navigate(-1)}
                                        >
                                            Go Back
                                        </button>
                                    </div>
                                </section>

                        }
                    </>

            }
        </>
    )
};