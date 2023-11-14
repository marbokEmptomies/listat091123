import {
  SELECT_ITEM,
  TRANSFER_ITEMS,
  SET_FILTER_TEXT,
  SORT_LIST,
  SET_NEW_ITEM,
  ADD_NEW_ITEM,
  DELETE_SELECTED_ITEMS,
} from "./stateManagement";

export const selectItem = (item) => ({ type: SELECT_ITEM, payload: { item } });
export const transferItems = (direction) => ({
  type: TRANSFER_ITEMS,
  payload: { direction },
});
export const setFilterText = (text) => ({
  type: SET_FILTER_TEXT,
  payload: text,
});
export const sortList = (listType, sortedList) => ({
  type: SORT_LIST,
  payload: { listType, sortedList },
});
export const setNewItem = (setItem) => ({
  type: SET_NEW_ITEM,
  payload: { setItem },
});
export const addNewItem = (newItem) => ({
  type: ADD_NEW_ITEM,
  payload: { newItem },
});
export const deleteSelectedItems = (payload) => ({
    type: DELETE_SELECTED_ITEMS,
    payload,
  });
