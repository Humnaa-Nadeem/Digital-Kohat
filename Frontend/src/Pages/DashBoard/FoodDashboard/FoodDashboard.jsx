
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
import { FaUser } from "react-icons/fa";

const FoodProfile = () => {
    return (
        <div className="fd-card">
            <h2 className="fd-section-title">Service Profile</h2>
            <p className="fd-section-subtitle">Manage your restaurant's public information</p>

            <form className="fd-profile-form">
                {/* Basic Info */}
                <div className="fd-form-group">
                    <label>Restaurant Name</label>
                    <input type="text" className="fd-input" defaultValue="Tasty Bites" placeholder="Enter Restaurant Name" />
                </div>

                <div className="fd-form-group">
                    <label>Tagline</label>
                    <input type="text" className="fd-input" defaultValue="The Taste of Joy" placeholder="e.g. Experience the Best..." />
                </div>

                <div className="fd-form-group">
                    <label>Restaurant Type</label>
                    <select className="fd-input">
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
                    <textarea className="fd-textarea" defaultValue="The best food in town, serving fresh local and international cuisine." placeholder="Describe your service..."></textarea>
                </div>

                {/* Location & Contact */}
                <div className="fd-form-group">
                    <label>Location</label>
                    <input type="text" className="fd-input" defaultValue="KDA Sector 9, Kohat" placeholder="Full Address" />
                </div>

                <div className="fd-form-group">
                    <label>Contact Phone</label>
                    <input type="tel" className="fd-input" defaultValue="+92 300 1234567" placeholder="+92 300 1234567" />
                </div>

                <div className="fd-form-group">
                    <label>Contact Email</label>
                    <input type="email" className="fd-input" defaultValue="info@tastybites.com" placeholder="email@example.com" />
                </div>

                <div className="fd-form-group">
                    <label>Owner Name</label>
                    <input type="text" className="fd-input" defaultValue="Mr. Ali Khan" placeholder="Owner Name" />
                </div>


                {/* Operational Details */}
                <div className="fd-form-group">
                    <label>Opening Timings</label>
                    <input type="text" className="fd-input" defaultValue="11:00 AM - 11:00 PM" placeholder="e.g. 11:00 AM - 11:00 PM" />
                </div>

                <div className="fd-form-group">
                    <label>Delivery Availability</label>
                    <select className="fd-input">
                        <option>Available (City Wide)</option>
                        <option>limited (3km Radius)</option>
                        <option>Takeaway Only</option>
                        <option>Dine-In Only</option>
                    </select>
                </div>

                <div className="fd-form-group">
                    <label>Facilities (Comma Separated)</label>
                    <input type="text" className="fd-input" defaultValue="Free Wi-Fi, AC Hall, Family Area" placeholder="e.g. Wi-Fi, Parking, AC" />
                </div>

                {/* Images */}
                <div className="fd-form-group">
                    <label>Cover Image (URL or Upload)</label>
                    <input type="text" className="fd-input" defaultValue="https://images.pexels.com/photos/12345/..." placeholder="Image URL" />
                    <div className="fd-upload-box">
                        <input type="file" className="fd-file-input" />
                        <div className="fd-img-preview-placeholder">
                            <p>Click to upload new image</p>
                        </div>
                    </div>
                </div>

                <button type="button" className="fd-btn-primary">Save Changes</button>
            </form>
        </div>
    );
};

const FoodMenu = () => {
    return (
        <div className="fd-card">
            <h2 className="fd-section-title">Menu Management</h2>
            <div className="fd-menu-actions">
                <button className="fd-btn-primary">+ Add New Item</button>
            </div>

            <div className="fd-menu-list">
                {/* Example Menu Item */}
                <div className="fd-menu-item">
                    <img src="https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg" alt="Burger" className="fd-menu-img" />
                    <div className="fd-menu-details">
                        <h4>Zinger Burger</h4>
                        <p>Delicious crispy chicken burger.</p>
                        <span className="fd-price-tag">Rs. 650</span>
                        <div className="fd-tags">
                            <span className="fd-tag">Spicy</span>
                            <span className="fd-tag">Popular</span>
                        </div>
                    </div>
                    <div className="fd-menu-btns">
                        <button className="fd-btn-edit">Edit</button>
                        <button className="fd-btn-delete">Delete</button>
                    </div>
                </div>
                {/* Example Menu Item 2 */}
                <div className="fd-menu-item">
                    <img src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg" alt="Beef Burger" className="fd-menu-img" />
                    <div className="fd-menu-details">
                        <h4>Beef Smash Burger</h4>
                        <p>Juicy beef patty with cheese.</p>
                        <span className="fd-price-tag">Rs. 750</span>
                        <div className="fd-tags">
                            <span className="fd-tag">Beef</span>
                        </div>
                    </div>
                    <div className="fd-menu-btns">
                        <button className="fd-btn-edit">Edit</button>
                        <button className="fd-btn-delete">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const FoodOrders = () => {
    const [orders, setOrders] = useState([
        { id: 101, customer: "Ali Khan", items: "2x Zinger Burger, 1x Coke", total: 1200, status: "Pending" },
        { id: 102, customer: "Sara Ahmed", items: "1x Large Pizza", total: 1500, status: "Pending" },
        { id: 103, customer: "John Doe", items: "5x Samosa", total: 250, status: "Approved" },
    ]);

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
    const [activeTab, setActiveTab] = useState("Orders");
    const [AdminTags, setAdmintags] = useState(false);

    const renderContent = () => {
        switch (activeTab) {
            case "Orders": return <FoodOrders />;
            case "Profile": return <FoodProfile />;
            case "Menu": return <FoodMenu />;
            default: return <FoodOrders />;
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
                        <li onClick={() => setActiveTab("Settings")}><FiSettings className="fd-DshbrdSidbrIcn" /> <p className="fd-DshbrdtagName">Settings</p></li>
                    </ul>
                </aside>

                {/* Main Content */}
                <section className="fd-content">
                    {/* Stepper / Tabs Indicator (Similar to Edu Dashboard) */}
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
