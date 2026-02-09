import { useEffect, useState } from "react";
import "./TourismCategories.css";
import { SearchBar } from "../../../components/SearchBar/Searchbar";
import { useLocation, useNavigate } from "react-router-dom";
import { PlacesList, PlacesCardsData } from "../../../Store/Tourism_store";
import { TourismLandingPage } from "../Landingpage/TourismLandingpage";
import { FaStar, FaClock, FaTicketAlt, FaMapMarkerAlt } from "react-icons/fa";
import { getMergedData, getSelectedItem } from "../../../utils/dataMerger";

export const Places = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const [placeCards, setPlaceCards] = useState(() => getMergedData(PlacesCardsData, "Tourism", "Places"));
  const [showList, setShowList] = useState(false);
  const [activePlace, setActivePlace] = useState(null);

  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const id = query.get("id");

  const handlePlaceClick = (placeId, index) => {
    navigate(`?id=${placeId}`);
    setActivePlace(index);
  };

  const selectedPlace = getSelectedItem(PlacesCardsData, "Tourism", "Places", id);

  return (
    <>
      {id && selectedPlace ? (
        <TourismLandingPage listing={selectedPlace} />
      ) : (
        <section className="Tourism-Cata-Pg-Sec">
          {/* LEFT SIDEBAR */}
          <div className={showList ? "lft-sec showList" : "lft-sec"}>
            <h2 className="sector" onClick={() => navigate(`/tourism`)}>
              Tourism
            </h2>
            <div className="institute-hd-lst">
              <h2 className="institute-hd">Famous Places</h2>
              <ul className="institute-lst">
                {getMergedData(PlacesList, "Tourism", "Places").map((place, i) => (
                  <li
                    key={place.id}
                    className={activePlace === i ? "active" : ""}
                    onClick={() => handlePlaceClick(place.id, i)}
                  >
                    {place.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="main-sec">
            <div className="showLstBtn" onClick={() => setShowList(!showList)}>
              {showList ? <>&times;</> : <>&#9776;</>}
            </div>

            <div className="cata-pg-banner">
              <h1 className="cata-pg-main-hd tr-cata-pg-main-hd">Top Tourist Places in Kohat</h1>
              <p>
                Discover beautiful landmarks, historical sites, and scenic spots.
              </p>
              <SearchBar SearchedInst={setPlaceCards} AllInst={PlacesCardsData} />
            </div>

            <div className="cata-card-cont">
              {placeCards.map((place) => (
                <div
                  className="cata-pg-card premium-card"
                  key={place.id}
                  onClick={() => navigate(`/tourism/landing`, { state: { listing: place } })}
                >
                  <div className="card-img-container">
                    <img src={place.img || place.bgImage} alt={place.name} />
                    <div className="card-rating">
                      <FaStar className="star-icon" />
                      <span>{place.rating || "4.5"}</span>
                      <small>({place.reviewsCount || "120"} reviews)</small>
                    </div>
                  </div>
                  <div className="cata-pg-card-content">
                    <div className="card-header">
                      <h3>{place.name || "Unnamed Place"}</h3>
                      <span className="card-city"><FaMapMarkerAlt /> {place.commonInfo?.basicInfo?.city || "Kohat"}</span>
                    </div>

                    <div className="card-details-grid">
                      <div className="detail-item">
                        <FaClock />
                        <span>{place.commonInfo?.visitingInfo?.openingTime || "N/A"} - {place.commonInfo?.visitingInfo?.closingTime || "N/A"}</span>
                      </div>
                      <div className="detail-item">
                        <FaTicketAlt />
                        <span>{place.commonInfo?.visitingInfo?.entryFee || "Free"}</span>
                      </div>
                    </div>

                    <p className="card-short-desc">
                      {place.commonInfo?.basicInfo?.shortIntroduction || "Discover the beauty and history of this amazing spot in Kohat."}
                    </p>
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
