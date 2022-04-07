import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    authStatus: 'guest',
    activeUser: null,
  },
  reducers: {
    setAuthStatus: (state, action) => {
      state.authStatus = action.payload;
    },
    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
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