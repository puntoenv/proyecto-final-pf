import { createSlice } from '@reduxjs/toolkit'

export const caracterSlice = createSlice({
  name: 'caracter',
  initialState: {
    provi: [],
    municipios: []
  },
  reducers: {

  }
})

export const { } = caracterSlice.actions
export default caracterSlice.reducer