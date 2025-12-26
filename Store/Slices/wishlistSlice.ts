import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/type/Product";
import toast from "react-hot-toast";

interface WishlistState {
  items: Product[];
}

const getWishlistKey = (userId: string) => `wishlist_${userId}`;

const initialState: WishlistState = {
  items: [],
};

let wishlistDebounceTimer: any = null;

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // ================= ADD =================
    addToWishlist: (
      state,
      action: PayloadAction<{ userId: string; product: Product }>
    ) => {
      const { userId, product } = action.payload;

      if (!userId) {
        console.error("❌ addToWishlist called WITHOUT userId", action.payload);
        return;
      }

      const exists = state.items.some(item => item._id === product._id);
      if (!exists) {
        state.items.push(product);
      }

      localStorage.setItem(
        getWishlistKey(userId),
        JSON.stringify(state.items)
      );
    },

    // ================= REMOVE =================
    removeFromWishlist: (
      state,
      action: PayloadAction<{ userId: string; _id: string }>
    ) => {
      const { userId, _id } = action.payload;

      state.items = state.items.filter(item => item._id !== _id);

      localStorage.setItem(
        getWishlistKey(userId),
        JSON.stringify(state.items)
      );
    },

    // ================= CLEAR =================
    clearWishlist: (
      state,
      action: PayloadAction<{ userId: string }>
    ) => {
      localStorage.removeItem(getWishlistKey(action.payload.userId));
      state.items = [];
    },

    // ================= LOAD AFTER LOGIN =================
    loadWishlist: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  loadWishlist,
} = wishlistSlice.actions;

export const toggleWishlistDebounced =
  (userId: string, product: Product) =>
    (dispatch: any, getState: any) => {
      if (!userId) {
        toast.error("Login to continue");
        return;
      }

      if (wishlistDebounceTimer) return;

      wishlistDebounceTimer = setTimeout(() => {
        wishlistDebounceTimer = null;
      }, 400);

      const { items } = getState().wishlist;
      const exists = items.some((item: Product) => item._id === product._id);

      if (exists) {
        dispatch(
          removeFromWishlist({
            userId,
            _id: product._id,
          })
        );
        toast.success("Removed from wishlist 💔");
      } else {
        dispatch(
          addToWishlist({
            userId,
            product,
          })
        );
        toast.success("Added to wishlist ❤️");
      }
    };


export default wishlistSlice.reducer;
