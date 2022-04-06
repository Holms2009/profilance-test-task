import { configureStore } from "@reduxjs/toolkit";

import appReducer from '../components/App/App.slice';
import newsBlockReducer from '../components/NewsBlock/NewsBlock.slice';

export default configureStore({
  reducer: {
    app: appReducer,
    news: newsBlockReducer,
  },
});