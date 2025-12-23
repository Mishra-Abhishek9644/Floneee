import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  currentUser: User | null;
}

const initialState: AuthState = {
  currentUser: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setUser, logout } = loginSlice.actions;
export default loginSlice.reducer;
