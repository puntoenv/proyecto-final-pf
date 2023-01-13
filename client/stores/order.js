import { createSlice } from "@reduxjs/toolkit";

export const orderSlice= createSlice=({
    name: "order",
    initialState:{
        mascotas:[],
    },
    reducers:{
        orderPets:(state, action)=>{
            action.payload === 'asc' ? state.mascotas.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0) :
            state.mascotas.sort((a, b)=> a.name > b.name ?  -1 : b.name > a.name ? 1 : 0)
           
            // return {
            //     ...state,
            //     mascotas: orderPets, 
        // }
    }
    }
})

export const { orderPets }= orderSlice.actions;
export default orderSlice.reducer;


