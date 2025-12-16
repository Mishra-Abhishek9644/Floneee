import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/type/Product";
import { clear } from "console";

interface cartListState {
  items: Product[];   // change this type according to your needs
}

const initialState: cartListState = {
  items: 
        typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cartList") || "[]")
      : [],
};

const cartListSlice  = createSlice({
  name: "cartList",
  initialState,
  reducers: {
   addToCartList: (state, action:PayloadAction<Product>)  => {
     const exists = state.items.some(item => item.id === action.payload.id);
     if(!exists) {
            state.items.push(action.payload);

     }
   },

    removeFromCartList: (state, action:PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
     clearCartList: (state) => {
      state.items = []
    }
    
  },
});

export const { addToCartList,removeFromCartList,clearCartList } = cartListSlice.actions;

export default cartListSlice.reducer;
