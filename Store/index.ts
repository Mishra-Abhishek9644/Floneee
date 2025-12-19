import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./Slices/wishlistSlice";
import comparelistReducer from "./Slices/compareSlice"
import cartlistReducer from "./Slices/cartSlice"
import loginReducer from "./Slices/loginSlice"

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    compareList: comparelistReducer,
    cartList: cartlistReducer,
    login: loginReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem("wishlist", JSON.stringify(state.wishlist.items));
  localStorage.setItem("compareList", JSON.stringify(state.compareList.items));
  localStorage.setItem("cartList", JSON.stringify(state.cartList.items));
  localStorage.setItem("auth", JSON.stringify(state.login));
});

export default store;
