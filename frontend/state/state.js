import { createSlice } from "@reduxjs/toolkit";
import { set } from "mongoose";

const initialState = {
  user: null,
  isLoggedIn: false,
  tickerCard1: "",
  tickerCard2: "",
  tickerCard3: "",
  tickerCard4: "",
  tickerCard5: "",
  currentPage: "dashboard",
  analysisTicker: "",
  watchlist: [],
  news: [],
  insights: [],
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
      state.tickerCard1 = "";
      state.tickerCard2 = "";
      state.tickerCard3 = "";
      state.tickerCard4 = "";
      state.tickerCard5 = "";
      state.analysisTicker = "";
      state.watchlist = [];
      state.news = [];
      state.insights = [];
    },
    setTickerCard1: (state, action) => {
      state.tickerCard1 = action.payload.tickerCard1;
    },
    setTickerCard2: (state, action) => {
      state.tickerCard1 = action.payload.tickerCard2;
    },
    setTickerCard3: (state, action) => {
      state.tickerCard1 = action.payload.tickerCard3;
    },
    setTickerCard4: (state, action) => {
      state.tickerCard1 = action.payload.tickerCard4;
    },
    setTickerCard5: (state, action) => {
      state.tickerCard1 = action.payload.tickerCard5;
    },
    setWatchlist: (state, action) => {
      state.watchlist = action.payload.watchlist;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload.currentPage;
    },
    setAnalysisTicker: (state, action) => {
      state.analysisTicker = action.payload.analysisTicker;
    },
    setNews: (state, action) => {
      state.news = action.payload.news;
    },
    setInsights: (state, action) => {
      state.insights = action.payload.insights;
    },
  },
});

export const {
  setLogin,
  setLogout,
  setTickerCard1,
  setTickerCard2,
  setTickerCard3,
  setTickerCard4,
  setTickerCard5,
  setWatchlist,
  setCurrentPage,
  setAnalysisTicker,
  setNews,
  setInsights,
} = systemSlice.actions;
export default systemSlice.reducer;
