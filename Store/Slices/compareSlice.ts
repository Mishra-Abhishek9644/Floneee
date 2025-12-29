// Store/Slices/compareSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/type/Product";
import toast from "react-hot-toast";

interface CompareState {
  items: Product[];
}

const initialState: CompareState = {
  items: [],
};

const compareSlice = createSlice({
  name: "compareList",
  initialState,
  reducers: {
    setCompare: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },

    // optimistic toggle (UI instant update)
    toggleCompareLocal: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const exists = state.items.some((p) => p._id === product._id);

      if (exists) {
        state.items = state.items.filter((p) => p._id !== product._id);
      } else {
        state.items.push(product);
      }
    },

    clearCompareLocal: (state) => {
      state.items = [];
    },
  },
});

export const {
  setCompare,
  toggleCompareLocal,
  clearCompareLocal,
} = compareSlice.actions;

/* ================= GET ================= */
export const fetchCompare =
  () => async (dispatch: any) => {
    try {
      const res = await fetch("/api/compare", {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json(); // { products: [] }
      dispatch(setCompare(data.products));
    } catch {
      toast.error("Failed to load compare");
    }
  };

/* ================= TOGGLE ================= */
export const toggleCompareDebounced =
  (_userId: string, product: Product) =>
    async (dispatch: any, getState: any) => {
      // optimistic update
      dispatch(toggleCompareLocal(product));

      try {
        const res = await fetch("/api/compare", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ productId: product._id }),
        });

        if (!res.ok) throw new Error("Toggle failed");

        const data = await res.json(); // { products: [] }
        dispatch(setCompare(data.products));
      } catch {
        // rollback
        dispatch(setCompare(getState().compareList.items));
        toast.error("Compare error");
      }
    };

/* ================= CLEAR ================= */
export const clearCompare =
  () => async (dispatch: any) => {
    try {
      const res = await fetch("/api/compare", {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Clear failed");

      dispatch(clearCompareLocal());
      toast.success("Compare cleared");
    } catch {
      toast.error("Clear failed");
    }
  };

export const clearCompareList = clearCompare;
export default compareSlice.reducer;
