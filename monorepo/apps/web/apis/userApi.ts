import axiosInstance from "./axiosInstance";
import { FirebaseApiResponse } from "./apiResponse";
import { UseSelector } from "react-redux";
import { RootState } from "@/store/store";

export interface UserData {
  email: string;
  password: string;
  age: number;
  name: string;
}

export interface LoginData{
  email: string;
  password: string;
}

interface ApiResponse {
  message: string;
}

export const fetchUser = async (userId: string, token: string): Promise<UserData> => {
  const response = await axiosInstance.get<UserData>(`api/users/fetch-user-data/${userId}`, {
    headers:{
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export const updateUser = async (userId: string, userData: Partial<UserData>, token: string): Promise<UserData> => {
  const response = await axiosInstance.put<UserData>(`/api/users/update-user-data/${userId}`,
    userData,{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};


export const signUpUser = async (userData: UserData): Promise<ApiResponse> => {
  const response = await axiosInstance.post<ApiResponse>("/api/users/sign-up", userData);
  return response.data;
};

export const signInUser = async (loginData: LoginData): Promise<FirebaseApiResponse> => {
  const response = await axiosInstance.post<{ response: FirebaseApiResponse}>("/api/users/sign-in", loginData);
  return response.data.response;
}
