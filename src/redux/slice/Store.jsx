import { configureStore } from "@reduxjs/toolkit";
import friendsReducer from "./friendsSlice";
import groupReducer from "./groupSlice";

export const store = configureStore({
  reducer: {
    friends: friendsReducer,
    groups: groupReducer,
  },
});
