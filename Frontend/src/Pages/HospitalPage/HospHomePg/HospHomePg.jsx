import { useEffect, useState } from "react";
import "./HealthHome.css";
import { useNavigate } from "react-router-dom";
import { categories } from "../HosCategoriesPg/HosCategories"; // Corrected Import
import { FaSearch, FaCheckCircle, FaHospital, FaStethoscope, FaAmbulance, FaCapsules, FaMicroscope, FaUserMd } from "react-icons/fa";
// Removed local image import to fix missing module error

export const HospHomePage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [location, setLocation] = useState("Kohat");

    // Filter categories based on selection
    const filteredCategories = categories.filter(cat =>
        searchTerm === "" || cat.title === searchTerm
    );

    // Map icons to categories if they strictly match titles
    const getIcon = (title) => {
        if (title.includes("Hospital")) return <FaHospital />;
        if (title.includes("Clinic")) return <FaStethoscope />;
        if (title.includes("Ambulance")) return <FaAmbulance />;
        if (title.includes("Pharmacy")) return <FaCapsules />;
        if (title.includes("Diagnostic")) return <FaMicroscope />;
        if (title.includes("Specialist")) return <FaUserMd />;
        return <FaHospital />;
    };

    return (
        <div className="HealthHomeContainer">
            {/* OlaDoc Style Banner */}
            <section className="HealthHeroSection">
                <div className="HealthHeroContent">
                    <div className="HealthHeroText">
                        <div className="VerifiedBadge">
                            <FaCheckCircle /> <span>Verified Healthcare Services</span>
                        </div>
                        <h1>Find and Book the <br /> <span>Best Doctors</span> near you</h1>
                        <p>Access the best hospitals, clinics, and specialists in Kohat District.</p>

                        <div className="HealthSearchBar">
                            <div className="SearchInputGroup" style={{ flex: 1 }}>
                                <FaSearch />
                                <select
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="HealthFilterSelect"
                                    style={{ border: 'none', background: 'transparent' }}
                                >
                                    <option value="">Search Doctors, Hospitals, Conditions...</option>
                                    {categories.map((cat, i) => (
                                        <option key={i} value={cat.title}>{cat.title}</option>
                                    ))}
                                </select>
                            </div>
                            <button className="SearchBtn" onClick={() => {
                                const selectedCat = categories.find(c => c.title === searchTerm);
                                if (selectedCat) navigate(selectedCat.link);
                            }}>Search</button>
                        </div>
                    </div>

                    <div className="HealthHeroImage">
                        {/* Use a placeholder from web if local asset doesn't exist */}
                        <img
                            src="https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=1000"
                            alt="Doctor"
                        />
                    </div>
                </div>
            </section>

            {/* Categories Section - Food Style Cards */}
            <section className="HealthCategoriesSection">
                <div className="CategoryGrid">
                    {filteredCategories.map((v, i) => (
                        <div className="HealthCategoryCard" key={i} onClick={() => navigate(v.link)}>
                            <div className="CatImgContainer">
                                {/* Use v.img if available, else placeholder */}
                                <img src={v.img || "https://img.freepik.com/free-vector/hospital-building-concept-illustration_114360-8440.jpg"} alt={v.title} />
                                <div className="CatIconBadge">
                                    {getIcon(v.title)}
                                </div>
                            </div>
                            <div className="CatContent">
                                <h3>{v.title}</h3>
                                <p>{v.description}</p>
                                <button className="CatActionBtn">{v.btn || "Explore"}</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}