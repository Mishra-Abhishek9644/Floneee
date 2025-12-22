import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Order {
  id: string;
  items: any[];
  total: number;
  billing: any;
  date: string;
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("orders") || "[]")
      : [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
  },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;
