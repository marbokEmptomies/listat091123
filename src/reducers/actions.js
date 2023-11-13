import { SELECT_ITEM, TRANSFER_ITEMS, SET_FILTER_TEXT, SORT_LIST } from "./stateManagement";

export const selectItem = (item) => ({ type: SELECT_ITEM, payload: { item } });
export const transferItems = (direction) => ({ type: TRANSFER_ITEMS, payload: { direction } });
export const setFilterText = (text) => ({ type: SET_FILTER_TEXT, payload: text });
export const sortList = (listType, sortedList) => ({type: SORT_LIST, payload: {listType, sortedList}});