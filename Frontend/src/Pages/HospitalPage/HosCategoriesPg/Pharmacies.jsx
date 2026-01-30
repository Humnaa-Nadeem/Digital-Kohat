import "./HealthCategories.css";
import { SearchBar } from "../../../components/SearchBar/Searchbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pharmacies, PharmacyCardDta, Pharmacy_Details } from "./HosCatData";
import { HealthLandingPage } from "../../../components/HealthLandingPage/HealthLandingPage";

export const PharmaciesPage = () => {

  useEffect(() => { window.scrollTo(0, 0) }, []);

  let [pharmacyList, setPharmacyList] = useState(Pharmacies);

  // Filter Logic
  const [allPharmacies] = useState(PharmacyCardDta);
  const [locationFiltered, setLocationFiltered] = useState(PharmacyCardDta);
  let [PharmacyCrds, setPharmacyCrds] = useState(PharmacyCardDta);

  const [location, setLocation] = useState("All");

  // Extract Unique Locations
  const locations = ["All", ...new Set(Pharmacy_Details.map(item => item.location).filter(Boolean))];

  useEffect(() => {
    if (location === "All") {
      setLocationFiltered(allPharmacies);
      setPharmacyCrds(allPharmacies);
    } else {
      const filtered = allPharmacies.filter(card => {
        const detail = Pharmacy_Details.find(d => d.id == card.id);
        return detail && detail.location === location;
      });
      setLocationFiltered(filtered);
      setPharmacyCrds(filtered);
    }
  }, [location, allPharmacies]);


  let [showList, setShowlist] = useState(false);
  let navigate = useNavigate();

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const id = query.get("id");

  return (
    <>
      {
        (id)
          ?
          <HealthLandingPage id={id} Alldata={Pharmacy_Details} />
          :
          <section className="health-cata-pg-sec">
            {/* Sidebar */}
            <div className={(showList) ? "health-lft-sec health-showList" : "health-lft-sec"} >
              <h2 className="health-sector-label" onClick={() => { navigate(`/hospital`) }}>Hospital</h2>
              <div className="health-institute-hd-lst">
                <h2 className="health-institute-hd">Pharmacies</h2>
                <ul className="health-institute-lst">
                  {
                    pharmacyList.map((v, i) => {
                      return (
                        <li onClick={() => { navigate(`?id=${v.id}`); setShowlist(false) }} key={i}>{v.PharmacyName}</li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="health-main-sec">
              <div className="health-showLstBtn" onClick={() => { setShowlist(!showList) }}>{(showList) ? <>&times;</> : <>&#9776;</>}</div>

              <div className="health-cata-banner">
                <h1 className="health-cata-pg-main-hd">Pharmacies & Medical Stores</h1>
                <p>Find nearby pharmacies, hours, and delivery options.</p>

                {/* Search & Filter Bar */}
                <div className="HealthFilterBar">
                  {/* Location Dropdown */}
                  <select
                    className="HealthFilterSelect"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    {locations.map((loc, i) => (
                      <option key={i} value={loc}>{loc === "All" ? "All Locations" : loc}</option>
                    ))}
                  </select>

                  <div style={{ flex: 2 }}>
                    <SearchBar SearchedInst={setPharmacyCrds} AllInst={locationFiltered} />
                  </div>
                </div>
              </div>

              <div className="health-card-cont">
                {
                  PharmacyCrds.length > 0 ? (
                    PharmacyCrds.map((v, i) => {
                      return (
                        <div className="health-pg-card" key={i}>
                          <img src={v.img} alt="Placeholder Image" />
                          <div className="health-pg-card-content">
                            <h3>{v.InstName}</h3>
                            <p>{v.Desc}</p>
                            <button onClick={() => { navigate(`?id=${v.id}`) }} className="health-pg-card-btn">{v.btn_txt}</button>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
                      <h3>No Pharmacies Found</h3>
                      <p>Try changing the location or search term.</p>
                    </div>
                  )
                }
              </div>
            </div>
          </section>
      }
    </>
  )
}

export default PharmaciesPage;
