import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface OrderState {
  loading: boolean;
  orders: any[]; // replace with Order[] when ready
}

export const placeOrder = createAsyncThunk(
  "order/place",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Order failed");
      }

      return data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Order failed";

      return rejectWithValue(message);
    }
  }
);

const initialState: OrderState = {
  loading: false,
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload); 
        toast.success("Order placed successfully");
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        toast.error((action.payload as string) || "Order failed");
      });
  },
});

export default orderSlice.reducer;
