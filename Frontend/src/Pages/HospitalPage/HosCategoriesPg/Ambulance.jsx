import "./HealthCategories.css";
import { SearchBar } from "../../../components/SearchBar/Searchbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Ambulance, AmbulanceCardDta, Ambulance_Details } from "./HosCatData";
import { HealthLandingPage } from "../../../components/HealthLandingPage/HealthLandingPage";

export const AmbulancePage = () => {
  useEffect(() => { window.scrollTo(0, 0) }, []);

  let [ambulanceList, setAmbulanceList] = useState(Ambulance);
  let [AmbulanceCrds, setAmbulanceCrds] = useState(AmbulanceCardDta);

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
          <HealthLandingPage id={id} Alldata={Ambulance_Details} />
          :
          <section className="health-cata-pg-sec">
            {/* Sidebar */}
            <div className={(showList) ? "health-lft-sec health-showList" : "health-lft-sec"} >
              <h2 className="health-sector-label" onClick={() => { navigate(`/hospital`) }}>Hospital</h2>
              <div className="health-institute-hd-lst">
                <h2 className="health-institute-hd">Ambulance Services</h2>
                <ul className="health-institute-lst">
                  {
                    ambulanceList.map((v, i) => {
                      return (
                        <li onClick={() => { navigate(`?id=${v.id}`); setShowlist(false) }} key={i}>{v.ServiceName}</li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="health-main-sec">
              <div className="health-showLstBtn" onClick={() => { setShowlist(!showList) }}>{(showList) ? <>&times;</> : <>&#9776;</>}</div>

              {/* Banner */}
              <div className="health-cata-banner">
                <h1 className="health-cata-pg-main-hd">Emergency Ambulance Services</h1>
                <p>Rapid response ambulance providers and contact details.</p>
                <div className="HealthFilterBar" style={{ background: 'transparent', boxShadow: 'none', padding: 0 }}>
                  <SearchBar SearchedInst={setAmbulanceCrds} AllInst={AmbulanceCardDta} />
                </div>
              </div>

              {/* Cards */}
              <div className="health-card-cont">
                {
                  AmbulanceCrds.map((v, i) => {
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
                }
              </div>
            </div>
          </section>
      }
    </>
  )
}

export default AmbulancePage;
