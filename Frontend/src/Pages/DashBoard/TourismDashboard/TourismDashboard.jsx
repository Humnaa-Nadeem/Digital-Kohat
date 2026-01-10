import React, { useState } from 'react';
import './TourismDashboard.css';
import {
    FiHome, FiGrid, FiUsers, FiStar, FiShield, FiTrendingUp,
    FiMessageCircle, FiPhoneCall, FiMapPin, FiCheckCircle, FiAlertTriangle
} from 'react-icons/fi';
import { FaWhatsapp, FaCrown } from 'react-icons/fa';
import { Tourism_Provider_Details } from '../../../Store/Tourism_store';

// ==========================================
// 1. DASHBOARD OVERVIEW
// ==========================================
const DashboardOverview = ({ data }) => {
    const stats = [
        { label: "Profile Views", value: data.profileViews, icon: <FiUsers />, color: "#0abde3" },
        { label: "Phone Calls", value: data.calls, icon: <FiPhoneCall />, color: "#5f27cd" },
        { label: "WhatsApp Hits", value: data.whatsapp, icon: <FaWhatsapp />, color: "#1dd1a1" },
        { label: "Requests", value: data.requestsCount, icon: <FiMessageCircle />, color: "#ff9f43" }
    ];

    return (
        <div className="td-overview">
            <div className="td-stats-grid">
                {stats.map((stat, index) => (
                    <div className="td-stat-card" key={index}>
                        <div className="td-stat-icon" style={{ color: stat.color, background: `${stat.color}20` }}>
                            {stat.icon}
                        </div>
                        <div className="td-stat-info">
                            <h3>{stat.value}</h3>
                            <p>{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="td-section-card">
                <div className="td-section-header">
                    <h3 className="td-section-title">Recent Customer Requests</h3>
                    <button className="td-btn-primary">View All</button>
                </div>
                <table className="td-table">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Service Requested</th>
                            <th>Date</th>
                            <th>Contact</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.requests.slice(0, 5).map(req => (
                            <tr key={req.id}>
                                <td>{req.user}</td>
                                <td>{req.service}</td>
                                <td>{req.date}</td>
                                <td>{req.contact}</td>
                                <td><span className={`td-status-badge td-status-${req.status === 'Confirmed' ? 'Available' : 'Busy'}`}>{req.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// ==========================================
// 2. OFFERINGS SECTION
// ==========================================
const OfferingsManager = ({ offerings }) => {
    return (
        <div className="td-section-card">
            <div className="td-section-header">
                <h3 className="td-section-title">My Offerings</h3>
                <button className="td-btn-primary">Add New Offering</button>
            </div>
            <div className="td-offerings-list">
                {offerings.map(offer => (
                    <div className="td-offering-item" key={offer.id}>
                        <div className="td-offering-details">
                            <h4>{offer.title}</h4>
                            <p>{offer.desc}</p>
                            <span style={{ fontWeight: 'bold', color: '#0abde3' }}>Rs. {offer.price}</span>
                        </div>
                        <div className="td-offering-actions">
                            <span className={`td-status-badge td-status-${offer.availability}`}>{offer.availability}</span>
                            <div style={{ marginTop: '10px' }}>
                                <button className="td-btn-action">Edit</button>
                                <button className="td-btn-action" style={{ color: 'red', borderColor: 'red' }}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ==========================================
// 3. TRUST & BADGE SECTION
// ==========================================
const TrustCenter = ({ data }) => {
    return (
        <div className="td-trust-section">
            <div className="td-trust-card">
                <FaCrown className="td-trust-icon" />
                <h2>DSCH Verified Partner</h2>
                <p>Plan: {data.subscriptionPlan}</p>
                <p>Expires: {data.subscriptionExpiry}</p>
            </div>

            <div className="td-section-card">
                <h3 className="td-section-title">Compliance Status</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '20px' }}>
                    <FiShield size={40} color="#1dd1a1" />
                    <div>
                        <h4>Account Status: Active</h4>
                        <p>You are following all community guidelines.</p>
                    </div>
                </div>

                {data.reportsCount > 0 && (
                    <div className="td-warning-box">
                        <h4><FiAlertTriangle /> Attention Needed</h4>
                        <p>You have {data.reportsCount} active reports. Please resolve them to avoid badge suspension.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// ==========================================
// MAIN DASHBOARD COMPONENT
// ==========================================
export const TourismDashboard = () => {
    const [activeTab, setActiveTab] = useState('Overview');

    // Using the first provider as the logged in user
    const providerData = Tourism_Provider_Details[0];

    const renderContent = () => {
        switch (activeTab) {
            case 'Overview': return <DashboardOverview data={providerData} />;
            case 'Offerings': return <OfferingsManager offerings={providerData.offerings} />;
            case 'Requests': return <DashboardOverview data={providerData} />; // Reuse for now
            case 'Trust': return <TrustCenter data={providerData} />;
            default: return <DashboardOverview data={providerData} />;
        }
    };

    return (
        <div className="td-dashboard-container">
            {/* Sidebar */}
            <aside className="td-sidebar">
                <div className="td-brand">
                    <h2>Digital Kohat Tourism</h2>
                </div>
                <ul className="td-nav-menu">
                    <li className={`td-nav-item ${activeTab === 'Overview' ? 'active' : ''}`} onClick={() => setActiveTab('Overview')}>
                        <FiHome className="td-nav-icon" /> Dashboard
                    </li>
                    <li className={`td-nav-item ${activeTab === 'Offerings' ? 'active' : ''}`} onClick={() => setActiveTab('Offerings')}>
                        <FiGrid className="td-nav-icon" /> Offerings
                    </li>
                    <li className={`td-nav-item ${activeTab === 'Requests' ? 'active' : ''}`} onClick={() => setActiveTab('Requests')}>
                        <FiUsers className="td-nav-icon" /> Requests
                    </li>
                    <li className={`td-nav-item ${activeTab === 'Reviews' ? 'active' : ''}`} onClick={() => setActiveTab('Reviews')}>
                        <FiStar className="td-nav-icon" /> Reviews
                    </li>
                    <li className={`td-nav-item ${activeTab === 'Trust' ? 'active' : ''}`} onClick={() => setActiveTab('Trust')}>
                        <FiShield className="td-nav-icon" /> Trust & Badge
                    </li>
                    <li className={`td-nav-item ${activeTab === 'Subscription' ? 'active' : ''}`} onClick={() => setActiveTab('Subscription')}>
                        <FiTrendingUp className="td-nav-icon" /> Subscription
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="td-main-content">
                <header className="td-header">
                    <div className="td-header-title">
                        <h1>{activeTab}</h1>
                    </div>
                    <div className="td-profile-actions">
                        <button className="td-notification-btn">
                            <FiMessageCircle />
                            <span className="td-badge-dot"></span>
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" alt="Profile"
                                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                            <span style={{ fontWeight: '600' }}>{providerData.name}</span>
                        </div>
                    </div>
                </header>

                <div className="td-content-body">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};
