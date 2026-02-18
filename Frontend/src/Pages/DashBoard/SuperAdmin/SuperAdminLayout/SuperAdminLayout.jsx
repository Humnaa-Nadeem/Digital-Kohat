import React, { useEffect, useState } from "react";
import "./SuperAdminLayout.css";

import { FiHome, FiUsers } from "react-icons/fi";
import {
    MdOutlineSchool,
    MdOutlineBusiness,
    MdOutlineLocalHospital,
    MdOutlineRestaurant
} from "react-icons/md";

import Navbar from "../../../../components/navbar/Navbar";

import { SuperAdminHomeSec } from "../SuperAdminComponents/HomeSection/SuprAdminHomeSec";
import { EducationSection } from "../SuperAdminComponents/EductionSection/EductionSection";

import { VerifyTheSuperAdmin } from "../../../../ApiCalls/SuperAdminApiCall";
import { SAAddManagerForm } from "../SuperAdminComponents/SAAddManagers/SAAddManagers";
import { FoodSection } from "../SuperAdminComponents/FoodSection/FoodSection";

/* ---------------- SIDEBAR CONFIG ---------------- */

const SIDEBAR_ITEMS = [
    {
        key: "Home",
        title: "Home",
        tab: "",
        icon: <FiHome />
    },
    {
        key: "Education",
        title: "Education",
        tab: "Education",
        icon: <MdOutlineSchool />
    },
    {
        key: "Food",
        title: "Food",
        tab: "Restaurant",
        icon: <MdOutlineRestaurant />
    },
    {
        key: "Health",
        title: "Health",
        tab: "Health",
        icon: <MdOutlineLocalHospital />
    },
    {
        key: "Business",
        title: "Business",
        tab: "Business",
        icon: <MdOutlineBusiness />
    },
    {
        key: "Add Managers",
        title: "Add Managers",
        tab: "AddManagers",
        icon: <FiUsers />
    }
];

/* -------- ROLE → ALLOWED SIDEBAR ITEMS -------- */

const getAllowedSidebarItems = (role) => {
    if (!role) return [];

    // Super access
    if (role === "All") return SIDEBAR_ITEMS;

    // Always allow Home + role specific module
    return SIDEBAR_ITEMS.filter(
        item => item.key === "Home" || item.key === role
    );
};


/* ---------------- COMPONENT ---------------- */

export const SuperAdminDashboard = () => {
    const [currentTab, setCurrentTab] = useState("");
    const [role, setRole] = useState(null);
    const [SuperAdminEmail, setSuperAdminEmail] = useState("");
    const [SAManagers, setSAManagers] = useState(null);

    useEffect(() => {
        VerifyTheSuperAdmin(setRole, setSuperAdminEmail, setSAManagers);
    }, []);

    const sidebarItems = getAllowedSidebarItems(role);

    /* -------- CONTENT RENDERING -------- */

    let content;

    // Block unauthorized content
    if (
        role &&
        role !== "All" &&
        currentTab !== "" &&
        currentTab !== role
    ) {
        content = (
            <div className="SA_empty_state">
                You are not authorized to access this module.
            </div>
        );
    } else {
        switch (currentTab) {
            case "":
                content = <SuperAdminHomeSec />;
                break;

            case "Education":
                content = <EducationSection />;
                break;

            case "Restaurant":
                content = <FoodSection />;
                break;

            case "Health":
                content = <div>Health Module</div>;
                break;

            case "Business":
                content = <div>Business Module</div>;
                break;

            case "AddManagers":
                content = <SAAddManagerForm SuperAdminEmail={SuperAdminEmail} SAManagers={SAManagers} setSAManagers={setSAManagers} /> // SA => Super Admin
                break;

            default:
                content = (
                    <div className="SA_empty_state">
                        Welcome. Please select a module.
                    </div>
                );
        }
    }

    return (
        <div className="SA_main_wrapper">
            <header>
                <Navbar />
            </header>

            <main className="SA_layout">
                <aside className="SA_sidebar">
                    <div className="SA_brand_mark" onClick={() => setCurrentTab("")}>
                        DK
                    </div>
                    <nav className="SA_side_nav">
                        {sidebarItems.length > 0 ? (
                            sidebarItems.map(item => (
                                <li
                                    key={item.key}
                                    title={item.title}
                                    className={currentTab === item.tab ? "active" : ""}
                                    onClick={() => setCurrentTab(item.tab)}
                                >
                                    {item.icon}
                                </li>
                            ))
                        ) : (
                            <div className="SA_sidebar_loading">...</div>
                        )}
                    </nav>
                </aside>

                <div className="SA_content_main">
                    {content}
                </div>
            </main>
        </div>
    );
};