<<<<<<< HEAD
import { FaCheckCircle, FaEye, FaEnvelopeOpenText, FaPlayCircle, FaRegCreditCard } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import "./Profile.css";
import "../ScholAndColDshbrdComp.css";
export const ProfileContent = () => {
    return (
        <>
            {/* Overview Cards */}
            <div className="overview-cards">
                <div className="Dshbrdcard">
                    <p className="label">Profile Status</p>
                    <div className="Dshbrdcard-bottom">
                        <h3 className="DshBrd-content approved">Approved</h3>
                        <span className="Dshbrdcard-icon"><FaCheckCircle size={28} /></span>
                    </div>
                </div>

                <div className="Dshbrdcard">
                    <p className="label">Total Views (30 days)</p>
                    <div className="Dshbrdcard-bottom">
                        <h3 className="DshBrd-content">1.2K</h3>
                        <span className="Dshbrdcard-icon"><FaEye size={28} /></span>
                    </div>
                </div>

                <div className="Dshbrdcard">
                    <p className="label">Total Inquiries</p>
                    <div className="Dshbrdcard-bottom">
                        <h3 className="DshBrd-content">32</h3>
                        <span className="Dshbrdcard-icon"><FaEnvelopeOpenText size={28} /></span>
                    </div>
                </div>

                <div className="Dshbrdcard">
                    <p className="label">Verification Status</p>
                    <div className="Dshbrdcard-bottom">
                        <h3 className="DshBrd-content approved">Verified</h3>
                        <span className="Dshbrdcard-icon"><MdVerifiedUser size={28} /></span>
                    </div>
                </div>

                <div className="Dshbrdcard">
                    <p className="label">Featured Status</p>
                    <div className="Dshbrdcard-bottom">
                        <h3 className="DshBrd-content">Active</h3>
                        <span className="Dshbrdcard-icon"><FaPlayCircle size={28} /></span>
                    </div>
                </div>

                <div className="Dshbrdcard">
                    <p className="label">Subscription Plan</p>
                    <div className="Dshbrdcard-bottom">
                        <h3 className="DshBrd-content">Premium</h3>
                        <span className="Dshbrdcard-icon"><FaRegCreditCard size={28} /></span>
                    </div>
                </div>


            </div>
            {/* Profile Completion */}
            <div className="profile-completion">
                <div className="pc-header">
                    <h2>Profile Completion</h2>
                    <span className="pc-percent">75% Complete</span>
                </div>

                <div className="pc-progress">
                    <div className="pc-bar" style={{ width: "75%" }}></div>
                </div>

                <div className="pc-checklist">
                    <div className="pc-item completed">✔ Basic Information</div>
                    <div className="pc-item completed">✔ Contact Details</div>
                    <div className="pc-item completed">✔ Facilities</div>
                    <div className="pc-item pending">✖ Media & Gallery</div>
                    <div className="pc-item pending">✖ Verification Documents</div>
=======
import { FaPlayCircle, FaRegCreditCard, FaStar, FaUser, FaSchool } from "react-icons/fa";
import { MdNearMe } from "react-icons/md";
import "./Profile.css";
import "../ScholAndColDshbrdComp.css";
export const ProfileContent = ({ dashboardData }) => {
    return (
        <>
            <div className="overview-section">
                <div className="overview-header">
                    <h2>Profile Overview</h2>
                    <p>Quick summary of your profile activity and status</p>
                </div>

                <div className="overview-cards">
                    {[
                        {
                            label: "Institute Name",
                            value: dashboardData?.ServiceName,
                            icon: <MdNearMe size={24} />
                        },
                        {
                            label: "Expiray Date",
                            value: dashboardData?.PlanExpiry?.split("T")[0] || "None",
                            icon: <FaUser size={24} />
                        },
                        {
                            label: "Rating",
                            value: `${dashboardData?.ratingData?.average || "(New)"} (${dashboardData?.ratingData?.totalReviews || "No Review"})`,
                            icon: <FaStar size={24} />
                        },
                        {
                            label: "Institute Type",
                            value: dashboardData?.ServiceType,
                            icon: < FaSchool size={24} />
                        },
                        {
                            label: "Featured Status",
                            value: dashboardData?.Status ? "Active" : "In-Active",
                            icon: <FaPlayCircle size={24} />
                        },
                        {
                            label: "Subscription Plan",
                            value: dashboardData?.PaymentPlan || "FREE",
                            icon: <FaRegCreditCard size={24} />
                        }
                    ].map((item, index) => (
                        <div className="Dshbrdcard" key={index}>
                            <p className="label">{item?.label}</p>

                            <div className="Dshbrdcard-bottom">
                                <h3 className="DshBrd-content">
                                    {item?.value}
                                </h3>

                                <span className="Dshbrdcard-icon">{item?.icon}</span>
                            </div>
                        </div>
                    ))}
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
                </div>
            </div>
        </>
    )
}