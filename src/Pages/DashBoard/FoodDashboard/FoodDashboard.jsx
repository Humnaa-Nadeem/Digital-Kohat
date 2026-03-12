import React, { useState, useEffect } from "react";
import { GetTheDashboardDta, UpdateFoodMenuApi, UpdateFoodProfileApi, UpdateReviewReplyApi, LogoutApi, SubmitSupportTicketApi } from "../../../ApiCalls/DashBoardApiCalls";
import { GetOrdersApi, UpdateOrderStatusApi } from "../../../ApiCalls/ApiCalls";
import { toast } from "react-toastify";
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
    FiFileText,
    FiClock,
    FiInfo
} from "react-icons/fi";
import { FaUser, FaPlus, FaTrash, FaEdit, FaCheck, FaTimes, FaClock, FaPrint, FaReply, FaStar } from "react-icons/fa";
import { Food_Details } from "../../../Store/Food_store";

// Reusable Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fd-modal-overlay" onClick={onClose}>
            <div className="fd-modal-content" onClick={e => e.stopPropagation()}>
                <div className="fd-modal-header">
                    <h3>{title}</h3>
                    <button className="fd-btn-close" onClick={onClose}>×</button>
                </div>
                <div className="fd-modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

const FoodProfile = ({ data, onUpdate }) => {
    return (
        <div className="fd-card">
            <h2 className="fd-section-title">Service Profile</h2>
            <p className="fd-section-subtitle">Manage your restaurant's public information</p>

            <form className="fd-profile-form" onSubmit={onUpdate}>
                {/* Basic Info */}
                <div className="fd-form-group">
                    <label>Restaurant Name</label>
                    <input type="text" className="fd-input" name="name" defaultValue={data.ServiceName || data.name} disabled />
                </div>

                <div className="fd-form-group">
                    <label>Tagline</label>
                    <input type="text" className="fd-input" name="tagline" defaultValue={data.tagline} />
                </div>

                <div className="fd-form-group">
                    <label>Restaurant Type</label>
                    <select className="fd-input" name="type" defaultValue={data.Type || data.type}>
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
                    <input type="text" className="fd-input" name="timing" defaultValue={data.timings?.opening || data.quickInfo?.timings?.timing} />
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
                    <label>Offer Table Reservation?</label>
                    <select className="fd-input" name="offersReservation" defaultValue={data.offersReservation ? "Yes" : "No"}>
                        <option value="Yes">Yes, we offer table bookings</option>
                        <option value="No">No, walk-in only</option>
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
    const [filter, setFilter] = useState("Daily");

    const getFilteredOrders = () => {
        const now = new Date();
        return orders.filter(order => {
            const orderDate = new Date(order.timestamp || now);
            const diffTime = Math.abs(now - orderDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (filter === "Daily") return diffDays <= 1;
            if (filter === "Weekly") return diffDays <= 7;
            if (filter === "Monthly") return diffDays <= 30;
            if (filter === "Yearly") return diffDays <= 365;
            return true;
        });
    };

    const filtered = getFilteredOrders();
    const totalOrders = filtered.length;
    const completedOrders = filtered.filter(o => o.status === "Delivered" || o.status === "Approved").length;
    const revenue = filtered.filter(o => o.status === "Delivered" || o.status === "Approved").reduce((acc, curr) => acc + curr.total, 0);
    const pending = filtered.filter(o => o.status === "Pending").length;

    const stats = [
        { label: "Total Orders", value: totalOrders, icon: <FiShoppingBag /> },
        { label: "Completed", value: completedOrders, icon: <FaCheck /> },
        { label: "Revenue", value: `Rs. ${revenue}`, icon: <FiDollarSign /> },
        { label: "Pending", value: pending, icon: <FaClock /> }
    ];

    return (
        <div className="fd-card fd-analytics-v2">
            <div className="fd-section-header-flex">
                <div className="fd-title-group">
                    <h2 className="fd-section-title">Performance Insights</h2>
                    <p className="fd-section-subtitle">Real-time data for your {filter.toLowerCase()} performance</p>
                </div>
                <div className="fd-filter-btns">
                    {["Daily", "Weekly", "Monthly", "Yearly"].map(f => (
                        <button
                            key={f}
                            className={`fd-filter-btn ${filter === f ? "active" : ""}`}
                            onClick={() => setFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>
            <div className="fd-analytics-grid">
                {stats.map((s, i) => (
                    <div key={i} className="fd-analytics-item">
                        <div className="fd-stat-icon">{s.icon}</div>
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
const FoodMenu = ({ items, onAdd, onDelete, onEdit }) => {
    return (
        <div className="fd-card">
            <h2 className="fd-section-title">Menu Management</h2>
            <div className="fd-menu-actions">
                <button className="fd-btn-primary" onClick={onAdd}><FaPlus /> Add New Item</button>
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
                        </div>
                        <div className="fd-menu-btns">
                            <button className="fd-btn-edit" onClick={() => onEdit(item)}><FaEdit /> Edit</button>
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

    // Filter orders and reservations based on active sub-tab
    const filteredOrders = orders.filter(o => {
        if (subTab === "Reservations") return o.type === "Reservation";

        // Filter regular orders
        if (o.type === "Reservation") return false;
        if (subTab === "New") return o.status === "Pending";
        if (subTab === "Preparing") return o.status === "Preparing";
        if (subTab === "Ready") return o.status === "Ready";
        if (subTab === "Delivered") return o.status === "Delivered";
        if (subTab === "Cancelled") return o.status === "Cancelled" || o.status === "Rejected";
        return true;
    });

    const updateStatus = (id, newStatus) => {
        UpdateOrderStatusApi(id, newStatus).then(res => {
            if (res.data.success) {
                setOrders(orders.map(o => (o._id === id || o.id === id) ? { ...o, status: newStatus } : o));
                toast.success(`Order status updated to ${newStatus}`);
            }
        });
    };

    return (
        <div className="fd-orders-container">
            <h2 className="fd-section-title">Orders Center</h2>

            {/* Order Status Tabs */}
            <div className="fd-tabs-secondary">
                {["New", "Preparing", "Ready", "Delivered", "Cancelled", "Reservations"].map(tab => (
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
                    <div key={order._id || order.id} className={`fd-order-card ${order.type === "Reservation" ? "reservation-card" : ""}`}>
                        <div className="fd-order-header">
                            <h4>{order.type === "Reservation" ? `Reservation` : `Order`} #{order.orderID || (order._id ? order._id.slice(-6) : order.id)}</h4>
                            <span className="fd-time-stamp">{order.timestamp || new Date(order.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="fd-order-body">
                            {order.type === "Reservation" ? (
                                <>
                                    <p><strong>Customer:</strong> {order.customerName}</p>
                                    <p><strong>Date/Time:</strong> {order.date} at {order.time}</p>
                                    <p><strong>Guests:</strong> {order.guests}</p>
                                    <p><strong>Contact:</strong> {order.contact}</p>
                                    {order.specialRequest && <p className="fd-note">Request: {order.specialRequest}</p>}
                                    <p className="fd-status-badge">Status: {order.status}</p>
                                </>
                            ) : (
                                <>
                                    <p><strong>Customer:</strong> {order.userDetails?.name || order.customer}</p>
                                    <p><strong>Items:</strong> {Array.isArray(order.items) ? order.items.map(i => `${i.qty}x ${i.name}`).join(", ") : order.items}</p>
                                    <p className="fd-total-price">Total: Rs. {order.total}</p>
                                    {order.specialInstructions && <p className="fd-note">Note: {order.specialInstructions}</p>}
                                </>
                            )}
                        </div>

                        <div className="fd-order-actions">
                            {order.type !== "Reservation" && subTab === "New" && (
                                <>
                                    <button className="fd-btn-approve" onClick={() => updateStatus(order._id || order.id, "Preparing")}><FaCheck /> Accept</button>
                                    <button className="fd-btn-reject" onClick={() => updateStatus(order._id || order.id, "Rejected")}><FaTimes /> Reject</button>
                                </>
                            )}
                            {subTab === "Preparing" && (
                                <button className="fd-btn-primary" onClick={() => updateStatus(order._id || order.id, "Ready")}><FaClock /> Mark Ready</button>
                            )}
                            {subTab === "Ready" && (
                                <button className="fd-btn-success" onClick={() => updateStatus(order._id || order.id, "Delivered")}><FaCheck /> Mark Delivered</button>
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
const FoodDeals = ({ promotions = [], onAdd, onDelete }) => {
    return (
        <div className="fd-card">
            <h2 className="fd-section-title">Deals & Promotions</h2>
            <div className="fd-menu-actions">
                <button className="fd-btn-primary" onClick={onAdd}><FaPlus /> Create New Promo</button>
            </div>

            <table className="fd-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Code</th>
                        <th>Discount</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Actions</th>
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
                            <td>
                                <button className="fd-btn-text-danger" onClick={() => onDelete(p.id)}><FaTrash /> Remove</button>
                            </td>
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
const FoodReviews = ({ reviews = [], onReply }) => {
    const [replyText, setReplyText] = useState("");
    const [activeReplyId, setActiveReplyId] = useState(null);

    const submitReply = (id) => {
        if (!replyText.trim()) return;
        onReply(id, replyText);
        setReplyText("");
        setActiveReplyId(null);
    };

    return (
        <div className="fd-card">
            <div className="fd-section-header-flex">
                <div className="fd-title-group">
                    <h2 className="fd-section-title">Reviews & Reputation</h2>
                    <p className="fd-section-subtitle">Manage customer feedback and build your brand</p>
                </div>
            </div>
            <div className="fd-reviews-list">
                {reviews.length === 0 ? (
                    <div className="fd-empty-state">No reviews yet. Your customers' feedback will appear here.</div>
                ) : (
                    reviews.map((r, i) => {
                        const isDetailed = typeof r === 'object';
                        const name = isDetailed ? (r.name || "Verified Customer") : "Verified Customer";
                        const comment = isDetailed ? r.comment : r;
                        const rating = isDetailed ? (Number(r.rating) || 5) : 5;
                        const date = isDetailed ? (r.date || r.timestamp || "Just now") : "Static Review";

                        return (
                            <div key={i} className="fd-review-card">
                                <div className="fd-review-header">
                                    <div className="fd-review-user">
                                        <h4>{name}</h4>
                                        <div className="fd-review-stars">
                                            {[...Array(5)].map((_, idx) => (
                                                <FaStar key={idx} color={idx < rating ? "#fdcb6e" : "#dfe6e9"} />
                                            ))}
                                        </div>
                                    </div>
                                    <span className="fd-review-date">{new Date(date).toLocaleDateString()}</span>
                                </div>
                                <p className="fd-review-body">"{comment}"</p>

                                {isDetailed && r.response ? (
                                    <div className="fd-reply-section">
                                        <h5>Your Response:</h5>
                                        <p>{r.response}</p>
                                    </div>
                                ) : (
                                    <div className="fd-reply-box">
                                        {activeReplyId === (r.id || r._id) ? (
                                            <div className="fd-reply-input-cont">
                                                <textarea
                                                    placeholder="Write your response..."
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                    className="fd-textarea"
                                                />
                                                <div className="fd-menu-btns" style={{ marginTop: '10px' }}>
                                                    <button className="fd-btn-primary" onClick={() => submitReply(r.id || r._id)}>Send Reply</button>
                                                    <button className="fd-btn-outline" onClick={() => setActiveReplyId(null)}>Cancel</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button className="fd-btn-edit" onClick={() => setActiveReplyId(r.id || r._id)}>
                                                <FaReply /> Reply to Review
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

// ==========================================
// 4. FINANCE & SUBSCRIPTION
// ==========================================
const FoodFinance = ({ finance = {}, orders = [] }) => {
    const totalRevenue = orders.filter(o => o.status === "Delivered" || o.status === "Approved").reduce((acc, curr) => acc + curr.total, 0);
    const activeBalance = finance?.balance || totalRevenue;

    return (
        <div className="fd-card">
            <div className="fd-section-header-flex">
                <div className="fd-title-group">
                    <h2 className="fd-section-title">Finance & Wallet</h2>
                    <p className="fd-section-subtitle">Monitor your earnings and subscription status</p>
                </div>
            </div>

            <div className="fd-analytics-grid">
                <div className="fd-analytics-item">
                    <div className="fd-stat-icon" style={{ background: '#e8f5e9', color: '#2e7d32' }}><FiDollarSign /></div>
                    <span className="fd-analytics-value">Rs. {activeBalance}</span>
                    <span className="fd-analytics-label">Total Earnings</span>
                </div>
                <div className="fd-analytics-item">
                    <div className="fd-stat-icon" style={{ background: '#fff3cd', color: '#856404' }}><FiClock /></div>
                    <span className="fd-analytics-value">Rs. {finance?.pendingPayout || 0}</span>
                    <span className="fd-analytics-label">Pending Payout</span>
                </div>
            </div>

            <div className="fd-subsection" style={{ marginTop: '30px' }}>
                <h3 className="fd-subsection-title">Recent Transactions</h3>
                <table className="fd-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.filter(o => o.status === "Delivered").slice(0, 5).map(o => (
                            <tr key={o._id || o.id}>
                                <td>#{o.orderID || (o._id ? o._id.slice(-6) : o.id)}</td>
                                <td>{new Date(o.timestamp).toLocaleDateString()}</td>
                                <td>Rs. {o.total}</td>
                                <td><span className="fd-status-pill delivered">Paid</span></td>
                            </tr>
                        ))}
                        {orders.filter(o => o.status === "Delivered").length === 0 && (
                            <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No payment history yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="fd-subsection" style={{ marginTop: '30px' }}>
                <h3 className="fd-subsection-title">Subscription Status</h3>
                <div className="fd-subscription-card" style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ margin: '0 0 5px 0' }}><strong>Plan:</strong> {finance?.subscriptionPlan || "Standard (Free)"}</p>
                            <p style={{ margin: '0' }}><strong>Status:</strong> <span className="fd-status-active" style={{ color: '#2e7d32', fontWeight: 600 }}>{finance?.subscriptionStatus || "Active"}</span></p>
                        </div>
                        <button className="fd-btn-edit">Upgrade Plan</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ==========================================
// 5. SUPPORT
// ==========================================
const FoodSupport = ({ tickets = [], onSubmit }) => {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!subject || !message) return toast.error("Please fill all fields");
        onSubmit({ subject, message });
        setSubject("");
        setMessage("");
    };

    return (
        <div className="fd-card">
            <h2 className="fd-section-title">Support & Tickets</h2>
            <form className="fd-form" onSubmit={handleSubmit}>
                <div className="fd-form-group">
                    <label>Subject</label>
                    <input
                        type="text"
                        className="fd-input"
                        placeholder="Issue with orders..."
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div className="fd-form-group">
                    <label>Message</label>
                    <textarea
                        className="fd-textarea"
                        placeholder="Describe your issue..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </div>
                <button className="fd-btn-primary">Submit Ticket</button>
            </form>

            {tickets.length > 0 && (
                <div className="fd-subsection" style={{ marginTop: '20px' }}>
                    <h3>Your Tickets</h3>
                    <div className="fd-tickets-list">
                        {tickets.map((t, idx) => (
                            <div key={idx} className="fd-ticket-item">
                                <div className="fd-ticket-header">
                                    <strong>{t.subject}</strong>
                                    <span className={`fd-status-badge status-${t.status.toLowerCase()}`}>{t.status}</span>
                                </div>
                                <p>{t.message}</p>
                                <span className="fd-time-stamp">{new Date(t.timestamp).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// ==========================================
// 7. CUSTOMER ORDER TRACKING (My Purchases)
// ==========================================
const CustomerOrderTracking = ({ orders, currentUserName }) => {
    const myOrders = orders.filter(o => o.customer === currentUserName);

    const getProgressWidth = (status) => {
        switch (status) {
            case "Pending": return "25%";
            case "Preparing": return "50%";
            case "Ready": return "75%";
            case "Delivered": return "100%";
            default: return "0%";
        }
    };

    return (
        <div className="fd-card">
            <h2 className="fd-section-title">My Purchases & Tracking</h2>
            <p className="fd-section-subtitle">Follow your orders from kitchen to doorstep</p>

            <div className="fd-tracking-list">
                {myOrders.length > 0 ? myOrders.map(order => (
                    <div key={order.id} className="fd-tracking-item">
                        <div className="fd-track-info">
                            <div className="fd-track-main">
                                <h3>Order #{order.id}</h3>
                                <p>{order.items}</p>
                                <span className="fd-track-date">Today, 12:45 PM</span>
                            </div>
                            <div className="fd-track-status-badge">
                                <span className={`fd-status-pill ${order.status.toLowerCase()}`}>{order.status}</span>
                                <span className="fd-track-amount">Rs. {order.total}</span>
                            </div>
                        </div>

                        <div className="fd-progress-container">
                            <div className="fd-progress-bar-bg">
                                <div className="fd-progress-fill" style={{ width: getProgressWidth(order.status) }}></div>
                            </div>
                            <div className="fd-progress-labels">
                                <span className={order.status === "Pending" ? "active" : ""}>Pending</span>
                                <span className={order.status === "Preparing" ? "active" : ""}>Preparing</span>
                                <span className={order.status === "Ready" ? "active" : ""}>Ready</span>
                                <span className={order.status === "Delivered" ? "active" : ""}>Delivered</span>
                            </div>
                        </div>

                        <div className="fd-track-actions">
                            <button className="fd-btn-outline"><FiMessageSquare /> Contact Support</button>
                            <button className="fd-btn-outline"><FiStar /> Rate Order</button>
                            {order.status === "Delivered" && <button className="fd-btn-primary">Order Again</button>}
                        </div>
                    </div>
                )) : (
                    <div className="fd-empty-state">
                        <FiShoppingBag size={48} />
                        <p>No orders found. Time to eat something delicious!</p>
                        <button className="fd-btn-primary">Explore Menu</button>
                    </div>
                )}
            </div>
        </div>
    );
};

// ==========================================
// 6. REPORTS & COMPLIANCE
// ==========================================
const FoodReports = ({ reports = [], reportCount = 0, status = "Active" }) => {
    return (
        <div className="fd-card">
            <div className="fd-section-header-flex">
                <div className="fd-title-group">
                    <h2 className="fd-section-title">Reports & Compliance</h2>
                    <p className="fd-section-subtitle">Monitor user reports and ensure service quality</p>
                </div>
            </div>

            <div className={`fd-report-status-box status-${status.toLowerCase()}`} style={{
                background: status === "Suspended" ? "#fff5f5" : (status === "Warning" ? "#fff9db" : "#f8fbfa"),
                padding: '25px',
                borderRadius: '15px',
                border: `1px solid ${status === "Suspended" ? "#feb2b2" : (status === "Warning" ? "#ffe066" : "#e6fffa")}`,
                marginBottom: '30px'
            }}>
                <div className="fd-report-metric" style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <h3 style={{ margin: 0 }}>Progress to Suspension</h3>
                        <strong>{reportCount} / 100 Reports</strong>
                    </div>
                    <div className="fd-progress-bar-bg" style={{ height: '12px', background: '#eee', borderRadius: '10px', overflow: 'hidden' }}>
                        <div className="fd-progress-fill" style={{
                            width: `${Math.min(reportCount, 100)}%`,
                            height: '100%',
                            background: reportCount > 70 ? '#e74c3c' : (reportCount > 40 ? '#f1c40f' : '#2ecc71'),
                            transition: '0.5s'
                        }}></div>
                    </div>
                </div>
                <div className="fd-status-display" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: status === "Suspended" ? "#e74c3c" : (status === "Warning" ? "#f1c40f" : "#2ecc71"),
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                    }}>
                        {status === "Suspended" ? <FiAlertTriangle /> : (status === "Warning" ? <FiInfo /> : <FaCheck />)}
                    </div>
                    <div>
                        <h3 style={{ margin: '0 0 5px 0' }}>Current Status: {status}</h3>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                            {status === "Suspended" ? "Your service is currently hidden from public." :
                                status === "Warning" ? "Action required: Improve your service to avoid suspension." :
                                    "Your service is in good standing. Keep it up!"}
                        </p>
                    </div>
                </div>
            </div>

            <h3 className="fd-subsection-title">Recent Reports History</h3>
            <table className="fd-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Reason</th>
                        <th>Reporter</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.length > 0 ? reports.map((r, i) => (
                        <tr key={i}>
                            <td>{r.timestamp ? new Date(r.timestamp).toLocaleDateString() : (r.date || "N/A")}</td>
                            <td><strong>{r.reason}</strong><br /><small style={{ color: '#888' }}>{r.details}</small></td>
                            <td>{r.reporterName || "Anonymous"}</td>
                            <td><span className={`fd-status-badge status-${(r.status || "Pending").toLowerCase()}`}>{r.status || "Pending"}</span></td>
                        </tr>
                    )) : <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No reports found. Good job!</td></tr>}
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

    // State for various sections
    const [serviceId, setServiceId] = useState(null);
    const [activeTab, setActiveTab] = useState("Orders");
    const [AdminTags, setAdmintags] = useState(false);
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [orders, setOrders] = useState([]);

    // Modal states
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
    const [editingMenuItem, setEditingMenuItem] = useState(null);
    const [menuForm, setMenuForm] = useState({ name: '', price: '', desc: '' });
    const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
    const [promoForm, setPromoForm] = useState({ title: '', code: '' });

    const handleLogout = () => {
        LogoutApi();
    };

    useEffect(() => {
        GetTheDashboardDta((data) => {
            setProfileData(data);
            setServiceId(data._id);
            setMenuItems(data.categorizedMenu?.flatMap(cat => cat.items) || data.menu || []);
        }, setLoading, () => { });
    }, []);

    useEffect(() => {
        if (serviceId) {
            GetOrdersApi(serviceId).then(res => {
                if (res.data.success) {
                    setOrders(res.data.orders);
                }
            });
        }
    }, [serviceId]);

    if (loading) return <div className="fd-loading">Loading Dashboard...</div>;

    // Profile Handlers
    const handleProfileUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // Manual check for files if any
        const fileInput = e.target.querySelector('input[type="file"]');
        if (fileInput && fileInput.files[0]) {
            formData.set("aboutImage", fileInput.files[0]);
        }

        UpdateFoodProfileApi(formData, setProfileData);
    };

    // Menu Handlers (Modals)

    const openAddMenu = () => {
        setEditingMenuItem(null);
        setMenuForm({ name: '', price: '', desc: '' });
        setIsMenuModalOpen(true);
    };

    const openEditMenu = (item) => {
        setEditingMenuItem(item);
        setMenuForm({ name: item.name, price: item.price, desc: item.desc });
        setIsMenuModalOpen(true);
    };

    const handleSaveMenu = (e) => {
        e.preventDefault();
        let updatedMenuItems;
        if (editingMenuItem) {
            updatedMenuItems = menuItems.map(m => m.id === editingMenuItem.id ? { ...m, ...menuForm } : m);
        } else {
            const newItem = {
                id: Date.now(),
                ...menuForm,
                img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
                isAvailable: true
            };
            updatedMenuItems = [...menuItems, newItem];
        }

        UpdateFoodMenuApi(updatedMenuItems, setMenuItems);
        setIsMenuModalOpen(false);
    };

    const handleDeleteMenuItem = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            const updatedMenuItems = menuItems.filter(item => item.id !== id);
            UpdateFoodMenuApi(updatedMenuItems, setMenuItems);
        }
    };

    // Deals Handlers (Modals)

    const openAddPromo = () => {
        setPromoForm({ title: '', code: '' });
        setIsPromoModalOpen(true);
    };

    const handleSavePromo = (e) => {
        e.preventDefault();
        const newDeal = { id: Date.now(), ...promoForm, value: "10%", type: "discount", status: "active", usage: 0 };
        setProfileData({ ...profileData, promotions: [...(profileData.promotions || []), newDeal] });
        setIsPromoModalOpen(false);
    };

    const handleDeleteDeal = (id) => {
        setProfileData({ ...profileData, promotions: profileData.promotions.filter(p => p.id !== id) });
    };

    const handleReviewReply = (id, response) => {
        const newData = { ...profileData };
        let found = false;

        if (newData.detailedReviews) {
            newData.detailedReviews = newData.detailedReviews.map(r => {
                if (r.id === id || r._id === id) {
                    found = true;
                    return { ...r, response };
                }
                return r;
            });
        }

        if (newData.ratingData) {
            newData.ratingData = newData.ratingData.map(r => {
                if (r.id === id || r._id === id) {
                    found = true;
                    return { ...r, response };
                }
                return r;
            });
        }

        setProfileData(newData);
        UpdateReviewReplyApi(id, response);
    };

    const renderContent = () => {
        switch (activeTab) {
            case "Orders": return <FoodOrders orders={orders} setOrders={setOrders} />;
            case "Menu": return <FoodMenu items={menuItems} onAdd={openAddMenu} onDelete={handleDeleteMenuItem} onEdit={openEditMenu} />;
            case "Deals": return <FoodDeals promotions={profileData.promotions} onAdd={openAddPromo} onDelete={handleDeleteDeal} />;
            case "Profile": return <FoodProfile data={profileData} onUpdate={handleProfileUpdate} />;
            case "Analytics": return <ServiceAnalytics orders={orders} />;
            case "Finance": return <FoodFinance finance={profileData.finance} orders={orders} />;
            case "Reviews": return <FoodReviews reviews={[...(profileData.ratingData || []), ...(profileData.detailedReviews || [])]} onReply={handleReviewReply} />;
            case "Support": return <FoodSupport tickets={profileData.supportTickets} onSubmit={(data) => {
                SubmitSupportTicketApi(data, (newTicket) => {
                    setProfileData({ ...profileData, supportTickets: [newTicket, ...(profileData.supportTickets || [])] });
                });
            }} />;
            case "Reports": return <FoodReports reports={profileData.reports} reportCount={profileData.reportCount} status={profileData.reportStatus} />;
            case "MyPurchases": return <CustomerOrderTracking orders={orders} currentUserName="Ali Khan" />;
            case "Ads": return <FoodAd />;
            case "Membership-details": return <MembershipDetails />;
            default: return <FoodOrders orders={orders} setOrders={setOrders} />;
        }
    };

    return (
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
                                <li>Notifications</li>
                                <li className="fd-DshbrdlogOut-tag" onClick={handleLogout}>log Out</li>
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
                        <li onClick={() => setActiveTab("MyPurchases")} className={activeTab === "MyPurchases" ? "active" : ""}><FiShoppingBag className="fd-DshbrdSidbrIcn" /> <p className="fd-DshbrdtagName">My Purchases</p></li>
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

            {/* Menu Modal */}
            <Modal isOpen={isMenuModalOpen} onClose={() => setIsMenuModalOpen(false)} title={editingMenuItem ? "Edit Menu Item" : "Add Menu Item"}>
                <form className="fd-profile-form" onSubmit={handleSaveMenu}>
                    <div className="fd-form-group">
                        <label>Item Name</label>
                        <input
                            type="text"
                            className="fd-input"
                            value={menuForm.name}
                            onChange={e => setMenuForm({ ...menuForm, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="fd-form-group">
                        <label>Price (Rs.)</label>
                        <input
                            type="number"
                            className="fd-input"
                            value={menuForm.price}
                            onChange={e => setMenuForm({ ...menuForm, price: e.target.value })}
                            required
                        />
                    </div>
                    <div className="fd-form-group">
                        <label>Description</label>
                        <textarea
                            className="fd-textarea"
                            value={menuForm.desc}
                            onChange={e => setMenuForm({ ...menuForm, desc: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="fd-btn-primary">Save Item</button>
                </form>
            </Modal>

            {/* Promo Modal */}
            <Modal isOpen={isPromoModalOpen} onClose={() => setIsPromoModalOpen(false)} title="Create New Promotion">
                <form className="fd-profile-form" onSubmit={handleSavePromo}>
                    <div className="fd-form-group">
                        <label>Promotion Title</label>
                        <input
                            type="text"
                            className="fd-input"
                            value={promoForm.title}
                            onChange={e => setPromoForm({ ...promoForm, title: e.target.value })}
                            placeholder="e.g. Summer Discount"
                            required
                        />
                    </div>
                    <div className="fd-form-group">
                        <label>Promo Code</label>
                        <input
                            type="text"
                            className="fd-input"
                            value={promoForm.code}
                            onChange={e => setPromoForm({ ...promoForm, code: e.target.value })}
                            placeholder="e.g. SUMMER10"
                            required
                        />
                    </div>
                    <button type="submit" className="fd-btn-primary">Create Promo</button>
                </form>
            </Modal>
        </div>
    );
};
