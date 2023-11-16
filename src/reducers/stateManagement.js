import initialData from "../../data.json"; //Initial data from separate file
import { useReducer } from "react";

// Initial state:
export const initialState = {...initialData};

// Reducer constants
export const LOAD_DATA = "LOAD_DATA";
export const SAVE_DATA = "SAVE_DATA";
export const DELETE_DATA = "DELETE_DATA";
export const SELECT_ITEM = "SELECT_ITEM";
export const TRANSFER_ITEMS = "TRANSFER_ITEMS";
export const SET_FILTER_TEXT = "SET_FILTER_TEXT";
export const SORT_LIST = "SORT_LIST";
export const SET_NEW_ITEM = "SET_NEW_ITEM";
export const ADD_NEW_ITEM = "ADD_NEW_ITEM";
export const DELETE_SELECTED_ITEMS = "DELETE_SELECTED_ITEMS";

export const reducer = (state, action) => {
  switch (action.type) {
    case LOAD_DATA:
      // Load data from localStorage or use the initial data if not found
      const loadedData =
        JSON.parse(localStorage.getItem("appData")) || initialData;

      return { ...state, ...loadedData };
    case SAVE_DATA:
      // Save data to localStorage
      localStorage.setItem("appData", JSON.stringify(state));

      return state;
    case DELETE_DATA:
      const { selectedItemsToDelete } = action.payload;

      const updatedLeftListAfterDelete = {
        items: state.leftList.items.filter(
          (item) => !selectedItemsToDelete.includes(item)
        ),
        sortOrder: state.leftList.sortOrder,
      };

      const updatedRightListAfterDelete = {
        items: state.rightList.items.filter(
          (item) => !selectedItemsToDelete.includes(item)
        ),
        sortOrder: state.rightList.sortOrder,
      };

      const newStateAfterDelete = {
        ...state,
        leftList: updatedLeftListAfterDelete,
        rightList: updatedRightListAfterDelete,
        selectedItems: [],
        isDeleteButtonEnabled: false,
      };

      localStorage.setItem(
        "appData",
        JSON.stringify({
          leftList: newStateAfterDelete.leftList,
          rightList: newStateAfterDelete.rightList,
        })
      );
      return newStateAfterDelete;
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
        [sourceList]: {
          ...state[sourceList],
          items: state[sourceList].items.filter(
            (name) => !state.selectedItems.includes(name)
          ),
        },
        [destinationList]: {
          ...state[destinationList],
          items: [...state[destinationList].items, ...state.selectedItems],
        },
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
        [listType]: {
          ...state[listType],
          items: sortedList.items,
          sortOrder: sortedList.sortOrder,
        },
      };

    case SET_NEW_ITEM:
      const { setItem } = action.payload;
      return {
        ...state,
        newItem: setItem,
      };

    case ADD_NEW_ITEM:
      const { newItem } = action.payload;

      return {
        ...state,
        leftList: {
          ...state.leftList,
          items: [...state.leftList.items, newItem],
        },
        newItem: "",
      };

    case DELETE_SELECTED_ITEMS:
      const { selectedItems } = action.payload;

      const updatedLeftList = {
        items: state.leftList.items.filter(
          (item) => !selectedItems.includes(item)
        ),
        sortOrder: state.leftList.sortOrder,
      };

      const updatedRightList = {
        items: state.rightList.items.filter(
          (item) => !selectedItems.includes(item)
        ),
        sortOrder: state.rightList.sortOrder,
      };

      return {
        ...state,
        leftList: updatedLeftList,
        rightList: updatedRightList,
        selectedItems: [],
        isDeleteButtonEnabled: false,
      };

    default:
      console.log("No such action: ", action);
      return state;
  }
};

export const useAppReducer = () => useReducer(reducer, initialState);
