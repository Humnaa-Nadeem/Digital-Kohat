import "./HealthCategories.css";
import { SearchBar } from "../../../components/SearchBar/Searchbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Diagnostics, DiagnosticCardDta, Diagnostic_Details } from "./HosCatData";
import { HealthLandingPage } from "../../../components/HealthLandingPage/HealthLandingPage";

export const DiagnosticsPage = () => {

  useEffect(() => { window.scrollTo(0, 0) }, []);

  let [diagnosticList, setDiagnosticList] = useState(Diagnostics);

  // Filter Logic
  const [allDiagnostics] = useState(DiagnosticCardDta);
  const [locationFiltered, setLocationFiltered] = useState(DiagnosticCardDta);
  let [DiagnosticCrds, setDiagnosticCrds] = useState(DiagnosticCardDta);

  const [location, setLocation] = useState("All");

  // Extract Unique Locations
  const locations = ["All", ...new Set(Diagnostic_Details.map(item => item.location).filter(Boolean))];

  useEffect(() => {
    if (location === "All") {
      setLocationFiltered(allDiagnostics);
      setDiagnosticCrds(allDiagnostics);
    } else {
      const filtered = allDiagnostics.filter(card => {
        const detail = Diagnostic_Details.find(d => d.id == card.id);
        return detail && detail.location === location;
      });
      setLocationFiltered(filtered);
      setDiagnosticCrds(filtered);
    }
  }, [location, allDiagnostics]);


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
          <HealthLandingPage id={id} Alldata={Diagnostic_Details} />
          :
          <section className="health-cata-pg-sec">
            {/* Sidebar */}
            <div className={(showList) ? "health-lft-sec health-showList" : "health-lft-sec"} >
              <h2 className="health-sector-label" onClick={() => { navigate(`/hospital`) }}>Hospital</h2>
              <div className="health-institute-hd-lst">
                <h2 className="health-institute-hd">Diagnostics</h2>
                <ul className="health-institute-lst">
                  {
                    diagnosticList.map((v, i) => {
                      return (
                        <li onClick={() => { navigate(`?id=${v.id}`); setShowlist(false) }} key={i}>{v.DiagnosticName}</li>
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
                <h1 className="health-cata-pg-main-hd">Diagnostics & Labs</h1>
                <p>Find reliable labs and imaging centers.</p>

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
                    <SearchBar SearchedInst={setDiagnosticCrds} AllInst={locationFiltered} />
                  </div>
                </div>
              </div>

              <div className="health-card-cont">
                {
                  DiagnosticCrds.length > 0 ? (
                    DiagnosticCrds.map((v, i) => {
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
                      <h3>No Diagnostics Found</h3>
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

export default DiagnosticsPage;
