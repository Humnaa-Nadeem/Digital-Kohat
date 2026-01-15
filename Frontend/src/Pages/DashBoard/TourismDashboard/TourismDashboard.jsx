import React, { useState } from 'react';
import './TourismDashboard.css';
import {
    FiHome, FiGrid, FiUsers, FiStar, FiShield, FiTrendingUp,
    FiMessageCircle, FiPhoneCall, FiMapPin, FiCheckCircle, FiAlertTriangle
} from 'react-icons/fi';
import { FaWhatsapp, FaCrown } from 'react-icons/fa';
import { Tourism_Provider_Details } from '../../../Store/Tourism_store';

// Reusable Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="td-modal-overlay" onClick={onClose}>
            <div className="td-modal-content" onClick={e => e.stopPropagation()}>
                <div className="td-modal-header">
                    <h3>{title}</h3>
                    <button className="td-btn-close" onClick={onClose}>×</button>
                </div>
                <div className="td-modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

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
                </div>
                <table className="td-table">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Service Requested</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.requests.slice(0, 5).map(req => (
                            <tr key={req.id}>
                                <td>{req.user}</td>
                                <td>{req.service}</td>
                                <td>{req.date}</td>
                                <td><span className={`td-status-badge td-status-${req.status}`}>{req.status}</span></td>
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
const OfferingsManager = ({ offerings, onAdd, onDelete, onEdit }) => {
    return (
        <div className="td-section-card">
            <div className="td-section-header">
                <h3 className="td-section-title">My Offerings</h3>
                <button className="td-btn-primary" onClick={onAdd}><FiGrid /> Add New Offering</button>
            </div>
            <div className="td-offerings-list">
                {offerings.length > 0 ? offerings.map(offer => (
                    <div className="td-offering-item" key={offer.id}>
                        <div className="td-offering-details">
                            <h4>{offer.title}</h4>
                            <p>{offer.desc}</p>
                            <span style={{ fontWeight: 'bold', color: '#0abde3' }}>Rs. {offer.price}</span>
                        </div>
                        <div className="td-offering-actions">
                            <span className={`td-status-badge td-status-${offer.availability}`}>{offer.availability}</span>
                            <div className="td-action-group">
                                <button className="td-btn-action" onClick={() => onEdit(offer)}>Edit</button>
                                <button className="td-btn-action delete" onClick={() => onDelete(offer.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                )) : <p className="td-empty-text">No offerings added yet.</p>}
            </div>
        </div>
    );
};

const TourismRequests = ({ requests, onUpdateStatus }) => {
    const handleChat = (req) => {
        const message = `Hello ${req.user}, this is ${req.service} provider regarding your request on ${req.date}.`;
        const phone = req.contact.replace(/\D/g, ''); // Simple cleanup
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="td-section-card">
            <h3 className="td-section-title">Manage Service Requests</h3>
            <table className="td-table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(req => (
                        <tr key={req.id}>
                            <td>{req.user}</td>
                            <td>{req.service}</td>
                            <td>{req.date}</td>
                            <td>{req.contact}</td>
                            <td><span className={`td-status-badge td-status-${req.status}`}>{req.status}</span></td>
                            <td>
                                <div className="td-action-group">
                                    {req.status === 'Pending' && (
                                        <>
                                            <button className="td-btn-sm td-btn-success" onClick={() => onUpdateStatus(req.id, 'Confirmed')}>Accept</button>
                                            <button className="td-btn-sm td-btn-danger" onClick={() => onUpdateStatus(req.id, 'Cancelled')}>Reject</button>
                                        </>
                                    )}
                                    <button className="td-btn-sm td-btn-outline" onClick={() => handleChat(req)}><FaWhatsapp /> Chat</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const TourismReviews = ({ reviews, onReply }) => {
    const [replyText, setReplyText] = useState("");
    const [activeReplyId, setActiveReplyId] = useState(null);

    const submitReply = (id) => {
        if (!replyText.trim()) return;
        onReply(id, replyText);
        setReplyText("");
        setActiveReplyId(null);
    };

    return (
        <div className="td-section-card">
            <h3 className="td-section-title">Customer Reviews</h3>
            <div className="td-reviews-list">
                {reviews.map(rev => (
                    <div key={rev.id} className="td-review-item">
                        <div className="td-review-header">
                            <div>
                                <h4>{rev.user}</h4>
                                <span className="td-review-date">{rev.date}</span>
                            </div>
                            <div className="td-stars">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar key={i} className={i < rev.rating ? "fill" : ""} />
                                ))}
                            </div>
                        </div>
                        <p className="td-review-comment">"{rev.comment}"</p>
                        {rev.reply ? (
                            <div className="td-review-reply">
                                <strong>Your Reply:</strong> {rev.reply}
                            </div>
                        ) : (
                            <div className="td-reply-section">
                                {activeReplyId === rev.id ? (
                                    <div className="td-reply-input-cont">
                                        <textarea
                                            placeholder="Type your reply..."
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            className="td-input"
                                        />
                                        <div className="td-action-group">
                                            <button className="td-btn-sm td-btn-success" onClick={() => submitReply(rev.id)}>Send</button>
                                            <button className="td-btn-sm td-btn-outline" onClick={() => setActiveReplyId(null)}>Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <button className="td-btn-text" onClick={() => setActiveReplyId(rev.id)}>Reply to review</button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const TourismSubscription = ({ data, onUpgrade }) => {
    return (
        <div className="td-trust-section">
            <div className="td-trust-card td-promo-card">
                <FiTrendingUp className="td-trust-icon" />
                <h2>Upgrade to Pro</h2>
                <p>Get listed at the top, verify your profile with a gold badge, and reach 10x more customers.</p>
                <button className="td-btn-white" onClick={onUpgrade}>Upgrade to Pro</button>
            </div>
            <div className="td-section-card">
                <h3 className="td-section-title">Current Plan</h3>
                <div className="td-plan-details">
                    <div className="td-plan-info">
                        <strong>{data.subscriptionPlan}</strong>
                        <p>Expiry: {data.subscriptionExpiry}</p>
                    </div>
                    <span className="td-status-badge td-status-Available">Active</span>
                </div>
                <div className="td-billing-history">
                    <h4>Recent Invoices</h4>
                    <p>No recent invoices found.</p>
                </div>
            </div>
        </div>
    );
};

const TourismProfile = ({ data, onUpdate }) => {
    const [form, setForm] = useState(data);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(form);
    };

    return (
        <div className="td-section-card">
            <h3 className="td-section-title">Edit Guide Profile</h3>
            <form className="td-form" onSubmit={handleSubmit}>
                <div className="td-form-row">
                    <div className="td-form-group">
                        <label>Full Name</label>
                        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="td-form-group">
                        <label>Service Type</label>
                        <input type="text" value={form.type} disabled />
                    </div>
                </div>
                <div className="td-form-group">
                    <label>Tagline</label>
                    <input type="text" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
                </div>
                <div className="td-form-row">
                    <div className="td-form-group">
                        <label>Contact Number (WhatsApp)</label>
                        <input type="text" value={form.whatsappNum || "03XX-XXXXXXX"} />
                    </div>
                    <div className="td-form-group">
                        <label>Location Area</label>
                        <input type="text" value="Kohat City, KPK" />
                    </div>
                </div>
                <button type="submit" className="td-btn-primary">Save Profile Changes</button>
            </form>
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

    // Initial data from store
    const [providerData, setProviderData] = useState(Tourism_Provider_Details[0]);

    // Handlers for Offerings (Modals)
    const [isOfferingModalOpen, setIsOfferingModalOpen] = useState(false);
    const [editingOffering, setEditingOffering] = useState(null);
    const [offeringForm, setOfferingForm] = useState({ title: '', price: '', desc: '' });

    const openAddOffering = () => {
        setEditingOffering(null);
        setOfferingForm({ title: '', price: '', desc: '' });
        setIsOfferingModalOpen(true);
    };

    const openEditOffering = (offer) => {
        setEditingOffering(offer);
        setOfferingForm({ title: offer.title, price: offer.price, desc: offer.desc });
        setIsOfferingModalOpen(true);
    };

    const handleSaveOffering = (e) => {
        e.preventDefault();
        if (editingOffering) {
            setProviderData({
                ...providerData,
                offerings: providerData.offerings.map(o => o.id === editingOffering.id ? { ...o, ...offeringForm } : o)
            });
        } else {
            const newOffer = { id: Date.now(), ...offeringForm, availability: "Available" };
            setProviderData({ ...providerData, offerings: [...providerData.offerings, newOffer] });
        }
        setIsOfferingModalOpen(false);
    };

    const handleDeleteOffering = (id) => {
        if (window.confirm("Are you sure you want to delete this offering?")) {
            setProviderData({
                ...providerData,
                offerings: providerData.offerings.filter(o => o.id !== id)
            });
        }
    };

    // Subscription Modal
    const [isSubModalOpen, setIsSubModalOpen] = useState(false);
    const handleSubscription = (e) => {
        e.preventDefault();
        alert("Subscription request submitted! Our team will contact you soon.");
        setIsSubModalOpen(false);
    };

    // Review Hanlder
    const handleReviewReply = (id, reply) => {
        setProviderData({
            ...providerData,
            reviews: providerData.reviews.map(r => r.id === id ? { ...r, reply } : r)
        });
    };

    // Handlers for Requests
    const handleUpdateStatus = (id, status) => {
        setProviderData({
            ...providerData,
            requests: providerData.requests.map(r => r.id === id ? { ...r, status } : r)
        });
    };

    // Handler for Profile
    const handleProfileUpdate = (updatedData) => {
        setProviderData({ ...providerData, ...updatedData });
        alert("Profile updated successfully!");
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Overview': return <DashboardOverview data={providerData} />;
            case 'Offerings': return (
                <OfferingsManager
                    offerings={providerData.offerings}
                    onAdd={openAddOffering}
                    onDelete={handleDeleteOffering}
                    onEdit={openEditOffering}
                />
            );
            case 'Requests': return <TourismRequests requests={providerData.requests} onUpdateStatus={handleUpdateStatus} />;
            case 'Reviews': return <TourismReviews reviews={providerData.reviews} onReply={handleReviewReply} />;
            case 'Trust': return <TrustCenter data={providerData} />;
            case 'Subscription': return <TourismSubscription data={providerData} onUpgrade={() => setIsSubModalOpen(true)} />;
            case 'Profile': return <TourismProfile data={providerData} onUpdate={handleProfileUpdate} />;
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
                    <li className={`td-nav-item ${activeTab === 'Profile' ? 'active' : ''}`} onClick={() => setActiveTab('Profile')}>
                        <FiUsers className="td-nav-icon" /> My Profile
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

                {/* Offering Modal */}
                <Modal
                    isOpen={isOfferingModalOpen}
                    onClose={() => setIsOfferingModalOpen(false)}
                    title={editingOffering ? "Edit Offering" : "Add New Offering"}
                >
                    <form className="td-form" onSubmit={handleSaveOffering}>
                        <div className="td-form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                className="td-input"
                                value={offeringForm.title}
                                onChange={e => setOfferingForm({ ...offeringForm, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="td-form-group">
                            <label>Price (Rs.)</label>
                            <input
                                type="number"
                                className="td-input"
                                value={offeringForm.price}
                                onChange={e => setOfferingForm({ ...offeringForm, price: e.target.value })}
                                required
                            />
                        </div>
                        <div className="td-form-group">
                            <label>Description</label>
                            <textarea
                                className="td-input"
                                value={offeringForm.desc}
                                onChange={e => setOfferingForm({ ...offeringForm, desc: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="td-btn-primary">Save Offering</button>
                    </form>
                </Modal>

                {/* Subscription Modal */}
                <Modal
                    isOpen={isSubModalOpen}
                    onClose={() => setIsSubModalOpen(false)}
                    title="Upgrade to Pro Subscription"
                >
                    <form className="td-form" onSubmit={handleSubscription}>
                        <p>Unlock premium features and reach more customers in Kohat.</p>
                        <div className="td-form-group">
                            <label>Business Name</label>
                            <input type="text" className="td-input" value={providerData.name} readOnly />
                        </div>
                        <div className="td-form-group">
                            <label>Select Plan</label>
                            <select className="td-input">
                                <option>Gold Plan - Rs. 5000/year</option>
                                <option>Silver Plan - Rs. 3000/year</option>
                            </select>
                        </div>
                        <div className="td-form-group">
                            <label>Payment Method</label>
                            <select className="td-input">
                                <option>EasyPaisa / JazzCash</option>
                                <option>Bank Transfer</option>
                            </select>
                        </div>
                        <button type="submit" className="td-btn-primary">Submit Request</button>
                    </form>
                </Modal>
            </main>
        </div>
    );
};
