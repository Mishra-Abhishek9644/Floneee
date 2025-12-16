import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./Slices/wishlistSlice";
import comparelistReducer from "./Slices/compareSlice"

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    compareList: comparelistReducer,
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


export default store;
