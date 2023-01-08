import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
    },
  },
});

export const { getMascotas, petsFilter } = mascotasSlice.actions;
export default mascotasSlice.reducer;
