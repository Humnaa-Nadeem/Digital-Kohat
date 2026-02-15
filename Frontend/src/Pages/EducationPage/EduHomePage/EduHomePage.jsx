import { useEffect, useState } from "react";
import "../../CatagoriesHomePgs.css";
import "./EduHomePage.css";

import { useNavigate } from "react-router-dom";
import { categories } from "../../../Store/Edu_store";
import { Form } from "../../../components/Form/form";

export const EduHomePage = () => {
  const navigate = useNavigate();
  const [showForm, setShowform] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {showForm ? (
        <Form setShowform={setShowform} category="education" />
      ) : (
        <section className="pg-sec">

          <button
            className="rsgrt-btn"
            onClick={() => setShowform(true)}
          >
            Join as Service Provider
          </button>

          <div className="content-cont">
            <h1>Let's Find Best Education In <strong>Kohat</strong></h1>
            <p className="pg-desc">
              Find schools, colleges and learning centers easily.
            </p>

            <div className="card-Container">
              {categories.map((v, i) => (
                <div className="card EduHomeCard" key={i}>
                  <h2 className="Cata_Title">{v.title}</h2>
                  <span className="Icon_Cont">{v.icon}</span>
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
