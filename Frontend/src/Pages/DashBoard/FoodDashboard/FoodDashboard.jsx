
import React, { useState } from "react";
import "./FoodDashboard.css";
import brandLogo from "../../../Assests/brandLogo.jpeg";
import {
    FiUser,
    FiShoppingBag,
    FiMenu,
    FiLogOut,
    FiSettings,
    FiHome,
    FiActivity,
    FiBell,
    FiDollarSign,
    FiMessageSquare,
    FiHelpCircle,
    FiStar,
    FiAlertTriangle,
    FiSlash,
    FiFileText
} from "react-icons/fi";
import { FaUser, FaPlus, FaTrash, FaEdit, FaCheck, FaTimes, FaClock, FaPrint, FaReply } from "react-icons/fa";
import { Food_Details } from "../../../Store/Food_store";

const FoodProfile = ({ data, onUpdate }) => {
    return (
        <div className="fd-card">
            <h2 className="fd-section-title">Service Profile</h2>
            <p className="fd-section-subtitle">Manage your restaurant's public information</p>

            <form className="fd-profile-form" onSubmit={onUpdate}>
                {/* Basic Info */}
                <div className="fd-form-group">
                    <label>Restaurant Name</label>
                    <input type="text" className="fd-input" name="name" defaultValue={data.name} disabled />
                </div>

                <div className="fd-form-group">
                    <label>Tagline</label>
                    <input type="text" className="fd-input" name="tagline" defaultValue={data.tagline} />
                </div>

                <div className="fd-form-group">
                    <label>Restaurant Type</label>
                    <select className="fd-input" name="type" defaultValue={data.type}>
                        <option>Fine Dining</option>
                        <option>Cafe</option>
                        <option>Fast Food</option>
                        <option>Local Cuisine</option>
                        <option>Bakery</option>
                        <option>Street Food</option>
                    </select>
                </div>

                <div className="fd-form-group">
                    <label>Description</label>
                    <textarea className="fd-textarea" name="about" defaultValue={data.about}></textarea>
                </div>

                {/* Location & Contact */}
                <div className="fd-form-group">
                    <label>Location</label>
                    <input type="text" className="fd-input" name="location" defaultValue={data.quickInfo?.basicProfile?.location} />
                </div>

                <div className="fd-form-group">
                    <label>Contact Phone</label>
                    <input type="tel" className="fd-input" name="phone" defaultValue={data.contact?.phone} />
                </div>

                <div className="fd-form-group">
                    <label>Contact Email</label>
                    <input type="email" className="fd-input" name="email" defaultValue={data.contact?.email} />
                </div>

                <div className="fd-form-group">
                    <label>Owner Name</label>
                    <input type="text" className="fd-input" name="owner" defaultValue={data.quickInfo?.administration?.owner} disabled />
                </div>


                {/* Operational Details */}
                <div className="fd-form-group">
                    <label>Opening Timings</label>
                    <input type="text" className="fd-input" name="timing" defaultValue={data.quickInfo?.timings?.timing} />
                </div>

                <div className="fd-form-group">
                    <label>Delivery Availability</label>
                    <select className="fd-input" name="deliveryAvailability" defaultValue={data.deliveryAvailability}>
                        <option>Available (City Wide)</option>
                        <option>Limited (3km Radius)</option>
                        <option>Takeaway Only</option>
                        <option>Dine-In Only</option>
                    </select>
                </div>

                <div className="fd-form-group">
                    <label>Facilities (Comma Separated)</label>
                    <input type="text" className="fd-input" name="facilities" defaultValue={data.quickInfo?.facilities?.join(", ")} />
                </div>

                {/* Images */}
                <div className="fd-form-group">
                    <label>Cover Image (URL)</label>
                    <input type="text" className="fd-input" name="aboutImage" defaultValue={data.aboutImage} />
                    <div className="fd-upload-box">
                        <input type="file" className="fd-file-input" />
                        <div className="fd-img-preview-placeholder">
                            <p>Click to upload new image</p>
                        </div>
                    </div>
                </div>

                <button type="submit" className="fd-btn-primary">Save Changes</button>
            </form>
        </div>
    );
};

const ServiceAnalytics = ({ orders }) => {
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === "Approved").length;
    const revenue = orders.filter(o => o.status === "Approved").reduce((acc, curr) => acc + curr.total, 0);
    const pending = orders.filter(o => o.status === "Pending").length;

    const stats = [
        { label: "Total Orders", value: totalOrders },
        { label: "Completed Orders", value: completedOrders },
        { label: "Total Revenue", value: `Rs. ${revenue}` },
        { label: "Pending Requests", value: pending }
    ];
    return (
        <div className="fd-card fd-analytics">
            <h2 className="fd-section-title">Service Analytics</h2>
            <div className="fd-analytics-grid">
                {stats.map((s, i) => (
                    <div key={i} className="fd-analytics-item">
                        <span className="fd-analytics-value">{s.value}</span>
                        <span className="fd-analytics-label">{s.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// New Ads component displaying a promotional banner
const FoodAd = () => {
    return (
        <div className="fd-card fd-ad-card">
            <h2 className="fd-section-title">Special Promotion</h2>
            <div className="fd-ad-content">
                <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" alt="Ad" className="fd-ad-img" />
                <p className="fd-ad-text">Get 20% off on all orders this weekend! Use code <strong>WEEKEND20</strong> at checkout.</p>
            </div>
        </div>
    );
};
const FoodMenu = ({ items, onAdd, onDelete }) => {
    return (
        <div className="fd-card">
            <h2 className="fd-section-title">Menu Management</h2>
            <div className="fd-menu-actions">
                <button className="fd-btn-primary" onClick={onAdd}><FaPlus /> Add New Item</button>
                <button className="fd-btn-secondary">Bulk Upload</button>
            </div>

            <div className="fd-menu-list">
                {items.length > 0 ? items.map((item) => (
                    <div className="fd-menu-item" key={item.id}>
                        <img src={item.img} alt={item.name} className="fd-menu-img" />
                        <div className="fd-menu-details">
                            <div className="fd-menu-header">
                                <h4>{item.name}</h4>
                                <span className={`fd-availability ${item.isAvailable ? 'available' : 'unavailable'}`}>
                                    {item.isAvailable ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                            <p className="fd-item-desc">{item.desc}</p>

                            <div className="fd-item-meta">
                                <span className="fd-price-tag">Rs. {item.price}</span>
                                {item.prepTime && <span className="fd-meta-tag"><FaClock /> {item.prepTime}</span>}
                                {item.sku && <span className="fd-meta-tag">SKU: {item.sku}</span>}
                            </div>

                            <div className="fd-tags">
                                {item.tags?.map((tag, idx) => <span key={idx} className="fd-tag">{tag}</span>)}
                            </div>

                            {item.variants && (
                                <div className="fd-variants">
                                    <small>Variants: {item.variants.join(", ")}</small>
                                </div>
                            )}
                        </div>
                        <div className="fd-menu-btns">
                            <button className="fd-btn-edit"><FaEdit /> Edit</button>
                            <button className="fd-btn-delete" onClick={() => onDelete(item.id)}><FaTrash /> Delete</button>
                        </div>
                    </div>
                )) : <p>No menu items found. Add some!</p>}
            </div>
        </div>
    )
}
const MembershipDetails = () => {
    return (
        <div className="fd-card">
            <h2 className="fd-section-title">Membership Details</h2>
            <div className="fd-membership-info">
                <p>Membership ID: 123456</p>
                <p>Membership Type: Gold</p>
                <p>Expiry Date: 2025-12-31</p>
            </div>
        </div>
    )
}
// ==========================================
// 1. ORDERS CENTER (ADVANCED)
// ==========================================
const FoodOrders = ({ orders, setOrders }) => {
    const [subTab, setSubTab] = useState("New");

    // Filter orders based on active sub-tab
    const filteredOrders = orders.filter(o => {
        if (subTab === "New") return o.status === "Pending";
        if (subTab === "Preparing") return o.status === "Preparing";
        if (subTab === "Ready") return o.status === "Ready";
        if (subTab === "Delivered") return o.status === "Delivered";
        if (subTab === "Cancelled") return o.status === "Cancelled" || o.status === "Rejected";
        return true;
    });

    const updateStatus = (id, newStatus) => {
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    };

    return (
        <div className="fd-orders-container">
            <h2 className="fd-section-title">Orders Center</h2>

            {/* Order Status Tabs */}
            <div className="fd-tabs-secondary">
                {["New", "Preparing", "Ready", "Delivered", "Cancelled"].map(tab => (
                    <button
                        key={tab}
                        className={`fd-tab-btn ${subTab === tab ? "active" : ""}`}
                        onClick={() => setSubTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="fd-orders-list">
                {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                    <div key={order.id} className="fd-order-card">
                        <div className="fd-order-header">
                            <h4>Order #{order.id}</h4>
                            <span className="fd-time-stamp">12:30 PM</span>
                        </div>
                        <div className="fd-order-body">
                            <p><strong>Customer:</strong> {order.customer}</p>
                            <p><strong>Items:</strong> {order.items}</p>
                            <p className="fd-total-price">Total: Rs. {order.total}</p>
                            {order.note && <p className="fd-note">Note: {order.note}</p>}
                        </div>

                        <div className="fd-order-actions">
                            {subTab === "New" && (
                                <>
                                    <button className="fd-btn-approve" onClick={() => updateStatus(order.id, "Preparing")}><FaCheck /> Accept</button>
                                    <button className="fd-btn-reject" onClick={() => updateStatus(order.id, "Rejected")}><FaTimes /> Reject</button>
                                </>
                            )}
                            {subTab === "Preparing" && (
                                <button className="fd-btn-primary" onClick={() => updateStatus(order.id, "Ready")}><FaClock /> Mark Ready</button>
                            )}
                            {subTab === "Ready" && (
                                <button className="fd-btn-success" onClick={() => updateStatus(order.id, "Delivered")}><FaCheck /> Mark Delivered</button>
                            )}

                            <button className="fd-btn-icon" title="Print Receipt"><FaPrint /></button>
                        </div>
                    </div>
                )) : <div className="fd-empty-state">No orders in this category.</div>}
            </div>
        </div>
    );
};

// ==========================================
// 2. DEALS & PROMOTIONS
// ==========================================
const FoodDeals = ({ promotions = [] }) => {
    return (
        <div className="fd-card">
            <h2 className="fd-section-title">Deals & Promotions</h2>
            <div className="fd-menu-actions">
                <button className="fd-btn-primary"><FaPlus /> Create New Promo</button>
            </div>

            <table className="fd-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Code</th>
                        <th>Discount</th>
                        <th>Detail</th>
                        <th>Status</th>
                        <th>Usage</th>
                    </tr>
                </thead>
                <tbody>
                    {promotions.length > 0 ? promotions.map(p => (
                        <tr key={p.id}>
                            <td>{p.title}</td>
                            <td><span className="fd-badge-code">{p.code || "N/A"}</span></td>
                            <td>{p.value}</td>
                            <td>{p.type}</td>
                            <td><span className={`fd-status-badge status-${p.status}`}>{p.status}</span></td>
                            <td>{p.usage} Used</td>
                        </tr>
                    )) : <tr><td colSpan="6">No active promotions.</td></tr>}
                </tbody>
            </table>
        </div>
    );
};

// ==========================================
// 3. REVIEWS & REPUTATION
// ==========================================
const FoodReviews = ({ reviews = [] }) => {
    return (
        <div className="fd-card">
            <h2 className="fd-section-title">Reviews & Reputation</h2>
            <div className="fd-reviews-list">
                {reviews.map((r, i) => (
                    <div key={r.id || i} className="fd-review-item">
                        <div className="fd-review-header">
                            <div className="fd-reviewer-info">
                                <img src={r.img} alt={r.name} className="fd-avatar-sm" />
                                <div>
                                    <h4>{r.name}</h4>
                                    <span className="fd-review-date">{r.date || "Just now"}</span>
                                </div>
                            </div>
                            <div className="fd-rating-stars">
                                {[...Array(5)].map((_, idx) => (
                                    <FiStar key={idx} className={idx < r.rating ? "fill-star" : "empty-star"} />
                                ))}
                            </div>
                        </div>
                        <p className="fd-review-text">"{r.comment}"</p>

                        {r.response ? (
                            <div className="fd-admin-reply">
                                <strong>You replied:</strong> {r.response}
                            </div>
                        ) : (
                            <div className="fd-reply-box">
                                <button className="fd-btn-text"><FaReply /> Reply to review</button>
                                <button className="fd-btn-text-danger">Report</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// ==========================================
// 4. FINANCE & SUBSCRIPTION
// ==========================================
const FoodFinance = ({ finance }) => {
    if (!finance) return <div>Loading finance data...</div>;
    return (
        <div className="fd-card">
            <h2 className="fd-section-title">Finance & Subscription</h2>
            <div className="fd-analytics-grid">
                <div className="fd-analytics-item">
                    <span className="fd-analytics-value">Rs. {finance.balance}</span>
                    <span className="fd-analytics-label">Wallet Balance</span>
                </div>
                <div className="fd-analytics-item">
                    <span className="fd-analytics-value">Rs. {finance.pendingPayout}</span>
                    <span className="fd-analytics-label">Pending Payout</span>
                </div>
            </div>

            <div className="fd-subsection">
                <h3>Subscription Status</h3>
                <div className="fd-subscription-card">
                    <p><strong>Plan:</strong> {finance.subscriptionPlan}</p>
                    <p><strong>Status:</strong> <span className="fd-status-active">{finance.subscriptionStatus}</span></p>
                    <p><strong>Next Billing:</strong> 2026-02-01</p>
                    <button className="fd-btn-secondary">Manage Subscription</button>
                </div>
            </div>
        </div>
    );
};

// ==========================================
// 5. SUPPORT
// ==========================================
const FoodSupport = () => {
    return (
        <div className="fd-card">
            <h2 className="fd-section-title">Support & Tickets</h2>
            <form className="fd-form">
                <div className="fd-form-group">
                    <label>Subject</label>
                    <input type="text" className="fd-input" placeholder="Issue with orders..." />
                </div>
                <div className="fd-form-group">
                    <label>Message</label>
                    <textarea className="fd-textarea" placeholder="Describe your issue..."></textarea>
                </div>
                <button className="fd-btn-primary">Submit Ticket</button>
            </form>
        </div>
    );
};

// ==========================================
// 6. REPORTS & COMPLIANCE
// ==========================================
const FoodReports = ({ reports = [], reportCount = 0, status = "Active" }) => {
    return (
        <div className="fd-card">
            <h2 className="fd-section-title">Reports & Compliance</h2>

            <div className={`fd-report-status-box status-${status}`}>
                <div className="fd-report-metric">
                    <h3>Reports: {reportCount} / 100</h3>
                    <div className="fd-progress-bar">
                        <div className="fd-progress-fill" style={{ width: `${Math.min(reportCount, 100)}%` }}></div>
                    </div>
                </div>
                <div className="fd-status-display">
                    <h3>Status: {status}</h3>
                    {status === "Warning" && <p><FiAlertTriangle /> Your business has received multiple reports.</p>}
                </div>
            </div>

            <h3 className="fd-subsection-title">Recent Reports</h3>
            <table className="fd-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.length > 0 ? reports.map(r => (
                        <tr key={r.id}>
                            <td>{r.date}</td>
                            <td>{r.reason}</td>
                            <td><span className={`fd-badge-status ${r.status.toLowerCase()}`}>{r.status}</span></td>
                            <td><button className="fd-btn-text">View Details</button></td>
                        </tr>
                    )) : <tr><td colSpan="4">No reports found. Good job!</td></tr>}
                </tbody>
            </table>
        </div>
    );
};

export const FoodDashboard = () => {
    /**
     * SUPER ADMIN CONNECTION LOGIC COMMENT:
     * This Dashboard will eventually connect to the Super Admin Dashboard.
     * 
     * Logic to be implemented:
     * 1. Check `user.role` from AuthContext.
     * 2. If `user.role === 'admin'`, fetch global data.
     * 3. Sync `verificationStatus` with Admin's `InspectionModule`.
     * 4. Orders and Complaints will push notifications to Admin Panel.
     * 
     * For now, this component runs in standalone "Provider Mode".
     */

    // Mock logged in user/service ID
    const [serviceId] = useState(1); // Assuming logged in user owns service ID 1
    const [activeTab, setActiveTab] = useState("Orders");
    const [AdminTags, setAdmintags] = useState(false);

    // Load initial data from store
    const initialData = Food_Details.find(s => s.id === serviceId) || Food_Details[0];

    // State for various sections
    const [profileData, setProfileData] = useState(initialData);
    const [menuItems, setMenuItems] = useState(initialData.categorizedMenu?.flatMap(cat => cat.items) || []);
    const [orders, setOrders] = useState([
        { id: 101, customer: "Ali Khan", items: "2x Zinger Burger, 1x Coke", total: 1200, status: "Pending", note: "Extra spicy" },
        { id: 102, customer: "Sara Ahmed", items: "1x Large Pizza", total: 1500, status: "Preparing", note: "" },
        { id: 103, customer: "John Doe", items: "5x Samosa", total: 250, status: "Delivered", note: "" },
        { id: 104, customer: "Kamran Shah", items: "1x Coffee", total: 400, status: "Ready", note: "Sugar free" },
    ]);

    // Profile Handlers
    const handleProfileUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updated = Object.fromEntries(formData.entries());
        setProfileData(prev => ({ ...prev, ...updated }));
        alert("Profile updated successfully!");
    };

    // Menu Handlers
    const handleAddMenuItem = () => {
        const newItem = {
            id: Date.now(),
            name: "New Item",
            desc: "Description here",
            price: "0",
            img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
        };
        setMenuItems([...menuItems, newItem]);
    };

    const handleDeleteMenuItem = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            setMenuItems(menuItems.filter(item => item.id !== id));
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case "Orders": return <FoodOrders orders={orders} setOrders={setOrders} />;
            case "Menu": return <FoodMenu items={menuItems} onAdd={handleAddMenuItem} onDelete={handleDeleteMenuItem} />;
            case "Deals": return <FoodDeals promotions={profileData.promotions} />;
            case "Profile": return <FoodProfile data={profileData} onUpdate={handleProfileUpdate} />;
            case "Analytics": return <ServiceAnalytics orders={orders} />;
            case "Finance": return <FoodFinance finance={profileData.finance} />;
            case "Reviews": return <FoodReviews reviews={profileData.detailedReviews} />;
            case "Support": return <FoodSupport />;
            case "Reports": return <FoodReports reports={profileData.reports} reportCount={profileData.reportCount} status={profileData.reportStatus} />;
            case "Ads": return <FoodAd />;
            case "Membership-details": return <MembershipDetails />;
            default: return <FoodOrders orders={orders} setOrders={setOrders} />;
        }
    };

    return (
        <>
            {profileData.reportStatus === 'Suspended' ? (
                <div className="fd-suspended-screen">
                    <div className="fd-suspended-modal">
                        <FiSlash className="fd-suspended-icon" />
                        <h2>⛔ Account Suspended</h2>
                        <p><strong>Reason:</strong> High number of verified complaints</p>
                        <p>Your business access has been temporarily revoked due to policy violations.</p>
                        <button className="fd-btn-primary">Contact DSCH Support</button>
                    </div>
                </div>
            ) : (
                <div className="fd-dashboard-wrapper">
                    <header className="fd-main-header">
                        <nav className="fd-navbar">
                            <div className="fd-nav-container" style={{ padding: "10px 2px" }}>
                                {/* LOGO */}
                                <div className="fd-nav-logo">
                                    <img src={brandLogo} alt="Logo" className="logo-img fd-dshbrdlogo" />
                                    <h2>DIGITAL SMART CITIES HUB</h2>
                                </div>

                                <div className="fd-Admin-Icon-TagsCont">
                                    <span className="fd-usrIcon fd-adminIcon" onClick={() => setAdmintags(!AdminTags)}>
                                        <FaUser />
                                    </span>
                                    <ul className={AdminTags ? "fd-tags-cont fd-flexDsply fd-Admin-Tags" : "fd-tags-cont fd-Admin-Tags"}>
                                        <li>Dashboard</li>
                                        <li>Notifications</li>
                                        <li className="fd-DshbrdlogOut-tag">log Out</li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </header>

                    <main className="fd-layout">
                        {/* Sidebar */}
                        <aside className="fd-sidebar">
                            <ul>
                                <li onClick={() => setActiveTab("Orders")} className={activeTab === "Orders" ? "active" : ""}><FiShoppingBag className="fd-DshbrdSidbrIcn" /> <p className="fd-DshbrdtagName">Orders</p></li>
                                <li onClick={() => setActiveTab("Menu")} className={activeTab === "Menu" ? "active" : ""}><FiMenu className="fd-DshbrdSidbrIcn" /> <p className="fd-DshbrdtagName">Menu</p></li>
                                <li onClick={() => setActiveTab("Deals")} className={activeTab === "Deals" ? "active" : ""}><FiDollarSign className="fd-DshbrdSidbrIcn" /> <p className="fd-DshbrdtagName">Deals</p></li>
                                <li onClick={() => setActiveTab("Analytics")} className={activeTab === "Analytics" ? "active" : ""}><FiActivity className="fd-DshbrdSidbrIcn" /> <p className="fd-DshbrdtagName">Analytics</p></li>
                                <li onClick={() => setActiveTab("Finance")} className={activeTab === "Finance" ? "active" : ""}><FiDollarSign className="fd-DshbrdSidbrIcn" /> <p className="fd-DshbrdtagName">Finance</p></li>
                                <li onClick={() => setActiveTab("Reviews")} className={activeTab === "Reviews" ? "active" : ""}><FiMessageSquare className="fd-DshbrdSidbrIcn" /> <p className="fd-DshbrdtagName">Reviews</p></li>
                                <li onClick={() => setActiveTab("Profile")} className={activeTab === "Profile" ? "active" : ""}><FiUser className="fd-DshbrdSidbrIcn" /> <p className="fd-DshbrdtagName">Profile</p></li>
                                <li onClick={() => setActiveTab("Reports")} className={activeTab === "Reports" ? "active" : ""}><FiFileText className="fd-DshbrdSidbrIcn" /> <p className="fd-DshbrdtagName">Reports</p></li>
                                <li onClick={() => setActiveTab("Support")} className={activeTab === "Support" ? "active" : ""}><FiHelpCircle className="fd-DshbrdSidbrIcn" /> <p className="fd-DshbrdtagName">Support</p></li>
                            </ul>
                        </aside>

                        {/* Main Content */}
                        <section className="fd-content">

                            <div className="fd-stepper">
                                <div className={(activeTab === "Orders") ? "fd-step active" : "fd-step"}>
                                    <span className="fd-circle">1</span>
                                    <p>Orders</p>
                                </div>
                                <div className="fd-line"></div>
                                <div className={(activeTab === "Menu") ? "fd-step active" : "fd-step"}>
                                    <span className="fd-circle">2</span>
                                    <p>Menu</p>
                                </div>
                                <div className="fd-line"></div>
                                <div className={(activeTab === "Profile") ? "fd-step active" : "fd-step"}>
                                    <span className="fd-circle">3</span>
                                    <p>Profile</p>
                                </div>

                            </div>

                            {profileData.reportStatus === 'Warning' && (
                                <div className="fd-warning-banner">
                                    <FiAlertTriangle className="fd-warning-icon" />
                                    <div>
                                        <h4>Warning: High Report Volume</h4>
                                        <p>Your business has received multiple user reports. Please resolve issues to avoid suspension.</p>
                                    </div>
                                </div>
                            )}

                            {renderContent()}
                        </section>
                    </main>
                </div>
            )}
        </>
    );
};
