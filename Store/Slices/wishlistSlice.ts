// Store/Slices/wishlistSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "@/type/Product";
import toast from "react-hot-toast";

interface WishlistState {
  items: Product[];
  loading: boolean;
}

const initialState: WishlistState = {
  items: [],
  loading: false,
};

/* ================= GET ================= */
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async () => {
    const res = await fetch("/api/wishlist", {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to load wishlist");
    return await res.json(); // { products: [] }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // ✅ used by toggle wrapper
    setWishlist: (state, action) => {
      state.items = action.payload;
    },

    // ✅ optimistic toggle (no refresh needed)
    toggleWishlistLocal: (state, action) => {
      const product: Product = action.payload;
      const exists = state.items.some((p) => p._id === product._id);
      if (exists) {
        state.items = state.items.filter((p) => p._id !== product._id);
      } else {
        state.items.push(product);
      }
    },

    clearWishlistLocal: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload.products;
        state.loading = false;
      });
  },
});

export const {
  setWishlist,
  toggleWishlistLocal,
  clearWishlistLocal,
} = wishlistSlice.actions;

/* ================= TOGGLE (API + OPTIMISTIC) ================= */
export const toggleWishlistDebounced =
  (_userId: string, product: Product) =>
  async (dispatch: any, getState: any) => {
    // instant UI update
    dispatch(toggleWishlistLocal(product));

    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId: product._id }),
      });

      if (!res.ok) throw new Error("Wishlist failed");

      const data = await res.json();
      dispatch(setWishlist(data.products));
    } catch {
      // rollback on error
      dispatch(setWishlist(getState().wishlist.items));
      toast.error("Wishlist error");
    }
  };

/* ================= CLEAR (API) ================= */
export const clearWishlist =
  () => async (dispatch: any) => {
    const res = await fetch("/api/wishlist", {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      dispatch(clearWishlistLocal());
      toast.success("Wishlist cleared");
    }
  };

export default wishlistSlice.reducer;
