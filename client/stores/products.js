import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2/dist/sweetalert2.js";

import "sweetalert2/src/sweetalert2.scss";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    data: {},
    cart: [],
    categories: [],
    products: [],
  },
  reducers: {
    getAllProducts: (state, action) => {
      state.allProducts = action.payload.docs;
      state.data = {
        page: action.payload.page,
        pages: action.payload.totalPages,
      };
      console.log(state.data);
    },
    addProductCart: (state, action) => {
      let producto = state.allProducts.find((p) => p._id === action.payload);
      state.cart = [...state.cart, producto];
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
    getCategories: (state, action) => {
      state.categories = action.payload.sort((a, b) => {
        if (a == b) return 0;
        if (a < b) return -1;
        return 1;
      });
    },
    productsFilter: (state, action) => {
      if (action.payload.docs.length === 0) {

        // alert("No hay productos con esas características.");
      } else {
        state.allProducts = action.payload.docs;
        state.data = {
          page: action.payload.page,
          pages: action.payload.totalPages,
        };
      }
    },
    products: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const {
  getAllProducts,
  addProductCart,
  clearCart,
  getCategories,
  products,
  productsFilter,
} = productsSlice.actions;
export default productsSlice.reducer;
