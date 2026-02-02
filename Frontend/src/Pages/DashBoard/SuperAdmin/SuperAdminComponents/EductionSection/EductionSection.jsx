import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import "./EductionSection.css";
import {
    FiTrash2,
    FiPlus,
    FiPhone,
    FiMail,
    FiCheckCircle,
    FiXCircle,
    FiShield,
    FiShieldOff,
    FiMap
} from "react-icons/fi";
import { FaWhatsapp, FaIdCard } from "react-icons/fa";
import { HiOutlineLanguage } from "react-icons/hi2";

import { CreateAdminModal } from "../CreateAdminForm/CreateAdmin";
import {
    ChangeAdminVerificationState,
    ChangeInstState,
    ChangePaymentPlan,
    deleteRequest,
    DeleteTheInst,
    GetEduNewReqTabData
} from "../../../../../ApiCalls/SuperAdminApiCall";

export const EducationSection = () => {

    const [activeTab, setActiveTab] = useState("SCHOOL");
    const [rowData, setRowData] = useState([]);
    const [CreateAdminFormData, setCreateAdminFormData] = useState(null);
    const [id, setId] = useState("");

    useEffect(() => {
        // SAD => Super Admin Dashboard
        if (activeTab === "SCHOOL") {
            GetEduNewReqTabData(activeTab, setRowData);
        } if (activeTab === "COLLEGE") {
            console.log("asdf");
            // Fetch data for Colleges tab if needed
        } else if (activeTab === "UNIVERSITIES") {
            console.log("asdf");
            // Fetch data for Universities tab if needed
        } else if (activeTab === "NEW_REQUESTS") {
            GetEduNewReqTabData(activeTab, setRowData);
        }
    }, [activeTab]);

    let content = null;

    switch (activeTab) {
        case "SCHOOL":
            content = <SchoolDataTable data={rowData} setData={setRowData} />;
            break;

        case "COLLEGE":
            content = <CollegeDataTable data={rowData} setData={setRowData} />;
            break;

        case "UNIVERSITIES":
            content = <UniversityDataTable data={rowData} setData={setRowData} />;
            break;

        case "NEW_REQUESTS":
            content = (
                <NewRequestTable
                    data={rowData}
                    setCreateAdminFormData={setCreateAdminFormData}
                    setData={setRowData}
                    setActiveTab={setActiveTab}
                    setId={setId}
                />
            );
            break;

        case "AdminForm":
            content = (
                <CreateAdminModal
                    id={id}
                    setActiveTab={setActiveTab}
                    Data={CreateAdminFormData}
                />
            );
            break;

        default:
            content = null;
    }

    return (
        <section className="SA_content_body">
            <ToastContainer />
            <div className="SA_table_controls">
                <div className="SA_sub_nav">
                    <button
                        className={activeTab === "SCHOOL" ? "SA_active" : ""}
                        onClick={() => setActiveTab("SCHOOL")}
                    >
                        Schools
                    </button>

                    <button
                        className={activeTab === "COLLEGE" ? "SA_active" : ""}
                        onClick={() => setActiveTab("COLLEGE")}
                    >
                        Colleges
                    </button>

                    <button
                        className={activeTab === "UNIVERSITIES" ? "SA_active" : ""}
                        onClick={() => setActiveTab("UNIVERSITIES")}
                    >
                        Universities
                    </button>

                    <button
                        className={activeTab === "NEW_REQUESTS" ? "SA_active" : ""}
                        onClick={() => setActiveTab("NEW_REQUESTS")}
                    >
                        New Requests
                    </button>
                </div>
            </div>

            <div className="SA_table_container">
                {content}
            </div>

        </section>
    );
};

/* ---------------- SCHOOL TABLE ---------------- */

const SchoolDataTable = ({ data, setData }) => {
    if (!data || data.length === 0)
        return <p className="no-data">No active institutions found.</p>;
    return (
        <table className="SA_custom_table">
            <thead>
                <tr>
                    <th>Admin & Institution</th>
                    <th>Contact Info</th>
                    <th>Payment Plan</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {data.map((admin, i) => (
                    <tr className="SA_table_row" key={i}>

                        <td>
                            <div className="SA_admin_profile">
                                <div className="SA_row_avatar">
                                    {(admin.adminName || "A").charAt(0)}
                                </div>
                                <div>
                                    <p className="SA_admin_name">{admin.adminName}</p>
                                    <span className="SA_inst_label">
                                        {admin.institutionName}
                                    </span>
                                </div>
                            </div>
                        </td>

                        <td>
                            <div className="SA_contact_stack">
                                <div className="SA_contact_item">
                                    <FiMail /> <span>{admin.email}</span>
                                </div>
                                <div className="SA_contact_item">
                                    <FiMap /> <span> {admin.location}</span>
                                </div>
                                <div className="SA_contact_item">
                                    <FaWhatsapp size={15} /> <a href={`https://wa.me/${admin.whatsapp}`} target="_blank">{admin.whatsapp}</a>
                                </div>
                                <div className="SA_contact_item">
                                    <FiPhone /> <span>{admin.phonenumber}</span>
                                </div>
                                <div className="SA_contact_item">
                                    <FaIdCard /> <span>{admin.IDCard}</span>
                                </div>
                            </div>
                        </td>

                        <td>
                            <select value={admin.paymentPlan} className={`SA_plan_badge ${admin.paymentPlan?.toLowerCase()}`} onChange={(e) => ChangePaymentPlan(admin.adminId, admin.institutionId, setData, e.target.value)}>
                                <option>Free</option>
                                <option>Premium</option>
                                <option>Enterprise</option>
                            </select>
                        </td>

                        <td>
                            <div className="SA_row_actions">
                                <button
                                    title={admin.status ? "Institution is active" : "Institution is inactive"}
                                    className="SA_action_icon warn"
                                    onClick={() =>
                                        ChangeInstState(admin.adminId, admin.institutionId, setData)
                                    }
                                >
                                    {admin.status ? <FiCheckCircle /> : <FiXCircle />}
                                </button>

                                <button
                                    className="SA_action_icon danger"
                                    onClick={() =>
                                        DeleteTheInst(admin.adminId, admin.institutionId, setData)
                                    }
                                >
                                    <FiTrash2 />
                                </button>

                                <button
                                    title={admin.verified ? "Admin is Verified" : "Admin is not Verified"}
                                    className="SA_action_icon info"
                                    onClick={() =>
                                        ChangeAdminVerificationState(admin.adminId, setData)
                                    }
                                >
                                    {admin.verified ? <FiShield /> : <FiShieldOff />}
                                </button>
                            </div>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    );
};

/* ---------------- NEW REQUEST TABLE ---------------- */

const NewRequestTable = ({ data, setCreateAdminFormData, setActiveTab, setId, setData }) => {
    if (!data || data.length === 0)
        return <p className="no-data">No new requests at this time.</p>;

    return (
        <table className="SA_custom_table">
            <thead>
                <tr>
                    <th>Applicant Name</th>
                    <th>Contact Details</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((request, i) => (
                    <tr className="SA_table_row" key={i}>
                        <td>
                            <div className="SA_admin_profile">
                                <div className="SA_row_avatar">
                                    {(request.fullname || "U").charAt(0)}
                                </div>
                                <p className="SA_admin_name">{request.fullname}</p>
                            </div>
                        </td>

                        <td>
                            <div className="SA_contact_stack">
                                <div className="SA_contact_item">
                                    <FiMail /> <span>{request.email}</span>
                                </div>
                                <div className="SA_contact_item">
                                    <FiPhone /> <span>{request.phonenumber}</span>
                                </div>
                                <div className="SA_contact_item">
                                    <FaWhatsapp /> <a href={`https://wa.me/${request.whatsappnumber}`} target="_blank" rel="noopener noreferrer">{request.whatsappnumber}</a>
                                </div>
                                <div className="SA_contact_item">
                                    <FaIdCard /> <span>{request.IDCard}</span>
                                </div>
                                <div className="SA_contact_item">
                                    <HiOutlineLanguage /> <span>{request.language}</span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="SA_row_actions">
                                <button
                                    className="SA_action_icon info"
                                    title="Approve & Create Admin"
                                    onClick={() => {
                                        setId(request._id);
                                        setCreateAdminFormData(request);
                                        setActiveTab("AdminForm");
                                    }}
                                >
                                    <FiPlus />
                                </button>
                                <button className="SA_action_icon danger" title="Reject Request" onClick={() => { deleteRequest(request._id, setData) }}>
                                    <FiTrash2 />
                                </button>
                            </div>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    );
};

/* ---------------- PLACEHOLDERS ---------------- */
const CollegeDataTable = () => <p className="no-data">College data coming soon.</p>;
const UniversityDataTable = () => <p className="no-data">University data coming soon.</p>;