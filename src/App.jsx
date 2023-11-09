import React, { useState } from "react";
import List from "./List";
import Arrow from "./Arrow";
import "./App.css";

const App = () => {
  const [leftList, setLeftList] = useState([
    "Starlet",
    "Aatos",
    "Torspo",
    "Uhura",
    "Princess Leia",
    "Hindenburg",
    "Kippari-Kalle",
    "Batman",
    "Captain Bloodloss",
    "Klepto-Keijo",
    "Kouhia",
    "Tero-Petteri",
    "Xavier",
    "Geoff",
    "Jaco",
    "Stevie Winwood",
    "PJ Harvey",
    "Zappa",
  ]);
  const [rightList, setRightList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const isLeftArrowDisabled =
    selectedItems.length === 0 ||
    !rightList.some((item) => selectedItems.includes(item));
  const isRightArrowDisabled =
    selectedItems.length === 0 ||
    !leftList.some((item) => selectedItems.includes(item));

  const handleSelect = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleTransfer = (direction) => {
    if (selectedItems.length > 0) {
      if (direction === "right" && !isRightArrowDisabled) {
        setLeftList(leftList.filter((name) => !selectedItems.includes(name)));
        setRightList([...rightList, ...selectedItems].sort());
      } else if (direction === "left" && !isLeftArrowDisabled) {
        setRightList(rightList.filter((name) => !selectedItems.includes(name)));
        setLeftList([...leftList, ...selectedItems].sort());
      }
      setSelectedItems([]);
    }
  };

  const filteredLeftList = leftList.filter((name) =>
    name.toLowerCase().includes(filterText.toLowerCase())
  );

  const filteredRightList = rightList.filter((name) =>
    name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleInputChange = (e) => {
    const userInput = e.target.value;
    setFilterText(userInput);

    const allItems = [...leftList, ...rightList];

    //Generate suggestions based on the input
    const filteredSuggestions = allItems.filter((name) =>
      name.toLowerCase().includes(userInput.toLowerCase())
    );
    setSuggestions(filteredSuggestions)
  };

  return (
    <>
    <div className="navbar">
      <input
        className="search-bar"
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={handleInputChange}
        list="suggestions-list"
      />
      <datalist id="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion} />
        ))}
      </datalist>
    </div>
      <div className="container">
        <List
          title="Left List"
          list={filteredLeftList}
          onSelect={handleSelect}
          selectedItems={selectedItems}
        />
        <div className="arrow-container">
          <Arrow
            direction="right"
            onClick={() => handleTransfer("right")}
            isDisabled={isRightArrowDisabled}
          />
          <Arrow
            direction="left"
            onClick={() => handleTransfer("left")}
            isDisabled={isLeftArrowDisabled}
          />
        </div>
        <List
          title="Right List"
          list={filteredRightList}
          onSelect={handleSelect}
          selectedItems={selectedItems}
        />
      </div>
    </>
  );
};

export default App;
