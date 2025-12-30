import "../../EducationPage/EduCatagoriesPg/EduCatagories.css";
import { SearchBar } from "../../../components/SearchBar/Searchbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Specialists, SpecialistCardDta, Specialist_Details } from "./HosCatData";
import { SingleLandingPage } from "../../../components/SingleLandingPage/SingleLandingPage";

export const SpecialistsPage = () => {
  useEffect(() => { window.scrollTo(0, 0) }, []);

  let [specialList, setSpecialList] = useState(Specialists);
  let [SpecialCrds, setSpecialCrds] = useState(SpecialistCardDta);

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
          <SingleLandingPage id={id} Alldata={Specialist_Details} />
          :
          <section className="edu-cata-pg-sec">
            <div className={(showList) ? "lft-sec showList" : "lft-sec"} >
              <h2 className="sector" onClick={() => { navigate(`/hospital`) }}>Hospital</h2>
              <div className="institute-hd-lst">
                <h2 className="institute-hd">Specialists</h2>
                <ul className="institute-lst">
                  {
                    specialList.map((v, i) => {
                      return (
                        <li onClick={() => { navigate(`?id=${v.id}`); setShowlist(false) }} key={i}>{v.SpecialistName}</li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>

            <div className="main-sec">
              <div className="showLstBtn" onClick={() => { setShowlist(!showList) }}>{(showList) ? <>&times;</> : <>&#9776;</>}</div>
              <div className="cata-pg-banner">
                <h1 className="cata-pg-main-hd">Specialist Doctors & Clinics</h1>
                <p>Find specialist doctors by department and availability.</p>
                <SearchBar SearchedInst={setSpecialCrds} AllInst={SpecialCrds} />
              </div>

              <div className="cata-card-cont">
                {
                  SpecialCrds.map((v, i) => {
                    return (
                      <div className="cata-pg-card" key={i}>
                        <img src={v.img} alt="Placeholder Image" />
                        <div className="cata-pg-card-content">
                          <h3>{v.InstName}</h3>
                          <p>{v.Desc}</p>
                          <button onClick={() => { navigate(`?id=${v.id}`) }} className="cata-pg-card-btn">{v.btn_txt}</button>
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

export default SpecialistsPage;
