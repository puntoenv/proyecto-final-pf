import { createSlice } from "@reduxjs/toolkit";

export const mascotasSlice = createSlice({
  name: "mascotas",
  initialState: {
    mascotas: [],
    data: {},
    auxMascotas: [],
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
          position: "top-end",
          icon: "error",
          title: "No hay mascotas",
          showConfirmButton: false,
          timer: 3000,
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
  },
});

export const { getMascotas, orderPets } = mascotasSlice.actions;
export default mascotasSlice.reducer;
