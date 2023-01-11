import { createSlice } from "@reduxjs/toolkit";

export const mascotasSlice = createSlice({
  name: "mascotas",
  initialState: {
    mascotas: [],
    data: {},
  },
  reducers: {
    getMascotas: (state, action) => {
      state.mascotas = action.payload.docs;
      state.data = {
        pages: action.payload.totalPages,
        page: action.payload.page,
      };
      if (state.mascotas.length === 0) {
        state.pages = 0;
        alert("No hay mascotas.");
      }
    },
  },
});

export const { getMascotas } = mascotasSlice.actions;
export default mascotasSlice.reducer;
