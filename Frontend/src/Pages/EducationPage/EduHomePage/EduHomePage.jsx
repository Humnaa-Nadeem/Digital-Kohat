import { useEffect, useState } from "react";
import "../../CatagoriesHomePgs.css";
import "./EduHomePage.css";
import "react-router-dom";
import { useNavigate } from "react-router-dom";
import { categories } from "../../../Store/Edu_store";
import { EduRegisterForm } from "../../../components/Form/form";
// import { Form } from "../../../components/Form/form";
export const EduHomePage = () => {

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
                        <button onClick={() => navigate("admin")} className="AdminLogin-btn">Admin Login</button>
                        {/* Education Institute Part like schools , colleges & Uni */}
                        <div className="content-cont">
                            <h1>Let's Find Best Education In <strong>Kohat</strong></h1>
                            <p className="pg-desc">Let find the best education in a <b>Kohat</b> where students can easily find good schools, colleges, and learning centers nearby. This platform helps parents and students get clear details about courses and facilities so they can choose the right place for study with confidence.</p>
                            <div className="card-Container">
                                {categories.map((v, i) => {
                                    return (
                                        <div className="card EduHomeCard" key={i}>
                                            <h2 className="Cata_Title">{v.title}</h2>
                                            <span className="Edu_Home_card_Img"><img src="https://images.pexels.com/photos/207684/pexels-photo-207684.jpeg" /></span>
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