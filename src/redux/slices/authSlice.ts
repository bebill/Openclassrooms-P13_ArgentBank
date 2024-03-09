import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isAuth: false,
    error: null,
    token: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.error = null;
      state.token = action.payload.token;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = action.payload.error;
      state.token = null;
    },
    logout: (state) => {
      state.token = null;
      state.isAuth = false;
      state.error = null;
    },
  },
});

const { actions, reducer } = authSlice;

export const { loginStart, loginSuccess, loginFailure, logout } = actions;

export default reducer;
