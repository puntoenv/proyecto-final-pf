import { createSlice } from '@reduxjs/toolkit'

export const mascotasSlice = createSlice({
  name: 'mascotas',
  initialState: {
    mascotas: [],
    detail: []
  },
  reducers: {
    getMascotas: (state, action) => {
      state.mascotas = action.payload
    },
    getPostDetail: (state, action) => {
      state.detail = action.payload
    }
  }
})

export const { getMascotas, getPostDetail } =  mascotasSlice.actions 
export default mascotasSlice.reducer