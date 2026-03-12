import { useEffect, useState } from "react";
import "../../CatagoriesHomePgs.css";
import "./TechniciansHomePg.css";

import { useNavigate } from "react-router-dom";
import { EduRegisterForm } from "../../../components/Form/form";
import { Techicians_categories } from "../../../Store/Techcn_Store";

export const TechniciansHomePg = () => {

    // Page ko top se load karne ke liye
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Navigation
    const navigate = useNavigate();

    // Form states
    const [showForm, setShowform] = useState(false);
    const [category, setCategory] = useState(null);

    return (
        <>
<<<<<<< HEAD
            {showForm ? (
                // 🔹 Technician Registration Form
                <Form
                    setShowform={setShowform}
                    role="admin"
                    category={category}
                />
            ) : (
                // 🔹 Technician Home Page
                <section className="Tech-pg-sec">

                    {/* ✅ Join as Service Provider Button */}
                    <button
                        className="rsgrt-btn"
                        onClick={() => {
                            setCategory("technician");
                            setShowform(true);
                        }}
                    >
                        Join as Service Provider
                    </button>

                    {/* Page Content */}
                    <div className="content-cont">
                        <h1>
                            Let's Find your wanted <strong>Technicians</strong>
                        </h1>

                        <p className="pg-desc">
                            Find the right technician for your needs with ease.
                            Our platform connects you to trusted professionals
                            ready to handle electrical work, plumbing, repairs,
                            installations, and much more.
                        </p>

                        {/* Technician Categories */}
                        <div className="card-Container">
                            {Techicians_categories.map((v, i) => (
                                <div className="card tech-cards" key={i}>
                                    <div
                                        className="crd-img-title-div"
                                        style={{ flexDirection: "column" }}
                                    >
                                        <img src={v.img} alt={v.title} />
                                        <h2>{v.title}</h2>
                                    </div>

                                    <p>{v.description}</p>

                                    <button
                                        className="pg-crd-btn"
                                        onClick={() => navigate(v.link)}
                                    >
                                        {v.btn}
                                    </button>
                                </div>
                            ))}
=======
            {
                (showForm)
                    ?
                    //  Registration Form
                    <EduRegisterForm setShowform={setShowform} />
                    :
                    // Home Page
                    <section className="Tech-pg-sec">
                        {/* Registartion Button */}
                        <button onClick={() => { setShowform(true) }} className="rsgrt-btn">Registration</button>
                        {/* Techicians Catagories */}
                        <div className="content-cont">
                            <h1>Let's Find your wanted <strong>Technicians</strong></h1>
                            <p className="pg-desc">Find the right technician for your needs with ease. Our platform connects you to trusted professionals ready to handle electrical work, plumbing, repairs, installations, and much more. Whether you need quick assistance or expert service, we ensure reliable technicians are always within reach.</p>
                            <div className="card-Container">
                                {Techicians_categories.map((v, i) => {
                                    return (
                                        <div className="card tech-cards" key={i}>
                                            <div className="crd-img-title-div" style={{ flexDirection: "column" }}>
                                                <img src={v.img} />
                                                <h2>{v.title}</h2>
                                            </div>
                                            <p>{v.description}</p>
                                            <button className="pg-crd-btn" onClick={() => navigate(v.link)}>{v.btn}</button>
                                        </div>
                                    )
                                })}
                            </div>
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};
