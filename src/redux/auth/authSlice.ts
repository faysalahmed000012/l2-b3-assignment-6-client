"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  email: string;
  role: string;
  iat: string;
  exp: string;
}
export interface IAuthState {
  user: null | IUser;
  token: null | string;
}

const initialState: IAuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    signOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, signOut } = authSlice.actions;

export default authSlice.reducer;
