import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/type/Product";

interface wishListState {
  items: Product[];   // change this type according to your needs
}

const initialState: wishListState = {
  items: 
        typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("wishlist") || "[]")
      : [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
   addToWishlist: (state, action:PayloadAction<Product>)  => {
     const exists = state.items.some(item => item.id === action.payload.id);
     if(!exists) {
            state.items.push(action.payload);

     }
   },

    removeFromWishlist: (state, action:PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    clearWishlist: (state) => {
      state.items = []
    }
  },
});

export const { addToWishlist,removeFromWishlist,clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
