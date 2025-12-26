import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GuideContent } from "../../../Store/Tourism_store";
import { TourismLandingPage } from "../Landingpage/TourismLandingpage";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import "./TourismCategories.css";

export const Guide = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const id = query.get("id");

  const [showList, setShowList] = useState(false);

  // GuideContent already has proper structure from createLandingData
  const selectedGuide = GuideContent.find((v) => v.id === Number(id));

  return (
    <>
      {id && selectedGuide ? (
        <TourismLandingPage listing={selectedGuide} />
      ) : (
        <section className="Tourism-Cata-Pg-Sec">
          {/* Left sidebar */}
          <div className={showList ? "lft-sec showList" : "lft-sec"}>
            <h2 className="sector" onClick={() => navigate(`/tourism`)}>
              Tourism
            </h2>
            <div className="institute-hd-lst">
              <h2 className="institute-hd">Travel Guide</h2>
              <ul className="institute-lst">
                {GuideContent.map((v) => (
                  <li key={v.id} onClick={() => navigate(`?id=${v.id}`)}>
                    {v.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main content */}
          <div className="main-sec">
            <div className="showLstBtn" onClick={() => setShowList(!showList)}>
              {showList ? "×" : "☰"}
            </div>

            <div className="cata-pg-banner">
              <h1 className="cata-pg-main-hd">Travel Guide</h1>
              <p>Your complete travel guide for exploring Kohat.</p>
            </div>

            <div className="cata-card-cont">
              {GuideContent.map((guide) => (
                <div className="cata-pg-card premium-card" key={guide.id}>
                  <div className="card-img-container">
                    <img src={guide.aboutImage || guide.bgImage} alt={guide.name} />
                    <div className="card-rating">
                      <FaStar className="star-icon" />
                      <span>{guide.rating || "4.8"}</span>
                    </div>
                  </div>
                  <div className="cata-pg-card-content">
                    <div className="card-header">
                      <h3>{guide.name}</h3>
                      <span className="card-city"><FaMapMarkerAlt /> Kohat</span>
                    </div>
                    <p className="card-short-desc">{guide.about}</p>
                    <button
                      className="explore-btn"
                      onClick={() => navigate(`/tourism/landing`, { state: { listing: guide } })}
                    >
                      Read Guide
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
