import { useEffect, useState } from "react";
import "../../CatagoriesHomePgs.css";
import "./FoodHomePage.css";
import { useNavigate } from "react-router-dom";
import { Form } from "../../../components/Form/form";
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
        <>
            {
                (showForm)
                    ?
                    //  Registration Form
                    <Form setShowform={setShowform} />
                    :
                    // Home Page
                    <section className="Food-pg-sec">
                        {/* Registration Button */}
                        <button onClick={() => { setShowform(true) }} className="rsgrt-btn">List Your Food Service</button>

                        {/* Food Categories */}
                        <div className="content-cont">
                            <h1>Discover the Best <strong>Food & Dining</strong> in Kohat</h1>
                            <p className="pg-desc">From traditional local flavors to international cuisines, explore the finest dining spots across Kohat. Whether you're looking for a quick bite, a cozy cafe, or a premium fine dining experience, we've curated the best options to satisfy your cravings.</p>

                            <div className="card-Container">
                                {Food_categories.map((v, i) => {
                                    return (
                                        <div className="card food-cards" key={i}>
                                            <div className="crd-img-title-div">
                                                <div className="img-container">
                                                    <img src={v.img} alt={v.title} />
                                                    <div className="icon-overlay">
                                                        {v.icon}
                                                    </div>
                                                </div>
                                                <h2>{v.title}</h2>
                                            </div>
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
