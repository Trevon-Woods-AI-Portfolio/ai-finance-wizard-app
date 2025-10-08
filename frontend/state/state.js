import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  historicalData: [],
  fundementalsData: [],
  newsData: [],

};

export const systemSlice = createSlice({
  name: "sys",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const {
    setLogin, setLogout
} = systemSlice.actions;
export default systemSlice.reducer;