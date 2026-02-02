import "./SingleLandingPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RatingSection } from "../RatingSection/RatingSection";
import { GetTheSchlData } from "../../ApiCalls/ApiCalls";
import { ToastContainer } from "react-toastify";

export const SingleLandingPage = ({ id }) => {

    // ✅ Single source of truth
    const [pageData, setPageData] = useState(null);

    const navigate = useNavigate();

    // ✅ Correct data fetch
    useEffect(() => {
        GetTheSchlData(id, setPageData);
    }, [id]);

    return (
        (pageData)
            ?
            <section className="S_main_Sec">
                <ToastContainer />

                {/* HERO */}
                <section
                    className="GlassHeroBG"
                    style={{
                        background: `linear-gradient(135deg, rgba(0,0,0,.25), rgba(0,0,0,.35)),
                    url("${pageData.bannerUrl}")`,
                        backgroundPosition: "center",
                        backgroundSize: "cover"
                    }}
                >
                    <div className="GlassHeroBG-content">
                        <h1>Welcome to <strong>{pageData.name}</strong></h1>
                        <p className="GlassHeroBG-sub">{pageData.tagline}</p>
                        <button className="GlassHeroBG-btn" onClick={() => navigate(-1)}>
                            Go Back
                        </button>
                    </div>
                    <div className="blurShape s1"></div>
                    <div className="blurShape s2"></div>
                </section>

                {/* ABOUT */}
                <section className="S_about">
                    <div className="S_about-content">
                        <h2 className="SP_Sec_hd">About Us</h2>
                        <p>{pageData.about}</p>
                    </div>
                    <img src={pageData.aboutImage} alt="About Us" />
                </section>

                {/* STAFF */}
                <section className="S_staff SP_Sec">
                    <h2 className="SP_Sec_hd">Our Staff</h2>
                    <div className="staff-crd-cont">
                        {pageData.staff?.map((s, i) => (
                            <div key={i} className="staff-card">
                                <img src={s.image} alt={s.name} />
                                <h3>{s.name}</h3>
                                <p>{s.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* EVENTS */}
                <section className="S_events SP_Sec">
                    <h2 className="SP_Sec_hd">Upcoming Events</h2>
                    <div className="S_event-list">
                        {pageData.events?.map((e, i) => (
                            <div className="event-card" key={i}>
                                <div className="event-header">
                                    <span className="event-category">{e?.catagory}</span>
                                    <h2 className="event-title">{e?.title}</h2>
                                </div>
                                <div className="event-body">
                                    <div className="event-row">
                                        <span className="SPlabel">Location</span>
                                        <span>{e?.location}</span>
                                    </div>
                                    <div className="event-row">
                                        <span className="SPlabel">Date</span>
                                        <span>{e?.time}</span>
                                    </div>
                                    <div className="event-row">
                                        <span className="SPlabel">Audience</span>
                                        <span className="badge">{e?.Audience}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* QUICK INFO */}
                <section className="QI-dashboard SP_Sec">
                    <h2 className="SP_Sec_hd">Quick Info Dashboard</h2>

                    <div className="dash-grid">

                        {/* BASIC PROFILE */}
                        <div className="dash-card">
                            <h2>🏫 Basic Profile</h2>
                            <ul>
                                <li><strong>Name:</strong> {pageData.quickInfo?.basicProfile?.name}</li>
                                <li><strong>Location:</strong> {pageData.quickInfo?.basicProfile?.location}</li>
                                <li><strong>Type:</strong> {pageData.quickInfo?.basicProfile?.type}</li>
                            </ul>
                        </div>

                        {/* ADMINISTRATION */}
                        <div className="dash-card">
                            <h2>📋 Administration</h2>
                            <ul>
                                {Object.entries(pageData.quickInfo?.administration || {})
                                    .filter(([_, value]) =>
                                        value !== null &&
                                        value !== "" &&
                                        (!Array.isArray(value) || value.length > 0)
                                    )
                                    .map(([key, value]) => {
                                        // Check if this is the "others" array
                                        if (key.toLowerCase() === "others" && Array.isArray(value)) {
                                            return value.map((v, i) => (
                                                <li key={i}>
                                                    {v.label}: {v.value}
                                                </li>
                                            ));
                                        }

                                        // Normal key-value rendering
                                        return (
                                            <li key={key}>
                                                {key.replace(/_/g, " ")}: {String(value)}
                                            </li>
                                        );
                                    })
                                }

                            </ul>
                        </div>

                        {/* STUDENTS & STAFF */}
                        <div className="dash-card">
                            <h2>👨‍🎓 Students & Staff</h2>
                            <ul>
                                {Object.entries(pageData.quickInfo?.studentsStaff || {})
                                    .filter(([_, value]) =>
                                        value !== null &&
                                        value !== "" &&
                                        (!Array.isArray(value) || value.length > 0)
                                    )
                                    .map(([key, value]) => {
                                        // If key is "others" and value is array of objects
                                        if (key.toLowerCase() === "others" && Array.isArray(value)) {
                                            return value.map((v, i) => (
                                                <li key={i}>
                                                    {v.label}: {v.value}
                                                </li>
                                            ));
                                        }

                                        // Normal key-value rendering
                                        return (
                                            <li key={key}>
                                                {key.replace(/_/g, " ")}: {String(value)}
                                            </li>
                                        );
                                    })
                                }

                            </ul>
                        </div>

                        {/* FACILITIES */}
                        <div className="dash-card">
                            <h2>🏢 Facilities</h2>
                            <ul>
                                {pageData.quickInfo?.facilities?.map((f, i) => (
                                    <li key={i}>{f.replace(/_/g, " ")}</li>
                                ))}
                            </ul>
                        </div>

                        {/* RESULTS & PERFORMANCE */}
                        <div className="dash-card">
                            <h2>📈 Results & Performance</h2>
                            <ul>
                                {Object.entries(pageData.quickInfo?.resultsPerformance || {})
                                    .filter(([_, value]) =>
                                        value !== null &&
                                        value !== "" &&
                                        (!Array.isArray(value) || value.length > 0)
                                    )
                                    .map(([key, value]) => {
                                        // If the value is an array of objects (like "others")
                                        if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object") {
                                            return value.map((v, i) => (
                                                <li key={key + "-" + i}>
                                                    {v.label}: {v.value}
                                                </li>
                                            ));
                                        }

                                        // Normal key-value rendering
                                        return (
                                            <li key={key}>
                                                {key.replace(/_/g, " ")}: {String(value)}
                                            </li>
                                        );
                                    })
                                }

                            </ul>
                        </div>

                        {/* TIMINGS */}
                        <div className="dash-card">
                            <h2>⏰ Timings</h2>
                            <ul>
                                {Object.entries(pageData.quickInfo?.timings || {}).map(
                                    ([key, value]) => (
                                        <li key={key}>
                                            {key} : {String(value)}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                        {/* EXTRA ACTIVITIES */}
                        <div className="dash-card">
                            <h2>⚽ Extra Activities</h2>
                            <ul>
                                {pageData.quickInfo?.extraActivities?.map((act, i) => (
                                    <li key={i}>{act.replace(/_/g, " ")}</li>
                                ))}
                            </ul>
                        </div>

                        {/* PARENT REVIEWS */}
                        <div className="dash-card">
                            <h2>⭐ Parent Reviews</h2>
                            {pageData.quickInfo?.parentReviews?.map((rev, i) => (
                                <blockquote key={i}>{rev}</blockquote>
                            ))}
                        </div>

                    </div>
                </section>

                {/* FEES */}
                <section className="SP_Sec">
                    <h2 className="SP_Sec_hd">Fee Structure</h2>
                    <table className="feeTable">
                        <thead>
                            <tr>
                                <th>Class</th>
                                <th>Monthly</th>
                                <th>Annual</th>
                                <th>Admission</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageData.fee?.map((f, i) => (
                                <tr key={i}>
                                    <td>{f.Class}</td>
                                    <td>{f.MonthlyFee}</td>
                                    <td>{f.AnnualFee}</td>
                                    <td>{f.AdmissionFee}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* GALLERY */}
                <section className="S_gallery SP_Sec">
                    <h2 className="SP_Sec_hd">Gallery</h2>
                    <div className="S_gallery-flex">
                        {pageData.gallery?.map((img, i) => (
                            <img key={i} src={img} alt="" />
                        ))}
                    </div>
                </section>

                {/* RATING */}
                <RatingSection ratingData={pageData.ratingData} id={id} />
            </section>
            :
            <section className="S_main_Sec">
                {/* HERO */}
                <section
                    className="GlassHeroBG"
                    style={{
                        background: `linear-gradient(135deg, rgba(0,0,0,.25), rgba(0,0,0,.35)),`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        minHeight: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        textAlign: "center",
                        position: "relative"
                    }}
                >
                    <div className="GlassHeroBG-content">
                        <h1>Institute Under Processing</h1>
                        <p className="GlassHeroBG-sub">
                            This institute is currently being set up. Once all procedures are
                            complete, it will be available for public visits.
                        </p>
                        <button
                            className="GlassHeroBG-btn"
                            onClick={() => navigate(-1)}
                        >
                            Go Back
                        </button>
                    </div>
                    <div className="blurShape s1"></div>
                    <div className="blurShape s2"></div>
                </section>

                {/* INFO SECTION */}
                <section className="S_about">
                    <div className="S_about-content">
                        <h2 className="SP_Sec_hd">What's Happening?</h2>
                        <p>
                            Our team is working to complete all the necessary details for this
                            institute. Soon, you'll be able to explore the institute's profile,
                            staff, facilities, and more.
                        </p>
                    </div>
                    <img
                        src="https://images.pexels.com/photos/12593060/pexels-photo-12593060.jpeg"
                        alt="Under Construction"
                    />
                </section>
                
                {/* QUICK NOTE CARD */}
                <section className="QI-dashboard SP_Sec">
                    <h2 className="SP_Sec_hd">Quick Note</h2>
                    <div className="dash-grid">
                        <div className="dash-card" style={{ textAlign: "center" }}>
                            <h2>🚧 Under Construction</h2>
                            <p>
                                The institute is not yet publicly available. Once all admin
                                approvals and content setups are completed, this page will go live.
                            </p>
                            <p style={{ fontStyle: "italic", color: "#666" }}>
                                Thank you for your patience!
                            </p>
                        </div>
                    </div>
                </section>
            </section>
    )
}


































// import "./SingleLandingPage.css";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { RatingSection } from "../RatingSection/RatingSection";
// import { GetTheSchlData } from "../../ApiCalls/ApiCalls";
// import { ToastContainer } from "react-toastify";

// export const SingleLandingPage = ({ id }) => {

//     // ✅ Single source of truth
//     const [pageData, setPageData] = useState(null);

//     const navigate = useNavigate();

//     // ✅ Correct data fetch
//     useEffect(() => {
//         GetTheSchlData(id, setPageData);
//     }, [id]);

//     if (!pageData) return null;

//     return (
//         <section className="S_main_Sec">
//             <ToastContainer />

//             {/* HERO */}
//             <section
//                 className="GlassHeroBG"
//                 style={{
//                     background: `linear-gradient(135deg, rgba(0,0,0,.25), rgba(0,0,0,.35)),
//                     url("${pageData.bannerUrl}")`
//                 }}
//             >
//                 <div className="GlassHeroBG-content">
//                     <h1>Welcome to <strong>{pageData.name}</strong></h1>
//                     <p className="GlassHeroBG-sub">{pageData.tagline}</p>
//                     <button className="GlassHeroBG-btn" onClick={() => navigate(-1)}>
//                         Go Back
//                     </button>
//                 </div>
//                 <div className="blurShape s1"></div>
//                 <div className="blurShape s2"></div>
//             </section>

//             {/* ABOUT */}
//             <section className="S_about">
//                 <div className="S_about-content">
//                     <h2 className="SP_Sec_hd">About Us</h2>
//                     <p>{pageData.about}</p>
//                 </div>
//                 <img src={pageData.aboutImage} alt="About Us" />
//             </section>

//             {/* STAFF */}
//             <section className="S_staff SP_Sec">
//                 <h2 className="SP_Sec_hd">Our Staff</h2>
//                 <div className="staff-crd-cont">
//                     {pageData.staff?.map((s, i) => (
//                         <div key={i} className="staff-card">
//                             <img src={s.image} alt={s.name} />
//                             <h3>{s.name}</h3>
//                             <p>{s.description}</p>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* EVENTS */}
//             <section className="S_events SP_Sec">
//                 <h2 className="SP_Sec_hd">Upcoming Events</h2>
//                 <div className="S_event-list">
//                     {pageData.events?.map((e, i) => (
//                         <div className="event-card" key={i}>
//                             <div className="event-header">
//                                 <span className="event-category">{e.catagory}</span>
//                                 <h2 className="event-title">{e.title}</h2>
//                             </div>
//                             <div className="event-body">
//                                 <div className="event-row">
//                                     <span className="SPlabel">Location</span>
//                                     <span>{e.location}</span>
//                                 </div>
//                                 <div className="event-row">
//                                     <span className="SPlabel">Date</span>
//                                     <span>{e.time}</span>
//                                 </div>
//                                 <div className="event-row">
//                                     <span className="SPlabel">Audience</span>
//                                     <span className="badge">{e.Audience}</span>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* QUICK INFO */}
//             <section className="QI-dashboard SP_Sec">
//                 <h2 className="SP_Sec_hd">Quick Info Dashboard</h2>
//                 <div className="dash-grid">

//                     <div className="dash-card">
//                         <h2>🏫 Basic Profile</h2>
//                         <ul>
//                             <li><strong>Name:</strong> {pageData.quickInfo?.basicProfile?.name}</li>
//                             <li><strong>Location:</strong> {pageData.quickInfo?.basicProfile?.location}</li>
//                             <li><strong>Type:</strong> {pageData.quickInfo?.basicProfile?.type}</li>
//                         </ul>
//                     </div>

//                     <div className="dash-card">
//                         <h2>📋 Administration</h2>
//                         <ul>
//                             {Object.entries(pageData.quickInfo?.administration || {}).map(([k, v]) => (
//                                 <li key={k}>{k.replace(/_/g, " ")} : {String(v)}</li>
//                             ))}
//                         </ul>
//                     </div>

//                     <div className="dash-card">
//                         <h2>🏫 Facilities</h2>
//                         <ul>
//                             {pageData.quickInfo?.facilities?.map((f, i) =>
//                                 <li key={i}>{f.replace(/_/g, " ")}</li>
//                             )}
//                         </ul>
//                     </div>

//                 </div>
//             </section>

//             {/* FEES */}
//             <section className="SP_Sec">
//                 <h2 className="SP_Sec_hd">Fee Structure</h2>
//                 <table className="feeTable">
//                     <thead>
//                         <tr>
//                             <th>Class</th>
//                             <th>Monthly</th>
//                             <th>Annual</th>
//                             <th>Admission</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {pageData.fee?.map((f, i) => (
//                             <tr key={i}>
//                                 <td>{f.Class}</td>
//                                 <td>{f.MonthlyFee}</td>
//                                 <td>{f.AnnualFee}</td>
//                                 <td>{f.AdmissionFee}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </section>

//             {/* GALLERY */}
//             <section className="S_gallery SP_Sec">
//                 <h2 className="SP_Sec_hd">Gallery</h2>
//                 <div className="S_gallery-flex">
//                     {pageData.gallery?.map((img, i) => (
//                         <img key={i} src={img} alt="" />
//                     ))}
//                 </div>
//             </section>

//             {/* RATING */}
//             <RatingSection ratingData={pageData.ratingData} id={id} />
//         </section>
//     );
// };
