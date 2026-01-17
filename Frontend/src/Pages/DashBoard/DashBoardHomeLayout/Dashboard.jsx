import "react-icons";
import "./Dashboard.css";
import brandLogo from "../../../Assests/brandLogo.jpeg";
// Importing icons from react-icons library
import {
    FiUser,
    FiInfo,
    FiUsers,
    FiCalendar,
    FiImage,
    FiMessageSquare
} from "react-icons/fi";

import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";

import { useEffect, useState } from "react";
import { ProfileContent } from "../DashboardComponents/Profile/Profile";
import { BasicInfoForm } from "../DashboardComponents/BasicInfo/BasicInfo";
import { AdminManagingForm } from "../DashboardComponents/Admin/Admin";
import { FeeStructure } from "../DashboardComponents/Fees/Fee";
import { StaffMangingForm } from "../DashboardComponents/Staff/Staff";
import { EventManagingForm } from "../DashboardComponents/EventsAndActivity/Events";
import { GalleryForm } from "../DashboardComponents/Gallery/gallery";
import { ReviewForm } from "../DashboardComponents/Reviews/Review";
import { FaUser } from "react-icons/fa";
import { GetTheDashboardDta } from "../../../ApiCalls/DashBoardApiCalls";


export const DashBoard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true); // loading state

    useEffect(() => {
        GetTheDashboardDta(setDashboardData, setLoading)
    }, []);
    let [currentTab, setCurrentTab] = useState("Profile");
    let [AdminTags, setAdmintags] = useState(false);
    let content;
    switch (currentTab) {
        case "Profile":
            content = <ProfileContent />;
            break;
        case "Basic Info":
            content = <BasicInfoForm dashboardData={dashboardData} />;
            break;
        case "Admin":
            content = <AdminManagingForm dashboardData={dashboardData} setDashboardData={setDashboardData} />;
            break;
        case "Staff":
            content = <StaffMangingForm dashboardData={dashboardData} setDashboardData={setDashboardData} />;
            break;
        case "EvntsAndActvty":
            content = <EventManagingForm dashboardData={dashboardData} setDashboardData={setDashboardData} />;
            break;
        case "Fee Structure":
            content = <FeeStructure dashboardData={dashboardData} setDashboardData={setDashboardData} />;
            break;
        case "Gallery":
            content = <GalleryForm dashboardData={dashboardData} setDashboardData={setDashboardData} />;
            break;
        case "Reviews":
            content = <ReviewForm dashboardData={dashboardData} setDashboardData={setDashboardData} />;
            break;
        default:
            content = <ProfileContent />;
    }
    return (
        <>
            {
                (loading)
                    ?
                    <div className="spinner-container">
                        <div className="spinner"></div>
                        <p>Loading dashboard...</p>
                    </div>
                    :
                    <>
                        <header>
                            <nav className="navbar">
                                <div className="nav-container" style={{ padding: "10px 2px" }}>
                                    {/* LOGO */}
                                    <div className="nav-logo">
                                        <img src={brandLogo} alt="Logo" className="logo-img dshbrdlogo" />
                                        <h2>DIGITAL KOHAT</h2>
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
                            <aside className="DshBrdsidebar">
                                <ul>
                                    <li
                                        className={currentTab === "Profile" ? "active" : ""}
                                        onClick={() => setCurrentTab("Profile")}
                                    >
                                        <i><FiUser className="DshbrdSidbrIcn" /></i>
                                        <p className="DshbrdtagName">Profile</p>
                                    </li>

                                    <li
                                        className={currentTab === "Basic Info" ? "active" : ""}
                                        onClick={() => setCurrentTab("Basic Info")}
                                    >
                                        <i><FiInfo className="DshbrdSidbrIcn" /></i>
                                        <p className="DshbrdtagName">Basic Info</p>
                                    </li>

                                    <li
                                        className={currentTab === "Admin" ? "active" : ""}
                                        onClick={() => setCurrentTab("Admin")}
                                    >
                                        <i><MdOutlineAdminPanelSettings className="DshbrdSidbrIcn" /></i>
                                        <p className="DshbrdtagName">Admin</p>
                                    </li>

                                    <li
                                        className={currentTab === "Staff" ? "active" : ""}
                                        onClick={() => setCurrentTab("Staff")}
                                    >
                                        <i><FiUsers className="DshbrdSidbrIcn" /></i>
                                        <p className="DshbrdtagName">Staff</p>
                                    </li>

                                    <li
                                        className={currentTab === "EvntsAndActvty" ? "active" : ""}
                                        onClick={() => setCurrentTab("EvntsAndActvty")}
                                    >
                                        <i><FiCalendar className="DshbrdSidbrIcn" /></i>
                                        <p className="DshbrdtagName">Events</p>
                                    </li>

                                    <li
                                        className={currentTab === "Fee Structure" ? "active" : ""}
                                        onClick={() => setCurrentTab("Fee Structure")}
                                    >
                                        <i><FaRegMoneyBillAlt className="DshbrdSidbrIcn" /></i>
                                        <p className="DshbrdtagName">Fee Structure</p>
                                    </li>

                                    <li
                                        className={currentTab === "Gallery" ? "active" : ""}
                                        onClick={() => setCurrentTab("Gallery")}
                                    >
                                        <i><FiImage className="DshbrdSidbrIcn" /></i>
                                        <p className="DshbrdtagName">Gallery</p>
                                    </li>

                                    <li
                                        className={currentTab === "Reviews" ? "active" : ""}
                                        onClick={() => setCurrentTab("Reviews")}
                                    >
                                        <i><FiMessageSquare className="DshbrdSidbrIcn" /></i>
                                        <p className="DshbrdtagName">Reviews</p>
                                    </li>
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
            }
        </>
    )
};