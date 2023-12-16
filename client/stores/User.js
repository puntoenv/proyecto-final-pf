import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    usuario: [],
    users: [],
  },
  reducers: {
    getUser: (state, action) => {
      state.usuario = action.payload;
    },
    getAllUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { getUser, getUserId, getAllUsers } = userSlice.actions;
export default userSlice.reducer;
