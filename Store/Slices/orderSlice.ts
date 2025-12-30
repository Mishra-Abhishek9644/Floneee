import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

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

      if (!res.ok) throw new Error("Order failed");
      return await res.json();
    } catch (err) {
      return rejectWithValue("Order failed");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: { loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.loading = false;
        toast.success("Order placed successfully");
      })
      .addCase(placeOrder.rejected, (state) => {
        state.loading = false;
        toast.error("Order failed");
      });
  },
});

export default orderSlice.reducer;
