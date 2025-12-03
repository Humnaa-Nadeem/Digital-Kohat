import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import "./EduCatagories.css";
import { SearchBar } from "../../../components/SearchBar/Searchbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OnlineCourseCardDta, OnlineCourses, OnlineCourses_Details } from "../../../Store/Edu_store";

export const OnlineCoursesPage = () => {

    // To show page from the top:
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    // Data Storing;
    let [OC_List, setOC_List] = useState(OnlineCourses);
    let [OC_Details, setOCDetails] = useState(OnlineCourses_Details);
    let [OC_Cards, setOC_Cards] = useState(OnlineCourseCardDta);

    // To maintain Responsivness [For Small Screen]
    let [showList, setShowList] = useState(false);
    let navigate = useNavigate();

    // Getting Query Parameter's Value
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
                    {/* LEFT SIDE OF PAGE */}
                    <div className={(showList) ? "lft-sec showList" : "lft-sec"} >
                        <h2 className="sector" onClick={() => { navigate(`/edu`) }}>Education</h2>
                        <div className="institute-hd-lst">
                            <h2 className="institute-hd">Online Courses</h2>
                            {/* 👇 Here to show the list of Online Courses */}
                            <ul className="institute-lst">
                                {
                                    OC_List.map((v, i) => {
                                        return (
                                            <li onClick={() => { navigate(`/edu/onlineCourses?id=${v.id}`); setShowList(false) }} key={i}>{v.CourseName}</li>
                                        )
                                    })
                                }
                                <li onClick={() => { navigate("/edu/onlineCourses"); setShowList(false) }}>Back To Online Courses</li>
                            </ul>
                        </div>
                    </div>
                    {/* MAIN PART OF PAGE */}
                    <div className="main-sec">
                        <div className="showLstBtn" onClick={() => { setShowList(!showList) }}>{(showList) ? <>&times;</> : <>&#9776;</>}</div>
                        <div className="cata-pg-banner">
                            <h1 className="cata-pg-main-hd">Top Online Courses for Skill Development</h1>
                            <p>Enhance your skills and career prospects with our curated online courses programs.</p>
                            <SearchBar SearchedInst={setOC_Cards} AllInst={OC_Cards} />
                        </div>
                        {
                            (id)
                                ?
                                // Filtering Online Course Info on the basis of Id
                                OC_Details.filter((v, i) => v.id === Number(id))
                                    .map((v, i) => {
                                        return (
                                            <>
                                                {/* Online Course Single Page */}
                                                <div className="cata-web-hrdr" key={i}>
                                                    <h1>{v.Title}</h1>
                                                    <p className="tagline">{v.tag_line}</p>
                                                </div>
                                                <section className="section">
                                                    <h2>About Us</h2>
                                                    <p>{v.A_UsPara}</p>
                                                </section>
                                                <section className="section">
                                                    <h2>Course Info</h2>
                                                    {v.Course_Info.map((j, i) => {
                                                        return (
                                                            <ul className="info-list" key={i}>
                                                                <li><strong>Duration: </strong>{j.Duration}</li>
                                                                {(j.Languages) ? <li><strong>Language: </strong>{j.Languages}</li> : <></>}
                                                                <li><strong>Mode: </strong>{j.Mode} </li>
                                                                <li><strong>Skill Level: </strong>{j.Skill_Level} </li>
                                                                {(j.Tools) ? <li><strong>Tools: </strong>{j.Tools} </li> : <></>}
                                                            </ul>
                                                        )
                                                    })}
                                                </section>
                                                <section className="section">
                                                    <h2>Facilities</h2>
                                                    {v.Facilities.map((j, i) => {
                                                        return (
                                                            <ul className="info-list" key={i}>
                                                                <li>{j}</li>
                                                            </ul>
                                                        )
                                                    })}
                                                </section>
                                                <section className="section">
                                                    <h2>Achievements</h2>
                                                    {v.Achievements.map((j, i) => {
                                                        return (
                                                            <ul className="info-list" key={i}>
                                                                <li>{j}</li>
                                                            </ul>
                                                        )
                                                    })}
                                                </section>
                                                <section className="section contact">
                                                    <h2>Contact Information</h2>
                                                    {v.Contact_Info.map((j, i) => {
                                                        return (
                                                            <ul className="info-list" key={i}>
                                                                <li><strong>Email: </strong>{j.Email}</li>
                                                                <li><strong>Phone: </strong>{j.Phone}</li>
                                                                <li><strong>Website: </strong><a href={j.website} target="_blank">{j.website}</a></li>
                                                            </ul>
                                                        )
                                                    })}
                                                </section>
                                            </>
                                        )
                                    })
                                :
                                // Online Course Cards
                                <div className="cata-card-cont">
                                    {
                                        OC_Cards.map((v, i) => {
                                            return (
                                                <div className="cata-pg-card" key={i}>
                                                    <img src={v.img} alt="Placeholder Image" />
                                                    <div className="cata-pg-card-content">
                                                        <h3>{v.InstName}</h3>
                                                        <p>{v.Desc}</p>
                                                        <button onClick={() => { navigate(`/edu/onlineCourses?id=${v.id}`) }} className="cata-pg-card-btn">{v.btn_txt}</button>
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
