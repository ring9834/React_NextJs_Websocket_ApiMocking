// src/lib/api/axios.ts
import axios from "axios";
import { PostSchema } from "./schemas";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://jsonplaceholder.typicode.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// // Request interceptor (optional)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Add auth token if exists
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// // Response interceptor (error handling)
// axiosInstance.interceptors.response.use(
//   (response) => response.data, // Directly return data
//   (error) => {
//     const errorMessage = error.response?.data?.message || error.message;
//     console.error("API Error:", errorMessage);
//     return Promise.reject(error);
//   }
// );

// Update axios.ts response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    try {
      response.data = PostSchema.parse(response.data); // Validate and assign
      return response;
    } catch (err) {
      console.error("Validation error:", err);
      return Promise.reject(new Error("Data validation failed"));
    }
  }
);

export default axiosInstance;