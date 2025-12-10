import { useEffect, useState } from "react";
import "./EduHomePage.css";
import "react-router-dom";
import { useNavigate } from "react-router-dom";
import { categories } from "../../../Store/Edu_store";
import { Form } from "../../../components/Form/form";
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
                    <Form setShowform={setShowform} />
                    :
                    // Home Page
                    <section className="edu-pg-sec">
                        {/* Registartion Button */}
                        <button onClick={() => { setShowform(true) }} className="rsgrt-btn">Registration</button>
                        {/* Education Institute Part like schools , colleges & Uni */}
                        <div className="content-cont">
                            <h1>Let's Find Best Education In <strong>Kohat</strong></h1>
                            <p className="edu-pg-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium velit recusandae esse ipsum, enim inventore nihil nam beatae, corporis in quidem provident</p>
                            <div className="card-Container">
                                {categories.map((v, i) => {
                                    return (
                                        <div className="card" key={i}>
                                            <span className="Icon_Cont">{v.icon}</span>
                                            <h2 className="Edu_Cata_Title">{v.title}</h2>
                                            <p>{v.description}</p>
                                            <button className="edu-pg-crd-btn" onClick={() => navigate(v.link)}>{v.btn}</button>
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