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
        <section className="tr-Tourism-Cata-Pg-Sec">
          {/* Left sidebar */}
          <div className={showList ? "tr-lft-sec tr-showList" : "tr-lft-sec"}>
            <h2 className="tr-sector" onClick={() => navigate(`/tourism`)}>
              Tourism
            </h2>
            <div className="tr-institute-hd-lst">
              <h2 className="tr-institute-hd">Travel Guide</h2>
              <ul className="tr-institute-lst">
                {GuideContent.map((v) => (
                  <li key={v.id} onClick={() => navigate(`?id=${v.id}`)}>
                    {v.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main content */}
          <div className="tr-main-sec">
            <div className="tr-showLstBtn" onClick={() => setShowList(!showList)}>
              {showList ? "×" : "☰"}
            </div>

            <div className="tr-cata-pg-banner">
              <h1 className="tr-tr-cata-pg-main-hd">Travel Guide</h1>
              <p>Your complete travel guide for exploring Kohat.</p>
            </div>

            <div className="tr-cata-card-cont">
              {GuideContent.map((guide) => (
                <div className="tr-card tr-premium-card" key={guide.id}>
                  <div className="tr-card-img-container">
                    <img src={guide.aboutImage || guide.bgImage} alt={guide.name} />
                    <div className="tr-card-rating">
                      <FaStar className="tr-star-icon" />
                      <span>{guide.rating || "4.8"}</span>
                    </div>
                  </div>
                  <div className="tr-card-content">
                    <div className="tr-card-header">
                      <h3>{guide.name}</h3>
                      <span className="tr-card-city"><FaMapMarkerAlt /> Kohat</span>
                    </div>
                    <p className="tr-card-short-desc">{guide.about}</p>
                    <button
                      className="tr-explore-btn"
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
