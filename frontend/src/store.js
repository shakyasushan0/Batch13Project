import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./slices/cartSlice";
const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
  },
});

export default store;
