import "./FoodCatagories.css";
import { SearchBar } from "../../../components/SearchBar/Searchbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FineDiningList, FineDiningCardsData, Food_Details } from "../../../Store/Food_store";
import { FoodLandingPage } from "../FoodLanding/FoodLandingPage";

export const FineDiningPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    let [List, setList] = useState(FineDiningList);
    let [Crds, setCrds] = useState(FineDiningCardsData);
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
                    <FoodLandingPage id={id} Alldata={Food_Details} />
                    :
                    <section className="food-cata-pg-sec">
                        {/* LEFT SIDE OF PAGE */}
                        <div className={(showList) ? "food-lft-sec food-showList" : "food-lft-sec"} >
                            <h2 className="food-sector-label" onClick={() => { navigate(`/food`) }}>Food Section</h2>
                            <div className="institute-hd-lst">
                                <h2 className="food-institute-hd">Fine Dining</h2>
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

                        {/* MAIN PART OF PAGE */}
                        <div className="food-main-sec">
                            <div className="food-showLstBtn" onClick={() => { setShowlist(!showList) }}>{(showList) ? <>&times;</> : <>&#9776;</>}</div>
                            <div className="food-cata-banner">
                                <h1 className="cata-pg-main-hd">Top Fine Dining in Kohat</h1>
                                <p>Experience premium dining with exquisite cuisines and elegant atmosphere in the heart of your city.</p>
                                <SearchBar SearchedInst={setCrds} AllInst={FineDiningCardsData} />
                            </div>

                            <div className="food-card-cont">
                                {
                                    Crds.map((v, i) => {
                                        return (
                                            <div className="food-pg-card" key={i}>
                                                <img src={v.img} alt={v.InstName} />
                                                <div className="food-pg-card-content">
                                                    <h3>{v.InstName}</h3>
                                                    <p>{v.Desc}</p>
                                                    <button onClick={() => { navigate(`?id=${v.id}`) }} className="food-pg-card-btn">{v.btn_txt}</button>
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
