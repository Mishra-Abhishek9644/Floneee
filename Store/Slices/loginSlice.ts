import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  currentUser: User | null;
  hydrated: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  hydrated: false,
};


const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setHydrated: (state) => {
      state.hydrated = true;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setUser, logout, setHydrated } = loginSlice.actions;
export default loginSlice.reducer;
