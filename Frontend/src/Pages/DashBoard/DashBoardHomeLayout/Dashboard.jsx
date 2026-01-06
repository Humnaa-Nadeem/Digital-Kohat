import "react-icons";
import "./Dashboard.css";
import brandLogo from "../../../Assests/brandLogo.jpeg";
// Importing icons from react-icons library
import { FiUser, FiSettings, FiUsers, FiCalendar, FiInfo, FiImage, FiBell, FiPower, FiMessageSquare, FiUserCheck, } from "react-icons/fi";
import { useState } from "react";
import { ProfileContent } from "../DashboardComponents/Profile/Profile";
import { BasicInfoForm } from "../DashboardComponents/BasicInfo/BasicInfo";
import { AdminForm } from "../DashboardComponents/Admin/Admin";
import { FeeStructure } from "../DashboardComponents/Fees/Fee";
import { StaffMangingForm } from "../DashboardComponents/Staff/Staff";
import { EventManagingForm } from "../DashboardComponents/EventsAndActivity/Events";
import { GalleryForm } from "../DashboardComponents/Gallery/gallery";
import { ReviewForm } from "../DashboardComponents/Reviews/Review";
import { FaUser } from "react-icons/fa";


export const DashBoard = () => {
    let [currentTab, setCurrentTab] = useState("Profile");
    let [AdminTags, setAdmintags] = useState(false);
    let content;
    switch (currentTab) {
        case "Profile":
            content = <ProfileContent />;
            break;
        case "Basic Info":
            content = <BasicInfoForm />;
            break;
        case "Admin":
            content = <AdminForm />;
            break;
        case "Staff":
            content = <StaffMangingForm />;
            break;
        case "EvntsAndActvty":
            content = <EventManagingForm />;
            break;
        case "Fee Structure":
            content = <FeeStructure />;
            break;
        case "Gallery":
            content = <GalleryForm />;
            break;
        case "Reviews":
            content = <ReviewForm />;
            break;
        default:
            content = <ProfileContent />;
    }
    return (
        <>
            <header>
                <nav className="navbar">
                    <div className="nav-container" style={{padding : "10px 2px"}}>
                        {/* LOGO */}
                        <div className="nav-logo">
                            <img src={brandLogo} alt="Logo" className="logo-img" />
                            <h2>DIGITAL SMART CITIES HUB</h2>
                        </div>

                        <div className="Admin-Icon-TagsCont">
                            <span className="usrIcon A  adminIcon" onClick={() => setAdmintags(!AdminTags)}>
                                <FaUser />
                            </span>
                            <ul className={AdminTags ? "tags-cont flexDsply Admin-Tags" : "tags-cont Admin-Tags"}>
                                <li>Dashboard</li>
                                <li>Notifications</li>
                                <li className="DshbrdlogOut-tag">log Out</li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="layout">
                <aside className="sidebar">
                    <ul>
                        <li onClick={() => setCurrentTab("Profile")}><FiUser className="DshbrdSidbrIcn" /> <p className="DshbrdtagName">Profile</p></li>
                        <li onClick={() => setCurrentTab("Basic Info")}><FiSettings className="DshbrdSidbrIcn" /> <p className="DshbrdtagName">Basic Info</p></li>
                        <li onClick={() => setCurrentTab("Admin")}><FiUsers className="DshbrdSidbrIcn" /> <p className="DshbrdtagName">Admin</p></li>
                        <li onClick={() => setCurrentTab("Staff")}><FiUserCheck className="DshbrdSidbrIcn" /> <p className="DshbrdtagName">Staff</p></li>
                        <li onClick={() => setCurrentTab("EvntsAndActvty")}><FiCalendar className="DshbrdSidbrIcn" /> <p className="DshbrdtagName">Events</p></li>
                        <li onClick={() => setCurrentTab("Fee Structure")}><FiInfo className="DshbrdSidbrIcn" /> <p className="DshbrdtagName">Free Structure</p></li>
                        <li onClick={() => setCurrentTab("Gallery")}><FiImage className="DshbrdSidbrIcn" /> <p className="DshbrdtagName">Gallery</p></li>
                        <li onClick={() => setCurrentTab("Reviews")}><FiMessageSquare className="DshbrdSidbrIcn" /> <p className="DshbrdtagName">Reviews</p></li>

                    </ul>
                </aside>
                <section className="content">
                    {(currentTab === "Profile")
                        ?
                        <></>
                        :
                        <div className="stepper">
                            <div className={(currentTab === "Basic Info") ? "DshBrdstep active" : "DshBrdstep"}>
                                <span className="Dshbrdcircle">1</span>
                                <p>Basic Info</p>
                            </div>

                            <div className="line"></div>

                            <div className={(currentTab === "Admin") ? "DshBrdstep active" : "DshBrdstep"}>
                                <span className="Dshbrdcircle">2</span>
                                <p>Admin</p>
                            </div>

                            <div className="line"></div>

                            <div className={(currentTab === "Staff") ? "DshBrdstep active" : "DshBrdstep"}>
                                <span className="Dshbrdcircle">3</span>
                                <p>Staff</p>
                            </div>
                            <div className="line"></div>

                            <div className={(currentTab === "EvntsAndActvty") ? "DshBrdstep active" : "DshBrdstep"}>
                                <span className="Dshbrdcircle">4</span>
                                <p>Events</p>
                            </div>

                            <div className="line"></div>

                            <div className={(currentTab === "Fee Structure") ? "DshBrdstep active" : "DshBrdstep"}>
                                <span className="Dshbrdcircle">5</span>
                                <p>Fee Structure</p>
                            </div>

                            <div className="line"></div>

                            <div className={(currentTab === "Gallery") ? "DshBrdstep active" : "DshBrdstep"}>
                                <span className="Dshbrdcircle">6</span>
                                <p>Gallery</p>
                            </div>

                            <div className="line"></div>

                            <div className={(currentTab === "Reviews") ? "DshBrdstep active" : "DshBrdstep"}>
                                <span className="Dshbrdcircle">7</span>
                                <p>Reviews</p>
                            </div>
                        </div>
                    }
                    {content}
                </section>
            </main>

        </>
    )
};