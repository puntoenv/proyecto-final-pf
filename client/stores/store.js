import { configureStore } from "@reduxjs/toolkit";
import caracterSlice from "./slice";
import mascotasSlice from "./mascotas";
import userSlice from "./User";
import productsSlice from "./products";
import userAuthSlice from "./userAuth";
import chartsSlice from "./charts";

export const store = configureStore({
  reducer: {
    caracter: caracterSlice,
    mascotas: mascotasSlice,
    user: userSlice,
    products: productsSlice,
    userAuth: userAuthSlice,
    charts: chartsSlice
  },
});
