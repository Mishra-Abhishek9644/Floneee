import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loadAuthState = () => {
  if (typeof window === "undefined") return undefined;
  const saved = localStorage.getItem("auth");
  return saved ? JSON.parse(saved) : undefined;
};

interface User {
    email:string;
    username:string;
    password:string
}

interface AuthState {
    users: User[];
    currentUser: User | null;
}

const initialState: AuthState = loadAuthState() || { 
       users:[],
       currentUser:null
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    signup:(state,action:PayloadAction<User>) => {
      state.users.push(action.payload)
    },

    login: (state,action:PayloadAction<User>) => {
      const user = state.users.find(u => u.username === action.payload.username && u.password === action.payload.password);

      if(user){
        state.currentUser = user;
      }
    },

     logout: (state) => {
      state.currentUser = null;
    },

   },
});

export const {signup,login,logout } = loginSlice.actions;

export default loginSlice.reducer;
