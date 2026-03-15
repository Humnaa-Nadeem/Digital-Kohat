import "./EduCatagories.css";
import { SearchBar } from "../../../components/SearchBar/Searchbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import { GetInstCrdsDtaFrmDB } from "../../../ApiCalls/ApiCalls";
export const SchoolPage = () => {

    // Data Storing;
    let [SchoolCrds, setSchoolCrds] = useState(undefined);

    // To show page from the top:
    useEffect(() => {
        window.scrollTo(0, 0);
        GetInstCrdsDtaFrmDB(setSchoolCrds, "SCHOOL");
    }, []);


    // To maintain Responsivness [For Small Screen]
    let [showList, setShowlist] = useState(false);
    let navigate = useNavigate();

    // Showing Real rating.
    const showRating = (v) => {
        const rd = v?.ratingData;

        // No rating yet
        if (!rd || !rd.totalReviews || rd.totalReviews === 0) {
            return (
                <div className="starsCont">
                    <span className="newBadge">New</span>
                </div>
            );
        }

        const avg = Number(rd.average || 0);
        const totalReviews = Number(rd.totalReviews || 0);

        // full stars
        const fullStars = Math.floor(avg);

        // half star if decimal >= 0.5
        const hasHalfStar = avg - fullStars >= 0.5;

        // empty stars
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="starsCont">
                {/* Full Stars */}
                {Array.from({ length: fullStars }).map((_, i) => (
                    <FaStar key={`full-${i}`} className="starFilled" />
                ))}

                {/* Half Star */}
                {hasHalfStar && <FaStarHalfAlt className="starFilled" />}

                {/* Empty Stars */}
                {Array.from({ length: emptyStars }).map((_, i) => (
                    <FaRegStar key={`empty-${i}`} className="starEmpty" />
                ))}

                {/* Average + Reviews */}
                <span className="ratingText">
                    {avg.toFixed(1)} <span className="reviewsCount">({totalReviews})</span>
                </span>
            </div>
        );
    };

    return (
        <>
            <section className="edu-cata-pg-sec">
                {/* LEFT SIDE OF PAGE */}
                <div className={(showList) ? "lft-sec showList" : "lft-sec"} >
                    <h2 className="sector" onClick={() => { navigate(`/edu`) }}>Education</h2>
                    <div className="institute-hd-lst">
                        <h2 className="institute-hd">Schools</h2>
                        {/* 👇 Here to show the list of Schools */}
                        <ul className="institute-lst">
                            {
                                (SchoolCrds)
                                    ?
                                    SchoolCrds.map((v, i) => {
                                        return (
                                            <li
                                                onClick={() => {
                                                    navigate(`/edu/schools/${v.id}`);
                                                    setShowlist(false);
                                                }}
                                                key={i}
                                            >
                                                {v.serviceName}
                                            </li>

                                        )
                                    })
                                    :
                                    <></>
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
                            (SchoolCrds)
                                ?
                                SchoolCrds.map((v, i) => {
                                    return (
                                        <div className="cata-pg-card" key={i} onClick={() => {
                                            navigate(`/edu/schools/${v.id}`);
                                        }}>
                                            <img src={v.img} alt="Placeholder Image" />
                                            <div className="cata-pg-card-content">
                                                {showRating(v)}
                                                <h3>{v.serviceName || v.InstName}</h3>
                                                <p>{v.Desc}</p>
                                                <button onClick={() => {
                                                    navigate(`/edu/schools/${v.id}`);
                                                }} className="cata-pg-card-btn">Read More</button>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <></>
                        }
                    </div>
                </div>

            </section >
        </>
    )
}