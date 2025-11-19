import { useState } from "react";
import "./SearchBar.css";
export const SearchBar = () => {
    let [filteredItem, setFiltereditem] = useState();
    let [inputValue, setInputValue] = useState();
    // Arr that will contain past searched key-word;
    let [Arr, setArr] = useState(["I love coding", "Coding is fun", "Let's Code together", "Why It is", "CSS", "JavaScript"]);
    // Filtering keywords from past history according to user Search;
    const filterSearch = (search) => {
        if (search) {
            const result = Arr.filter((v) =>
                v.toLowerCase().includes(search.toLowerCase())
            );
            setFiltereditem(result);
        } else {
            setFiltereditem(undefined)
        }
    };
    // When user select from past results
    const OptionSlctd = (option) => {
        setInputValue(option);
        setFiltereditem(undefined);
    }
    return (
        <>
            <div className="Search-Area">
                <div className="Search-bar">
                    <input placeholder="Search here" name="SearchBar" value={inputValue} onChange={(e) => { filterSearch(e.target.value); setInputValue(e.target.value) }} autoComplete="none" />
                    <button className="search-btn">🔍</button>
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
                            <li>No results found</li>
                        )}
                    </ul>
                    :
                    <></>
                }
            </div>
        </>
    )
}