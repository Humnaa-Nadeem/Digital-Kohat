
import "./BusinessCategories.css";
import { SearchBar } from "../../../components/SearchBar/Searchbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OfficesData } from "../../../Store/Business_store";
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";

export const OfficesPg = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    let [List, setList] = useState(OfficesData);
    let [Cards, setCards] = useState(OfficesData);

    let [showList, setShowlist] = useState(false);
    let navigate = useNavigate();

    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const id = query.get("id");
    const selectedItem = id ? OfficesData.find(item => item.id === parseInt(id)) : null;

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
                                    <h3>About Us</h3>
                                    <p>{selectedItem.desc} We are committed to excellence in our field, providing top-tier professional services to clients in Kohat and beyond.</p>
                                </div>

                                <div className="info-card">
                                    <h3>Our Services</h3>
                                    <div className="service-tags">
                                        {selectedItem.services ? selectedItem.services.map((s, i) => <span key={i}>{s}</span>) : (
                                            <>
                                                <span>Professional Services</span>
                                                <span>Consultancy</span>
                                                <span>Management</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="content-sidebar">
                                <div className="info-card">
                                    <h3>Contact Info</h3>
                                    <ul className="info-list" style={{ listStyle: 'none', padding: 0 }}>
                                        <li style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}><FaPhone style={{ color: '#32b57e' }} /> {selectedItem.contact?.phone || "0333-1234567"}</li>
                                        <li style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}><FaEnvelope style={{ color: '#32b57e' }} /> {selectedItem.contact?.email || "contact@office.com"}</li>
                                        {selectedItem.contact?.website && <li style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}><FaGlobe style={{ color: '#32b57e' }} /> {selectedItem.contact.website}</li>}
                                        <li style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}><FaMapMarkerAlt style={{ color: '#32b57e' }} /> {selectedItem.address || "Kohat City"}</li>
                                    </ul>
                                </div>

                                <div className="info-card">
                                    <h3>Business Hours</h3>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                                        <FaClock style={{ color: '#32b57e' }} />
                                        <span>{selectedItem.timings?.opening || "09:00 AM"} - {selectedItem.timings?.closing || "05:00 PM"}</span>
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                        Open: {selectedItem.timings?.workingDays?.join(", ") || "Mon - Fri"}
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
                                <h2 className="institute-hd">Offices</h2>
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
                            <div className="cata-pg-banner" style={{ backgroundImage: "url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg')" }}>
                                <h1 className="cata-pg-main-hd">Companies & Offices</h1>
                                <p>Find reliable companies and professional offices in Kohat.</p>
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
