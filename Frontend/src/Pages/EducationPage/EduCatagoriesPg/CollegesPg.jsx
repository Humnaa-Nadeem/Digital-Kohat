import "./EduCatagories.css";
import { SearchBar } from "../../../components/SearchBar/Searchbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { GetInstCrdsDtaFrmDB } from "../../../ApiCalls/ApiCalls";

export const CollegesPage = () => {

    /* ===============================
       Data Store ⭐ (Array or undefined)
    =============================== */

    let [CollegeCrds, setCollegeCrds] = useState(undefined);

    useEffect(() => {
        window.scrollTo(0, 0);
        GetInstCrdsDtaFrmDB(setCollegeCrds, "COLLEGE");
    }, []);

    let [showList, setShowlist] = useState(false);
    let navigate = useNavigate();

    /* ===============================
       Rating Display ⭐
    =============================== */

    const showRating = (v) => {

        const rd = v?.ratingData;

        if (!rd || !rd.totalReviews || rd.totalReviews === 0) {
            return (
                <div className="starsCont">
                    <span className="newBadge">New</span>
                </div>
            );
        }

        const avg = Number(rd.average || 0);
        const totalReviews = Number(rd.totalReviews || 0);

        const fullStars = Math.floor(avg);
        const hasHalfStar = avg - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="starsCont">

                {Array.from({ length: fullStars }).map((_, i) => (
                    <FaStar key={`full-${i}`} className="starFilled" />
                ))}

                {hasHalfStar && <FaStarHalfAlt className="starFilled" />}

                {Array.from({ length: emptyStars }).map((_, i) => (
                    <FaRegStar key={`empty-${i}`} className="starEmpty" />
                ))}

                <span className="ratingText">
                    {avg.toFixed(1)}
                    <span className="reviewsCount">
                        ({totalReviews})
                    </span>
                </span>

            </div>
        );
    };

    return (
        <section className="edu-cata-pg-sec">

            {/* LEFT LIST */}
            <div className={showList ? "lft-sec showList" : "lft-sec"}>

                <h2 className="sector" onClick={() => navigate(`/edu`)}>
                    Education
                </h2>

                <div className="institute-hd-lst">

                    <h2 className="institute-hd">Colleges</h2>

                    <ul className="institute-lst">

                        {CollegeCrds &&
                            CollegeCrds.map((v, i) => (
                                <li
                                    key={i}
                                    onClick={() => {
                                        navigate(`/edu/colleges/${v.id}`);
                                        setShowlist(false);
                                    }}
                                >
                                    {v.serviceName}
                                </li>
                            ))
                        }

                    </ul>
                </div>
            </div>

            {/* MAIN SECTION */}
            <div className="main-sec">

                <div
                    className="showLstBtn"
                    onClick={() => setShowlist(!showList)}
                >
                    {showList ? <>×</> : <>&#9776;</>}
                </div>

                <div className="cata-pg-banner">

                    <h1 className="cata-pg-main-hd">
                        Top Rated Colleges in Your City
                    </h1>

                    <p>
                        Discover best colleges near you.
                    </p>

                    {/* ⭐ IMPORTANT — Pass Original Dataset */}
                    <SearchBar
                        SearchedInst={setCollegeCrds}
                        AllInst={CollegeCrds}
                    />

                </div>

                {/* CARDS */}
                <div className="cata-card-cont">

                    {CollegeCrds &&
                        CollegeCrds.map((v, i) => (
                            <div
                                className="cata-pg-card"
                                key={i}
                                onClick={() => navigate(`/edu/colleges/${v.id}`)}
                            >

                                <img src={v.img} alt="College" />

                                <div className="cata-pg-card-content">

                                    {showRating(v)}

                                    <h3>{v.serviceName || v.InstName}</h3>

                                    <p>{v.Desc}</p>

                                    <button
                                        onClick={() => navigate(`/edu/colleges/${v.id}`)}
                                        className="cata-pg-card-btn"
                                    >
                                        Read More
                                    </button>

                                </div>

                            </div>
                        ))
                    }

                </div>

            </div>

        </section>
    );
};