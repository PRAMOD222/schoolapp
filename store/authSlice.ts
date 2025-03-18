"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

// Define Types
interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// Initial State
const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

// Define Async Thunks for API Calls
export const signupUser = createAsyncThunk<
  User, 
  { email: string; password: string }, 
  { rejectValue: string }
>(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseApi}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Signup failed");

      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
        // localStorage.setItem("isAdmin", JSON.stringify(data.isAdmin));
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk<
  User, 
  { email: string; password: string }, 
  { rejectValue: string }
>(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseApi}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");

      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
        // localStorage.setItem("isAdmin", JSON.stringify(data.isAdmin));
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserFromLocalStorage = (): User | null => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        // localStorage.removeItem("isAdmin");
        localStorage.removeItem("user");
      }
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Signup failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
