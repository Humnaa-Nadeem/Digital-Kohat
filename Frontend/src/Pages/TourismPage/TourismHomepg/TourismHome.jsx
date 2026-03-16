import { useEffect, useState } from "react";
import "./TourismHome.css";
import { useNavigate } from "react-router-dom";
import { tourismCategories } from "../../../Store/Tourism_store";
import { Form } from "../../../components/Form/form";

export const TourismHome = () => {
  const navigate = useNavigate();

  const [showForm, setShowform] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const userListings =
      JSON.parse(localStorage.getItem("tourismListings")) || [];

    setAllCategories([...tourismCategories, ...userListings]);
  }, [showForm]);

  const handleCardClick = (category) => {
    navigate(category.link || `/tourism/${category.id}`, {
      state: { category },
    });
  };

  return (
    <>
      {/* {showForm ? (
        <SignUpForm setShowform={setShowform} />
      ) : ( */}
      <section className="tourism-home">
        <div className="tourism-content">
          <div className="tourism-header">
            <span className="tourism-badge">Explore Kohat</span>
            <h1>
              Let's Explore Best Tourism In <strong>Kohat</strong>
            </h1>
            <p className="tourism-description">
              Discover beautiful places, historical sites, hotels, restaurants, and parks in Kohat.
            </p>
          </div>

          <div className="tourism-card-grid">
            {allCategories.map((v, i) => (
              <div
                className="tourism-card"
                key={i}
                onClick={() => handleCardClick(v)}
              >
                <div
                  className="tourism-card-bg"
                  style={{
                    backgroundImage: `url(${v.bgImage || v.image})`,
                  }}
                ></div>
                <div className="tourism-card-overlay"></div>

                <div className="tourism-card-content">
                  <div className="tourism-card-icon">
                    <i className={v.icon}></i>
                  </div>
                  <h2 className="tourism-card-title">{v.title}</h2>
                  <p className="tourism-card-desc">{v.description}</p>
                  <button className="tourism-card-btn">
                    {v.btn}
                    <span className="btn-icon">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
