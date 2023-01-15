import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    data: {},
    cart: [],
    products: []
  },
  reducers: {
    getAllProducts: (state, action) => {
      state.allProducts = action.payload.docs;
      state.data = {
        page: action.payload.page,
        pages: action.payload.totalPages,
      };
    },
    addProductCart: (state, action) => {
      let producto = state.allProducts.find((p) => p._id === action.payload);
      state.cart = [...state.cart, producto];
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
    products: (state, action) => {
      state.products = action.payload
    }
  },
});

export const { getAllProducts, addProductCart, clearCart, products } =
  productsSlice.actions;
export default productsSlice.reducer;
