import { useEffect, useState } from "react";
import "./SearchBar.css";
export const SearchBar = ({ SearchedInst, AllInst }) => {

    // Storing Data:
    let [AllInstitute, setAllInstitute] = useState(AllInst);
    let [filteredItem, setFiltereditem] = useState();
    let [inputValue, setInputValue] = useState("");
    let pastRes = ["It's okay", "Coding is fun", "Let's Code together", "Why It is", "CSS", "JavaScript", "Kust 1"];
    let [PastResArr, setPastResArr] = useState(pastRes);

    useEffect(() => {
        setAllInstitute(AllInst);
    }, [AllInst]);

    // Filtering keywords from past history according to user Search;
    const filterSearch = (search) => {
        if (search) {
            const result = PastResArr.filter((v) =>
                v.toLowerCase().includes(search.toLowerCase())
            );
            setFiltereditem(result);
        } else {
            setFiltereditem(undefined)
        }
    };

    // Displaying Filtered Result:
    const OptionSlctd = (option) => {
        setInputValue(option);
        let SearchedRes = AllInstitute.filter((v) => {
            const itemName = v.InstName || v.name || v.title || "";
            if (itemName.toLowerCase().includes(option.toLowerCase())) {
                return v;
            }
        });
        SearchedInst(SearchedRes);
        setFiltereditem(undefined);
    }

    // Handling Enter key Event:
    const HandEnterKeyPress = (e) => {
        if (e.key === "Enter") {
            OptionSlctd(inputValue);
        };
    }

    // 
    useEffect(() => {
        if (inputValue === "") {
            SearchedInst(AllInstitute);
        }
    }, [inputValue]);

    return (
        <>
            <div className="Search-Area">
                <div className="Search-bar">
                    <input placeholder="Search here" name="SearchBar" value={inputValue} onChange={(e) => { filterSearch(e.target.value); setInputValue(e.target.value) }} autoComplete="none" onKeyDown={(e) => { HandEnterKeyPress(e) }} />
                    <button className="search-btn" onClick={() => { OptionSlctd(inputValue) }}>🔍</button>
                </div>
                {/* Results */}
                {(filteredItem)
                    ?
                    <ul className="result-cont">
                        {filteredItem.length > 0 ? (
                            filteredItem.map((item, index) => (
                                <li key={index} onClick={() => { OptionSlctd(item) }}>{item}</li>
                            ))
                        ) : (
                            <li onClick={() => { OptionSlctd(inputValue) }}>{inputValue}</li>
                        )}
                    </ul>
                    :
                    <></>
                }
            </div>
        </>
    )
}