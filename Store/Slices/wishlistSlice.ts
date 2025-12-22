import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/type/Product";
import toast from "react-hot-toast";

interface wishListState {
  items: Product[];
}

const initialState: wishListState = {
  items:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("wishlist") || "[]")
      : [],
};

let wishlistDebounceTimer: any = null;

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.some(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem("wishlist", JSON.stringify(state.items));
      }
    },

    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },

    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem("wishlist");
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export const toggleWishlistDebounced =
  (product: Product) => (dispatch: any, getState: any) => {
    if (wishlistDebounceTimer) return;

    wishlistDebounceTimer = setTimeout(() => {
      wishlistDebounceTimer = null;
    }, 400);

    const { items } = getState().wishlist;
    const exists = items.some((item: Product) => item.id === product.id);

    if (exists) {
      dispatch(removeFromWishlist(product.id));
      toast.success("Removed from wishlist 💔");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist ❤️");
    }
  };


export default wishlistSlice.reducer;
