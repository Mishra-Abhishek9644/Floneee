// Store/Slices/cartSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface CartItem {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  stock: number;
  subtotal: number;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
}

const initialState: CartState = {
  items: [],
  loading: false,
};

/* ================= GET ================= */
export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const res = await fetch("/api/cart", { credentials: "include" });
  if (!res.ok) throw new Error("Fetch cart failed");
  return res.json(); // { items }
});

/* ================= ADD ================= */
export const addToCart = createAsyncThunk(
  "cart/add",
  async (data: {
    productId: string;
    quantity: number;
    color: string;
    size: string;
  }) => {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Add failed");
    return res.json(); // { items }
  }
);

/* ================= REMOVE ================= */
export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (index: number) => {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ index }),
    });

    if (!res.ok) throw new Error("Remove failed");
    return res.json();
  }
);

export const clearCart = createAsyncThunk(
  "cart/clear",
  async () => {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Clear failed");
    return res.json();
  }
);



const cartSlice = createSlice({
  name: "cartList",
  initialState,
  reducers: {
    loadCartList: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    clearCartList: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
        toast.error("Failed to load cart");
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        toast.success("Added to cart");
      })
      .addCase(addToCart.rejected, () => {
        toast.error("Add to cart failed");
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        toast.success("Removed from cart");
      })
      .addCase(removeFromCart.rejected, () => {
        toast.error("Remove failed");
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        toast.success("Cart cleared");
      })
      .addCase(clearCart.rejected, () => {
        toast.error("Failed to clear cart");
      })

  },
});

export const { clearCartList, loadCartList } = cartSlice.actions;
export default cartSlice.reducer;
