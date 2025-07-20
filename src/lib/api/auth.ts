// src/lib/api/auth.ts
import axiosInstance from "./axios";

export const login = async (credentials: { email: string; password: string }) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  //localStorage.setItem("token", response.data.token);
  return response;
};