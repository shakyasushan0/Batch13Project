import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      shippingAddress: {},
      paymentMethod: "cod",
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const itemIndex = state.cartItems.findIndex((i) => i._id == item._id);
      if (itemIndex >= 0) {
        // state.cartItems = state.cartItems.map((x) =>
        //   x._id == existsItem._id ? item : x,
        // );
        state.cartItems[itemIndex] = item;
      } else state.cartItems.push(item);

      updateCart(state);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id != id);
      updateCart(state);
    },

    clearCart: (state, action) => {
      state.cartItems = [];
      updateCart(state);
    },

    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      updateCart(state);
    },

    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setShippingAddress,
  setPaymentMethod,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
