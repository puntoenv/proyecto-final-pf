import { createSlice } from '@reduxjs/toolkit'

export const mascotasSlice = createSlice({
  name: 'mascotas',
  initialState: {
    mascotas: [],
    encontrada: []
  },
  reducers: {
    getMascotas: (state, action) => {
      state.mascotas = action.payload
    },
    getMascotaEncontrada: (state, action) => {
      state.encontrada = action.payload
    }
  }
})

export const { getMascotas, getMascotaEncontrada } =  mascotasSlice.actions 
export default mascotasSlice.reducer