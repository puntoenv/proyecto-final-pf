import { createSlice } from '@reduxjs/toolkit'


export const caracterSlice = createSlice({
  name: 'caracter',
  initialState: {
    provi: [],
    municipios: [],
    usuario:[]
  },
  reducers: {
    getPersonajes: (state, action) => {
      state.provi = action.payload
    },
    getmunicipios: (state, action) => {
      state.municipios = action.payload
    },
    getuser: (state, action) => {
      state.usuario = action.payload
    },
  }
})

export const { getPersonajes, getmunicipios, getuser } = caracterSlice.actions
export default caracterSlice.reducer