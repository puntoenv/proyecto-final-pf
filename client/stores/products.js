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
    getCategories: (state, action) => {
      state.categories = action.payload;
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
  },
});

export const {
  getAllProducts,
  addProductCart,
  clearCart,
  getCategories,
  productsFilter,
} = productsSlice.actions;
export default productsSlice.reducer;
