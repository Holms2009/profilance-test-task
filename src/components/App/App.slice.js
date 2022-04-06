import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    authStatus: 'guest',
    activeUser: null,
  },
  reducers: {
    setAuthStatus: (state, payload) => {
      state.authStatus = payload;
    },
    setActiveUser: (state, payload) => {
      state.activeUser = payload;
    },
    removeActiveUser: (state) => {
      state.activeUser = null;
    }
  },
})

export const { setAuthStatus, setActiveUser, removeActiveUser } = appSlice.actions;

export const getAuthStatus = (state) => state.app.authStatus;
export const getActiveUser = (state) => state.app.activeUser;

export default appSlice.reducer;