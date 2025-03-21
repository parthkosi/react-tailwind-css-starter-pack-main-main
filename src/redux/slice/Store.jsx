import { configureStore } from "@reduxjs/toolkit";
import friendsReducer from "./friendsSlice";

const Store = configureStore({
  reducer: {
    friends: friendsReducer,
  },
});

export default Store;
