import "./EduCatagories.css";
import { SearchBar } from "../../../components/SearchBar/Searchbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { College_Details, CollegeCardDta, Colleges, } from "../../../Store/Edu_store";
import { SingleLandingPage } from "../../../components/SingleLandingPage/SingleLandingPage";
import { FaStar } from "react-icons/fa";
export const CollegesPage = () => {

    // To show page from the top:
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    // Data Storing;
    let [collegeList, setCollegelist] = useState(Colleges);
    let [CollegeCrds, setCollegeCrds] = useState(CollegeCardDta)

    // To maintain Responsivness [For Small Screen]
    let [showList, setShowlist] = useState(false);
    let navigate = useNavigate();

    // Getting Querry Parameter's Value
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const id = query.get("id");

    return (
        <>
            {
                (id)
                    ?
                    <SingleLandingPage id={id} Alldata={College_Details} />
                    :
                    <section className="edu-cata-pg-sec">
                        {/* LEFT SIDE OF PAGE */}
                        <div className={(showList) ? "lft-sec showList" : "lft-sec"} > {/* 👈 Show in Small Screen */}
                            <h2 className="sector" onClick={() => { navigate(`/edu`) }}>Education</h2>
                            <div className="institute-hd-lst">
                                <h2 className="institute-hd">Colleges</h2>
                                {/* 👇 Here to show the list of Colleges */}
                                <ul className="institute-lst">
                                    {
                                        collegeList.map((v, i) => {
                                            return (
                                                <li onClick={() => { navigate(`?id=${v.id}`); setShowlist(false) }} key={i}>{v.CollegeName}</li>
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
                                <h1 className="cata-pg-main-hd">Top Rated Colleges in Your City</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem voluptatum quia excepturi consequatur sequi optio cupiditate</p>
                                <SearchBar SearchedInst={setCollegeCrds} AllInst={CollegeCrds} /> {/* Inst = Institute */}
                            </div>
                            {/* // Colleges Cards */}
                            <div className="cata-card-cont">
                                {
                                    CollegeCrds.map((v, i) => {
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
                        </div>
                    </section >
            }
        </>
    )
}