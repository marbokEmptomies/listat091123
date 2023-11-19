import React, { useState, useEffect } from "react";
import List from "./List";
import Arrow from "./Arrow";
import { useAppReducer } from "./reducers/stateManagement";
import {
  loadData,
  saveData,
  deleteData,
  selectItem,
  transferItems,
  setFilterText,
  sortList,
  setNewItem,
  addNewItem,
  deleteSelectedItems,
} from "./reducers/actions";
import "./App.css";

const App = () => {
  const [state, dispatch] = useAppReducer();
  const { leftList, rightList, selectedItems, filterText, newItem } = state;
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    dispatch(loadData());
  }, [])

  const isLeftArrowDisabled =
    selectedItems.length === 0 ||
    (!rightList || !rightList.items
      ? false
      : !rightList.items.some((item) => selectedItems.includes(item)));

  const isRightArrowDisabled =
    selectedItems.length === 0 ||
    (!leftList || !leftList.items
      ? false
      : !leftList.items.some((item) => selectedItems.includes(item)));

  const handleSelect = (item) => {
    dispatch(selectItem(item));
    dispatch(setFilterText(""));
  };

  const handleTransfer = (direction) => {
    dispatch(transferItems(direction));
    dispatch(saveData());
  };

  const handleTitleClick = (listType, sortedList) => {
    console.log("handleTitleClick:", listType);
    dispatch(sortList(listType, sortedList));
  };

  const filteredLeftList = leftList.items.filter((name) =>
    name.toLowerCase().startsWith(filterText.toLowerCase())
  );

  const filteredRightList = rightList.items.filter((name) =>
    name.toLowerCase().startsWith(filterText.toLowerCase())
  );

  const handleInputChange = (e) => {
    const userInput = e.target.value;
    dispatch(setFilterText(userInput));

    const allItems = [...leftList.items, ...rightList.items];

    //Generate suggestions based on the input
    const filteredSuggestions = allItems.filter((name) =>
      name.toLowerCase().startsWith(userInput.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleAddNewItem = () => {
    if (newItem !== "") {
      dispatch(addNewItem(newItem));
      dispatch(saveData())
    }
  };

  const isDeleteButtonEnabled = selectedItems.length > 0;

  const handleDelete = () => {
    console.log("SELECTED TO DELETE: ", selectedItems);
    dispatch(deleteSelectedItems({ selectedItems }));
    dispatch(deleteData(selectedItems))
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
          title="Left list"
          list={{ items: filteredLeftList, sortOrder: leftList.sortOrder }}
          onSelect={handleSelect}
          selectedItems={selectedItems}
          onTitleClick={(sortedList) =>
            handleTitleClick("leftList", sortedList)
          }
        />
        <div className="arrow-container">
          <input
            type="text"
            placeholder="Enter a new name..."
            value={newItem}
            onChange={(e) => dispatch(setNewItem(e.target.value))}
          />
          <button className="add-button" onClick={handleAddNewItem}>
            Add
          </button>
          <button
            className="add-button"
            onClick={handleDelete}
            disabled={!isDeleteButtonEnabled}
          >
            Delete
          </button>
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
          title="Right list"
          list={{ items: filteredRightList, sortOrder: rightList.sortOrder }}
          onSelect={handleSelect}
          selectedItems={selectedItems}
          onTitleClick={(sortedList) =>
            handleTitleClick("rightList", sortedList)
          }
        />
      </div>
    </>
  );
};

export default App;
