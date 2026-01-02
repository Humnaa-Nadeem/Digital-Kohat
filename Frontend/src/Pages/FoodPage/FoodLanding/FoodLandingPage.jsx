import "./FoodLandingPage.css";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaEnvelope, FaGlobe, FaClock, FaStar, FaMapMarkerAlt, FaTruck, FaShoppingCart, FaTrash } from "react-icons/fa";
import { useState } from "react";

export const FoodLandingPage = ({ id, Alldata }) => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [orderStatus, setOrderStatus] = useState(null);

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
            status: "Pending",
            timestamp: new Date().toLocaleString(),
            userDetails: {
                name: e.target.fullName.value,
                phone: e.target.phone.value,
                address: e.target.address.value
            }
        };

        console.log("================ ORDER DETAILS (LANDING) ================");
        console.log("Status: Processing Order for " + item.name);
        console.table(orderData);
        console.log("Detailed Shop Items:", orderData.items);
        console.log("Full JSON for Admin:", JSON.stringify(orderData, null, 2));
        console.log("==========================================================");

        setOrderStatus(`Order placed successfully for Rs. ${orderData.total}! Details sent to console.`);
        setCart([]);

        alert(`Order Confirmed at ${item.name}!\nTotal: Rs. ${orderData.total}\nPayment: ${orderData.paymentMethod}\n\nOur team will contact you soon!`);

        setTimeout(() => setOrderStatus(null), 5000);
    };

    return (
        <section className="FoodLanding">
            {/* HERO SECTION */}
            <div className="FoodHero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${item.img || item.aboutImage})` }}>
                <div className="HeroContent">
                    <span className="category-tag">{item.type}</span>
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
                        </div>
                    </div>

                    <div className="ContactSidebar">
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

                                                        <button
                                                            className="AddToCartBtn"
                                                            onClick={() => addToCart(menuItem)}
                                                        >
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
                                    {/* Fallback for old menu structure if any */}
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

                    {/* RIGHT SIDE: STICKY ORDER SYSTEM */}
                    <aside className="OrderSidebar" id="order-section">
                        <div className="StickyOrderCard">
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
                        </div>
                    </aside>
                </div>

                {/* SPECIALTIES SECTION */}
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

                {/* GALLERY SECTION */}
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

                {/* STAFF SECTION */}
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

                {/* REVIEWS SECTION */}
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
