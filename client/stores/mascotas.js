import { createSlice } from "@reduxjs/toolkit";

export const mascotasSlice = createSlice({
  name: "mascotas",
  initialState: {
    mascotas: [],
    data: {},
    auxMascotas: [],
    types: [],
    relatedPets: [],
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
        Swal.fire({
          title: "No hay mascotas",
          icon: "error",
          color: "#437042",
          confirmButtonColor: "#437042",
          confirmButtonAriaLabel: "#437042",
          // background:'#fff url(../backAlerts.png)',
        });
      }
    },
    // orderPets:(state, action)=>{
    //   // console.log(action.payload)

    //   if (action.payload === 'asc'){
    //     state.mascotas.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
    //   }else {
    //     state.mascotas.sort((a, b)=> a.name > b.name ?  -1 : b.name > a.name ? 1 : 0)
    //   }

    // }
    typesGet: (state, action) => {
      state.types = action.payload.sort((a, b) => {
        if (a == b) return 0;
        if (a < b) return -1;
        return 1;
      });
    },
    getRelatedPets: (state, action) => {
      state.relatedPets = action.payload;
    },
  },
});

export const { getMascotas, orderPets, typesGet, getRelatedPets } =
  mascotasSlice.actions;
export default mascotasSlice.reducer;
