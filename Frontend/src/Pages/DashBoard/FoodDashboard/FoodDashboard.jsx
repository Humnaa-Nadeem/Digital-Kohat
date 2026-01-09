
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
    FiBell
} from "react-icons/fi";
import { FaUser, FaPlus, FaTrash, FaEdit } from "react-icons/fa";
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
            </div>

            <div className="fd-menu-list">
                {items.length > 0 ? items.map((item) => (
                    <div className="fd-menu-item" key={item.id}>
                        <img src={item.img} alt={item.name} className="fd-menu-img" />
                        <div className="fd-menu-details">
                            <h4>{item.name}</h4>
                            <p>{item.desc}</p>
                            <span className="fd-price-tag">Rs. {item.price}</span>
                            <div className="fd-tags">
                                {item.tags?.map((tag, idx) => <span key={idx} className="fd-tag">{tag}</span>)}
                            </div>
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
const FoodOrders = ({ orders, setOrders }) => {
    const handleApprove = (id) => {
        setOrders(orders.map(order => order.id === id ? { ...order, status: "Approved" } : order));
    };

    const handleReject = (id) => {
        setOrders(orders.map(order => order.id === id ? { ...order, status: "Rejected" } : order));
    };

    return (
        <div className="fd-orders-container">
            <h2 className="fd-section-title">Incoming Orders</h2>
            <div className="fd-orders-list">
                {orders.map((order) => (
                    <div key={order.id} className="fd-order-card">
                        <div className="fd-order-info">
                            <h4>Order #{order.id} - {order.customer}</h4>
                            <p className="fd-order-details">{order.items}</p>
                            <span className="fd-price-tag">Rs. {order.total}</span>
                        </div>
                        <div className="fd-order-status">
                            <span className={`fd-status-badge fd-status-${order.status.toLowerCase()}`}>
                                {order.status}
                            </span>
                        </div>
                        {order.status === "Pending" && (
                            <div className="fd-action-btns">
                                <button className="fd-btn-approve" onClick={() => handleApprove(order.id)}>Approve</button>
                                <button className="fd-btn-reject" onClick={() => handleReject(order.id)}>Reject</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export const FoodDashboard = () => {
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
        { id: 101, customer: "Ali Khan", items: "2x Zinger Burger, 1x Coke", total: 1200, status: "Pending" },
        { id: 102, customer: "Sara Ahmed", items: "1x Large Pizza", total: 1500, status: "Pending" },
        { id: 103, customer: "John Doe", items: "5x Samosa", total: 250, status: "Approved" },
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
            case "Profile": return <FoodProfile data={profileData} onUpdate={handleProfileUpdate} />;
            case "Menu": return <FoodMenu items={menuItems} onAdd={handleAddMenuItem} onDelete={handleDeleteMenuItem} />;
            case "Analytics": return <ServiceAnalytics orders={orders} />;
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
                        <li onClick={() => setActiveTab("Orders")}><FiShoppingBag className="fd-DshbrdSidbrIcn" /> <p className="fd-DshbrdtagName">Orders</p></li>
                        <li onClick={() => setActiveTab("Menu")}><FiMenu className="fd-DshbrdSidbrIcn" /> <p className="fd-DshbrdtagName">Menu</p></li>
                        <li onClick={() => setActiveTab("Profile")}><FiUser className="fd-DshbrdSidbrIcn" /> <p className="fd-DshbrdtagName">Profile</p></li>
                        <li onClick={() => setActiveTab("Analytics")}><FiActivity className="fd-DshbrdSidbrIcn" /> <p className="fd-DshbrdtagName">Analytics</p></li>
                        <li onClick={() => setActiveTab("Ads")}><FiBell className="fd-DshbrdSidbrIcn" /> <p className="fd-DshbrdtagName">Ads</p></li>
                        <li onClick={() => setActiveTab("Settings")}><FiSettings className="fd-DshbrdSidbrIcn" /> <p className="fd-DshbrdtagName">Settings</p></li>
                        <li onClick={() => setActiveTab("Membership-details")}><FiUser className="fd-DshbrdSidbrIcn" /> <p className="fd-DshbrdtagName">Membership-details</p></li>
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

                    {renderContent()}
                </section>
            </main>
        </div>
    );
};
