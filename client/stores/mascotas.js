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
      if (state.mascotas.length === 0) {
        alert("No hay mascotas.");
      }
    },
    // petsFilter: (state, action) => {
    //   state.mascotas = state.mascotas.filter(
    //     (mascota) => mascota[action.payload.id] === action.payload.value
    //   );
    //   if (state.mascotas.length === 0) {
    //     alert("No hay mascotas.");
    //   }
    // },
    backFilter: (state, action) => {
      action.payload.length === 0
        ? alert("No hay mascotas con esas características")
        : (state.mascotas = action.payload);
    },
  },
});

export const { getMascotas, petsFilter, backFilter } = mascotasSlice.actions;
export default mascotasSlice.reducer;
