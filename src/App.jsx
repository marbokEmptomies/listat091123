import React, { useState, useEffect } from "react";
import List from "./List";
import Arrow from "./Arrow";
import { useDispatch, useSelector } from "react-redux";
import {
  loadData,
  saveData,
  selectItem,
  transferItems,
  setFilterText,
  sortList,
  setNewItem,
  addNewItem,
  deleteSelectedItems,
  resetLists,
} from "./reducers/stateManagement";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.app);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  useEffect(() => {
    // Save data to localStorage whenever the state changes
    dispatch(saveData(state));
  }, [dispatch, state]);

  const { leftList, rightList, selectedItems, filterText, newItem } = state;

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
    dispatch(selectItem({ item }));
    dispatch(setFilterText(""));
  };

  const handleTransfer = (direction) => {
    dispatch(transferItems({ direction }));
  };

  const handleTitleClick = (listType, sortedList) => {
    dispatch(sortList({ listType, sortedList }));
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

    // Generate suggestions based on the input
    const filteredSuggestions = allItems.filter((name) =>
      name.toLowerCase().startsWith(userInput.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleAddNewItem = (listType) => {
    if (newItem !== "") {
      dispatch(addNewItem({newItem, listType}));
    }
  };

  const isDeleteButtonEnabled = selectedItems.length > 0;

  const handleDelete = () => {
    dispatch(deleteSelectedItems({ selectedItems }));
    dispatch(saveData(state));
  };

  const resetListsHandler = () => {
    dispatch(resetLists());
  }

  return (
    <>
      <div className="navbar">
        <button className="add-button" onClick={resetListsHandler}>Reset lists</button>
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
          <p>Add a new name</p>
          <input
            type="text"
            placeholder="Enter a new name..."
            value={newItem}
            onChange={(e) => dispatch(setNewItem(e.target.value))}
          />
          <div>
            <button
              className="add-button"
              onClick={() => handleAddNewItem("leftList")}
            >
              ←
            </button>
            <button
              className="add-button"
              onClick={() => handleAddNewItem("rightList")}
            >
              →
            </button>
          </div>
          <button
            className="add-button"
            onClick={handleDelete}
            disabled={!isDeleteButtonEnabled}
          >
            Delete
          </button>
          <p>Transfer (selected) names</p>
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
