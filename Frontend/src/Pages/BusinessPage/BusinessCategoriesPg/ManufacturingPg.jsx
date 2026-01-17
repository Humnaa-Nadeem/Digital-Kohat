
import "./BusinessCategories.css";
import { SearchBar } from "../../../components/SearchBar/Searchbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ManufacturingData } from "../../../Store/Business_store";
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt, FaIndustry } from "react-icons/fa";

export const ManufacturingPg = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    let [List, setList] = useState(ManufacturingData);
    let [Cards, setCards] = useState(ManufacturingData);

    let [showList, setShowlist] = useState(false);
    let navigate = useNavigate();

    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const id = query.get("id");
    const selectedItem = id ? ManufacturingData.find(item => item.id === parseInt(id)) : null;

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
                                    <h3>About Factory</h3>
                                    <p>{selectedItem.desc} We operate one of the leading manufacturing units in the region, ensuring high standards of production and quality control.</p>
                                </div>

                                <div className="info-card">
                                    <h3>Industrial Services</h3>
                                    <div className="service-tags">
                                        {selectedItem.services ? selectedItem.services.map((s, i) => <span key={i}>{s}</span>) : (
                                            <>
                                                <span>Manufacturing</span>
                                                <span>Production</span>
                                                <span>Supply</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="content-sidebar">
                                <div className="info-card">
                                    <h3>Contact Info</h3>
                                    <ul className="info-list" style={{ listStyle: 'none', padding: 0 }}>
                                        <li style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}><FaPhone style={{ color: '#32b57e' }} /> {selectedItem.contact?.phone || "0300-9876543"}</li>
                                        <li style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}><FaEnvelope style={{ color: '#32b57e' }} /> {selectedItem.contact?.email || "info@factory.com"}</li>
                                        <li style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}><FaMapMarkerAlt style={{ color: '#32b57e' }} /> Industrial Zone, Kohat</li>
                                    </ul>
                                </div>

                                <div className="info-card">
                                    <h3>Operating Hours</h3>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                                        <FaClock style={{ color: '#32b57e' }} />
                                        <span>{selectedItem.timings?.opening || "08:00 AM"} - {selectedItem.timings?.closing || "05:00 PM"}</span>
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
                                <h2 className="institute-hd">Industry</h2>
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
                            <div className="cata-pg-banner" style={{ backgroundImage: "url('https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg')" }}>
                                <h1 className="cata-pg-main-hd">Manufacturing & Industry</h1>
                                <p>Connect with factories, production units, and industrial setups.</p>
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
