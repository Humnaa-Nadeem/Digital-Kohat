import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import "./EduCatagories.css";
import { SearchBar } from "../../../components/SearchBar/Searchbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TutorCardDta, Tutors, Tutors_Details } from "../../../Store/Edu_store";

export const TutorsPage = () => {

    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    // State for data
    let [tutorList, setTutorList] = useState(Tutors);
    let [TutorDetails, setTutorDetails] = useState(Tutors_Details);
    let [TutorCards, setTutorCards] = useState(TutorCardDta);

    // For responsive left side list
    let [showList, setShowList] = useState(false);
    let navigate = useNavigate();

    // Get query param 'id'
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const id = query.get("id");

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <section className="edu-cata-pg-sec">
                    {/* LEFT SIDE LIST */}
                    <div className={(showList) ? "lft-sec showList" : "lft-sec"} >
                        <h2 className="sector" onClick={() => { navigate(`/edu`) }}>Education</h2>
                        <div className="institute-hd-lst">
                            <h2 className="institute-hd">Tutors</h2>
                            <ul className="institute-lst">
                                {
                                    tutorList.map((v, i) => {
                                        return (
                                            <li onClick={() => { navigate(`/edu/tutors?id=${v.id}`); setShowList(false) }} key={i}>{v.TutorName}</li>
                                        )
                                    })
                                }
                                <li onClick={() => { navigate("/edu/tutors"); setShowList(false) }}>Back To Tutors</li>
                            </ul>
                        </div>
                    </div>

                    {/* MAIN CONTENT */}
                    <div className="main-sec">
                        <div className="showLstBtn" onClick={() => { setShowList(!showList) }}>{(showList) ? <>&times;</> : <>&#9776;</>}</div>
                        <div className="cata-pg-banner">
                            <h1 className="cata-pg-main-hd">Top Tutors in Your Area</h1>
                            <p>Find qualified tutors for your preferred subjects and improve your learning experience.</p>
                            <SearchBar SearchedInst={setTutorCards} AllInst={TutorCards} />
                        </div>

                        {
                            (id)
                                ?
                                // Detailed page for selected tutor
                                // Tutor Details page
                                Tutors_Details.filter((v) => v.id === Number(id))
                                    .map((v, i) => (
                                        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "100%" }}>
                                            <div className="cata-web-hrdr">
                                                <h1>{v.Name}</h1>
                                                <p className="tagline">{v.tag_line}</p>
                                                <img
                                                    src={v.img}
                                                    alt={v.Name}
                                                    style={{
                                                        width: "100px",       // width of the image
                                                        height: "100px",      // height of the image
                                                        objectFit: "cover",   // ensures image covers the box without distortion
                                                        borderRadius: "50%",  // makes it circular
                                                        marginTop: "20px",    // space from tagline
                                                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)" // subtle shadow
                                                    }} />
                                            </div>

                                            <section className="section">
                                                <h2>About Tutor</h2>
                                                <p>{v.About}</p>
                                            </section>

                                            <section className="section">
                                                <h2>Subjects</h2>
                                                <ul className="info-list">
                                                    {v.Expertise.map((subj, i) => <li key={i}>{subj}</li>)}
                                                </ul>
                                            </section>

                                            <section className="section">
                                                <h2>Achievements</h2>
                                                <ul className="info-list">
                                                    {v.Achievements.map((ach, i) => <li key={i}>{ach}</li>)}
                                                </ul>
                                            </section>

                                            <section className="section contact">
                                                <h2>Contact Information</h2>
                                                {v.Contact_Info.map((contact, i) => (
                                                    <ul className="info-list" key={i}>
                                                        <li><strong>Email: </strong>{contact.Email}</li>
                                                        <li><strong>Phone: </strong>{contact.Phone}</li>
                                                        <li><strong>Website: </strong><a href={contact.website} target="_blank">{contact.website}</a></li>
                                                    </ul>
                                                ))}
                                            </section>
                                        </div>
                                    ))
                                :
                                // Tutor Cards
                                <div className="cata-card-cont">
                                    {
                                        TutorCards.map((v, i) => {
                                            return (
                                                <div className="cata-pg-card" key={i}>
                                                    <img src={v.img} alt="Tutor Image" />
                                                    <div className="cata-pg-card-content">
                                                        <h3>{v.InstName}</h3>
                                                        <p>{v.Desc}</p>
                                                        <button onClick={() => { navigate(`/edu/tutors?id=${v.id}`) }} className="cata-pg-card-btn">{v.btn_txt}</button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                        }
                    </div>
                </section >
            </main >
            <Footer />
        </>
    )
}
