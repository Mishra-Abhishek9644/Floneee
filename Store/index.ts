import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./Slices/wishlistSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer, // 👈 THIS LINE FIXES EVERYTHING
  },
});

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem(
    "wishlist",
    JSON.stringify(state.wishlist.items)
  );
});


export default store;
