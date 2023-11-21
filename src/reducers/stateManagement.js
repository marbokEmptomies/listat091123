import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import initialData from "../../data.json";

export const loadData = createAsyncThunk("app/loadData", async () => {
  try {
    const loadedData =
      JSON.parse(localStorage.getItem("appData")) || initialData;
    console.log("Loaded data:", loadedData);
    return loadedData;
  } catch (error) {
    console.error("Error loading data:", error);
    throw error;
  }
});

// Async Thunk for saving data
export const saveData = createAsyncThunk("app/saveData", async (state) => {
  try {
    const existingData = localStorage.getItem("appData");

    if (!existingData || existingData !== JSON.stringify(state)) {
      localStorage.setItem("appData", JSON.stringify(state));
      console.log("DATA SAVED: ", state);
    }

    return state;
  } catch (error) {
    console.error("Error saving data:", error);
    throw error;
  }
});

export const resetLists = createAsyncThunk("app/resetLists", async () => {
  try {
    const initialDataCopy = { ...initialData };
    localStorage.setItem("appData", JSON.stringify(initialDataCopy));
    return initialDataCopy;
  } catch (error) {
    console.error("Error resetting lists:", error);
    throw error;
  }
});

const appSlice = createSlice({
  name: "app",
  initialState: { ...initialData },
  reducers: {
    selectItem: (state, action) => {
      const { item } = action.payload;
      const isSelected = state.selectedItems.includes(item);

      const isOppositeList =
        (state.leftList.items.includes(item) &&
          state.selectedItems.some((selectedItem) =>
            state.rightList.items.includes(selectedItem)
          )) ||
        (state.rightList.items.includes(item) &&
          state.selectedItems.some((selectedItem) =>
            state.leftList.items.includes(selectedItem)
          ));

      state.selectedItems = isOppositeList
        ? [item] // Clear selectedItems if the new item is from the opposite list
        : isSelected
        ? state.selectedItems.filter((selectedItem) => selectedItem !== item)
        : [...state.selectedItems, item];
    },
    transferItems: (state, action) => {
      const { direction } = action.payload;
      const sourceListName = direction === "right" ? "leftList" : "rightList";
      const destinationListName =
        direction === "right" ? "rightList" : "leftList";

      const sourceList = state[sourceListName].items.filter(
        (name) => !state.selectedItems.includes(name)
      );
      const destinationList = [
        ...state[destinationListName].items,
        ...state.selectedItems,
      ];

      return {
        ...state,
        [sourceListName]: { ...state[sourceListName], items: sourceList },
        [destinationListName]: {
          ...state[destinationListName],
          items: destinationList,
        },
        selectedItems: [],
      };
    },
    setFilterText: (state, action) => {
      state.filterText = action.payload;
    },
    sortList: (state, action) => {
      const { listType, sortedList } = action.payload;
      state[listType].items = sortedList.items;
      state[listType].sortOrder = sortedList.sortOrder;
    },
    setNewItem: (state, action) => {
      state.newItem = action.payload;
    },
    addNewItem: (state, action) => {
      const { newItem, listType } = action.payload;
    
      // Check if the listType exists in state
      if (!state[listType]) {
        state[listType] = { items: [], sortOrder: "asc" };
      }
    
      // Check if the new item already exists
      const isExistingItem = state[listType].items.includes(newItem);
    
      // If the item exists, modify the name
      if (isExistingItem) {
        let index = 1;
        let modifiedName = `${newItem}_${index}`;
    
        // Keep incrementing the index until a unique name is found
        while (state[listType].items.includes(modifiedName)) {
          index++;
          modifiedName = `${newItem}_${index}`;
        }
    
        // Add the modified name to the list
        state[listType].items = [...state[listType].items, modifiedName];
        state.newItem = modifiedName;
      } else {
        // If the item doesn't exist, add it directly
        state[listType].items = [...state[listType].items, newItem];
        state.newItem = newItem;
      }
      state.newItem = "";
    },      
    deleteSelectedItems: (state, action) => {
      const { selectedItems } = action.payload;
      state.leftList.items = state.leftList.items.filter(
        (item) => !selectedItems.includes(item)
      );
      state.selectedItems = [];
      state.isDeleteButtonEnabled = false;
    },
    default: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadData.fulfilled, (state, action) => {
        // Handle the data loaded from localStorage
        return action.payload;
      })
      .addCase(saveData.fulfilled, (state, action) => {
        // Handle the successful save
      })
      .addCase(resetLists.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const {
  selectItem,
  transferItems,
  setFilterText,
  sortList,
  setNewItem,
  addNewItem,
  deleteSelectedItems,
} = appSlice.actions;

export const appReducer = appSlice.reducer;
