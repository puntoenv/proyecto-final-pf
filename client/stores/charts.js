import { createSlice } from "@reduxjs/toolkit";

export const chartsSlice = createSlice({
  name: "charts",
  initialState: {
    sales: [],
    filteredUsers: [],
    filteredPosts: [],
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
    getFilteredSales: (state, action) => {
      state.filteredSales = action.payload;
    },
  },
});

export const { getSales, getFilteredUsers, getFilteredPosts, getFilteredSales } = chartsSlice.actions;
export default chartsSlice.reducer;
