import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/type/Product";

interface CompareState {
  items: Product[];
}

const getCompareKey = (userId: string) => `compare_${userId}`;

const initialState: CompareState = {
  items: [],
};

const compareListSlice = createSlice({
  name: "compareList",
  initialState,
  reducers: {
    // ================= ADD =================
    addToCompareList: (
      state,
      action: PayloadAction<{
        userId: string;
        product: Product;
      }>
    ) => {
      const { userId, product } = action.payload;

      if (!userId) {
        console.error("❌ addToCompareList called WITHOUT userId", action.payload);
        return;
      }

      const exists = state.items.some(item => item._id === product._id);
      if (!exists) {
        state.items.push(product);
      }

      localStorage.setItem(
        getCompareKey(userId),
        JSON.stringify(state.items)
      );
    },

    // ================= REMOVE =================
    removeFromCompareList: (
      state,
      action: PayloadAction<{
        userId: string;
        _id: string;
      }>
    ) => {
      const { userId, _id } = action.payload;

      state.items = state.items.filter(item => item._id !== _id);

      localStorage.setItem(
        getCompareKey(userId),
        JSON.stringify(state.items)
      );
    },

    // ================= CLEAR =================
    clearCompareList: (
      state,
      action: PayloadAction<{ userId: string }>
    ) => {
      localStorage.removeItem(getCompareKey(action.payload.userId));
      state.items = [];
    },

    // ================= LOAD AFTER LOGIN =================
    loadCompareList: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addToCompareList,
  removeFromCompareList,
  clearCompareList,
  loadCompareList,
} = compareListSlice.actions;

export default compareListSlice.reducer;
