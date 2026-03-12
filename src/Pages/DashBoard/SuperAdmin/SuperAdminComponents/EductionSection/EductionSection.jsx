import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import "./EductionSection.css";
<<<<<<< HEAD
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
=======
import { FiTrash2, FiPlus, FiPhone, FiMail, FiShield, FiShieldOff, FiMap, FiSend, FiImage, FiMapPin, FiFileText, FiXCircle, FiCheckCircle } from "react-icons/fi";
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
import { FaWhatsapp, FaIdCard } from "react-icons/fa";
import { HiOutlineLanguage } from "react-icons/hi2";

import { CreateAdminModal } from "../CreateAdminForm/CreateAdmin";
<<<<<<< HEAD
import {
    ChangeAdminVerificationState,
    ChangeInstState,
    ChangePaymentPlan,
    deleteRequest,
    DeleteTheInst,
    GetEduNewReqTabData
} from "../../../../../ApiCalls/SuperAdminApiCall";

export const EducationSection = () => {
=======
import * as ApiCall from "../../../../../ApiCalls/SuperAdminApiCall";

export const EducationSection = ({ notifCounts, setEduNotifCounts }) => {
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7

    const [activeTab, setActiveTab] = useState("SCHOOL");
    const [rowData, setRowData] = useState([]);
    const [CreateAdminFormData, setCreateAdminFormData] = useState(null);
    const [id, setId] = useState("");

    useEffect(() => {
<<<<<<< HEAD
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

=======
        if (activeTab !== "RECORD" && activeTab !== "AdminForm") {
            ApiCall.GetTheTabData(activeTab, setRowData);
        }
    }, [activeTab]);

    useEffect(() => {
        // Reset notification counts when the respective tab is visited
        if (activeTab === "NEW_ADMISSIONS" && notifCounts?.admissions > 0) {
            setEduNotifCounts(prev => ({ ...prev, admissions: 0 }));
        } else if (activeTab === "NEW_REQUESTS" && notifCounts?.requests > 0) {
            setEduNotifCounts(prev => ({ ...prev, requests: 0 }));
        }
    }, [activeTab, notifCounts, setEduNotifCounts]);


>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
    let content = null;

    switch (activeTab) {
        case "SCHOOL":
<<<<<<< HEAD
            content = <SchoolDataTable data={rowData} setData={setRowData} />;
            break;

        case "COLLEGE":
            content = <CollegeDataTable data={rowData} setData={setRowData} />;
            break;

        case "UNIVERSITIES":
            content = <UniversityDataTable data={rowData} setData={setRowData} />;
=======
            content = <SchoolDataTable data={rowData} setData={setRowData} setActiveTab={setActiveTab} />;
            break;

        case "COLLEGE":
            content = <CollegeDataTable data={rowData} setData={setRowData} setActiveTab={setActiveTab} />;
            break;

        case "NEW_ADMISSIONS":
            content = <NewAdmissionsTable data={rowData} setData={setRowData} />;
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
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

<<<<<<< HEAD
=======
        case "RECORD":
            content = <InstituteRecordsTable data={rowData} setData={setRowData} />;
            break

>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
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
<<<<<<< HEAD
                        className={activeTab === "UNIVERSITIES" ? "SA_active" : ""}
                        onClick={() => setActiveTab("UNIVERSITIES")}
                    >
                        Universities
=======
                        className={activeTab === "NEW_ADMISSIONS" ? "SA_active" : ""}
                        onClick={() => setActiveTab("NEW_ADMISSIONS")}
                    >
                        New Admissions
                        {notifCounts?.admissions > 0 && <span className="SA_sub_nav_badge">{notifCounts.admissions}</span>}
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
                    </button>

                    <button
                        className={activeTab === "NEW_REQUESTS" ? "SA_active" : ""}
                        onClick={() => setActiveTab("NEW_REQUESTS")}
                    >
                        New Requests
<<<<<<< HEAD
=======
                        {notifCounts?.requests > 0 && <span className="SA_sub_nav_badge">{notifCounts.requests}</span>}
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
                    </button>
                </div>
            </div>

<<<<<<< HEAD
=======

>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
            <div className="SA_table_container">
                {content}
            </div>

        </section>
    );
};

<<<<<<< HEAD
/* ---------------- SCHOOL TABLE ---------------- */

const SchoolDataTable = ({ data, setData }) => {
=======
// ****************************************
// Eduction Section Sub nav's Tab's content
// ****************************************

/* ---------------- SCHOOL TABLE ---------------- */

const SchoolDataTable = ({ data, setData, setActiveTab }) => {
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
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
<<<<<<< HEAD
=======
                                    <div className="edu-badge-group">
                                        <span className="edu-badge plan-badge">{admin.plan || admin.paymentPlan}</span>
                                        {admin.plan === "FREE_TRIAL" && new Date() > new Date(admin.trialEndDate) && (
                                            <span className="edu-badge expired-badge">Expired</span>
                                        )}
                                    </div>
                                    <button
                                        className="SA_action_icon info"
                                        onClick={() => ApiCall.handleGetRecords(admin.adminId, admin.institutionId, setData, setActiveTab)}
                                        title="Admission Record"
                                        style={{ marginTop: '10px', width: '32px', height: '32px' }}
                                    >
                                        <FiFileText size={16} />
                                    </button>
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
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
<<<<<<< HEAD
                            <select value={admin.paymentPlan} className={`SA_plan_badge ${admin.paymentPlan?.toLowerCase()}`} onChange={(e) => ChangePaymentPlan(admin.adminId, admin.institutionId, setData, e.target.value)}>
                                <option>Free</option>
                                <option>Premium</option>
                                <option>Enterprise</option>
=======
                            <select
                                value={admin.paymentPlan}
                                className={`SA_plan_badge ${admin.paymentPlan?.toLowerCase()}`}
                                onChange={(e) => ApiCall.ChangePaymentPlan(admin.adminId, admin.institutionId, setData, e.target.value, "SCHOOL")}
                            >
                                <option value="FREE">Free</option>
                                <option value="BASIC">Basic</option>
                                <option value="PREMIUM">Premium</option>
                                <option value="ENTERPRISE">Enterprise</option>
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
                            </select>
                        </td>

                        <td>
                            <div className="SA_row_actions">
                                <button
<<<<<<< HEAD
                                    title={admin.status ? "Institution is active" : "Institution is inactive"}
                                    className="SA_action_icon warn"
                                    onClick={() =>
                                        ChangeInstState(admin.adminId, admin.institutionId, setData)
                                    }
                                >
                                    {admin.status ? <FiCheckCircle /> : <FiXCircle />}
=======
                                    title={admin.instituteStatus ? "Disable the Institution" : "Enable the Institution"}
                                    className={`SA_action_icon ${admin.instituteStatus ? "btn-enable" : "btn-disable"}`}
                                    onClick={() =>
                                        ApiCall.ChangeInstState(admin.adminId, admin.institutionId, admin.institutionType, setData)
                                    }
                                >
                                    {admin.instituteStatus ? <FiCheckCircle /> : <FiXCircle />}
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
                                </button>

                                <button
                                    className="SA_action_icon danger"
                                    onClick={() =>
<<<<<<< HEAD
                                        DeleteTheInst(admin.adminId, admin.institutionId, setData)
=======
                                        ApiCall.DeleteTheInst(admin.adminId, admin.institutionId, setData)
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
                                    }
                                >
                                    <FiTrash2 />
                                </button>

                                <button
                                    title={admin.verified ? "Admin is Verified" : "Admin is not Verified"}
                                    className="SA_action_icon info"
                                    onClick={() =>
<<<<<<< HEAD
                                        ChangeAdminVerificationState(admin.adminId, setData)
=======
                                        ApiCall.ChangeAdminVerificationState(admin.adminId, setData)
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
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
<<<<<<< HEAD
                                <button className="SA_action_icon danger" title="Reject Request" onClick={() => { deleteRequest(request._id, setData) }}>
=======
                                <button className="SA_action_icon danger" title="Reject Request" onClick={() => { ApiCall.deleteRequest(request._id, setData) }}>
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
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

<<<<<<< HEAD
/* ---------------- PLACEHOLDERS ---------------- */
const CollegeDataTable = () => <p className="no-data">College data coming soon.</p>;
const UniversityDataTable = () => <p className="no-data">University data coming soon.</p>;
=======
/* ---------------- NEW ADMISSIONS TABLE ---------------- */

export const NewAdmissionsTable = ({ data, setData }) => {
    const [processingId, setProcessingId] = useState("");

    if (!data || data.length === 0)
        return <p className="no-data">No new admissions at this time.</p>;

    const handleForward = async (admissionId) => {
        try {
            setProcessingId(admissionId);
            ApiCall.ApproveAdmissionAndForward(admissionId);
        } catch (err) {
            alert("Server error");
        } finally {
            setProcessingId("");
        }
    };

    return (
        <table className="SA_custom_table NewAdmissionsTable">
            <thead>
                <tr>
                    <th>Service Type</th>
                    <th>Applicant Necessary Details</th>
                    <th>Payment Screenshot</th>
                    <th>Admin Necessary Details</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {data.map((admission, i) => (
                    <tr className="SA_table_row" key={i}>

                        {/* SERVICE TYPE */}
                        <td>
                            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                <span className={`SA_plan_badge ${admission.serviceType?.toLowerCase()}`}>
                                    {admission.serviceType || "UNKNOWN"}
                                </span>

                                <span style={{ fontSize: "13px", fontWeight: "700", color: "#111827" }}>
                                    {admission.instituteName}
                                </span>

                                <span style={{ fontSize: "12px", color: "#6b7280" }}>
                                    ID: {admission.instituteId}
                                </span>

                                <span style={{ fontSize: "12px", color: "#6b7280" }}>
                                    Status: {admission.instituteStatus ? "Active" : "In-Active"}
                                </span>
                            </div>
                        </td>

                        {/* APPLICANT DETAILS */}
                        <td>
                            <div className="SA_contact_stack">

                                <div className="SA_contact_item">
                                    <b>Student:</b> <span>{admission.studentName}</span>
                                </div>

                                <div className="SA_contact_item">
                                    <b>Father:</b> <span>{admission.fatherName}</span>
                                </div>

                                <div className="SA_contact_item">
                                    <b>Class:</b> <span>{admission.targetClass}</span>
                                </div>

                                {admission.previousSchool && (
                                    <div className="SA_contact_item">
                                        <b>Previous:</b> <span>{admission.previousSchool}</span>
                                    </div>
                                )}

                                {admission.address && (
                                    <div className="SA_contact_item">
                                        <FiMapPin /> <span>{admission.address}</span>
                                    </div>
                                )}

                                <div className="SA_contact_item">
                                    <FiPhone /> <span>{admission.phone}</span>
                                </div>

                                <div className="SA_contact_item">
                                    <FaWhatsapp /> <span>{admission.WhatsAppNum}</span>
                                </div>

                                <div className="SA_contact_item">
                                    <FiMail /> <span>{admission.email}</span>
                                </div>

                            </div>
                        </td>

                        {/* PAYMENT SCREENSHOT */}
                        <td>
                            {admission.paymentScreenshot ? (
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    <img
                                        src={admission.paymentScreenshot}
                                        alt="payment"
                                        style={{
                                            width: "140px",
                                            height: "90px",
                                            borderRadius: "12px",
                                            objectFit: "cover",
                                            border: "1px solid #e5e7eb"
                                        }}
                                    />
                                    <a
                                        href={admission.paymentScreenshot}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            fontSize: "13px",
                                            fontWeight: "600",
                                            color: "#2563eb",
                                            textDecoration: "none",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "6px"
                                        }}
                                    >
                                        <FiImage /> View Full
                                    </a>
                                </div>
                            ) : (
                                <p style={{ color: "red", fontWeight: "700" }}>
                                    No Screenshot
                                </p>
                            )}
                        </td>

                        {/* ADMIN DETAILS */}
                        <td>
                            <div className="SA_contact_stack">

                                <div className="SA_contact_item">
                                    <b>Name:</b> <span>{admission.adminName || "Not Found"}</span>
                                </div>

                                <div className="SA_contact_item">
                                    <FiMail /> <span>{admission.adminEmail || "Not Found"}</span>
                                </div>

                                <div className="SA_contact_item">
                                    <FaWhatsapp /> <span>{admission.adminWhatsapp || "Not Found"}</span>
                                </div>

                                <div className="SA_contact_item">
                                    <FiPhone /> <span>{admission.adminPhone || "Not Found"}</span>
                                </div>

                                <div className="SA_contact_item">
                                    <FiMapPin /> <span>{admission.adminLocation || "Not Found"}</span>
                                </div>

                                <div className="SA_contact_item">
                                    <FaIdCard /> <span>{admission.adminIDCard || "Not Found"}</span>
                                </div>

                                <div className="SA_contact_item">
                                    <b>Verified:</b>{" "}
                                    <span style={{ fontWeight: "700", color: admission.adminVerified ? "green" : "red" }}>
                                        {admission.adminVerified ? "Yes" : "No"}
                                    </span>
                                </div>

                            </div>
                        </td>

                        {/* ACTION */}
                        <td>
                            <div className="SA_row_actions">
                                <button
                                    className="SA_action_icon info"
                                    title="Approve & Forward the data"
                                    onClick={() => handleForward(admission.admissionId)}
                                >
                                    <FiSend />
                                </button>
                                <button className="SA_action_icon danger" title="Reject Admission" onClick={() => { ApiCall.deleteAdmissionReq(admission.admissionId, setData) }}>
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

/* ---------------- COLLEGE TABLE ---------------- */

const CollegeDataTable = ({ data, setData, setActiveTab }) => {
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
                                    <div className="edu-badge-group">
                                        <span className="edu-badge plan-badge">{admin.plan || admin.paymentPlan}</span>
                                        {admin.plan === "FREE_TRIAL" && new Date() > new Date(admin.trialEndDate) && (
                                            <span className="edu-badge expired-badge">Expired</span>
                                        )}
                                    </div>
                                    <br></br>
                                    <button
                                        className="SA_action_icon info"
                                        onClick={() => ApiCall.handleGetRecords(admin.adminId, admin.institutionId, setData, setActiveTab)}
                                        title="Admission Record"
                                        style={{ marginTop: '10px', width: '32px', height: '32px' }}
                                    >
                                        <FiFileText size={16} />
                                    </button>
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
                            <select
                                value={admin.paymentPlan}
                                className={`SA_plan_badge ${admin.paymentPlan?.toLowerCase()}`}
                                onChange={(e) => ApiCall.ChangePaymentPlan(admin.adminId, admin.institutionId, setData, e.target.value, "COLLEGE")}
                            >
                                <option value="FREE">Free</option>
                                <option value="BASIC">Basic</option>
                                <option value="PREMIUM">Premium</option>
                                <option value="ENTERPRISE">Enterprise</option>
                            </select>
                        </td>

                        <td>
                            <div className="SA_row_actions">
                                <button
                                    title={admin.instituteStatus ? "Disable the Institution" : "Enable the Institution"}
                                    className={`SA_action_icon ${admin.instituteStatus ? "btn-enable" : "btn-disable"}`}
                                    onClick={() =>
                                        ApiCall.ChangeInstState(admin.adminId, admin.institutionId, admin.institutionType, setData)
                                    }
                                >
                                    {admin.instituteStatus ? <FiCheckCircle /> : <FiXCircle />}
                                </button>

                                <button
                                    className="SA_action_icon danger"
                                    onClick={() =>
                                        ApiCall.DeleteTheInst(admin.adminId, admin.institutionId, setData)
                                    }
                                >
                                    <FiTrash2 />
                                </button>

                                <button
                                    title={admin.verified ? "Admin is Verified" : "Admin is not Verified"}
                                    className="SA_action_icon info"
                                    onClick={() =>
                                        ApiCall.ChangeAdminVerificationState(admin.adminId, setData)
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

/* ---------------- RECORD TABLE ---------------- */
const InstituteRecordsTable = ({ data, setData }) => {

    if (!data || data.length === 0)
        return <p className="records_no_data">No records found for this institute.</p>;

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            ApiCall.deleteAdmissionRecord(id, setData);
        }
    };

    return (
        <div className="records_table_wrapper">

            <table className="records_table">

                <thead>
                    <tr>
                        <th>Service</th>
                        <th>Student Details</th>
                        <th>Payment</th>
                        <th>Approval</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((record, i) => (

                        <tr className="records_row" key={i}>

                            {/* SERVICE TYPE */}
                            <td>
                                <div className="records_service">

                                    <span className={`records_plan_badge ${record.serviceType?.toLowerCase()}`}>
                                        {record.serviceType || "UNKNOWN"}
                                    </span>

                                    <span className="records_institute_name">
                                        {record.instituteName}
                                    </span>

                                    <span className="records_meta">
                                        ID: {record.instituteId}
                                    </span>

                                    <span className="records_meta">
                                        Status: {record.status || "Unknown"}
                                    </span>

                                </div>
                            </td>

                            {/* STUDENT DETAILS */}
                            <td>
                                <div className="records_contact_stack">

                                    <div className="records_contact_item">
                                        <b>Student:</b> {record.studentName}
                                    </div>

                                    <div className="records_contact_item">
                                        <b>Father:</b> {record.fatherName}
                                    </div>

                                    <div className="records_contact_item">
                                        <b>Class:</b> {record.targetClass}
                                    </div>

                                    {record.previousSchool &&
                                        <div className="records_contact_item">
                                            <b>Previous:</b> {record.previousSchool}
                                        </div>
                                    }

                                    {record.address &&
                                        <div className="records_contact_item">
                                            <FiMapPin /> {record.address}
                                        </div>
                                    }

                                    {record.phone &&
                                        <div className="records_contact_item">
                                            <FiPhone /> {record.phone}
                                        </div>
                                    }

                                    {record.WhatsAppNum &&
                                        <div className="records_contact_item">
                                            <FaWhatsapp /> {record.WhatsAppNum}
                                        </div>
                                    }

                                    {record.email &&
                                        <div className="records_contact_item">
                                            <FiMail /> {record.email}
                                        </div>
                                    }

                                </div>
                            </td>

                            {/* PAYMENT */}
                            <td>
                                {record.paymentScreenshot ? (

                                    <div className="records_payment">

                                        <img
                                            src={record.paymentScreenshot}
                                            alt="payment"
                                            className="records_payment_img"
                                        />

                                        <a
                                            href={record.paymentScreenshot}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="records_payment_link"
                                        >
                                            <FiImage /> View
                                        </a>

                                    </div>

                                ) : (
                                    <span className="records_no_ss">
                                        No Screenshot
                                    </span>
                                )}
                            </td>

                            {/* APPROVAL */}
                            <td>
                                <div className="records_contact_stack">

                                    <div className="records_contact_item">
                                        <b>Approved By:</b> {record.approvedBy || "Unknown"}
                                    </div>

                                    <div className="records_contact_item">
                                        <b>Approved At:</b> {new Date(record.approvedAt).toLocaleString()}
                                    </div>

                                    <div className="records_contact_item">
                                        <b>Record ID:</b> {record.admissionId}
                                    </div>

                                </div>
                            </td>

                            {/* DELETE BUTTON */}
                            <td>
                                <button
                                    className="records_delete_btn"
                                    onClick={() => handleDelete(record.admissionId)}
                                >
                                    <FiTrash2 />
                                    Delete
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
};
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
