import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    cart: [],
  },
  reducers: {
    getAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    addProductCart: (state, action) => {
      let producto = state.allProducts.find((p) => p._id === action.payload);
      state.cart = [...state.cart, producto];
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
  },
});

export const { getAllProducts, addProductCart, clearCart } =
  productsSlice.actions;
export default productsSlice.reducer;
