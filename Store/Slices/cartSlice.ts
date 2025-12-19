import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/type/Product";
import { clear } from "console";

export interface CartItem extends Product {
  quantity: number;
}

interface cartListState {
  items: CartItem[];
}

const initialState: cartListState = {
  items:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cartList") || "[]")
      : [],
};

const cartListSlice = createSlice({
  name: "cartList",
  initialState,
  reducers: {
    addToCartList: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          ...product,
          quantity,
        });
      }
    },

    updateCartQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(i => i.id === action.payload.id)
      if (item) item.quantity = action.payload.quantity
      if (item && action.payload.quantity >= 1) {
        item.quantity = action.payload.quantity;
      }
    },

    removeFromCartList: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    clearCartList: (state) => {
      state.items = []
    }

  },
});

export const { addToCartList, updateCartQuantity, removeFromCartList, clearCartList } = cartListSlice.actions;

export default cartListSlice.reducer;
