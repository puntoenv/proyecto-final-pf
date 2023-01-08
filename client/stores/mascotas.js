import { createSlice } from "@reduxjs/toolkit";

export const mascotasSlice = createSlice({
  name: "mascotas",
  initialState: {
    mascotas: [],
    filtered: [],
    pets: [],
  },
  reducers: {
    getMascotas: (state, action) => {
      state.mascotas = action.payload;
    },
    petsFilter: (state, action) => {
      state.mascotas = state.mascotas.filter(
        (mascota) => mascota[action.payload.id] === action.payload.value
      );
      if (state.mascotas.length === 0) {
        alert("No hay mascotas.");
      }
    },
  },
});

export const { getMascotas, petsFilter } = mascotasSlice.actions;
export default mascotasSlice.reducer;
