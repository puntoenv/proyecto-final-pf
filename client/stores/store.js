import { configureStore } from '@reduxjs/toolkit'
import caracterSlice from './slice'

export const store = configureStore({
  reducer: {
    caracter: caracterSlice
  }
})