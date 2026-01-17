import "./EduCatagories.css";
import { SearchBar } from "../../../components/SearchBar/Searchbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { School_Details, Schools, ScoolCardDta } from "../../../Store/Edu_store";
import { SingleLandingPage } from "../../../components/SingleLandingPage/SingleLandingPage";
import { FaStar } from "react-icons/fa";
import { GetSchoolCrdsDtaFrmDB } from "../../../ApiCalls/ApiCalls";
export const SchoolPage = () => {

    // Data Storing;
    let [SchoolList, setSchoollist] = useState(Schools);
    // let [AboutSchool, setAboutSchool] = useState(Schools_Details);
    let [SchoolCrds, setSchoolCrds] = useState(ScoolCardDta)

    // To show page from the top:
    useEffect(() => {
        window.scrollTo(0, 0);
        GetSchoolCrdsDtaFrmDB(SchoolCrds, setSchoolCrds);
    }, []);


    // To maintain Responsivness [For Small Screen]
    let [showList, setShowlist] = useState(false);
    let navigate = useNavigate();

    // Getting Querry Parameter's Value
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const id = query.get("id");

    // Showing Real rating.
    const showRating = (v) => {
        // Calculate rating.
        let ratingValue = v.ratingData["allratedStrs"] / v.ratingData["totalStrs"] * 100;
        if (ratingValue <= 20) {
            return (
                <div className="starsCont">
                    <FaStar color="yellow" />
                </div>
            )
        } else if (ratingValue <= 40) {

            return (
                <div className="starsCont">
                    <FaStar color="yellow" />
                    <FaStar color="yellow" />
                </div>
            );
        } else if (ratingValue <= 60) {
            return (
                <div className="starsCont">
                    <FaStar color="yellow" />
                    <FaStar color="yellow" />
                    <FaStar color="yellow" />
                </div>
            )
        } else if (ratingValue <= 80) {
            return (
                <div className="starsCont">
                    <FaStar color="yellow" />
                    <FaStar color="yellow" />
                    <FaStar color="yellow" />
                    <FaStar color="yellow" />
                </div>
            );
        } else if (ratingValue >= 80 && ratingValue <= 100) {
            return (
                <div className="starsCont">
                    <FaStar color="yellow" />
                    <FaStar color="yellow" />
                    <FaStar color="yellow" />
                    <FaStar color="yellow" />
                    <FaStar color="yellow" />
                </div>
            )
        } else {
            return (
                <div className="starsCont">
                    <FaStar color="yellow" />
                </div>
            )
        }
    }

    return (
        <>
            {
                (id)
                    ?
                    <SingleLandingPage id={id} Alldata={School_Details} />
                    :
                    <section className="edu-cata-pg-sec">
                        {/* LEFT SIDE OF PAGE */}
                        <div className={(showList) ? "lft-sec showList" : "lft-sec"} > {/* 👈 Show in Small Screen */}
                            <h2 className="sector" onClick={() => { navigate(`/edu`) }}>Education</h2>
                            <div className="institute-hd-lst">
                                <h2 className="institute-hd">Schools</h2>
                                {/* 👇 Here to show the list of Schools */}
                                <ul className="institute-lst">
                                    {
                                        SchoolList.map((v, i) => {
                                            return (
                                                <li onClick={() => { navigate(`?id=${v.id}`); setShowlist(false) }} key={i}>{v.SchoolName}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        {/* MAIN PART OF PAGE */}
                        <div className="main-sec">
                            <div className="showLstBtn" onClick={() => { setShowlist(!showList) }}>{(showList) ? <>&times;</> : <>&#9776;</>}</div>
                            <div className="cata-pg-banner">
                                <h1 className="cata-pg-main-hd">Top Rated Schools in Your City</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem voluptatum quia excepturi consequatur sequi optio cupiditate</p>
                                <SearchBar SearchedInst={setSchoolCrds} AllInst={SchoolCrds} /> {/* Inst = Institute */}
                            </div>
                            {/* // Schools Cards */}
                            <div className="cata-card-cont">
                                {
                                    SchoolCrds.map((v, i) => {
                                        return (
                                            <div className="cata-pg-card" key={i}>
                                                <img src={v.img} alt="Placeholder Image" />
                                                <div className="cata-pg-card-content">
                                                    {showRating(v)}
                                                    <h3>{v.InstName}</h3>
                                                    <p>{v.Desc}</p>
                                                    <button onClick={() => { navigate(`?id=${v.id}`) }} className="cata-pg-card-btn">Read More</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </section >
            }
        </>
    )
}