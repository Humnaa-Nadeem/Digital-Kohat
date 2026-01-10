
import "./BusinessCategories.css";
import { SearchBar } from "../../../components/SearchBar/Searchbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShopsData } from "../../../Store/Business_store";
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt, FaFacebook, FaInstagram, FaGlobe } from "react-icons/fa";

export const ShopsRetailPg = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    let [List, setList] = useState(ShopsData);
    let [Cards, setCards] = useState(ShopsData);

    let [showList, setShowlist] = useState(false);
    let navigate = useNavigate();

    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const id = query.get("id");
    const selectedItem = id ? ShopsData.find(item => item.id === parseInt(id)) : null;

    return (
        <>
            {
                (selectedItem)
                    ?
                    <div className="detail-view-container">
                        <button className="btn-back" onClick={() => navigate(-1)}>← Back to List</button>

                        <div className="detail-header" style={{ backgroundImage: `url(${selectedItem.coverImage || selectedItem.img})` }}>
                            <div className="detail-title-block">
                                <h1>{selectedItem.name}</h1>
                                <div className="detail-meta">
                                    <span>{selectedItem.desc}</span>
                                </div>
                            </div>
                        </div>

                        <div className="detail-content">
                            <div className="content-main">
                                <div className="info-card">
                                    <h3>About</h3>
                                    <p>{selectedItem.desc} We are dedicated to providing the best quality products for our customers. Visit us to explore our wide range of items.</p>
                                </div>

                                <div className="info-card">
                                    <h3>Services & Products</h3>
                                    <div className="service-tags">
                                        {/* Use services from data if available, else dummy */}
                                        {selectedItem.services ? selectedItem.services.map((s, i) => <span key={i}>{s}</span>) : (
                                            <>
                                                <span>In-Store Shopping</span>
                                                <span>Quality Assurance</span>
                                                <span>Customer Support</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="content-sidebar">
                                <div className="info-card">
                                    <h3>Contact Info</h3>
                                    <ul className="info-list" style={{ listStyle: 'none', padding: 0 }}>
                                        <li style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}><FaPhone style={{ color: '#32b57e' }} /> {selectedItem.contact?.phone || "0300-1234567"}</li>
                                        <li style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}><FaEnvelope style={{ color: '#32b57e' }} /> {selectedItem.contact?.email || "info@shop.com"}</li>
                                        <li style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}><FaGlobe style={{ color: '#32b57e' }} /> www.website.com</li>
                                        <li style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}><FaMapMarkerAlt style={{ color: '#32b57e' }} /> {selectedItem.address || "Main Bazaar, Kohat"}</li>
                                    </ul>
                                </div>

                                <div className="info-card">
                                    <h3>Opening Hours</h3>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                                        <FaClock style={{ color: '#32b57e' }} />
                                        <span>{selectedItem.timings?.opening || "09:00 AM"} - {selectedItem.timings?.closing || "10:00 PM"}</span>
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                        Open: {selectedItem.timings?.workingDays?.join(", ") || "Mon - Sat"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <section className="edu-cata-pg-sec">
                        <div className={(showList) ? "lft-sec showList" : "lft-sec"} >
                            <h2 className="sector" onClick={() => { navigate(`/business`) }}>Business</h2>
                            <div className="institute-hd-lst">
                                <h2 className="institute-hd">Shops</h2>
                                <ul className="institute-lst">
                                    {
                                        List.map((v, i) => {
                                            return (
                                                <li onClick={() => { navigate(`?id=${v.id}`); setShowlist(false) }} key={i}>{v.name}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="main-sec">
                            <div className="showLstBtn" onClick={() => { setShowlist(!showList) }}>{(showList) ? <>&times;</> : <>&#9776;</>}</div>
                            <div className="cata-pg-banner" style={{ backgroundImage: "url('https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg')" }}>
                                <h1 className="cata-pg-main-hd">Popular Shops in Kohat</h1>
                                <p>Discover the best retail outlets and shops for your daily needs.</p>
                                <SearchBar SearchedInst={setCards} AllInst={Cards} />
                            </div>
                            <div className="cata-card-cont">
                                {
                                    Cards.map((v, i) => {
                                        return (
                                            <div className="cata-pg-card" key={i}>
                                                <img src={v.img} alt="Placeholder" />
                                                <div className="cata-pg-card-content">
                                                    <h3>{v.name}</h3>
                                                    <p>{v.desc}</p>
                                                    <button onClick={() => { navigate(`?id=${v.id}`) }} className="cata-pg-card-btn">{v.btn_txt}</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </section >
            }
        </>
    )
}
