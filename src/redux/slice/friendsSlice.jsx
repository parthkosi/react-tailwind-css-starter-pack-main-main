import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: [
    { id: 1, name: "Rohan", phone: "9354611354", balance: 500 },
    { id: 2, name: "Rahul", phone: "9651423654", balance: -150 },
    { id: 3, name: "Shubham", phone: "86412953", balance: 300 },
    { id: 4, name: "Pradeep", phone: "8218531820", balance: -1500 },
    { id: 5, name: "Dev", phone: "755489661", balance: 300 },
    { id: 6, name: "Naman", phone: "865429584", balance: 300 },
    { id: 7, name: "Kabir", phone: "9551234567", balance: -9800 },
    { id: 8, name: "Sohan", phone: "8551234567", balance: 300 },
    { id: 9, name: "Jay", phone: "3551234567", balance: -3870 },
    { id: 10, name: "Rahul", phone: "9991232339", balance: -900 },
  ],
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    addFriend: (state, action) => {
      state.friends.push(action.payload);
    },
    removeFriend: (state, action) => {
      state.friends = state.friends.filter(
        (friend) => friend.id !== action.payload
      );
    },
  },
});

export const { addFriend, removeFriend } = friendsSlice.actions;
export default friendsSlice.reducer;
