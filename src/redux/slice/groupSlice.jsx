import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [
    { id: 1, name: "Trip to Goa", members: ["Rohan", "Kabir"], balance: -200 },
    { id: 2, name: "Office Party", members: ["Jay", "Dev"], balance: 450 },
  ],
};

const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },
    removeGroup: (state, action) => {
      state.groups = state.groups.filter(
        (group) => group.id !== action.payload
      );
    },
  },
});

export const { addGroup, removeGroup } = groupSlice.actions;
export default groupSlice.reducer;
