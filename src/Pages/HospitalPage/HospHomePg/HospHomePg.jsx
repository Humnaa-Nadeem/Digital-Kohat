import { useEffect, useState } from "react";
import "../../CatagoriesHomePgs.css";

import "../../EducationPage/EduHomePage/EduHomePage.css";
import { useNavigate } from "react-router-dom";
import { categories } from "../HosCategoriesPg/HosCategories";
<<<<<<< HEAD
import { Form } from "../../../components/Form/form";

=======
import { EduRegisterForm } from "../../../components/Form/form";
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
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

<<<<<<< HEAD
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
=======
    return (
        <>
            {
                // Condition
                (showForm)
                    ?
                    //  Registration Form
                    <EduRegisterForm setShowform={setShowform} />
                    :
                    // Home Page
                    <section className="pg-sec">
                        {/* Registartion Button */}
                        <button onClick={() => { setShowform(true) }} className="rsgrt-btn">Registration</button>
                        {/* Hospital / Healthcare Part like hospitals, clinics & pharmacies */}
                        <div className="content-cont">
                            <h1>Let's Find Best Healthcare In <strong>Kohat</strong></h1>
                            <p className="pg-desc">Find trusted hospitals, clinics, pharmacies, and diagnostic centers in <b>Kohat</b>. This page helps residents locate nearby healthcare services, view brief descriptions, and navigate to detailed listings.</p>
                            <div className="card-Container">
                                {categories.map((v, i) => {
                                    return (
                                        <div className="card EduHomeCard" key={i}>
                                            <span className="Icon_Cont">{v.icon}</span>
                                            <h2 className="Cata_Title">{v.title}</h2>
                                            <p>{v.description}</p>
                                            <button className="pg-crd-btn" onClick={() => navigate(v.link)}>{v.btn}</button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </section>
            }
        </>
    )
}
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
