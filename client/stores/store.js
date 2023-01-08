import { configureStore } from "@reduxjs/toolkit";
import caracterSlice from "./slice";
import mascotasSlice from "./mascotas";
import userSlice from "./User";
export const store = configureStore({
  reducer: {
    caracter: caracterSlice,
    mascotas: mascotasSlice,
    user: userSlice,
  },
});
