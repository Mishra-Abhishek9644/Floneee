import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/type/Product";

interface compareListState {
  items: Product[];   // change this type according to your needs
}

const initialState: compareListState = {
  items: 
        typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("compareList") || "[]")
      : [],
};

const compareListSlice  = createSlice({
  name: "compareList",
  initialState,
  reducers: {
   addToCompareList: (state, action:PayloadAction<Product>)  => {
     const exists = state.items.some(item => item._id === action.payload._id);
     if(!exists) {
            state.items.push(action.payload);

     }
   },

    removeFromCompareList: (state, action:PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload)
    },
    
  },
});

export const { addToCompareList,removeFromCompareList } = compareListSlice.actions;

export default compareListSlice.reducer;
