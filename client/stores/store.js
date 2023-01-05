import { configureStore } from '@reduxjs/toolkit'
import caracterSlice from './slice'
import mascotasSlice  from './mascotas';

export const store = configureStore({
  reducer: {
    caracter: caracterSlice,
    mascotas: mascotasSlice
  }
})