import { useState } from "react";
import "./SearchBar.css";

export const SearchBar = ({ SearchedInst, AllInst }) => {
  const [filteredItem, setFiltereditem] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Filter live results as user types
  const filterSearch = (search) => {
    if (!search) {
      setFiltereditem([]);
      SearchedInst(AllInst); // reset
      return;
    }

    const searchTerm = search.toLowerCase();
    const results = AllInst.filter(
      (v) =>
        (v.name || "").toLowerCase().includes(searchTerm) ||
        (v.type || "").toLowerCase().includes(searchTerm) ||
        (v.location || "").toLowerCase().includes(searchTerm) ||
        (v.description || "").toLowerCase().includes(searchTerm)
    );

    setFiltereditem(results);
    SearchedInst(results);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    filterSearch(value);
  };

  const handleSelect = (item) => {
    const name = item.name || item.title || "";
    setInputValue(name);
    SearchedInst([item]); // set single result
    setFiltereditem([]); // hide dropdown
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && filteredItem.length > 0) {
      handleSelect(filteredItem[0]);
    }
  };

  return (
    <div className="Search-Area">
      <div className="Search-bar">
        <input
          placeholder="Search here"
          value={inputValue}
          onChange={handleInputChange}
          autoComplete="off"
          onKeyDown={handleKeyPress}
        />
        <button
          className="search-btn"
          onClick={() => filteredItem[0] && handleSelect(filteredItem[0])}
        >
          🔍
        </button>
      </div>

      {/* Dropdown Suggestions */}
      {filteredItem.length > 0 && (
        <ul className="result-cont">
          {filteredItem.map((item, index) => (
            <li key={index} onClick={() => handleSelect(item)}>
              {item.name || item.title} - {item.type}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
