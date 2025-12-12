import { configureStore } from '@reduxjs/toolkit'
import wishlist from "./Slices/wishlistSlice"

const store = configureStore({
  reducer:wishlist,
})

export default store