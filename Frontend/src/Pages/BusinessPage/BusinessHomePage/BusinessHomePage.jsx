import { useEffect } from "react";
import "../../CatagoriesHomePgs.css";
import "./BusinessHomePage.css";
import { useNavigate } from "react-router-dom";
import { businessCategories } from "../../../Store/Business_store";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";

export const BusinessHomePage = () => {

    // To show page from the top:
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    // Navigate use to redirect to other pages:
    const navigate = useNavigate();

    return (
        <>
            <section className="pg-sec">
                {/* Business Categories */}
                <div className="content-cont">
                    <h1>Connect with Top <strong>Businesses</strong> in Kohat</h1>
                    <p className="pg-desc">Find the best shops, offices, service providers, and professionals in <b>Kohat</b>. Whether you are looking for retail therapy, corporate services, or skilled freelancers, we connect you with the right businesses.</p>

                    {/* Action Buttons */}
                    <div className="business-actions-container">
                        <button onClick={() => navigate('/business/register')} className="business-btn btn-register">
                            <FaUserPlus /> Register Your Business
                        </button>
                        <button onClick={() => navigate('/business/login')} className="business-btn btn-login">
                            <FaSignInAlt /> Business Login
                        </button>
                    </div>

                    <div className="card-Container">
                        {businessCategories.map((v, i) => {
                            return (
                                <div className="card" key={i} style={{ width: "280px", overflow: "hidden", padding: "0" }}>
                                    <div style={{ height: "160px", overflow: "hidden" }}>
                                        <img
                                            src={v.coverImage || "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"}
                                            alt={v.title}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    </div>
                                    <div style={{ padding: "15px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <h2 className="Cata_Title" style={{ fontSize: "1.3rem", margin: "10px 0" }}>{v.title}</h2>
                                        {/* <span className="Icon_Cont">{v.icon}</span> */}
                                        <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "15px" }}>{v.description}</p>
                                        <button className="pg-crd-btn" onClick={() => navigate(v.link)}>{v.btn}</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}
