import "./FoodCatagories.css";
import { SearchBar } from "../../../components/SearchBar/Searchbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CafesList, CafesCardsData, Food_Details } from "../../../Store/Food_store";
import { FoodLandingPage } from "../FoodLanding/FoodLandingPage";
import { getMergedData, getFullMergedData } from "../../../utils/dataMerger";

export const CafesPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    let [List, setList] = useState(() => getMergedData(CafesList, "Food", "Cafes & Coffee"));
    let [Crds, setCrds] = useState(() => getMergedData(CafesCardsData, "Food", "Cafes & Coffee"));
    let [showList, setShowlist] = useState(false);
    let navigate = useNavigate();

    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const id = query.get("id");

    return (
        <>
            {
                (id)
                    ?
                    <FoodLandingPage id={id} Alldata={getFullMergedData(Food_Details, "Food")} />
                    :
                    <section className="food-cata-pg-sec">
                        <div className={(showList) ? "food-lft-sec food-showList" : "food-lft-sec"} >
                            <h2 className="food-sector-label" onClick={() => { navigate(`/food`) }}>Food Section</h2>
                            <div className="institute-hd-lst">
                                <h2 className="food-institute-hd">Cafes & Coffee</h2>
                                <ul className="food-institute-lst">
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
                        <div className="food-main-sec">
                            <div className="food-showLstBtn" onClick={() => { setShowlist(!showList) }}>{(showList) ? <>&times;</> : <>&#9776;</>}</div>
                            <div className="food-cata-banner">
                                <h1 className="cata-pg-main-hd">Relax in Our Cozy Cafes</h1>
                                <p>Unwind with the perfect cup of coffee, sweet treats, and a great atmosphere in Kohat's favorite spots.</p>
                                <div className="food-search-wrapper">
                                    <SearchBar SearchedInst={setCrds} AllInst={CafesCardsData} />
                                </div>
                            </div>
                            <div className="food-card-cont">
                                {
                                    Crds.map((v, i) => {

                                        const handleOrder = (item) => {
                                            // Redirecting to landing page so user can enter their details (Name, Address, etc.)
                                            navigate(`?id=${item.id}#order-section`);
                                            alert(`Please enter your delivery details on the next page to proceed with your order for ${item.InstName}.`);
                                        }


                                        return (
                                            <div className="food-pg-card" key={i}>
                                                <img src={v.img} alt={v.InstName} />
                                                <div className="food-pg-card-content">
                                                    <h3>{v.InstName}</h3>
                                                    <p>{v.Desc}</p>
                                                    <div className="food-card-actions">
                                                        <button onClick={() => { navigate(`?id=${v.id}`) }} className="food-pg-card-btn">{v.btn_txt}</button>

                                                        <button
                                                            className="food-pg-card-btn order-btn"
                                                            onClick={() => handleOrder(v)}
                                                            style={{ marginTop: '10px', backgroundColor: '#e74c3c', color: 'white' }}
                                                        >
                                                            Order Now
                                                        </button>

                                                    </div>
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
