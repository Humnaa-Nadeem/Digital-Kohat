import { useEffect, useState } from "react";
import "../../CatagoriesHomePgs.css";
import "./FoodHomePage.css";
import { useNavigate } from "react-router-dom";
import { EduRegisterForm } from "../../../components/Form/form";
import { Food_categories } from "../../../Store/Food_store";

export const FoodHomePage = () => {

    // To show page from the top:
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    // Navigate use to redirect to other pages:
    const navigate = useNavigate();

    // useState to open the Form
    let [showForm, setShowform] = useState(false);

    return (
        <section className="FoodHomePremium">
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
                        </div>
                    </div>
                </div>
            </header>

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
                            </div>
                            <div className="MerchantFormWrapper">
                                <EduRegisterForm setShowform={setShowform} serviceType="Restaurant" />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* BROWSE CATEGORIES */}
            <main id="categories" className="FoodCategoriesPremium">
                <div className="SectionTitleCenter">
                    <h2>Browse by <strong>Expertise</strong></h2>
                    <p>Select a category to find the best dining spots tailored to your mood.</p>
                </div>

                <section className="CategoriesGridPremium">
                    {Food_categories.map((v, i) => (
                        <div className="CategoryCardPremium" key={i} onClick={() => navigate(v.link)}>
                            <div className="CategoryThumb">
                                <img src={v.img} alt={v.title} />
                                <div className="CategoryIcon">
                                    {v.icon}
                                </div>
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

            {/* PARTNER BANNER (If form is not open) */}
            {!showForm && (
                <section className="PartnerCta">
                    <div className="CtaContent">
                        <h2>Your Restaurant Deserves the <strong>Spotlight</strong></h2>
                        <p>Partner with us today and take your culinary business to new heights.</p>
                        <button className="cta-btn" onClick={() => {
                            setShowform(true);
                            window.scrollTo({ top: 300, behavior: 'smooth' });
                        }}>
                            Get Started Now
                        </button>
                    </div>
                </section>
            )}
        </section>
    );
};
