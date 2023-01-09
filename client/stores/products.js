import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
  },
  reducers: {
    getAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
  },
});

export const { getAllProducts } = productsSlice.actions;
export default productsSlice.reducer;
