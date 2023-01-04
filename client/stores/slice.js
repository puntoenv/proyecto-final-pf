import { createSlice } from '@reduxjs/toolkit'

export const caracterSlice = createSlice({
  name: 'caracter',
  initialState: {
    provi: [],
    municipios: []
  },
  reducers: {
    getPersonajes: (state, action) => {
      state.provi = action.payload
    },
    getmunicipios: (state, action) => {
      state.municipios = action.payload
    }
  }
})

export const { getPersonajes, getmunicipios } = caracterSlice.actions
export default caracterSlice.reducer