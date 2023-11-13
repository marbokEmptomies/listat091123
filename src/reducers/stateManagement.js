import { useReducer } from "react";

export const initialState = {
  leftList: [
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
  ],
  rightList: [],
  selectedItems: [],
  filterText: "",
};

//Reducer constants
export const SELECT_ITEM = "SELECT_ITEM";
export const TRANSFER_ITEMS = "TRANSFER_ITEMS";
export const SET_FILTER_TEXT = "SET_FILTER_TEXT";
export const SORT_LIST = "SORT_LIST";

export const reducer = (state, action) => {
  switch (action.type) {
    case SELECT_ITEM:
      const { item } = action.payload;
      const isSelected = state.selectedItems.includes(item);

      return {
        ...state,
        selectedItems: isSelected
          ? state.selectedItems.filter((selectedItem) => selectedItem !== item)
          : [...state.selectedItems, item],
      };
    case TRANSFER_ITEMS:
      const { direction } = action.payload;
      const sourceList = direction === "right" ? "leftList" : "rightList";
      const destinationList = direction === "right" ? "rightList" : "leftList";

      return {
        ...state,
        [sourceList]: state[sourceList].filter(
          (name) => !state.selectedItems.includes(name)
        ),
        [destinationList]: [
          ...state[destinationList],
          ...state.selectedItems,
        ],
        selectedItems: [],
      };

    case SET_FILTER_TEXT:
      return {
        ...state,
        filterText: action.payload,
      };

    case SORT_LIST:
      const { listType, sortedList } = action.payload;

      return {
        ...state,
        [listType]: sortedList,
      };

    default:
      console.log("No such action: ", action);
      return state;
  }
};

export const useAppReducer = () => useReducer(reducer, initialState);
