import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/type/Product";

export interface CartItem extends Product {
  quantity: number;
  color: string;
  size: string;
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
    addToCartList: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity: number;
        color: string;
        size: string;
      }>
    ) => {
      const { product, quantity, color, size } = action.payload;

      const existingItem = state.items.find(
        item => item._id === product._id && item.color === color && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          ...product,
          quantity,
          color,
          size,
        });
      }

      localStorage.setItem("cartList", JSON.stringify(state.items));
    },

    updateCartQuantity: (
      state,
      action: PayloadAction<{ _id: string; quantity: number }>
    ) => {
      const item = state.items.find(i => i._id === action.payload._id);
      if (item && action.payload.quantity >= 1) {
        item.quantity = action.payload.quantity;
      }
      localStorage.setItem("cartList", JSON.stringify(state.items));
    },

    removeFromCartList: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
      localStorage.setItem("cartList", JSON.stringify(state.items));
    },


    clearCartList: (state) => {
      state.items = [];
      localStorage.removeItem("cartList");
    },
  },
});

export const {
  addToCartList,
  updateCartQuantity,
  removeFromCartList,
  clearCartList,
} = cartListSlice.actions;

export default cartListSlice.reducer;
