import "./HealthCategories.css";
import { SearchBar } from "../../../components/SearchBar/Searchbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Hospitals, HospitalCardDta, Hospital_Details } from "./HosCatData";
import { HealthLandingPage } from "../../../components/HealthLandingPage/HealthLandingPage";

export const HospitalsPage = () => {

  useEffect(() => { window.scrollTo(0, 0) }, []);

  let [hospitalList, setHospitalList] = useState(Hospitals);

  // Filter Logic
  const [allHospitals] = useState(HospitalCardDta); // Original Data
  const [locationFiltered, setLocationFiltered] = useState(HospitalCardDta); // Data after Location Filter
  let [HospitalCrds, setHospitalCrds] = useState(HospitalCardDta); // Final Data (after Search)

  const [location, setLocation] = useState("All");

  // Extract Unique Locations
  const locations = ["All", ...new Set(Hospital_Details.map(item => item.location).filter(Boolean))];

  useEffect(() => {
    if (location === "All") {
      setLocationFiltered(allHospitals);
      setHospitalCrds(allHospitals);
    } else {
      const filtered = allHospitals.filter(card => {
        const detail = Hospital_Details.find(d => d.id == card.id);
        return detail && detail.location === location;
      });
      setLocationFiltered(filtered);
      setHospitalCrds(filtered);
    }
  }, [location, allHospitals]);


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
          <HealthLandingPage id={id} Alldata={Hospital_Details} />
          :
          <section className="health-cata-pg-sec">
            {/* Sidebar */}
            <div className={(showList) ? "health-lft-sec health-showList" : "health-lft-sec"} >
              <h2 className="health-sector-label" onClick={() => { navigate(`/hospital`) }}>Hospital</h2>
              <div className="health-institute-hd-lst">
                <h2 className="health-institute-hd">Hospitals</h2>
                <ul className="health-institute-lst">
                  {
                    hospitalList.map((v, i) => {
                      return (
                        <li onClick={() => { navigate(`?id=${v.id}`); setShowlist(false) }} key={i}>{v.HospitalName}</li>
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
                <h1 className="health-cata-pg-main-hd">Top Rated Hospitals</h1>
                <p>Find the best hospitals near you with top-tier facilities and expert doctors.</p>

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
                    <SearchBar SearchedInst={setHospitalCrds} AllInst={locationFiltered} />
                  </div>
                </div>
              </div>

              <div className="health-card-cont">
                {
                  HospitalCrds.length > 0 ? (
                    HospitalCrds.map((v, i) => {
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
                      <h3>No Hospitals Found</h3>
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

export default HospitalsPage;
