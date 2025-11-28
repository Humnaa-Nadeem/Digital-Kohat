import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer/Footer"
import Navbar from "../../../components/navbar/Navbar"
import { SearchBar } from "../../../components/SearchBar/Searchbar";
import "./TechiciansCataPgs.css";
import { E_ExpertCrdDta, E_ExpertDetails, ElectricalExperts } from "../../../Store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
export const ElectronicCata = () => {

    // 
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    // UseStates && Data stores
    let [showList, setShowlist] = useState(false);
    let [userTags, setUsertags] = useState(false);
    let [Crdsdta, setCrdsdta] = useState(E_ExpertCrdDta);

    // Navigation
    const navigate = useNavigate();

    // Getting Querry Parameter's Value
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const id = query.get("id");

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <section className="Tech-Cata-Pg-Sec">
                    <div className="Tech-cata-pg-banner">
                        <h1 className="tech-cata-h1">Search for all your wanted Techicians : </h1>
                        <p className="tech-cata-p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, quisquam consectetur repudiandae Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        <SearchBar SearchedInst={setCrdsdta} AllInst={Crdsdta} />
                        <div className="Usr-Icon-TagsCont">
                            <span className="usrIcon" onClick={() => { setUsertags(!userTags) }}><FaUser /></span>
                            {console.log(userTags)}
                            <ul className={(userTags) ? "tags-cont flexDsply" : "tags-cont"}>
                                <li>Dashboard</li>
                                <li>Appointments</li>
                                <li>Booking</li>
                                <li>Dashboard</li>
                                <li>Appointments</li>
                                <li>Booking</li>
                            </ul>
                        </div>
                    </div>
                    <div className="tech-cata-fltr-crdsCont">
                        <div className="tech-toggle-btn" onClick={() => { setShowlist(!showList) }}>
                            {
                                (showList)
                                    ?
                                    <p style={{ fontSize: "2rem", padding: "6px" }}>&times;</p>
                                    :
                                    <>&#9776;</>
                            }
                        </div>
                        <div className={(showList) ? "tech-cata-fltr display" : "tech-cata-fltr"}>
                            <h2 className="sector-hdng" onClick={() => { navigate("/technicians") }}>
                                Techinicains
                            </h2>
                            {/* 👇 Here to show the list of Electrical Expertss */}
                            <ul className="list">
                                {
                                    ElectricalExperts.map((v, i) => {
                                        return (
                                            <li onClick={() => { navigate(`/technicians/Electronic?id=${v.id}`); setShowlist(false) }} key={i}>{v.ExpertName}</li>
                                        )
                                    })
                                }
                                <li onClick={() => { navigate("/technicians/Electronic"); setShowlist(false) }}>Back To Cards</li>
                                <li onClick={() => { setShowlist(false) }} className="user-tag">Dashboard</li>
                                <li onClick={() => { setShowlist(false) }} className="user-tag">Appointment</li>
                                <li onClick={() => { setShowlist(false) }} className="user-tag">Bookings</li>
                            </ul>
                        </div>
                        <div className="tech-cata-crdCont">
                            {
                                (id)
                                    ?
                                    E_ExpertDetails.filter((v, i) => v.id === Number(id)).map((v, i) => {
                                        return (
                                            <div className="resume-box" key={i}>
                                                <div>
                                                    <img
                                                        src={v.img}
                                                        alt="Profile"
                                                        className="profile-img"
                                                    />
                                                    <h1>{v.Title}</h1>
                                                    <div className="role">Certified  Electrical Expert</div>
                                                </div>

                                                <div className="section">
                                                    <h3>Contact</h3>
                                                    {v.Contact_Info.map((v, i) => {
                                                        return (
                                                            <React.Fragment key={i}>
                                                                <p>Adress : {v.Address} </p>
                                                                <p>Email : {v.Email} </p>
                                                                <p>Phone : {v.Phone} </p>
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </div>

                                                <div className="section">
                                                    <h3>Services</h3>
                                                    <ul>
                                                        {v.Services.map((v, i) => {
                                                            return (
                                                                <li key={i}>{v}</li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>

                                                <div className="section">
                                                    <h3>Rates</h3>
                                                    <p>Call-out fee: {v.Rates["CallOut_fee"]}</p>
                                                    <p>Hourly: {v.Rates["Hourly"]}</p>
                                                </div>

                                                <div className="section">
                                                    <h3>Experience</h3>
                                                    <p>{v.Experience}</p>
                                                </div>

                                                <button className="preview-btn" onClick={() => { console.log("Alhumduilah") }}>Preview / Print</button>
                                            </div>
                                        )
                                    })
                                    :
                                    <div className="cata-card-cont">
                                        {Crdsdta.map((v, i) => {
                                            return (
                                                <div className="cata-pg-card" key={i}>
                                                    <img src={v.img} alt="Placeholder Image" />
                                                    <div className="cata-pg-card-content">
                                                        <h3>{v.InstName}</h3>
                                                        <p>{v.Desc}</p>
                                                        <button onClick={() => { navigate(`/technicians/Electronic?id=${v.id}`) }} className="cata-pg-card-btn">{v.btn_txt}</button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}