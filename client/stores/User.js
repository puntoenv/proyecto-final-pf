import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    usuario: [],
  },
  reducers: {
    getUser: (state, action) => {
      state.usuario = action.payload;
    },
  },
});

export const { getUser, getUserId } = userSlice.actions;
export default userSlice.reducer;
