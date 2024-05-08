import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccessful: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUser: (state, action) => {
      state.currentUser = action.payload;
    },
    deleteUser: (state) => {
      state.currentUser = null;
    },
    userLogout: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  signInSuccessful,
  updateUser,
  deleteUser,
  setProfilePicture,
  userLogout,
} = userSlice.actions;
export default userSlice.reducer;
