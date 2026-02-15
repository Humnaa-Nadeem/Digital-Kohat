import { useEffect, useState } from "react";
import "../../CatagoriesHomePgs.css";
import "./BusinessHomePage.css";
import { useNavigate } from "react-router-dom";
import { businessCategories } from "../../../Store/Business_store";
import { Form } from "../../../components/Form/form";


export const BusinessHomePage = () => {
  const navigate = useNavigate();
  const [showForm, setShowform] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {showForm ? (
        // ✅ BUSINESS SERVICE PROVIDER FORM
        <Form setShowform={setShowform} category="business" />
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
            <h1>
              Connect with Top <strong>Businesses</strong> in Kohat
            </h1>
            <p className="pg-desc">
              Find shops, offices, freelancers and professional services.
            </p>

            <div className="card-Container">
              {businessCategories.map((v, i) => (
                <div
                  className="card"
                  key={i}
                  style={{ width: "280px", padding: "0" }}
                >
                  <div style={{ height: "160px", overflow: "hidden" }}>
                    <img
                      src={
                        v.coverImage ||
                        "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                      }
                      alt={v.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      padding: "15px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <h2 className="Cata_Title">{v.title}</h2>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "#666",
                        marginBottom: "15px",
                        textAlign: "center",
                      }}
                    >
                      {v.description}
                    </p>

                    <button
                      className="pg-crd-btn"
                      onClick={() => navigate(v.link)}
                    >
                      {v.btn}
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
