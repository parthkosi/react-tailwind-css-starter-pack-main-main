import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: [],
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    addFriend: (state, action) => {
      state.friends.push(action.payload);
    },
    removeFriend: (state, action) => {
      state.friends = state.friends.filter(
        (friend) => friend._id !== action.payload
      );
    },
  },
});

export const { setFriends, addFriend, removeFriend } = friendsSlice.actions;
export default friendsSlice.reducer;
