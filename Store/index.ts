import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./Slices/wishlistSlice";
import comparelistReducer from "./Slices/compareSlice";
import cartlistReducer from "./Slices/cartSlice";
import loginReducer from "./Slices/loginSlice";
import orderReducer from "./Slices/orderSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    compareList: comparelistReducer,
    cartList: cartlistReducer,
    login: loginReducer,
    order: orderReducer,
  },
});

if (typeof window !== "undefined") {
  store.subscribe(() => {
    const state = store.getState();

   
    localStorage.setItem("auth", JSON.stringify(state.login));
    localStorage.setItem("orders", JSON.stringify(state.order.orders));
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
