function updateCart(state) {
  state.itemPrice = Number(
    state.cartItems.reduce((acc, x) => acc + x.qty * x.price, 0).toFixed(2),
  );
  state.shippingCharge = state.itemPrice >= 100 ? 0 : 10;
  state.taxPrice = Number((0.1 * state.itemPrice).toFixed(2));
  state.totalPrice = state.itemPrice + state.shippingCharge + state.taxPrice;
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
}

export { updateCart };
