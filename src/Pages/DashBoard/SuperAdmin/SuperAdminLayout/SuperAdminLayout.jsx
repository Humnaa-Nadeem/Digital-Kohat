<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import "./SuperAdminLayout.css";

=======
import { useEffect, useRef, useState } from "react";
import "./SuperAdminLayout.css";
import NotificationAudio from "../../../../Assests/whatsappAudio2.mp3";
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
import { FiHome, FiUsers } from "react-icons/fi";
import {
    MdOutlineSchool,
    MdOutlineBusiness,
    MdOutlineLocalHospital,
    MdOutlineRestaurant
} from "react-icons/md";
<<<<<<< HEAD

import Navbar from "../../../../components/navbar/Navbar";

import { SuperAdminHomeSec } from "../SuperAdminComponents/HomeSection/SuprAdminHomeSec";
import { EducationSection } from "../SuperAdminComponents/EductionSection/EductionSection";

import { VerifyTheSuperAdmin } from "../../../../ApiCalls/SuperAdminApiCall";
import { SAAddManagerForm } from "../SuperAdminComponents/SAAddManagers/SAAddManagers";
import { FoodSection } from "../SuperAdminComponents/FoodSection/FoodSection";
=======
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../../../../components/navbar/Navbar";
import { SuperAdminHomeSec } from "../SuperAdminComponents/HomeSection/SuprAdminHomeSec";
import { EducationSection } from "../SuperAdminComponents/EductionSection/EductionSection";
import { FoodSection } from "../SuperAdminComponents/FoodSection/FoodSection";
import { BusinessSection } from "../SuperAdminComponents/BusinessSection/BusinessSection";
import { SAAddManagerForm } from "../SuperAdminComponents/SAAddManagers/SAAddManagers";
import { VerifyTheSuperAdmin, GetEducationNotificationCounts } from "../../../../ApiCalls/SuperAdminApiCall";
import { socket } from "../Socket";
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7

/* ---------------- SIDEBAR CONFIG ---------------- */

const SIDEBAR_ITEMS = [
<<<<<<< HEAD
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
=======
    { key: "Home", title: "Home", tab: "", icon: <FiHome /> },
    { key: "Education", title: "Education", tab: "Education", icon: <MdOutlineSchool /> },
    { key: "Restaurant", title: "Restaurant", tab: "Restaurant", icon: <MdOutlineRestaurant /> },
    { key: "Health", title: "Health", tab: "Health", icon: <MdOutlineLocalHospital /> },
    { key: "Business", title: "Business", tab: "Business", icon: <MdOutlineBusiness /> },
    { key: "AddManagers", title: "Add Managers", tab: "AddManagers", icon: <FiUsers /> }
];

const getAllowedSidebarItems = (role) => {
    if (!role) return [];
    if (role === "SUPER_ADMIN" || role === "All") return SIDEBAR_ITEMS;
    return SIDEBAR_ITEMS.filter((item) => item.key === "Home" || item.key === role);
};

export const SuperAdminDashboard = () => {
    const [currentTab, setCurrentTab] = useState("");
    const [role, setRole] = useState(null);
    const [superAdminEmail, setSuperAdminEmail] = useState("");
    const [SAManagers, setSAManagers] = useState(null);
    const [, setNotifications] = useState([]);
    const [tabNotifCounts, setTabNotifCounts] = useState({});
    const [eduNotifCounts, setEduNotifCounts] = useState({ admissions: 0, requests: 0 });

    const audioRef = useRef(new Audio(NotificationAudio));
    const audioUnlocked = useRef(false);

    useEffect(() => {
        audioRef.current.volume = 1;
        const unlockAudio = () => {
            audioRef.current.play().then(() => {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                audioUnlocked.current = true;
            }).catch(() => {});
            window.removeEventListener("click", unlockAudio);
        };
        window.addEventListener("click", unlockAudio);
        return () => window.removeEventListener("click", unlockAudio);
    }, []);

    const playNotificationSound = () => {
        if (!audioUnlocked.current) return;
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
    };
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7

    useEffect(() => {
        VerifyTheSuperAdmin(setRole, setSuperAdminEmail, setSAManagers);
    }, []);

<<<<<<< HEAD
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
=======
    // Fetch initial counts for Education section
    useEffect(() => {
        if (role === "SUPER_ADMIN" || (role === "SAManager" && currentTab === "Education")) {
            GetEducationNotificationCounts(setEduNotifCounts);
        }
    }, [role, currentTab]);

    // Update total Education count in sidebar when sub-counts change
    useEffect(() => {
        const totalEdu = eduNotifCounts.admissions + eduNotifCounts.requests;
        setTabNotifCounts(prev => ({
            ...prev,
            Education: totalEdu
        }));
    }, [eduNotifCounts]);

    useEffect(() => {
        socket.connect();
        socket.emit("join_superadmin");

        const notificationHandler = (payload) => {
            setNotifications((prev) => [payload, ...prev]);

            if (payload?.type === "NEW_ADMISSION_REQUEST") {
                setEduNotifCounts(prev => ({ ...prev, admissions: prev.admissions + 1 }));
            } else if (payload?.type === "NEW_EDU_SERVICE_REQUEST") {
                setEduNotifCounts(prev => ({ ...prev, requests: prev.requests + 1 }));
            } else if (payload?.type === "NEW_DOCTOR_REQUEST") {
                setTabNotifCounts((prev) => ({
                    ...prev,
                    Health: (prev.Health || 0) + 1
                }));
            }
            playNotificationSound();
        };

        socket.on("new_notification", notificationHandler);
        return () => {
            socket.off("new_notification", notificationHandler);
            socket.disconnect();
        };
    }, []);

    const handleTabClick = (tab) => {
        setCurrentTab(tab);
        if (tab !== "Education") {
            setTabNotifCounts((prev) => ({ ...prev, [tab]: 0 }));
        }
    };

    const sidebarItems = getAllowedSidebarItems(role);

    /* -------- CONTENT RENDERING -------- */
    let content = null;

    // Block unauthorized content for managers
    const isAuthorized = role === "SUPER_ADMIN" || role === "All" || currentTab === "" || currentTab === role;

    if (!isAuthorized) {
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
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
<<<<<<< HEAD

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
=======
            case "Education":
                content = <EducationSection notifCounts={eduNotifCounts} setEduNotifCounts={setEduNotifCounts} />;
                break;
            case "Restaurant":
                content = <FoodSection />;
                break;
            case "Health":
                content = <div className="SA_empty_state">Health Module Coming Soon</div>;
                break;
            case "Business":
                content = <BusinessSection />;
                break;
            case "AddManagers":
                content = (
                    <SAAddManagerForm
                        SuperAdminEmail={superAdminEmail}
                        SAManagers={SAManagers}
                        setSAManagers={setSAManagers}
                    />
                );
                break;
            default:
                content = <div className="SA_empty_state">Welcome. Please select a module.</div>;
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
        }
    }

    return (
        <div className="SA_main_wrapper">
<<<<<<< HEAD
            <header>
                <Navbar />
            </header>

=======
            <header><Navbar variant={"SuperAdmin"} /></header>
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
            <main className="SA_layout">
                <aside className="SA_sidebar">
                    <div className="SA_brand_mark" onClick={() => setCurrentTab("")}>
                        DK
                    </div>
                    <nav className="SA_side_nav">
                        {sidebarItems.length > 0 ? (
<<<<<<< HEAD
                            sidebarItems.map(item => (
=======
                            sidebarItems.map((item) => (
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
                                <li
                                    key={item.key}
                                    title={item.title}
                                    className={currentTab === item.tab ? "active" : ""}
<<<<<<< HEAD
                                    onClick={() => setCurrentTab(item.tab)}
                                >
                                    {item.icon}
=======
                                    onClick={() => handleTabClick(item.tab)}
                                    style={{ position: "relative" }}
                                >
                                    {item.icon}
                                    {tabNotifCounts[item.tab] > 0 && (
                                        <span className="SA_notif_badge">{tabNotifCounts[item.tab]}</span>
                                    )}
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
                                </li>
                            ))
                        ) : (
                            <div className="SA_sidebar_loading">...</div>
                        )}
                    </nav>
                </aside>
<<<<<<< HEAD

                <div className="SA_content_main">
                    {content}
                </div>
            </main>
        </div>
    );
};
=======
                <div className="SA_content_main">{content}</div>
            </main>
        </div>
    );
};

>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
