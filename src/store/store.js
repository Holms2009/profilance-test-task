import { configureStore } from "@reduxjs/toolkit";
import appReducer from '../components/App/App.slice';

export default configureStore({
  reducer: {
    app: appReducer,
  },
});