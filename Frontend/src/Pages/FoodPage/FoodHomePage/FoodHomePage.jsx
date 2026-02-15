import { useEffect, useState } from "react";
import "../../CatagoriesHomePgs.css";
import "./FoodHomePage.css";
import { useNavigate } from "react-router-dom";
import { Form } from "../../../components/Form/form";
import { Food_categories } from "../../../Store/Food_store";

export const FoodHomePage = () => {
  const navigate = useNavigate();
  const [showForm, setShowform] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {showForm ? (
        // ✅ FOOD SERVICE PROVIDER FORM
        <Form setShowform={setShowform} category="food" />
      ) : (
        <section className="FoodHomePremium">
          {/* HERO */}
          <header className="FoodHeroPremium">
            <div className="HeroOverlay">
              <div className="HeroContent">
                <span className="HeroBadge">KPK's Premier Food Network</span>
                <h1>
                  Taste the Essence of <strong>KPK Heritage</strong>
                </h1>
                <p className="HeroLead">
                  Discover the best restaurants, cafes, bakeries and food spots.
                </p>

                <div className="HeroBtnGroup">
                  <button
                    className="btn-primary"
                    onClick={() =>
                      document
                        .getElementById("categories")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Explore Food
                  </button>

                  {/* ✅ JOIN BUTTON */}
                  <button
                    className="btn-secondary"
                    onClick={() => setShowform(true)}
                  >
                    Join as Service Provider
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* CATEGORIES */}
          <main id="categories" className="FoodCategoriesPremium">
            <div className="SectionTitleCenter">
              <h2>
                Browse by <strong>Category</strong>
              </h2>
              <p>Choose your favourite food category.</p>
            </div>

            <section className="CategoriesGridPremium">
              {Food_categories.map((v, i) => (
                <div
                  className="CategoryCardPremium"
                  key={i}
                  onClick={() => navigate(v.link)}
                >
                  <div className="CategoryThumb">
                    <img src={v.img} alt={v.title} />
                    <div className="CategoryIcon">{v.icon}</div>
                  </div>
                  <div className="CategoryDetails">
                    <h3>{v.title}</h3>
                    <p>{v.description}</p>
                    <button className="explore-btn">{v.btn}</button>
                  </div>
                </div>
              ))}
            </section>
          </main>
        </section>
      )}
    </>
  );
};
