import { useEffect, useState } from "react";
import "../../CatagoriesHomePgs.css";
import "../../EducationPage/EduHomePage/EduHomePage.css";
import "react-router-dom";
import { useNavigate } from "react-router-dom";
import { categories } from "../HosCategoriesPg/HosCategories";
import { EduRegisterForm } from "../../../components/Form/form";
export const HospHomePage = () => {

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