import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    usurio: [],
    
  },
  reducers: {
    getUser: (state, action) => {
      state.usurio = action.payload
    }
  
  }
})

export const { getUser } = userSlice.actions
export default userSlice.reducer