import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./Slices/wishlistSlice";
import comparelistReducer from "./Slices/compareSlice"
import cartlistReducer from "./Slices/cartSlice"

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    compareList: comparelistReducer,
    cartList: cartlistReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem(
    "wishlist",
    JSON.stringify(state.wishlist.items)
  );
});
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem(
    "compareList",
    JSON.stringify(state.compareList.items)
  );
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem(
    "cartList",
    JSON.stringify(state.cartList.items)
  );
});

export default store;
