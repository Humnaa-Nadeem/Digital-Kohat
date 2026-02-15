import { useEffect, useState } from "react";
import "../../CatagoriesHomePgs.css";

import "../../EducationPage/EduHomePage/EduHomePage.css";
import { useNavigate } from "react-router-dom";
import { categories } from "../HosCategoriesPg/HosCategories";
import { Form } from "../../../components/Form/form";

export const HospHomePage = () => {
  const navigate = useNavigate();
  const [showForm, setShowform] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {showForm ? (
        <Form setShowform={setShowform} category="health" />
      ) : (
        <section className="pg-sec">

          {/* ✅ JOIN BUTTON */}
          <button
            className="rsgrt-btn"
            onClick={() => setShowform(true)}
          >
            Join as Service Provider
          </button>

          <div className="content-cont">
            <h1>Let's Find Best Healthcare In <strong>Kohat</strong></h1>
            <p className="pg-desc">
              Find trusted hospitals, clinics, pharmacies and diagnostic centers.
            </p>

            <div className="card-Container">
              {categories.map((v, i) => (
                <div className="card EduHomeCard" key={i}>
                  <span className="Icon_Cont">{v.icon}</span>
                  <h2 className="Cata_Title">{v.title}</h2>
                  <p>{v.description}</p>
                  <button
                    className="pg-crd-btn"
                    onClick={() => navigate(v.link)}
                  >
                    {v.btn}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
