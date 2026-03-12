import { useEffect, useState } from "react";
import "../../CatagoriesHomePgs.css";
import "./FoodHomePage.css";
import { useNavigate } from "react-router-dom";
import { EduRegisterForm } from "../../../components/Form/form";
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
<<<<<<< HEAD
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
=======
            {/* LUXURY HERO SECTION */}
            <header className="FoodHeroPremium">
                <div className="HeroOverlay">
                    <div className="HeroContent">
                        <span className="HeroBadge">KPK's Premier Food Network</span>
                        <h1>Taste the Essence of <strong>KPK Heritage</strong></h1>
                        <p className="HeroLead">
                            From the spicy streets of Peshawar to the cozy cafes of Kohat,
                            discover the culinary crown jewels of Khyber Pakhtunkhwa.
                        </p>
                        <div className="HeroBtnGroup">
                            <button className="btn-primary" onClick={() => document.getElementById('categories').scrollIntoView({ behavior: 'smooth' })}>
                                Explore Cuisines
                            </button>
                            <button className="btn-secondary" onClick={() => setShowform(!showForm)}>
                                {showForm ? "Close Registration" : "Join as Merchant"}
                            </button>
                            <button className="fd-hero-admin-login-btn" style={{ marginLeft: '12px', background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.6)', padding: '12px 28px', borderRadius: '30px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease' }} onClick={() => navigate('/food/admin')}>
                                Admin Login
                            </button>
                        </div>
                    </div>
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
                </div>
              </div>
            </div>
          </header>

<<<<<<< HEAD
          {/* CATEGORIES */}
          <main id="categories" className="FoodCategoriesPremium">
            <div className="SectionTitleCenter">
              <h2>
                Browse by <strong>Category</strong>
              </h2>
              <p>Choose your favourite food category.</p>
            </div>
=======
            {/* MERCHANT REGISTRATION SECTION (Conditional) */}
            {showForm && (
                <section className="MerchantSection">
                    <div className="MerchantContainer">
                        <div className="MerchantCard">
                            <div className="MerchantInfo">
                                <h2>Grow Your Restaurant with <strong>Digital KPK</strong></h2>
                                <p>Join thousands of local businesses reaching millions of food lovers across the province. Get listed in minutes.</p>
                                <ul className="MerchantPerks">
                                    <li>✓ Real-time Order Management</li>
                                    <li>✓ Provincial-wide Visibility</li>
                                    <li>✓ Dedicated Support Desk</li>
                                </ul>
                                <div style={{ marginTop: '30px' }}>
                                    <p style={{ marginBottom: '10px', fontSize: '0.9rem' }}>Already registered?</p>
                                    <button
                                        className="btn-primary"
                                        style={{ padding: '10px 30px', fontSize: '1rem' }}
                                        onClick={() => navigate('/food/admin')}
                                    >
                                        Admin Login
                                    </button>
                                </div>
                            </div>
                            <div className="MerchantFormWrapper">
                                <EduRegisterForm setShowform={setShowform} serviceCategory="Food" />
                            </div>
                        </div>
                    </div>
                </section>
            )}
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7

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
