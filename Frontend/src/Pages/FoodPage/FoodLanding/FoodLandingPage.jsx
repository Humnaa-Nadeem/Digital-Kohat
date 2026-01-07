import "./FoodLandingPage.css";
import { useNavigate } from "react-router-dom";
import {
    FaPhone, FaEnvelope, FaGlobe, FaClock, FaStar, FaMapMarkerAlt,
    FaTruck, FaShoppingCart, FaTrash, FaCheckCircle, FaUtensils,
    FaChair, FaCalendarAlt, FaUserFriends, FaStickyNote, FaInfoCircle
} from "react-icons/fa";
import { useState } from "react";

export const FoodLandingPage = ({ id, Alldata }) => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [orderStatus, setOrderStatus] = useState(null);
    const [reservationStatus, setReservationStatus] = useState(null);
    const [activeTab, setActiveTab] = useState('delivery'); // 'delivery' or 'booking'

    // Getting the specific data
    const item = Alldata.find(v => String(v.id) === String(id));

    if (!item) return <div className="error-msg">Information not found.</div>;

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === product.id);
            if (existing) {
                return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(i => i.id !== productId));
    };

    const calculateTotal = () => {
        return cart.reduce((acc, curr) => acc + (Number(curr.price) * curr.quantity), 0);
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const orderData = {
            orderID: `ORD-${Math.floor(Math.random() * 1000000)}`,
            shopName: item.name,
            items: cart.map(i => ({ name: i.name, qty: i.quantity, subtotal: Number(i.price) * i.quantity })),
            total: calculateTotal(),
            paymentMethod: e.target.paymentMethod.value === "cod" ? "Cash on Delivery" : "Online Payment",
            specialInstructions: e.target.specialInstructions.value,
            status: "Pending",
            timestamp: new Date().toLocaleString(),
            userDetails: {
                name: e.target.fullName.value,
                phone: e.target.phone.value,
                address: e.target.address.value
            }
        };

        console.log("================ ORDER DETAILS (LANDING) ================");
        console.table(orderData);
        console.log("==========================================================");

        setOrderStatus(`Order placed successfully! Total: Rs. ${orderData.total}`);
        setCart([]);
        alert(`Order Confirmed at ${item.name}!\nTotal: Rs. ${orderData.total}\nInstruction: ${orderData.specialInstructions || "None"}`);
        setTimeout(() => setOrderStatus(null), 5000);
    };

    const handleTableBooking = (e) => {
        e.preventDefault();
        const bookingData = {
            bookingID: `BK-${Math.floor(Math.random() * 1000000)}`,
            shopName: item.name,
            date: e.target.date.value,
            time: e.target.time.value,
            guests: e.target.guests.value,
            specialRequest: e.target.specialRequest.value,
            customerName: e.target.resName.value,
            contact: e.target.resContact.value
        };

        console.log("================ TABLE RESERVATION ================");
        console.table(bookingData);
        console.log("===================================================");

        setReservationStatus(`Table Booked for ${bookingData.guests} guests on ${bookingData.date} at ${bookingData.time}.`);
        alert(`Table Reserved Successfully!\nReference ID: ${bookingData.bookingID}`);
        e.target.reset();
        setTimeout(() => setReservationStatus(null), 5000);
    };

    return (
        <section className="FoodLanding">
            {/* HERO SECTION */}
            <div className="FoodHero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${item.img || item.aboutImage})` }}>
                <div className="HeroContent">
                    <div className="HeroBadges">
                        <span className="category-tag">{item.type}</span>
                        {item.verifiedBadge && <span className="badge verified"><FaCheckCircle /> Verified</span>}
                        {item.hygieneRating && <span className="badge hygiene">Hygiene: {item.hygieneRating}</span>}
                        <span className={`badge status ${item.isOpen ? 'open' : 'closed'}`}>
                            {item.isOpen ? 'Open Now' : 'Closed'}
                        </span>
                    </div>
                    <h1>{item.name}</h1>
                    <p className="tagline">{item.tagline}</p>
                    <div className="hero-actions">
                        <button className="back-btn" onClick={() => navigate(-1)}>Back to List</button>
                    </div>
                </div>
            </div>

            <div className="FoodContainer">
                {/* ABOUT & QUICK INFO */}
                <div className="MainGrid">
                    <div className="InfoSection">
                        <h2 className="section-title">About Us</h2>
                        <p className="about-text">{item.about}</p>

                        <div className="QuickInfoGrid">
                            <div className="InfoCard">
                                <FaClock className="info-icon" />
                                <div>
                                    <h4>Timings</h4>
                                    <p>{item.quickInfo?.timings?.timing || "Contact for timings"}</p>
                                </div>
                            </div>
                            <div className="InfoCard">
                                <FaMapMarkerAlt className="info-icon" />
                                <div>
                                    <h4>Location</h4>
                                    <p>{item.quickInfo?.basicProfile?.location || "Kohat"}</p>
                                </div>
                            </div>
                            <div className="InfoCard">
                                <FaTruck className="info-icon" />
                                <div>
                                    <h4>Delivery</h4>
                                    <p>{item.deliveryAvailability || "Not Specified"}</p>
                                </div>
                            </div>
                            {item.inspectionStatus && (
                                <div className="InfoCard">
                                    <FaInfoCircle className="info-icon" />
                                    <div>
                                        <h4>Inspection</h4>
                                        <p>{item.inspectionStatus}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="">
                        <h3>Contact & Order Info</h3>
                        <div className="ContactLinks">
                            <a href={`tel:${item.contact?.phone}`} className="contact-item">
                                <FaPhone /> {item.contact?.phone}
                            </a>
                            <a href={`mailto:${item.contact?.email}`} className="contact-item">
                                <FaEnvelope /> {item.contact?.email}
                            </a>
                            <a
                                href={item.contact?.website || "#"}
                                onClick={(e) => { if (!item.contact?.website) e.preventDefault(); }}
                                target={item.contact?.website ? "_blank" : "_self"}
                                rel="noreferrer"
                                className="contact-item"
                                style={{ cursor: item.contact?.website ? "pointer" : "default", opacity: item.contact?.website ? 1 : 0.6 }}
                            >
                                <FaGlobe /> {item.contact?.website ? "Website" : "Website (Not Available)"}
                            </a>
                        </div>
                        <div className="rating-box">
                            <FaStar className="star-icon" />
                            <span>4.8 / 5.0</span>
                            <small>(Based on 150+ reviews)</small>
                        </div>
                    </div>
                </div>

                {/* MENU & ORDER SYSTEM SIDE-BY-SIDE */}
                <div className="MenuOrderLayout">
                    {/* LEFT SIDE: MENU */}
                    <section className="MenuSide">
                        <div className="MenuHeader">
                            <h2>Our Signature Menu</h2>
                            <p>Explore our curated selection of fine dishes and deals.</p>
                        </div>

                        <div className="MenuCategoriesList">
                            {item.categorizedMenu ? (
                                item.categorizedMenu.map((cat, catIdx) => (
                                    <div key={catIdx} className="MenuCategoryBlock">
                                        <h3 className="CategoryTitle">{cat.categoryName}</h3>
                                        <div className="MenuItemsGrid">
                                            {cat.items.map((menuItem) => (
                                                <div key={menuItem.id} className="MenuItemCardNew">
                                                    <div className="ItemImageWrapper">
                                                        <img src={menuItem.img} alt={menuItem.name} />
                                                        {menuItem.tags && menuItem.tags.map((tag, tIdx) => (
                                                            <span key={tIdx} className={`item-tag tag-${tag.toLowerCase()}`}>{tag}</span>
                                                        ))}
                                                    </div>
                                                    <div className="ItemDetails">
                                                        <div className="ItemTitlePrice">
                                                            <h4>{menuItem.name}</h4>
                                                            <span className="ItemPrice">Rs. {menuItem.price}</span>
                                                        </div>
                                                        <p className="ItemDesc">{menuItem.desc}</p>
                                                        {menuItem.variants && (
                                                            <div className="ItemVariants">
                                                                <span>Variants:</span>
                                                                <div className="VariantBadges">
                                                                    {menuItem.variants.map((v, vIdx) => (
                                                                        <span key={vIdx} className="v-badge">{v}</span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <button className="AddToCartBtn" onClick={() => addToCart(menuItem)}>
                                                            Add to Order
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="LegacyMenu">
                                    {item.menu && item.menu.map((m) => (
                                        <div key={m.id} className="MenuItem">
                                            <div className="item-info">
                                                <h4>{m.name}</h4>
                                                <p>{m.description}</p>
                                                <span className="price">Rs. {m.price}</span>
                                            </div>
                                            <button onClick={() => addToCart(m)}>Add to Order</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* RIGHT SIDE: STICKY SIDEBAR (Tabs) */}
                    <aside className="OrderSidebar" id="order-section">
                        <div className="SidebarTabs">
                            <button
                                className={`tab-btn ${activeTab === 'delivery' ? 'active' : ''}`}
                                onClick={() => setActiveTab('delivery')}
                            >
                                <FaTruck /> Order Delivery
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'booking' ? 'active' : ''}`}
                                onClick={() => setActiveTab('booking')}
                            >
                                <FaChair /> Book Table
                            </button>
                        </div>

                        <div className="StickyOrderCard">
                            {activeTab === 'delivery' ? (
                                <>
                                    <h2 className="sidebar-title">Your Order</h2>
                                    {cart.length === 0 ? (
                                        <div className="EmptyCartState">
                                            <FaShoppingCart className="empty-icon" />
                                            <p>Your cart is empty. Browse the menu to add delicious items!</p>
                                        </div>
                                    ) : (
                                        <div className="ActiveCart">
                                            <div className="CartItemsList">
                                                {cart.map((c) => (
                                                    <div key={c.id} className="SideCartItem">
                                                        <div className="item-txt">
                                                            <span className="item-name">{c.name}</span>
                                                            <span className="item-qty">x {c.quantity}</span>
                                                        </div>
                                                        <div className="item-price-remove">
                                                            <span>Rs. {Number(c.price) * c.quantity}</span>
                                                            <button className="small-remove" onClick={() => removeFromCart(c.id)}>
                                                                <FaTrash />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="CartTotalBox">
                                                <span>Total Amount</span>
                                                <strong>Rs. {calculateTotal()}</strong>
                                            </div>
                                            <hr />
                                            <div className="CheckoutForm">
                                                <h3>Checkout Details</h3>
                                                <form className="order-form-side" onSubmit={handlePlaceOrder}>
                                                    <input type="text" name="fullName" placeholder="Full Name" required />
                                                    <input type="tel" name="phone" placeholder="Phone Number" required />
                                                    <textarea name="address" placeholder="Delivery Address" required></textarea>
                                                    <textarea name="specialInstructions" placeholder="Special Instructions (e.g. less spicy, extra sauce)" rows="2"></textarea>
                                                    <select name="paymentMethod" required>
                                                        <option value="">Payment Method</option>
                                                        <option value="cod">Cash on Delivery</option>
                                                        <option value="online">Online Payment</option>
                                                    </select>
                                                    {orderStatus && <p className="success-msg-side">{orderStatus}</p>}
                                                    <button className="submit-order-btn" type="submit">
                                                        Confirm & Order
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                /* BOOKING TAB */
                                <div className="BookingSection">
                                    <h2 className="sidebar-title">Reserve a Table</h2>
                                    <p className="booking-desc">Book your spot at {item.name} in advance.</p>
                                    <form className="booking-form" onSubmit={handleTableBooking}>
                                        <div className="form-group">
                                            <label><FaCalendarAlt /> Date</label>
                                            <input type="date" name="date" required min={new Date().toISOString().split('T')[0]} />
                                        </div>
                                        <div className="form-group">
                                            <label><FaClock /> Time</label>
                                            <input type="time" name="time" required />
                                        </div>
                                        <div className="form-group">
                                            <label><FaUserFriends /> Guests</label>
                                            <input type="number" name="guests" min="1" max="20" placeholder="Number of Guests" required />
                                        </div>
                                        <div className="form-group">
                                            <label><FaStickyNote /> Special Request</label>
                                            <textarea name="specialRequest" placeholder="Birthday, Anniversary, Corner Table..." rows="2"></textarea>
                                        </div>
                                        <hr />
                                        <div className="form-group">
                                            <input type="text" name="resName" placeholder="Your Name" required />
                                        </div>
                                        <div className="form-group">
                                            <input type="tel" name="resContact" placeholder="Contact Number" required />
                                        </div>

                                        {reservationStatus && <p className="success-msg-side">{reservationStatus}</p>}
                                        <button className="submit-order-btn booking-btn" type="submit">
                                            Confirm Reservation
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>

                {/* VISUAL & FACILITIES SECTIONS */}
                <section className="MenuSection">
                    <h2 className="section-title">Specialties & Facilities</h2>
                    <div className="ChipsContainer">
                        {item.quickInfo?.facilities?.map((f, i) => (
                            <span key={i} className="facility-chip">{f}</span>
                        ))}
                        {item.quickInfo?.extraActivities?.map((a, i) => (
                            <span key={i} className="activity-chip">{a}</span>
                        ))}
                    </div>
                </section>

                <section className="GallerySection">
                    <h2 className="section-title">Photo Gallery</h2>
                    <div className="GalleryGrid">
                        {item.gallery?.map((img, i) => (
                            <div key={i} className="gallery-item">
                                <img src={img} alt={`${item.name} gallery ${i}`} />
                            </div>
                        ))}
                    </div>
                </section>

                {item.staff && item.staff.length > 0 && (
                    <section className="StaffSection">
                        <h2 className="section-title">Meet Our Team</h2>
                        <div className="StaffGrid">
                            {item.staff.map((member, i) => (
                                <div key={i} className="StaffCard">
                                    <img src={member.image} alt={member.name} />
                                    <div className="StaffInfo">
                                        <h4>{member.name}</h4>
                                        <p>{member.subject || member.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <section className="ReviewsSection">
                    <h2 className="section-title">Customer Feedback</h2>
                    <div className="ReviewsGrid">
                        {(item.detailedReviews || item.quickInfo?.parentReviews)?.map((rev, i) => {
                            const isDetailed = typeof rev === 'object';
                            return (
                                <div key={i} className="ReviewCard">
                                    <div className="ReviewHeader">
                                        <img
                                            src={isDetailed ? rev.img : "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"}
                                            alt={isDetailed ? rev.name : "Customer"}
                                            className="ReviewerImg"
                                        />
                                        <div className="ReviewerInfo">
                                            <h4>{isDetailed ? rev.name : "Verified Customer"}</h4>
                                            <div className="stars">
                                                {[...Array(isDetailed ? rev.rating : 5)].map((_, sIdx) => (
                                                    <FaStar key={sIdx} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="ReviewText">"{isDetailed ? rev.comment : rev}"</p>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </section>
    );
};
