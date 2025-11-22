import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import "./EduCatagories.css";
import { SearchBar } from "../../../components/SearchBar/Searchbar";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UniCardDta, Unis_Details, Universities } from "../../../Store/store";
export const UniPage = () => {

    // Data Storing;
    let [UniList, setUnilist] = useState(Universities);
    let [AboutUni, setAboutUni] = useState(Unis_Details);
    let [UniCrds, setUniCrds] = useState(UniCardDta);

    // To maintain Responsivness [For Small Screen]
    let [showList, setShowlist] = useState(false);

    // Navigation
    let navigate = useNavigate();

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
                <section className="edu-cata-pg-sec">
                    {/* LEFT SIDE OF PAGE */}
                    <div className={(showList) ? "lft-sec showList" : "lft-sec"} > {/* 👈 Show in Small Screen */}
                        <div className="sector" onClick={() => { navigate(`/edu`) }}>Education</div>
                        <div className="institute-hd-lst">
                            <h2 className="institute-hd">Universities</h2>
                            {/* 👇 Here to show the list of Universities */}
                            <ul className="institute-lst">
                                {
                                    UniList.map((v, i) => {
                                        return (
                                            <li onClick={() => { navigate(`/edu/uni?id=${v.id}`) }} key={i}>{v.UniName}</li>
                                        )
                                    })
                                }
                                <li onClick={() => { navigate("/edu/uni") }}>Back To Universities</li>
                            </ul>
                        </div>
                    </div>
                    {/* MAIN PART OF PAGE */}
                    <div className="main-sec">
                        <div className="showLst" onClick={() => { setShowlist(!showList) }}>{(showList) ? <>&times;</> : <>&#9776;</>}</div>
                        <SearchBar SearchedInst={setUniCrds} AllInst={UniCrds} /> {/* Inst = Institute */}
                        <div className="cata-pg-banner">
                            <h1 className="cata-pg-main-hd">Top Rated Universities in Your City</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem voluptatum quia excepturi consequatur sequi optio cupiditate</p>
                        </div>
                        {
                            (id)
                                ?
                                // Filtering School Info on the basis of Id
                                AboutUni.filter((v, i) => v.id === Number(id))
                                    // After Filtration, filling placeholder
                                    .map((v, i) => {
                                        return (
                                            <React.Fragment key={i}>
                                                {/* UNIVERSITY Single web Page */}
                                                <div className="cata-web-hrdr" key={i}>
                                                    <h1>{v.Title}</h1>
                                                    <p className="tagline">{v.tag_line}</p>
                                                </div>
                                                <section className="section">
                                                    <h2>About Us</h2>
                                                    <p>{v.A_UsPara}</p>
                                                </section>
                                                <section className="section">
                                                    <h2>University Details</h2>
                                                    {v.Institute_Info.map((j, i) => {
                                                        return (
                                                            <ul className="info-list" key={i}>
                                                                <li><strong>Founded: </strong>{j.Foundation}</li>
                                                                <li><strong>School Type: </strong>{j.Institute_Type}</li>
                                                                <li><strong>Medium: </strong>{j.Medium}</li>
                                                                <li><strong>Program Offered: </strong>{j.Program_Offered}</li>
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
                                                                <li><strong>Address: </strong>{j.Address}</li>
                                                                <li><strong>Email: </strong>{j.Email}</li>
                                                                <li><strong>Phone: </strong>{j.Phone}</li>
                                                                <li><strong>Website: </strong><a href="#" target="_blank">{j.website}</a></li>
                                                            </ul>
                                                        )
                                                    })}
                                                </section>
                                            </React.Fragment>
                                        )
                                    })
                                :
                                // Universities Cards
                                <div className="cata-card-cont">
                                    {
                                        UniCrds.map((v, i) => {
                                            return (
                                                <div className="cata-pg-card" key={i}>
                                                    <img src={v.img} alt="Placeholder Image" />
                                                    <div className="cata-pg-card-content">
                                                        <h3>{v.InstName}</h3>
                                                        <p>{v.Desc}</p>
                                                        <button onClick={() => { navigate(`/edu/uni?id=${v.id}`) }} className="cata-pg-card-btn">{v.btn_txt}</button>
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
            <footer>
                <Footer />
            </footer>
        </>

    )
}