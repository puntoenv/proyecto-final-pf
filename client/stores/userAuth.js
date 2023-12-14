import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userAuth",
  initialState: {
    userData: {},
    userauth: false,
  },
  reducers: {
    get_User: (state, action) => {
      state.userData = action.payload;
    },
    get_authUser: (state, action) => {
      state.userauth = action.payload;
    },
  },
});

export const { get_User, get_authUser } = userSlice.actions;
export default userSlice.reducer;
