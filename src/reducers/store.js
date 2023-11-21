import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./stateManagement";

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export default store;
