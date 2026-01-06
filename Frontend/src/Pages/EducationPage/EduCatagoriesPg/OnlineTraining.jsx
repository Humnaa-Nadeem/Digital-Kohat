import "./EduCatagories.css";
import { SearchBar } from "../../../components/SearchBar/Searchbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OnlineTrainingCardDta, OnlineTrainings, OnlineTraining_Details } from "../../../Store/Edu_store";
import { FaStar } from "react-icons/fa";

export const OnlineTrainingPage = () => {

    // To show page from the top:
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    // Data Storing;
    let [trainingList, setTrainingList] = useState(OnlineTrainings);
    let [TrainingDetails, setTrainingDetails] = useState(OnlineTraining_Details);
    let [TrainingCards, setTrainingCards] = useState(OnlineTrainingCardDta);

    // To maintain Responsivness [For Small Screen]
    let [showList, setShowList] = useState(false);
    let navigate = useNavigate();

    // Getting Query Parameter's Value
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const id = query.get("id");

    return (
        <section className="edu-cata-pg-sec">
            {/* LEFT SIDE OF PAGE */}
            <div className={(showList) ? "lft-sec showList" : "lft-sec"} >
                <h2 className="sector" onClick={() => { navigate(`/edu`) }}>Education</h2>
                <div className="institute-hd-lst">
                    <h2 className="institute-hd">Online Training</h2>
                    {/* 👇 Here to show the list of Online Trainings */}
                    <ul className="institute-lst">
                        {
                            trainingList.map((v, i) => {
                                return (
                                    <li onClick={() => { navigate(`?id=${v.id}`); setShowList(false) }} key={i}>{v.TrainingName}</li>
                                )
                            })
                        }
                        <li onClick={() => { navigate("/edu/training"); setShowList(false) }}>Back To Online Training</li>
                    </ul>
                </div>
            </div>
            {/* MAIN PART OF PAGE */}
            <div className="main-sec">
                <div className="showLstBtn" onClick={() => { setShowList(!showList) }}>{(showList) ? <>&times;</> : <>&#9776;</>}</div>
                <div className="cata-pg-banner">
                    <h1 className="cata-pg-main-hd">Top Online Trainings for Skill Development</h1>
                    <p>Enhance your skills and career prospects with our curated online training programs.</p>
                    <SearchBar SearchedInst={setTrainingCards} AllInst={TrainingCards} />
                </div>
                {
                    (id)
                        ?
                        // Filtering Online Training Info on the basis of Id
                        TrainingDetails.filter((v, i) => v.id === Number(id))
                            .map((v, i) => {
                                return (
                                    <>
                                        {/* Online Training Single Page */}
                                        <div className="cata-web-hrdr" key={i}>
                                            <h1>{v.Title}</h1>
                                            <p className="tagline">{v.tag_line}</p>
                                        </div>
                                        <section className="section">
                                            <h2>About Us</h2>
                                            <p>{v.About}</p>
                                        </section>
                                        <section className="section">
                                            <h2>Modules</h2>
                                            {v.Modules.map((j, i) => {
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
                        // Online Training Cards
                        <div className="cata-card-cont">
                            {
                                TrainingCards.map((v, i) => {
                                    return (
                                        <div className="cata-pg-card" key={i}>
                                            <img src={v.img} alt="Placeholder Image" />
                                            <div className="cata-pg-card-content">
                                                <div className="starsCont">
                                                    <FaStar color="yellow" />
                                                    <FaStar color="yellow" />
                                                    <FaStar color="yellow" />
                                                    <FaStar color="yellow" />
                                                    <FaStar color="yellow" />
                                                </div>
                                                <h3>{v.InstName}</h3>
                                                <p>{v.Desc}</p>
                                                <button onClick={() => { navigate(`?id=${v.id}`) }} className="cata-pg-card-btn">{v.btn_txt}</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                }
            </div>
        </section >
    )
}
