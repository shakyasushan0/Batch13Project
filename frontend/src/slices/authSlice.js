import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("auth", JSON.stringify(state.userInfo));
    },
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
