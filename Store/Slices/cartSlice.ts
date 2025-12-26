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

const getCartKey = (userId: string) => `cart_${userId}`; // ✅ NEW

const initialState: cartListState = {
  items: [], // ❌ REMOVED localStorage from here
};

const cartListSlice = createSlice({
  name: "cartList",
  initialState,
  reducers: {
    // ================= ADD =================
    addToCartList: (
      state,
      action: PayloadAction<{
        userId: string; // ✅ NEW
        product: Product;
        quantity: number;
        color: string;
        size: string;
      }>
    ) => {

      const { userId, product, quantity, color, size } = action.payload;
      if (!userId) {
        console.error(
          "❌ addToCartList called WITHOUT userId",
          action.payload
        );
        return;
      }
      const existingItem = state.items.find(
        item =>
          item._id === product._id &&
          item.color === color &&
          item.size === size
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

      localStorage.setItem(
        getCartKey(userId), // ✅ USER-SPECIFIC KEY
        JSON.stringify(state.items)
      );
    },

    // ================= UPDATE =================
    updateCartQuantity: (
      state,
      action: PayloadAction<{
        userId: string; // ✅ NEW
        _id: string;
        quantity: number;
      }>
    ) => {
      const { userId, _id, quantity } = action.payload;

      const item = state.items.find(i => i._id === _id);
      if (item && quantity >= 1) {
        item.quantity = quantity;
      }

      localStorage.setItem(
        getCartKey(userId), // ✅ USER-SPECIFIC KEY
        JSON.stringify(state.items)
      );
    },

    // ================= REMOVE =================
    removeFromCartList: (
      state,
      action: PayloadAction<{
        userId: string; // ✅ NEW
        index: number;
      }>
    ) => {
      const { userId, index } = action.payload;

      state.items.splice(index, 1);

      localStorage.setItem(
        getCartKey(userId), // ✅ USER-SPECIFIC KEY
        JSON.stringify(state.items)
      );
    },

    // ================= CLEAR =================
    clearCartList: (
      state,
      action: PayloadAction<{ userId: string }> // ✅ NEW
    ) => {
      localStorage.removeItem(getCartKey(action.payload.userId));
      state.items = [];
    },

    // ================= LOAD AFTER LOGIN =================
    loadCartList: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addToCartList,
  updateCartQuantity,
  removeFromCartList,
  clearCartList,
  loadCartList, // ✅ NEW
} = cartListSlice.actions;

export default cartListSlice.reducer;
