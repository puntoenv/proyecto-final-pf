import { configureStore } from "@reduxjs/toolkit";
import caracterSlice from "./slice";
import mascotasSlice from "./mascotas";
import userSlice from "./User";
import productsSlice from "./products";
import userAuthSlice from "./userAuth";
import salesSlice from "./sales";

export const store = configureStore({
  reducer: {
    caracter: caracterSlice,
    mascotas: mascotasSlice,
    user: userSlice,
    products: productsSlice,
    userAuth: userAuthSlice,
    sales: salesSlice
  },
});
