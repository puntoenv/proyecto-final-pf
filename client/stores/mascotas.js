import { createSlice } from "@reduxjs/toolkit";

export const mascotasSlice = createSlice({
  name: "mascotas",
  initialState: {
    mascotas: [],
    filtered: [],
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
    // petsFilter: (state, action) => {
    //   state.mascotas = state.mascotas.filter(
    //     (mascota) => mascota[action.payload.id] === action.payload.value
    //   );
    //   if (state.mascotas.length === 0) {
    //     alert("No hay mascotas.");
    //   }
    // },
    backFilter: (state, action) => {
      console.log(action.payload);
      action.payload.length === 0
        ? alert("No hay mascotas con esas características")
        : (state.mascotas = action.payload.docs);
    },
  },
});

export const { getMascotas, petsFilter, backFilter } = mascotasSlice.actions;
export default mascotasSlice.reducer;
