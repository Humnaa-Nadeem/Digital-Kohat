import { useEffect, useRef, useState } from "react";
import "./SuperAdminLayout.css";
import NotificationAudio from "../../../../Assests/whatsappAudio2.mp3";
import { FiHome, FiUsers } from "react-icons/fi";
import {
    MdOutlineSchool,
    MdOutlineBusiness,
    MdOutlineLocalHospital,
    MdOutlineRestaurant
} from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../../../../components/navbar/Navbar";
import { SuperAdminHomeSec } from "../SuperAdminComponents/HomeSection/SuprAdminHomeSec";
import { EducationSection } from "../SuperAdminComponents/EductionSection/EductionSection";
import { FoodSection } from "../SuperAdminComponents/FoodSection/FoodSection";
import { BusinessSection } from "../SuperAdminComponents/BusinessSection/BusinessSection";
import { SAAddManagerForm } from "../SuperAdminComponents/SAAddManagers/SAAddManagers";
import { VerifyTheSuperAdmin, GetEducationNotificationCounts } from "../../../../ApiCalls/SuperAdminApiCall";
import { socket } from "../Socket";

/* ---------------- SIDEBAR CONFIG ---------------- */

const SIDEBAR_ITEMS = [
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

    useEffect(() => {
        VerifyTheSuperAdmin(setRole, setSuperAdminEmail, setSAManagers);
    }, []);

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
        }
    }

    return (
        <div className="SA_main_wrapper">
            <header><Navbar variant={"SuperAdmin"} /></header>
            <main className="SA_layout">
                <aside className="SA_sidebar">
                    <div className="SA_brand_mark" onClick={() => setCurrentTab("")}>
                        DK
                    </div>
                    <nav className="SA_side_nav">
                        {sidebarItems.length > 0 ? (
                            sidebarItems.map((item) => (
                                <li
                                    key={item.key}
                                    title={item.title}
                                    className={currentTab === item.tab ? "active" : ""}
                                    onClick={() => handleTabClick(item.tab)}
                                    style={{ position: "relative" }}
                                >
                                    {item.icon}
                                    {tabNotifCounts[item.tab] > 0 && (
                                        <span className="SA_notif_badge">{tabNotifCounts[item.tab]}</span>
                                    )}
                                </li>
                            ))
                        ) : (
                            <div className="SA_sidebar_loading">...</div>
                        )}
                    </nav>
                </aside>
                <div className="SA_content_main">{content}</div>
            </main>
        </div>
    );
};

