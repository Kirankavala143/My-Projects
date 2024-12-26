import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    SetUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { login, logout, SetUser } = authSlice.actions;

export const AuthReducer = authSlice.reducer;
