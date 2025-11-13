import { useEffect } from "react";
import Navbar from "../../../components/navbar/Navbar"
import "./EduHomePage.css";
import "react-router-dom";
import { FaRegBuilding, FaSchool, FaUniversity } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import Footer from "../../../components/footer/Footer";
export const EduHomePage = () => {
    // To show page from the top:
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    // Navigate use to redirect to other pages:
    const navigate = useNavigate();
    // Array of card data:
    const categories = [
        {
            title: "Explore School",
            description:
                "Explore top-rated schools offering excellent primary and secondary education with strong foundations.",
            icon: <FaSchool className="icons" />,
            btn: "Visit Schools",
            link: "/edu/schools"
        },
        {
            title: "College's List",
            description:
                "Find the best colleges that prepare students for higher learning, skill development, and innovation.",
            icon: <FaRegBuilding className="icons" />,
            btn: "Visit colleges",
            link: "/edu/colleges"
        },
        {
            title: "Universities",
            description:
                "Discover globally recognized universities offering advanced degrees and research opportunities.",
            icon: <FaUniversity className="icons" />,
            btn: "Visit Universities",
            link: "/edu/uni"
        },
    ];
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <section className="edu-pg-grd-sec">
                    <img src="https://images.pexels.com/photos/10819621/pexels-photo-10819621.jpeg" />
                    <div className="txt-over-img">
                        <h1>Let's Find Best Education In <strong>Kohat</strong></h1>
                        <p className="pg-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium velit recusandae esse ipsum, enim inventore nihil nam beatae, corporis in quidem provident repellendus omnis ex quis sit hic, non qui. Praesentium velit recusandae esse ipsum, enim inventore nihil nam beatae</p>
                        <div className="card-Container">
                            {categories.map((v, i) => {
                                return (
                                    <div className="card">
                                        <div className="crd-icn-title-div">
                                            {v.icon}
                                            <h2>{v.title}</h2>
                                        </div>
                                        <p>{v.description}</p>
                                        <button className="edu-pg-crd-btn" onClick={() => navigate(v.link)}>{v.btn}</button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            </main>
            {/* <footer>
                <Footer />
            </footer> */}
        </>
    )
}