import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, isAuthenticated: false, isLoading: true }

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload
    }
  },
})

export default userSlice.reducer
export const { setUser, setIsAuthenticated, setIsLoading } = userSlice.actions
