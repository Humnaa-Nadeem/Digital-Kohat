import { useEffect, useState } from "react";
import "./TourismHome.css";
import { useNavigate } from "react-router-dom";
import { tourismCategories } from "../../Store/Tourism_store";
import { Form } from "../../components/Form/form";

export const TourismHome = () => {
  const navigate = useNavigate();
  const [showForm, setShowform] = useState(false);
  const [serviceType, setServiceType] = useState(""); // Store service type for dynamic form

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ REGISTRATION-ONLY CHECK
  const handleCardClick = (category) => {
    // Check if user is registered
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (registeredUser && registeredUser.id) {
      // User is registered
      console.log("Registered User ID:", registeredUser.id);
      console.log("Clicked Tourism Record:", category);

      navigate(category.link, {
        state: {
          category,
          userId: registeredUser.id,
        },
      });
    } else {
      // User not registered → open registration form
      alert("Please register first!");
      setServiceType("Tourism"); // Set dynamic service type
      setShowform(true);
    }
  };

  return (
    <>
      {showForm ? (
        <Form setShowform={setShowform} serviceType={serviceType} />
      ) : (
        <section className="tourism-pg-sec">
          {/* Registration Button */}
          <button
            onClick={() => {
              setServiceType("Tourism"); // Open form with Tourism service type
              setShowform(true);
            }}
            className="rsgrt-btn"
          >
            Registration
          </button>

          <div className="content-cont">
            <h1>
              Let's Explore Best Tourism In <strong>Kohat</strong>
            </h1>

            <p className="tourism-pg-desc">
              Discover beautiful places, historical sites, hotels, restaurants, and parks in Kohat.
            </p>

            <div className="card-Container">
              {tourismCategories.map((v, i) => (
                <div
                  className="card"
                  key={i}
                  style={{
                    backgroundImage: `url(${v.bgImage})`,
                    cursor: "pointer",
                  }}
                  onClick={() => handleCardClick(v)}
                >
                  <h2 className="Tourism_Cata_Title">{v.title}</h2>
                  <p>{v.description}</p>
                  <button className="tourism-pg-crd-btn">{v.btn}</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
  