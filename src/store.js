import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducer from "src/views/staff/Register/redux";

export const resetStore = () => {
  return {
    type: "RESET_STORE",
  };
};

const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    state = undefined;
  }
  return appReducer(state, action);
};

const appReducer = combineReducers({
  profileSlice: profileReducer,
});

export default configureStore({
  reducer: rootReducer,
});
