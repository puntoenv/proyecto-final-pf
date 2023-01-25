import { createSlice } from "@reduxjs/toolkit";

export const salesSlice = createSlice({
  name: "sales",
  initialState: {
    sales: [],
    
  },
  reducers: {
    getSales: (state, action) => {
      state.sales = action.payload;
    }
  
  },
});

export const { getSales } = salesSlice.actions;
export default salesSlice.reducer;