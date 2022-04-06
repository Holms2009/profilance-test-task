import { createSlice } from "@reduxjs/toolkit";

import news from '../../assets/data/news';

export const newsBlockSlice = createSlice({
  name: 'news',
  initialState: {
    value: news,
  },
  reducers: {
    setNews: (state, action) => {
      state.authStatus = action.payload;
    },
  },
})

export const { setNews } = newsBlockSlice.actions;

export const getNews = (state) => state.news.value;

export default newsBlockSlice.reducer;