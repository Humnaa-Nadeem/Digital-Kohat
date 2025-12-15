import { useEffect, useState } from "react";
import "./TourismHome.css";
import { SearchBar } from "../../components/SearchBar/Searchbar";
import { useLocation, useNavigate } from "react-router-dom";
import { RestaurantsList, RestaurantsCardsData } from "../../Store/Tourism_store";
import { TourismLandingPage } from "../TourismPage/Landingpage/TourismLandingpage";

export const Restaurants = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const [restaurantCards, setRestaurantCards] = useState(RestaurantsCardsData);
  const [showList, setShowList] = useState(false);

  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const id = query.get("id");

  return (
    <>
      {id ? (
        <TourismLandingPage id={id} Alldata={RestaurantsCardsData} />
      ) : (
        <section className="Tourism-cata-pg-sec">
          <div className={showList ? "lft-sec showList" : "lft-sec"}>
            <h2 className="sector" onClick={() => navigate(`/tourism`)}>Tourism</h2>
            <div className="institute-hd-lst">
              <h2 className="institute-hd">Restaurants</h2>
              <ul className="institute-lst">
                {RestaurantsList.map((v, i) => (
                  <li key={i} onClick={() => navigate(`?id=${v.id}`)}>{v.name}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="main-sec">
            <div className="showLstBtn" onClick={() => setShowList(!showList)}>
              {showList ? <>&times;</> : <>&#9776;</>}
            </div>

            <div className="cata-pg-banner">
              <h1 className="cata-pg-main-hd">Top Restaurants in Kohat</h1>
              <p>Discover the best local cuisine and dining spots in Kohat.</p>
              <SearchBar SearchedInst={setRestaurantCards} AllInst={RestaurantsCardsData} />
            </div>

            <div className="cata-card-cont">
              {restaurantCards.map((v, i) => (
                <div className="cata-pg-card" key={i}>
                  <img src={v.img} alt={v.name} />
                  <div className="cata-pg-card-content">
                    <h3>{v.name}</h3>
                    <p>{v.Desc}</p>
                    <button onClick={() => navigate(`?id=${v.id}`)} className="cata-pg-card-btn">
                      View Details
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
