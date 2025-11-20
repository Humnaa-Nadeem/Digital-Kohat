import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import img from "../../../components/imgs/school.svg"
import "./Schoolpg.css";
import { SearchBar } from "../../../components/SearchBar/Searchbar";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Schools, Schools_Details } from "../../../Store/store";
export const SchoolPage = () => {
    let [showList, setShowlist] = useState(false);
    let navigate = useNavigate();
    // Getting Querry Parameter's Value
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const id = query.get("id");
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <section className="edu-cata-pg-sec">
                    <div className={(showList) ? "lft-sec showList" : "lft-sec"} >
                        <div className="sector" onClick={() => { navigate(`/edu`) }}>Education</div>
                        <div className="institute-hd-lst">
                            <h2 className="institute-hd">Schools</h2>
                            {/* 👇 Here to show the list of Schools */}
                            <ul className="institute-lst">
                                {
                                    Schools.map((v, i) => {
                                        return (
                                            <li onClick={() => { navigate(`/edu/schools?id=${v.id}`) }} key={i}>{v.SchoolName}</li>
                                        )
                                    })
                                }
                                <li onClick={() => { navigate("/edu/schools") }}>Back To Schools</li>
                            </ul>
                        </div>
                    </div>
                    <div className="main-sec">
                        <div className="showLst" onClick={() => { setShowlist(!showList) }}>{(showList) ? <>&times;</> : <>&#9776;</>}</div>
                        <SearchBar />
                        <div className="cata-pg-banner">
                            <h1 className="cata-pg-main-hd">Top Rated Schools in Your City</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem voluptatum quia excepturi consequatur sequi optio cupiditate</p>
                        </div>
                        {
                            (id)
                                ?
                                // Filtering School Info on the basis of Id
                                Schools_Details.filter((v, i) => v.id === Number(id))
                                    // After Filtration, fill placeholder
                                    .map((v, i) => {
                                        return (
                                            <>
                                                <div className="cata-web-hrdr">
                                                    <h1>{v.Title}</h1>
                                                    <p className="tagline">{v.tag_line}</p>
                                                </div>
                                                <section className="section">
                                                    <h2>About Us</h2>
                                                    <p>{v.A_UsPara}</p>
                                                </section>
                                                <section className="section">
                                                    <h2>School Details</h2>
                                                    {v.Schools_Info.map((j, i) => {
                                                        return (
                                                            <ul className="info-list" key={i}>
                                                                <li><strong>Founded: </strong>{j.Foundation}</li>
                                                                <li><strong>School Type: </strong>{j.School_Type}</li>
                                                                <li><strong>Medium: </strong>{j.Medium}</li>
                                                                <li><strong>Classes Offered: </strong>{j.Classes_Offered}</li>
                                                            </ul>
                                                        )
                                                    })}
                                                </section>
                                                <section className="section">
                                                    <h2>Facilities</h2>
                                                    {v.Facilities.map((j, i) => {
                                                        return (
                                                            <ul className="info-list" key={i}>
                                                                <li>{j}</li>
                                                            </ul>
                                                        )
                                                    })}
                                                </section>
                                                <section className="section">
                                                    <h2>Achievements</h2>
                                                    {v.Achievements.map((j, i) => {
                                                        return (
                                                            <ul className="info-list" key={i}>
                                                                <li>{j}</li>
                                                            </ul>
                                                        )
                                                    })}
                                                </section>
                                                <section className="section contact">
                                                    <h2>Contact Information</h2>
                                                    {v.Contact_Info.map((j, i) => {
                                                        return (
                                                            <ul className="info-list" key={i}>
                                                                <li><strong>Address: </strong>{j.Address}</li>
                                                                <li><strong>Email: </strong>{j.Email}</li>
                                                                <li><strong>Phone: </strong>{j.Phone}</li>
                                                                <li><strong>Website: </strong><a href="#" target="_blank">{j.website}</a></li>
                                                            </ul>
                                                        )
                                                    })}
                                                </section>
                                            </>
                                        )
                                    })

                                :
                                <div className="cata-card-cont">
                                    <div className="cata-pg-card">
                                        <img src={img} alt="Placeholder Image" />
                                        <div className="cata-pg-card-content">
                                            <h3>School Name</h3>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                                            <button className="cata-pg-card-btn">Read More</button>
                                        </div>
                                    </div>
                                    <div className="cata-pg-card">
                                        <img src={img} alt="Placeholder Image" />
                                        <div className="cata-pg-card-content">
                                            <h3>School Name</h3>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                                            <button className="cata-pg-card-btn">Read More</button>
                                        </div>
                                    </div>
                                    <div className="cata-pg-card">
                                        <img src={img} alt="Placeholder Image" />
                                        <div className="cata-pg-card-content">
                                            <h3>School Name</h3>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                                            <button className="cata-pg-card-btn">Read More</button>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </section >
            </main >
            <footer>
                <Footer />
            </footer>
        </>

    )
}



// <div class="container">
//     <h1>School Name</h1>

//     <div class="info-block">
//         <h2>About Us</h2>
//         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
//     </div>

//     <div class="info-block">
//         <h2>Contact Information</h2>
//         <p><strong>Address:</strong> 123 School Road, City, Country</p>
//         <p><strong>Phone:</strong> +92 300 1234567</p>
//         <p><strong>Email:</strong> info@schoolname.edu.pk</p>
//         <p><strong>Website:</strong> <a href="https://www.schoolname.edu.pk">www.schoolname.edu.pk</a></p>
//     </div>

//     <div class="info-block">
//         <h2>Facilities</h2>
//         <ul>
//             <li>Modern Classrooms</li>
//             <li>Science & IT Labs</li>
//             <li>Library</li>
//             <li>Sports Complex</li>
//         </ul>
//     </div>

//     <div class="info-block">
//         <h2>Location</h2>
//         <div class="map">
//             <iframe
//                 src="https://maps.google.com/maps?q=24.8607,67.0011&z=15&output=embed"
//                 allowfullscreen>
//             </iframe>
//         </div>
//     </div>

//     <div class="info-block">
//         <h2>Admission Inquiry</h2>
//         <p>For admissions, please contact the admissions office:</p>
//         <p><strong>Phone:</strong> +92 300 7654321</p>
//         <p><strong>Email:</strong> admissions@schoolname.edu.pk</p>
//     </div>
// </div>
