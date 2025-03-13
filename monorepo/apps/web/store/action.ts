
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUser as fetchUserApi, signUpUser, signInUser, updateUser as updateUserApi } from '@/apis/userApi';
import { UserData, LoginData } from '@/apis/userApi';
import { FirebaseApiResponse } from '@/apis/apiResponse';

export const fetchUser = createAsyncThunk<
  UserData,
  { userId: string; token: string },
  { rejectValue: string }
>(
  'user/fetchUser',
  async ({ userId, token }, thunkAPI) => {
    try {
      const data = await fetchUserApi(userId, token);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);

export const updateUser = createAsyncThunk<
  UserData, 
  { userId: string; userData: Partial<UserData>; token: string },
  { rejectValue: string }
>(
  'user/updateUser',
  async ({ userId, userData, token }, thunkAPI) => {
    try {
      const response = await updateUserApi(userId, userData, token);
      return response as UserData;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update user');
    }
  }
);

export const signUp = createAsyncThunk<
  string,
  UserData,
  { rejectValue: string }
>(
  'user/signUp',
  async (userData, thunkAPI) => {
    try {
      const response = await signUpUser(userData);
      return response.message;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to sign up');
    }
  }
);

export const signIn = createAsyncThunk<
  FirebaseApiResponse,
  LoginData,
  { rejectValue: string }
>(
  'user/signIn',
  async (loginData, thunkAPI) => {
    try {
      const response = await signInUser(loginData);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to sign in');
    }
  }
);
