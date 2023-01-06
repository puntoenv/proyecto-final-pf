import { createSlice } from "@reduxjs/toolkit";

export const mascotasSlice = createSlice({
  name: "mascotas",
  initialState: {
    mascotas: [],
  },
  reducers: {
    getMascotas: (state, action) => {
      state.mascotas = action.payload;
    },
  },
});

export const { getMascotas } = mascotasSlice.actions;
export default mascotasSlice.reducer;
