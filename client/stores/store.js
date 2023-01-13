import { configureStore } from "@reduxjs/toolkit";
import caracterSlice from "./slice";
import mascotasSlice from "./mascotas";
import userSlice from "./User";
import productsSlice from "./products";

export const store = configureStore({
  reducer: {
    caracter: caracterSlice,
    mascotas: mascotasSlice,
    user: userSlice,
    products: productsSlice,
 
  },
});
