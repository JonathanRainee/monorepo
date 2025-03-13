import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUser, signIn, signUp, updateUser } from "./action";

interface UserState {
  id: string;
  name: string;
  email: string;
  token: string;
  age: number;
  loading: boolean;
  success: boolean;
  successMessage: string | null;
  error: string | null;
}

const initialState: UserState = {
  id: '',
  name: '',
  email: '',
  token: '',
  age: 0,
  loading: false,
  success: false,
  successMessage: null,
  error: null
};

export const userSlice = createSlice({
name: 'user',
initialState,
reducers: {
  login: (state, action: PayloadAction<Omit<UserState, 'isLoggedIn' | 'loading' | 'success' | 'error' | 'successMessage'>>) => {
    Object.assign(state, action.payload);
    state.success = true;
    state.successMessage = "Login successful";
    state.error = null;
  },
  logout: (state) => {
    Object.assign(state, initialState);
  },
  updateUsers: (state, action: PayloadAction<Partial<UserState>>) => {
    Object.assign(state, action.payload);
  },
  resetStatus: (state) => {
    state.loading = false;
    state.success = false;
    state.successMessage = null;
    state.error = null;
  },
  setError: (state, action: PayloadAction<string>) => {
    state.error = action.payload;
    state.success = false;
    state.successMessage = null; 
  },
  setSuccess: (state, action: PayloadAction<string>) => {
    state.success = true;
    state.successMessage = action.payload;
    state.error = null; 
  }
},
extraReducers: (builder) => {
  builder.addCase(signUp.pending, (state) => {
    state.loading = true;
    state.success = false;
    state.successMessage = null;
    state.error = null;
  });
  builder.addCase(signUp.fulfilled, (state) => {
    state.loading = false;
    state.success = true;
    state.successMessage = "Sign-up successful!";
  });
  builder.addCase(signUp.rejected, (state, action) => {
    state.loading = false;
    state.success = false;
    state.successMessage = null;
    state.error = action.payload || "Failed to sign up";
  });

  builder.addCase(signIn.pending, (state) => {
    state.loading = true;
    state.success = false;
    state.successMessage = null;
    state.error = null;
  });
  builder.addCase(signIn.fulfilled, (state, action) => {
    Object.assign(state, {
      id: action.payload.user.uid,
      email: action.payload.user.email,
      token: action.payload._tokenResponse.idToken,
    });
    state.loading = false;
    state.success = true;
    state.successMessage = "Sign-in successful!";
  });
  builder.addCase(signIn.rejected, (state, action) => {
    state.loading = false;
    state.success = false;
    state.successMessage = null;
    state.error = action.payload || "Failed to sign in";
  });

  builder.addCase(fetchUser.pending, (state) => {
    state.loading = true;
    state.successMessage = null;
    state.error = null;
  });
  builder.addCase(fetchUser.fulfilled, (state, action) => {
    Object.assign(state, action.payload);
    state.loading = false;
    state.success = true;
    state.successMessage = "User data fetched successfully!";
  });
  builder.addCase(fetchUser.rejected, (state, action) => {
    state.loading = false;
    state.success = false;
    state.successMessage = null;
    state.error = action.payload || "Failed to fetch user";
  });

  builder.addCase(updateUser.pending, (state) => {
    state.loading = true;
    state.success = false;
    state.successMessage = null;
    state.error = null;
  });
  builder.addCase(updateUser.fulfilled, (state, action) => {
    state.email = action.payload.email;
    state.name = action.payload.name;
    state.age = action.payload.age;
    state.loading = false;
    state.success = true;
    state.successMessage = "User updated successfully!";
  });
  builder.addCase(updateUser.rejected, (state, action) => {
    state.loading = false;
    state.success = false;
    state.successMessage = null;
    state.error = action.payload || "Failed to update user";
  });
}
});

export const { login, logout, updateUsers, setError, setSuccess, resetStatus } = userSlice.actions;
