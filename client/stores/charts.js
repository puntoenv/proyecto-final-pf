import { createSlice } from "@reduxjs/toolkit";

export const chartsSlice = createSlice({
  name: "charts",
  initialState: {
    sales: [],
    filteredUsers: [],
    filteredProducts: [],
    filteredSales:[]
  },
  reducers: {
    getSales: (state, action) => {
      state.sales = action.payload;
    },
    getFilteredUsers: (state, action) => {
      state.filteredUsers = action.payload;
    },
    getFilteredPosts: (state, action) => {
      state.filteredPosts = action.payload;
    },
  },
});

export const { getSales, getFilteredUsers, getFilteredPosts } = chartsSlice.actions;
export default chartsSlice.reducer;
